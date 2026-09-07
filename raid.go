package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"database/sql"
	"encoding/binary"
	"encoding/hex"
	"encoding/json"
	"errors"
	"html/template"

	"net/http"
	"sort"
	"strconv"
	"strings"
	"time"
)

// 城管夜巡（钢镚大逃杀）：站长拿碗里的钢镚押注，选一个地方过夜；到点城管在「有人的地方」里等概率查封一处，
// 被封的钢镚没收，扣 RAID_RAKE_PCT% 进下一局奖池，其余按押注比例分给幸存者；只有一处有人就流局退钱。
// 公平性：每局开局先公布 sha256(seed)，结算后公开 seed，被封的是 sorted(有人的房间)[uint64(sha256(seed":"局号)[:8]) mod 房间数]。
// NPC 陪玩：进场时间/房间/押注/搬家都由 HMAC(seed, 局号, 编号) 推导，种子公开前无法预测，保证每局有人、每局有戏。
// 押注直接从 sites.coins 扣、退回也加回去（用户拍板：钱包就是钢镚本身）。

const raidRooms = 6

var raidRoomNames = []string{"桥洞", "破庙", "天桥底", "公园长椅", "地铁通道", "烂尾楼"}

var (
	ErrRaidClosed  = errors.New("锁门了")
	ErrRaidNoCoins = errors.New("钢镚不够")
)

type RaidRound struct {
	ID        int64
	OpensAt   int64
	LocksAt   int64
	Status    string // open | settled | void
	Seed      string // 结算前不公开
	SeedHash  string
	CarryIn   int64 // 上局滚进来的奖池
	CarryOut  int64 // 滚给下局的（抽成 + 分不尽的零头）
	Killed    int   // 被查封的房间，-1 = 流局 / 未结算
	Dead      int64 // 被没收的钢镚
	Prize     int64 // 分给幸存者的总数（没收 + 奖池 − 抽成）
	Players   int
	SettledAt int64
}

type RaidBet struct {
	RoundID   int64
	SiteID    int64 // <0 = NPC，编号 = -site_id-1
	Room      int
	Amount    int64
	Payout    int64 // 结算后退回的总数（本金 + 分成）；被封 = 0；流局 = 本金
	Moves     int
	CreatedAt int64
	UpdatedAt int64
	// 展示
	Name   string
	Avatar string // /a/xxx，没有为空
	Emoji  string
	Skin   int64
	Slug   string
}

func (b RaidBet) IsBot() bool { return b.SiteID < 0 }
func (b RaidBet) Path() string {
	if b.IsBot() {
		return ""
	}
	return "/" + b.Slug
}

// ---- NPC ----

type raidBot struct {
	Name string
	Skin int64
}

var raidBots = []raidBot{
	{"老铁头", 5}, {"二狗子", 1}, {"翠花", 7}, {"王大锤", 3}, {"阿福", 0}, {"老烟枪", 4}, {"铁蛋", 6}, {"阿香", 2},
	{"顺子", 1}, {"狗剩", 3}, {"大壮", 4}, {"小六", 6}, {"老张头", 5}, {"三妹", 2}, {"麻杆", 0}, {"胖墩", 7},
}

type botAction struct {
	Bot     int
	EnterAt int64
	Room    int
	Amount  int64
	MoveAt  int64 // 0 = 不搬家
	Room2   int
}

