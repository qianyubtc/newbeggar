package main

import (
	"fmt"
	"net/url"
	"path/filepath"
	"strings"
	"testing"
)

func TestRaidSettleCalc(t *testing.T) {
	bets := []RaidBet{{SiteID: 1, Room: 0, Amount: 20}, {SiteID: 2, Room: 0, Amount: 10}, {SiteID: 3, Room: 1, Amount: 15}, {SiteID: 4, Room: 2, Amount: 5}, {SiteID: -1, Room: 2, Amount: 5}}
	// 找一个会封 0 号房的种子，验证分账
	var seed string
	for i := 0; i < 200; i++ {
		s := fmt.Sprintf("seed%d", i)
		if raidKillIndex(s, 7, 3) == 0 {
			seed = s
			break
		}
	}
	must(t, seed != "", "应能找到封 0 号房的种子")
	out := raidSettleCalc(bets, seed, 7, 3, 5)
	must(t, !out.Void && out.Killed == 0 && out.Dead == 30, "被封: %+v", out)
	// 池 = 30 + 3 = 33，抽 5% = 1，可分 32；幸存押注 25：3 号得 32*15/25=19，4 号 32*5/25=6，NPC 6；零头 32-31=1 → 滚存 1+1=2
	must(t, out.Prize == 32 && out.Payout[1] == 0 && out.Payout[2] == 0 && out.Payout[3] == 15+19 && out.Payout[4] == 5+6 && out.Payout[-1] == 5+6 && out.CarryOut == 2, "分账: %+v", out)
	var back int64
	for _, p := range out.Payout {
		back += p
	}
	must(t, back+out.CarryOut == 20+10+15+5+5+3, "钢镚守恒: 退回 %d + 滚存 %d", back, out.CarryOut)
	// 只有一处有人 → 流局退钱
	v := raidSettleCalc(bets[:2], seed, 8, 9, 5)
	must(t, v.Void && v.Killed == -1 && v.Payout[1] == 20 && v.Payout[2] == 10 && v.CarryOut == 9, "流局: %+v", v)
	// 抽成 0：全部分完，零头滚存
	z := raidSettleCalc(bets, seed, 7, 0, 0)
	must(t, z.Prize == 30 && z.CarryOut == 30-(30*15/25+30*5/25+30*5/25), "零抽成: %+v", z)
	// 抽签结果确定、在范围内
	for k := 2; k <= 6; k++ {
		for i := 0; i < 50; i++ {
			idx := raidKillIndex("s", int64(i), k)
			must(t, idx >= 0 && idx < k && idx == raidKillIndex("s", int64(i), k), "抽签范围")
		}
	}
	must(t, len(raidSeedHash("abc")) == 64, "种子哈希")
}

func TestRaidBotPlan(t *testing.T) {
	p1 := raidBotPlan("seed-a", 3, 1000, 601000, 6, 50)
	p2 := raidBotPlan("seed-a", 3, 1000, 601000, 6, 50)
	must(t, len(p1) >= 2 && fmt.Sprint(p1) == fmt.Sprint(p2), "同种子同计划: %d", len(p1))
	for _, a := range p1 {
		must(t, a.EnterAt >= 1000 && a.EnterAt < 601000 && a.Room >= 0 && a.Room < raidRooms && a.Amount >= 1 && a.Amount <= 10, "动作范围: %+v", a)
		if a.MoveAt > 0 {
			must(t, a.MoveAt > a.EnterAt && a.MoveAt < 601000 && a.Room2 != a.Room && a.Room2 >= 0 && a.Room2 < raidRooms, "搬家范围: %+v", a)
		}
	}
	total := 0
	for i := 0; i < 40; i++ {
		total += len(raidBotPlan(fmt.Sprintf("s%d", i), int64(i), 0, 600000, 6, 50))
	}
	avg := float64(total) / 40
	must(t, avg > 4 && avg < 8, "平均人数应在 6 左右: %.1f", avg)
	must(t, len(raidBotPlan("x", 1, 0, 600000, 0, 50)) == 0, "0 = 关闭")
	must(t, len(raidBotPlan("x", 1, 0, 600000, 1, 50)) == 1, "want=1 至少 1 个")
	must(t, raidBotPlan("x", 1, 0, 600000, 6, 2)[0].Amount <= 2, "押注不超上限")
}