// raidBotPlan 由局种子推导每个 NPC 本局的动作。want = 期望人数（概率 want/16），至少 min(2,want) 个。
func raidBotPlan(seed string, roundID, opensAt, locksAt, want, maxBet int64) []botAction {
	if want <= 0 || locksAt <= opensAt {
		return nil
	}
	dur := locksAt - opensAt
	type cand struct {
		act   botAction
		score int
	}
	var all []cand
	for i := range raidBots {
		mac := hmac.New(sha256.New, []byte(seed))
		mac.Write([]byte("bot:" + strconv.FormatInt(roundID, 10) + ":" + strconv.Itoa(i)))
		b := mac.Sum(nil)
		a := botAction{Bot: i, Room: int(b[2]) % raidRooms}
		a.EnterAt = opensAt + dur*(3+int64(b[1])*80/255)/100 // 开局 3%–83% 之间进场
		a.Amount = 1 + int64(b[3])%3                         // 多数押 1–3
		if b[4]%5 == 0 {
			a.Amount += 2 + int64(b[5])%6 // 偶尔押大点（最多 10）
		}
		if a.Amount > maxBet {
			a.Amount = maxBet
		}
		if b[6]%3 == 0 { // 三分之一会在锁门前搬一次家
			a.MoveAt = a.EnterAt + (locksAt-a.EnterAt)*(20+int64(b[7])*70/255)/100
			a.Room2 = (a.Room + 1 + int(b[8])%(raidRooms-1)) % raidRooms
		}
		all = append(all, cand{a, int(b[0])})
	}
	sort.SliceStable(all, func(i, j int) bool { return all[i].score < all[j].score })
	n := 0
	for _, c := range all { // 分数低于阈值的参加（期望 want 个）
		if int64(c.score)*int64(len(raidBots)) < want*256 {
			n++
		}
	}
	if min := int64(2); n < int(min) {
		n = int(min)
		if want < min {
			n = int(want)
		}
	}
	out := make([]botAction, 0, n)
	for _, c := range all[:n] {
		out = append(out, c.act)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].EnterAt < out[j].EnterAt })
	return out
}

// raidState 后台协程自己的进度（NPC 已进场/已搬家），重启后靠 INSERT OR IGNORE / moves=0 条件幂等。
type raidState struct {
	round int64
	plan  []botAction
	done  map[int]int // bot → 0 未进 1 已进 2 已搬/不搬
}

// ---- 结算算法（纯函数，可测）----

func raidKillIndex(seed string, roundID int64, k int) int {
	h := sha256.Sum256([]byte(seed + ":" + strconv.FormatInt(roundID, 10)))
	return int(binary.BigEndian.Uint64(h[:8]) % uint64(k))
}

func raidSeedHash(seed string) string {
	h := sha256.Sum256([]byte(seed))
	return hex.EncodeToString(h[:])
}

type raidOutcome struct {
	Void     bool
	Rooms    []int // 有人的房间（升序）
	Index    int
	Killed   int
	Dead     int64
	Prize    int64
	CarryOut int64
	Payout   map[int64]int64 // site_id → 退回总数
}

func raidSettleCalc(bets []RaidBet, seed string, roundID, carryIn, rakePct int64) raidOutcome {
	occ := map[int]bool{}
	for _, b := range bets {
		occ[b.Room] = true
	}
	out := raidOutcome{Killed: -1, Payout: map[int64]int64{}, CarryOut: carryIn}
	for r := range occ {
		out.Rooms = append(out.Rooms, r)
	}
	sort.Ints(out.Rooms)
	if len(out.Rooms) < 2 { // 只有一处有人：城管没得挑，流局退钱
		out.Void = true
		for _, b := range bets {
			out.Payout[b.SiteID] = b.Amount
		}
		return out
	}
	out.Index = raidKillIndex(seed, roundID, len(out.Rooms))
	out.Killed = out.Rooms[out.Index]
	var dead, surv int64
	for _, b := range bets {
		if b.Room == out.Killed {
			dead += b.Amount
		} else {
			surv += b.Amount
		}
	}
	pool := dead + carryIn
	rake := pool * rakePct / 100
	dist := pool - rake
	var given int64
	for _, b := range bets {
		if b.Room == out.Killed {
			out.Payout[b.SiteID] = 0
			continue
		}
		share := dist * b.Amount / surv
		out.Payout[b.SiteID] = b.Amount + share
		given += share
	}
	out.Dead, out.Prize, out.CarryOut = dead, dist, rake+(dist-given)
	return out
}

// ---- 存储 ----

const raidCols = `id, opens_at, locks_at, status, seed, seed_hash, carry_in, carry_out, killed, dead, prize, players, settled_at`

func scanRaidRound(sc scanner) (*RaidRound, error) {
	var r RaidRound
	err := sc.Scan(&r.ID, &r.OpensAt, &r.LocksAt, &r.Status, &r.Seed, &r.SeedHash, &r.CarryIn, &r.CarryOut, &r.Killed, &r.Dead, &r.Prize, &r.Players, &r.SettledAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &r, nil
}

func (s *Store) RaidOpenRound() (*RaidRound, error) {
	return scanRaidRound(s.db.QueryRow(`SELECT ` + raidCols + ` FROM raid_rounds WHERE status='open' ORDER BY id DESC LIMIT 1`))
}

func (s *Store) RaidLastSettled() (*RaidRound, error) {
	return scanRaidRound(s.db.QueryRow(`SELECT ` + raidCols + ` FROM raid_rounds WHERE status<>'open' ORDER BY id DESC LIMIT 1`))
}

func (s *Store) RaidRoundByID(id int64) (*RaidRound, error) {
	return scanRaidRound(s.db.QueryRow(`SELECT `+raidCols+` FROM raid_rounds WHERE id=?`, id))
}

func (s *Store) RaidCreateRound(opensAt, locksAt, carryIn int64, seed string) (*RaidRound, error) {
	res, err := s.db.Exec(`INSERT INTO raid_rounds(opens_at,locks_at,status,seed,seed_hash,carry_in) VALUES(?,?,'open',?,?,?)`, opensAt, locksAt, seed, raidSeedHash(seed), carryIn)
	if err != nil {
		return nil, err
	}
	id, _ := res.LastInsertId()
	return s.RaidRoundByID(id)
}

// RaidBets 某局全部押注（含 NPC），带展示信息，按进场先后。
func (s *Store) RaidBets(roundID int64) ([]RaidBet, error) {
	rows, err := s.db.Query(`SELECT b.site_id, b.room, b.amount, b.payout, b.moves, b.created_at, b.updated_at,
			COALESCE(s.name,''), COALESCE(s.x_avatar,''), COALESCE(s.avatar,''), COALESCE(s.skin,0), COALESCE(s.slug,'')
		FROM raid_bets b LEFT JOIN sites s ON s.id=b.site_id WHERE b.round_id=? ORDER BY b.created_at ASC, b.site_id ASC`, roundID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []RaidBet
	for rows.Next() {
		b := RaidBet{RoundID: roundID}
		var av string
		if err := rows.Scan(&b.SiteID, &b.Room, &b.Amount, &b.Payout, &b.Moves, &b.CreatedAt, &b.UpdatedAt, &b.Name, &av, &b.Emoji, &b.Skin, &b.Slug); err != nil {
			return nil, err
		}
		if av != "" {
			b.Avatar = "/a/" + av
		}
		if b.IsBot() {
			if i := int(-b.SiteID - 1); i >= 0 && i < len(raidBots) {
				b.Name, b.Skin = raidBots[i].Name, raidBots[i].Skin
			}
		}
		out = append(out, b)
	}
	return out, rows.Err()
}

// RaidPlaceBet 站长押注 / 搬家 / 改注 / 撤出（amount=0）。差额直接从 sites.coins 扣或退。返回最新余额。
func (s *Store) RaidPlaceBet(roundID, siteID int64, room int, amount, now int64) (int64, error) {
	tx, err := s.db.Begin()
	if err != nil {
		return 0, err
	}
	defer tx.Rollback()
	var status string
	var locksAt int64
	if err := tx.QueryRow(`SELECT status, locks_at FROM raid_rounds WHERE id=?`, roundID).Scan(&status, &locksAt); err != nil {
		if err == sql.ErrNoRows {
			return 0, ErrRaidClosed
		}
		return 0, err
	}
	if status != "open" || locksAt <= now {
		return 0, ErrRaidClosed
	}
	var oldRoom int
	var oldAmt int64
	err = tx.QueryRow(`SELECT room, amount FROM raid_bets WHERE round_id=? AND site_id=?`, roundID, siteID).Scan(&oldRoom, &oldAmt)
	if err != nil && err != sql.ErrNoRows {
		return 0, err
	}
	had := err == nil
	delta := amount - oldAmt
	if delta > 0 {
		res, err := tx.Exec(`UPDATE sites SET coins=coins-? WHERE id=? AND coins>=?`, delta, siteID, delta)
		if err != nil {
			return 0, err
		}
		if n, _ := res.RowsAffected(); n == 0 {
			return 0, ErrRaidNoCoins
		}
	} else if delta < 0 {
		if _, err := tx.Exec(`UPDATE sites SET coins=coins+? WHERE id=?`, -delta, siteID); err != nil {
			return 0, err
		}
	}
	switch {
	case amount == 0 && had:
		if _, err := tx.Exec(`DELETE FROM raid_bets WHERE round_id=? AND site_id=?`, roundID, siteID); err != nil {
			return 0, err
		}
	case amount > 0 && had:
		if _, err := tx.Exec(`UPDATE raid_bets SET room=?, amount=?, moves=moves+1, updated_at=? WHERE round_id=? AND site_id=?`, room, amount, now, roundID, siteID); err != nil {
			return 0, err
		}
	case amount > 0:
		if _, err := tx.Exec(`INSERT INTO raid_bets(round_id,site_id,room,amount,created_at,updated_at) VALUES(?,?,?,?,?,?)`, roundID, siteID, room, amount, now, now); err != nil {
			return 0, err
		}
	}
	var coins int64
	if err := tx.QueryRow(`SELECT coins FROM sites WHERE id=?`, siteID).Scan(&coins); err != nil {
		return 0, err
	}
	return coins, tx.Commit()
}

func (s *Store) RaidBotBet(roundID int64, bot, room int, amount, now int64) error {
	_, err := s.db.Exec(`INSERT OR IGNORE INTO raid_bets(round_id,site_id,room,amount,created_at,updated_at) VALUES(?,?,?,?,?,?)`, roundID, -int64(bot)-1, room, amount, now, now)
	return err
}

func (s *Store) RaidBotMove(roundID int64, bot, room int, now int64) error {
	_, err := s.db.Exec(`UPDATE raid_bets SET room=?, moves=1, updated_at=? WHERE round_id=? AND site_id=? AND moves=0`, room, now, roundID, -int64(bot)-1)
	return err
}

// RaidSettle 结算一局并开下一局（同一事务）：算被封房间、写 payout、给幸存者加钢镚。
func (s *Store) RaidSettle(roundID, rakePct, now int64, nextSeed string, dur int64) (*RaidRound, raidOutcome, error) {
	tx, err := s.db.Begin()
	if err != nil {
		return nil, raidOutcome{}, err
	}
	defer tx.Rollback()
	r, err := scanRaidRound(tx.QueryRow(`SELECT `+raidCols+` FROM raid_rounds WHERE id=? AND status='open'`, roundID))
	if err != nil || r == nil {
		return nil, raidOutcome{}, err
	}
	rows, err := tx.Query(`SELECT site_id, room, amount FROM raid_bets WHERE round_id=?`, roundID)
	if err != nil {
		return nil, raidOutcome{}, err
	}
	var bets []RaidBet
	for rows.Next() {
		var b RaidBet
		if err := rows.Scan(&b.SiteID, &b.Room, &b.Amount); err != nil {
			rows.Close()
			return nil, raidOutcome{}, err
		}
		bets = append(bets, b)
	}
	rows.Close()
	out := raidSettleCalc(bets, r.Seed, r.ID, r.CarryIn, rakePct)
	for _, b := range bets {
		p := out.Payout[b.SiteID]
		if _, err := tx.Exec(`UPDATE raid_bets SET payout=? WHERE round_id=? AND site_id=?`, p, roundID, b.SiteID); err != nil {
			return nil, raidOutcome{}, err
		}
		if b.SiteID > 0 && p > 0 {
			if _, err := tx.Exec(`UPDATE sites SET coins=coins+? WHERE id=?`, p, b.SiteID); err != nil {
				return nil, raidOutcome{}, err
			}
		}
	}
	status := "settled"
	if out.Void {
		status = "void"
	}
	if _, err := tx.Exec(`UPDATE raid_rounds SET status=?, killed=?, dead=?, prize=?, carry_out=?, players=?, settled_at=? WHERE id=?`,
		status, out.Killed, out.Dead, out.Prize, out.CarryOut, len(bets), now, roundID); err != nil {
		return nil, raidOutcome{}, err
	}
	if _, err := tx.Exec(`INSERT INTO raid_rounds(opens_at,locks_at,status,seed,seed_hash,carry_in) VALUES(?,?,'open',?,?,?)`, now, now+dur, nextSeed, raidSeedHash(nextSeed), out.CarryOut); err != nil {
		return nil, raidOutcome{}, err
	}
	if err := tx.Commit(); err != nil {
		return nil, raidOutcome{}, err
	}
	r.Status, r.Killed, r.Dead, r.Prize, r.CarryOut, r.Players, r.SettledAt = status, out.Killed, out.Dead, out.Prize, out.CarryOut, len(bets), now
	return r, out, nil
}

type RaidHist struct {
	ID        int64  `json:"id"`
	Status    string `json:"status"`
	Killed    int    `json:"killed"`
	Dead      int64  `json:"dead"`
	Prize     int64  `json:"prize"`
	Players   int    `json:"players"`
	Survivors int    `json:"survivors"`
	SettledAt int64  `json:"settled_at"`
}

func (s *Store) RaidHistory(limit int) ([]RaidHist, error) {
	rows, err := s.db.Query(`SELECT r.id, r.status, r.killed, r.dead, r.prize, r.players, r.settled_at,
			(SELECT COUNT(*) FROM raid_bets b WHERE b.round_id=r.id AND b.room<>r.killed) AS survivors
		FROM raid_rounds r WHERE r.status<>'open' ORDER BY r.id DESC LIMIT ?`, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []RaidHist{}
	for rows.Next() {
		var h RaidHist
		if err := rows.Scan(&h.ID, &h.Status, &h.Killed, &h.Dead, &h.Prize, &h.Players, &h.SettledAt, &h.Survivors); err != nil {
			return nil, err
		}
		out = append(out, h)
	}
	return out, rows.Err()
}

type RaidBoardRow struct {
	ID       int64  `json:"id"`
	Path     string `json:"path"`
	Name     string `json:"name"`
	Avatar   string `json:"av,omitempty"`
	Emoji    string `json:"emoji,omitempty"`
	Net      int64  `json:"net"`
	Rounds   int    `json:"rounds"`
	Survived int    `json:"survived"`
}

// RaidBoard 幸存榜：净赚钢镚最多的站长（只算真人、已结算局）。
func (s *Store) RaidBoard(limit int) ([]RaidBoardRow, error) {
	rows, err := s.db.Query(`SELECT s.id, s.slug, s.name, s.x_avatar, s.avatar, SUM(b.payout-b.amount) AS net, COUNT(*) AS n, SUM(CASE WHEN b.payout>0 THEN 1 ELSE 0 END) AS surv
		FROM raid_bets b JOIN raid_rounds r ON r.id=b.round_id AND r.status='settled' JOIN sites s ON s.id=b.site_id
		WHERE b.site_id>0 AND s.status='active' GROUP BY s.id ORDER BY net DESC, surv DESC, s.id ASC LIMIT ?`, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []RaidBoardRow{}
	for rows.Next() {
		var r RaidBoardRow
		var slug, av string
		if err := rows.Scan(&r.ID, &slug, &r.Name, &av, &r.Emoji, &r.Net, &r.Rounds, &r.Survived); err != nil {
			return nil, err
		}
		r.Path = "/" + slug
		if av != "" {
			r.Avatar = "/a/" + av
		}
		out = append(out, r)
	}
	return out, rows.Err()
}

type RaidStats struct {
	Rounds   int   `json:"rounds"`
	Survived int   `json:"survived"`
	Net      int64 `json:"net"`
	Streak   int   `json:"streak"` // 最近连续几局活下来
}

func (s *Store) RaidSiteStats(siteID int64) (RaidStats, error) {
	var st RaidStats
	if err := s.db.QueryRow(`SELECT COUNT(*), COALESCE(SUM(CASE WHEN b.payout>0 THEN 1 ELSE 0 END),0), COALESCE(SUM(b.payout-b.amount),0)
		FROM raid_bets b JOIN raid_rounds r ON r.id=b.round_id AND r.status='settled' WHERE b.site_id=?`, siteID).Scan(&st.Rounds, &st.Survived, &st.Net); err != nil {
		return st, err
	}
	rows, err := s.db.Query(`SELECT b.payout FROM raid_bets b JOIN raid_rounds r ON r.id=b.round_id AND r.status='settled' WHERE b.site_id=? ORDER BY b.round_id DESC LIMIT 200`, siteID)
	if err != nil {
		return st, err
	}
	defer rows.Close()
	for rows.Next() {
		var p int64
		if err := rows.Scan(&p); err != nil {
			return st, err
		}
		if p == 0 {
			break
		}
		st.Streak++
	}
	return st, rows.Err()
}

// ---- 后台协程：开局 / NPC / 结算 ----

func (a *App) raidLoop() {
	defer a.wg.Done()
	t := time.NewTicker(time.Second)
	defer t.Stop()
	for {
		select {
		case <-a.stop:
			return
		case <-t.C:
			a.raidTick(ms())
		}
	}
}

func (a *App) raidDur() int64 { return a.cfg.RaidRoundSec * 1000 }

// raidTick 每秒一次：没开局就开、到点就结算并开下一局、按计划让 NPC 进场/搬家。只在一个协程里调用。
func (a *App) raidTick(now int64) {
	a.raidMu.Lock()
	defer a.raidMu.Unlock()
	rd, err := a.st.RaidOpenRound()
	if err != nil {
		a.logf("[error] 夜巡读局: %v", err)
		return
	}
	if rd == nil {
		var carry int64
		if last, _ := a.st.RaidLastSettled(); last != nil {
			carry = last.CarryOut
		}
		if rd, err = a.st.RaidCreateRound(now, now+a.raidDur(), carry, randHex(16)); err != nil {
			a.logf("[error] 夜巡开局: %v", err)
			return
		}
		a.logf("[info] 夜巡第 %d 局开始，奖池 %d", rd.ID, rd.CarryIn)
	}
	if now >= rd.LocksAt {
		r, out, err := a.st.RaidSettle(rd.ID, a.cfg.RaidRakePct, now, randHex(16), a.raidDur())
		if err != nil {
			a.logf("[error] 夜巡结算第 %d 局: %v", rd.ID, err)
			return
		}
		if r != nil {
			if out.Void {
				a.logf("[info] 夜巡第 %d 局流局（%d 人，只有一处有人）", r.ID, r.Players)
			} else {
				a.logf("[info] 夜巡第 %d 局：%s 被查封，%d 人参加，没收 %d，幸存者分 %d，奖池滚存 %d", r.ID, raidRoomNames[r.Killed], r.Players, r.Dead, r.Prize, r.CarryOut)
			}
		}
		a.raid = raidState{}
		return
	}
	if a.cfg.RaidBots <= 0 {
		return
	}
	if a.raid.round != rd.ID {
		a.raid = raidState{round: rd.ID, plan: raidBotPlan(rd.Seed, rd.ID, rd.OpensAt, rd.LocksAt, a.cfg.RaidBots, a.cfg.RaidMaxBet), done: map[int]int{}}
	}
	for _, act := range a.raid.plan {
		st := a.raid.done[act.Bot]
		if st == 0 && now >= act.EnterAt {
			if err := a.st.RaidBotBet(rd.ID, act.Bot, act.Room, act.Amount, now); err != nil {
				a.logf("[error] NPC 进场: %v", err)
				continue
			}
			st = 1
			a.raid.done[act.Bot] = 1
		}
		if st == 1 {
			if act.MoveAt == 0 {
				a.raid.done[act.Bot] = 2
			} else if now >= act.MoveAt {
				if err := a.st.RaidBotMove(rd.ID, act.Bot, act.Room2, now); err != nil {
					a.logf("[error] NPC 搬家: %v", err)
					continue
				}
				a.raid.done[act.Bot] = 2
			}
		}
	}
}

// ---- 页面 / 接口 ----

type raidPlayerJSON struct {
	ID     int64  `json:"id"`
	Name   string `json:"name"`
	Av     string `json:"av,omitempty"`
	Emoji  string `json:"emoji,omitempty"`
	Skin   int64  `json:"skin"`
	Bot    bool   `json:"bot,omitempty"`
	Path   string `json:"path,omitempty"`
	Room   int    `json:"room"`
	Amt    int64  `json:"amt"`
	Payout int64  `json:"payout"`
	Me     bool   `json:"me,omitempty"`
}

type raidRoundJSON struct {
	ID       int64            `json:"id"`
	OpensAt  int64            `json:"opens_at"`
	LocksAt  int64            `json:"locks_at"`
	Status   string           `json:"status"`
	Killed   int              `json:"killed"`
	Dead     int64            `json:"dead"`
	Prize    int64            `json:"prize"`
	CarryIn  int64            `json:"carry_in"`
	CarryOut int64            `json:"carry_out"`
	Players  []raidPlayerJSON `json:"players"`
}

type raidMeJSON struct {
	ID    int64  `json:"id"`
	Name  string `json:"name"`
	Coins int64  `json:"coins"`
	Room  int    `json:"room"` // -1 = 没进场
	Amt   int64  `json:"amt"`
	RaidStats
}

type raidStateJSON struct {
	Now     int64          `json:"now"`
	Round   *raidRoundJSON `json:"round"`
	Last    *raidRoundJSON `json:"last,omitempty"`
	Me      *raidMeJSON    `json:"me,omitempty"`
	History []RaidHist     `json:"history"`
	Board   []RaidBoardRow `json:"board"`
}

func (a *App) raidRoundJSON(r *RaidRound, meID int64) (*raidRoundJSON, error) {
	bets, err := a.st.RaidBets(r.ID)
	if err != nil {
		return nil, err
	}
	j := &raidRoundJSON{ID: r.ID, OpensAt: r.OpensAt, LocksAt: r.LocksAt, Status: r.Status, Killed: r.Killed, Dead: r.Dead, Prize: r.Prize, CarryIn: r.CarryIn, CarryOut: r.CarryOut, Players: []raidPlayerJSON{}}
	for _, b := range bets {
		j.Players = append(j.Players, raidPlayerJSON{ID: b.SiteID, Name: b.Name, Av: b.Avatar, Emoji: b.Emoji, Skin: b.Skin, Bot: b.IsBot(), Path: b.Path(), Room: b.Room, Amt: b.Amount, Payout: b.Payout, Me: meID != 0 && b.SiteID == meID})
	}
	return j, nil
}

func (a *App) raidState(me *Site) (*raidStateJSON, error) {
	var meID int64
	if me != nil {
		meID = me.ID
	}
	rd, err := a.st.RaidOpenRound()
	if err != nil {
		return nil, err
	}
	if rd == nil { // 极少数：刚结算完还没开下一局（同事务里开，理论上不会）
		return nil, errors.New("没有进行中的局")
	}
	st := &raidStateJSON{Now: ms()}
	if st.Round, err = a.raidRoundJSON(rd, meID); err != nil {
		return nil, err
	}
	if last, err := a.st.RaidLastSettled(); err != nil {
		return nil, err
	} else if last != nil {
		if st.Last, err = a.raidRoundJSON(last, meID); err != nil {
			return nil, err
		}
	}
	if st.History, err = a.st.RaidHistory(8); err != nil {
		return nil, err
	}
	if st.Board, err = a.st.RaidBoard(10); err != nil {
		return nil, err
	}
	if me != nil {
		m := &raidMeJSON{ID: me.ID, Name: me.Name, Coins: me.Coins, Room: -1}
		for _, p := range st.Round.Players {
			if p.ID == me.ID {
				m.Room, m.Amt = p.Room, p.Amt
			}
		}
		if m.RaidStats, err = a.st.RaidSiteStats(me.ID); err != nil {
			return nil, err
		}
		st.Me = m
	}
	return st, nil
}

type raidPage struct {
	Base
	State    template.JS
	Rooms    []string
	MaxBet   int64
	RoundMin int64
	RakePct  int64
	Skins    []int64
}

func (a *App) handleRaid(w http.ResponseWriter, r *http.Request) {
	p := raidPage{Base: a.base(r), Rooms: raidRoomNames, MaxBet: a.cfg.RaidMaxBet, RoundMin: (a.cfg.RaidRoundSec + 59) / 60, RakePct: a.cfg.RaidRakePct}
	p.Desc = a.T(r, "城管夜巡：押上钢镚选个地方过夜，到点城管随机查封一处，被封的钢镚分给幸存者。十分钟一局，锁门前随时搬家。")
	st, err := a.raidState(p.Me)
	if err != nil {
		a.fail(w, r, err)
		return
	}
	b, _ := json.Marshal(st)
	p.State = template.JS(b)
	for i := int64(0); i < skinCount; i++ {
		p.Skins = append(p.Skins, i)
	}
	a.render(w, http.StatusOK, "raid", p)
}

func (a *App) handleRaidState(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store")
	if !a.lim.allow("raidstate:"+a.ip(r), 240, time.Minute) {
		w.WriteHeader(http.StatusTooManyRequests)
		w.Write([]byte(`{"ok":false}`))
		return
	}
	st, err := a.raidState(a.currentSite(r))
	if err != nil {
		a.logf("[error] 夜巡状态: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"ok":false}`))
		return
	}
	json.NewEncoder(w).Encode(st)
}

// handleRaidBet POST /raid/bet  room=0..5 amount=0..MaxBet（0 = 撤出）。
func (a *App) handleRaidBet(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store")
	reply := func(status int, v map[string]any) {
		w.WriteHeader(status)
		json.NewEncoder(w).Encode(v)
	}
	site := a.currentSite(r)
	if site == nil {
		reply(http.StatusUnauthorized, map[string]any{"ok": false, "login": true, "msg": a.T(r, "登录站长账号才能参加")})
		return
	}
	if !a.lim.allow("raidbet:"+strconv.FormatInt(site.ID, 10), 40, time.Minute) {
		reply(http.StatusTooManyRequests, map[string]any{"ok": false, "msg": a.T(r, "手速太快了")})
		return
	}
	room, err1 := strconv.Atoi(strings.TrimSpace(r.FormValue("room")))
	amount, err2 := strconv.ParseInt(strings.TrimSpace(r.FormValue("amount")), 10, 64)
	if err1 != nil || err2 != nil || room < 0 || room >= raidRooms || amount < 0 {
		reply(http.StatusBadRequest, map[string]any{"ok": false, "msg": a.T(r, "先选个地方，再填押几个")})
		return
	}
	if amount > a.cfg.RaidMaxBet {
		reply(http.StatusBadRequest, map[string]any{"ok": false, "msg": a.T(r, "一局最多押 %d 个", a.cfg.RaidMaxBet)})
		return
	}
	rd, err := a.st.RaidOpenRound()
	if err != nil || rd == nil {
		reply(http.StatusConflict, map[string]any{"ok": false, "msg": a.T(r, "城管出动中，等下一局")})
		return
	}
	coins, err := a.st.RaidPlaceBet(rd.ID, site.ID, room, amount, ms())
	switch {
	case errors.Is(err, ErrRaidClosed):
		reply(http.StatusConflict, map[string]any{"ok": false, "msg": a.T(r, "锁门了，等下一局")})
		return
	case errors.Is(err, ErrRaidNoCoins):
		reply(http.StatusBadRequest, map[string]any{"ok": false, "msg": a.T(r, "碗里的钢镚不够")})
		return
	case err != nil:
		a.logf("[error] 夜巡押注: %v", err)
		reply(http.StatusInternalServerError, map[string]any{"ok": false, "msg": a.T(r, "服务器开小差了")})
		return
	}
	reply(http.StatusOK, map[string]any{"ok": true, "coins": coins, "room": room, "amt": amount, "round": rd.ID})
}

type raidRoundPage struct {
	Base
	R         *RaidRound
	Bets      []RaidBet
	ByRoom    [][]RaidBet
	Survivors int
	Rooms     []string
	Occ       []int
	Index     int
	RakePct   int64
	Prev      int64
	Next      int64
	Open      bool
}

// handleRaidRound GET /raid/{id} 单局详情：押注、结果、种子与验算方法。
func (a *App) handleRaidRound(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil || id <= 0 {
		a.errorPage(w, r, http.StatusNotFound, "没有这一局", "")
		return
	}
	rd, err := a.st.RaidRoundByID(id)
	if err != nil {
		a.fail(w, r, err)
		return
	}
	if rd == nil {
		a.errorPage(w, r, http.StatusNotFound, "没有这一局", "")
		return
	}
	p := raidRoundPage{Base: a.base(r), R: rd, Rooms: raidRoomNames, RakePct: a.cfg.RaidRakePct, Open: rd.Status == "open"}
	if p.Bets, err = a.st.RaidBets(id); err != nil {
		a.fail(w, r, err)
		return
	}
	p.ByRoom = make([][]RaidBet, raidRooms)
	for _, b := range p.Bets {
		p.ByRoom[b.Room] = append(p.ByRoom[b.Room], b)
		if !p.Open && b.Room != rd.Killed {
			p.Survivors++
		}
	}
	if p.Open {
		rd.Seed = "" // 进行中不公开种子
	} else {
		occ := map[int]bool{}
		for _, b := range p.Bets {
			occ[b.Room] = true
		}
		for i := 0; i < raidRooms; i++ {
			if occ[i] {
				p.Occ = append(p.Occ, i)
			}
		}
		if len(p.Occ) >= 2 {
			p.Index = raidKillIndex(rd.Seed, rd.ID, len(p.Occ))
		}
	}
	if id > 1 {
		p.Prev = id - 1
	}
	if nx, _ := a.st.RaidRoundByID(id + 1); nx != nil {
		p.Next = id + 1
	}
	a.render(w, http.StatusOK, "raidround", p)
}