func TestRaidStore(t *testing.T) {
	st, err := openStore(filepath.Join(t.TempDir(), "r.db"))
	if err != nil {
		t.Fatal(err)
	}
	defer st.Close()
	for i, coins := range []int64{100, 30, 0} {
		if _, err := st.db.Exec(`INSERT INTO sites(slug,name,pass_hash,coins,created_at,updated_at) VALUES(?,?,'',?,0,0)`, fmt.Sprintf("s%d", i), fmt.Sprintf("站%d", i), coins); err != nil {
			t.Fatal(err)
		}
	}
	now := int64(1_000_000)
	closed, err := st.RaidCreateRound(now-2000, now-1000, 0, "old")
	must(t, err == nil, "建旧局: %v", err)
	_, err = st.RaidPlaceBet(closed.ID, 1, 0, 5, now)
	must(t, err == ErrRaidClosed, "过了锁门时间应拒: %v", err)
	if _, vo, err := st.RaidSettle(closed.ID, 5, now, "n2", 600000); err != nil || !vo.Void {
		t.Fatalf("空局应流局: %+v %v", vo, err)
	}
	rd, err := st.RaidCreateRound(now, now+600000, 4, "seed-x")
	must(t, err == nil && rd.SeedHash == raidSeedHash("seed-x") && rd.CarryIn == 4, "建局: %+v %v", rd, err)

	coins, err := st.RaidPlaceBet(rd.ID, 1, 2, 20, now+1)
	must(t, err == nil && coins == 80, "押 20: %d %v", coins, err)
	coins, err = st.RaidPlaceBet(rd.ID, 1, 4, 20, now+2) // 搬家
	must(t, err == nil && coins == 80, "搬家不扣钱: %d %v", coins, err)
	coins, err = st.RaidPlaceBet(rd.ID, 1, 4, 30, now+3) // 加注
	must(t, err == nil && coins == 70, "加注: %d %v", coins, err)
	coins, err = st.RaidPlaceBet(rd.ID, 1, 4, 10, now+4) // 减注
	must(t, err == nil && coins == 90, "减注: %d %v", coins, err)
	_, err = st.RaidPlaceBet(rd.ID, 1, 4, 101, now+5) // 手里 90 + 已押 10 = 100，101 不够
	must(t, err == ErrRaidNoCoins, "不够应拒: %v", err)
	coins, err = st.RaidPlaceBet(rd.ID, 1, 4, 100, now+5)
	must(t, err == nil && coins == 0, "刚好够: %d %v", coins, err)
	_, err = st.RaidPlaceBet(rd.ID, 3, 1, 1, now+5)
	must(t, err == ErrRaidNoCoins, "0 钢镚的站应拒: %v", err)
	coins, err = st.RaidPlaceBet(rd.ID, 1, 4, 0, now+6) // 撤出
	must(t, err == nil && coins == 100, "撤出全退: %d %v", coins, err)
	bets, _ := st.RaidBets(rd.ID)
	must(t, len(bets) == 0, "撤出后无记录: %d", len(bets))
	coins, err = st.RaidPlaceBet(rd.ID, 1, 1, 10, now+7)
	must(t, err == nil && coins == 90, "再进: %d %v", coins, err)
	coins, err = st.RaidPlaceBet(rd.ID, 2, 3, 30, now+8)
	must(t, err == nil && coins == 0, "梭哈: %d %v", coins, err)
	must(t, st.RaidBotBet(rd.ID, 0, 3, 5, now+9) == nil && st.RaidBotBet(rd.ID, 0, 5, 9, now+10) == nil, "NPC 进场幂等")
	must(t, st.RaidBotMove(rd.ID, 0, 5, now+11) == nil && st.RaidBotMove(rd.ID, 0, 1, now+12) == nil, "NPC 只搬一次")
	bets, _ = st.RaidBets(rd.ID)
	must(t, len(bets) == 3 && bets[2].SiteID == -1 && bets[2].Room == 5 && bets[2].Amount == 5 && bets[2].Name == raidBots[0].Name && bets[2].IsBot(), "NPC 记录: %+v", bets)
	must(t, bets[0].Name == "站0" && bets[0].Slug == "s0" && bets[0].Path() == "/s0", "真人展示信息: %+v", bets[0])

	r, out, err := st.RaidSettle(rd.ID, 5, now+600001, "seed-next", 600000)
	must(t, err == nil && r != nil && !out.Void && r.Status == "settled" && r.Players == 3, "结算: %+v %v", r, err)
	occ := []int{1, 3, 5}
	must(t, r.Killed == occ[raidKillIndex("seed-x", rd.ID, 3)], "抽签按公式: %d", r.Killed)
	var c1, c2 int64
	st.db.QueryRow(`SELECT coins FROM sites WHERE id=1`).Scan(&c1)
	st.db.QueryRow(`SELECT coins FROM sites WHERE id=2`).Scan(&c2)
	must(t, c1 == 90+out.Payout[1] && c2 == out.Payout[2], "结算后余额: %d %d %+v", c1, c2, out.Payout)
	next, _ := st.RaidOpenRound()
	must(t, next != nil && next.ID == rd.ID+1 && next.CarryIn == r.CarryOut && next.LocksAt == now+600001+600000, "下一局: %+v", next)
	again, _, err := st.RaidSettle(rd.ID, 5, now+600002, "z", 600000)
	must(t, again == nil && err == nil, "重复结算应无事发生")
	hist, _ := st.RaidHistory(5)
	must(t, len(hist) == 2 && hist[0].ID == rd.ID && hist[0].Players == 3 && hist[0].Survivors == 2 && hist[1].Status == "void", "历史: %+v", hist)
	board, _ := st.RaidBoard(10)
	must(t, len(board) == 2 && board[0].Net >= board[1].Net, "幸存榜: %+v", board)
	s1, _ := st.RaidSiteStats(1)
	must(t, s1.Rounds == 1 && s1.Net == out.Payout[1]-10 && (s1.Survived == 1) == (out.Payout[1] > 0) && (s1.Streak == 1) == (out.Payout[1] > 0), "个人战绩: %+v", s1)
}

func TestRaidHTTP(t *testing.T) {
	e := newEnvWith(t, func(c *Config) { c.RaidBots = 0 })
	c := e.client()
	st, body, _ := c.get("/raid")
	must(t, st == 200 && strings.Contains(body, "城管夜巡") && strings.Contains(body, "登录站长账号") && strings.Contains(body, `class="room px"`) && strings.Contains(body, "raid-banner"), "游客看夜巡页: %d", st)
	st, body, _ = c.get("/raid/state")
	must(t, st == 200 && strings.Contains(body, `"round":{"id":1`) && !strings.Contains(body, `"me"`), "游客状态: %s", body)
	st, body, _ = c.post("/raid/bet", url.Values{"room": {"1"}, "amount": {"5"}})
	must(t, st == 401 && strings.Contains(body, "登录"), "游客不能押: %d %s", st, body)

	st, _, _ = c.post("/login", url.Values{"slug": {""}, "password": {e.cfg.AdminPassword}})
	must(t, st == 302, "登录: %d", st)
	e.app.st.db.Exec(`UPDATE sites SET coins=100 WHERE id=1`)
	st, body, _ = c.post("/raid/bet", url.Values{"room": {"9"}, "amount": {"5"}})
	must(t, st == 400, "房间越界: %d", st)
	st, body, _ = c.post("/raid/bet", url.Values{"room": {"1"}, "amount": {"51"}})
	must(t, st == 400 && strings.Contains(body, "最多押 50"), "超上限: %d %s", st, body)
	st, body, _ = c.post("/raid/bet", url.Values{"room": {"1"}, "amount": {"20"}})
	must(t, st == 200 && strings.Contains(body, `"coins":80`), "押注: %d %s", st, body)
	st, body, _ = c.get("/raid/state")
	must(t, st == 200 && strings.Contains(body, `"room":1,"amt":20`) && strings.Contains(body, `"coins":80`) && strings.Contains(body, `"me":true`), "状态含我: %s", body)
	st, body, _ = c.get("/raid")
	must(t, st == 200 && strings.Contains(body, `id="goBtn"`) && strings.Contains(body, `"coins":80`), "登录后页面: %d", st)

	// 另一个房间放个 NPC，强制到点，结算
	rd, _ := e.app.st.RaidOpenRound()
	must(t, e.app.st.RaidBotBet(rd.ID, 2, 4, 5, ms()) == nil, "NPC")
	st, body, _ = c.get(fmt.Sprintf("/raid/%d", rd.ID))
	must(t, st == 200 && strings.Contains(body, "进行中") && !strings.Contains(body, rd.Seed), "进行中不公开种子: %d", st)
	e.app.st.db.Exec(`UPDATE raid_rounds SET locks_at=? WHERE id=?`, ms()-1, rd.ID)
	e.app.raidTick(ms())
	done, _ := e.app.st.RaidRoundByID(rd.ID)
	must(t, done.Status == "settled" && done.Players == 2 && (done.Killed == 1 || done.Killed == 4), "已结算: %+v", done)
	me, _ := e.app.st.GetSiteByID(1)
	if done.Killed == 1 {
		must(t, me.Coins == 80 && done.Dead == 20, "被封: %d", me.Coins)
	} else {
		must(t, me.Coins == 80+20+5 && done.Dead == 5 && done.CarryOut == 0, "活下来分 NPC 的 5 个（抽 5%%=0，全归我）: %d %+v", me.Coins, done)
	}
	st, body, _ = c.get("/raid/state")
	must(t, st == 200 && strings.Contains(body, fmt.Sprintf(`"last":{"id":%d`, rd.ID)) && strings.Contains(body, fmt.Sprintf(`"round":{"id":%d`, rd.ID+1)) && strings.Contains(body, `"rounds":1`), "结算后状态: %s", body)
	st, body, _ = c.get(fmt.Sprintf("/raid/%d", rd.ID))
	must(t, st == 200 && strings.Contains(body, done.Seed) && strings.Contains(body, done.SeedHash) && strings.Contains(body, "验算") && strings.Contains(body, "被查封"), "详情页公开种子: %d", st)
	st, _, _ = c.get("/raid/99999")
	must(t, st == 404, "不存在的局: %d", st)
	// 押到已结算的局：接口只认当前开着的局
	st, body, _ = c.post("/raid/bet", url.Values{"room": {"2"}, "amount": {"3"}})
	must(t, st == 200 && strings.Contains(body, fmt.Sprintf(`"round":%d`, rd.ID+1)), "新局押注: %s", body)
}
