package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"log"
	"strconv"
	"strings"

	_ "modernc.org/sqlite"
)

var (
	ErrSlugTaken = errors.New("地址已被占用")
	ErrXTaken    = errors.New("这个 X 账号已经开过站了")
)

type Site struct {
	ID           int64
	Slug         string // 主站为空串
	Name         string
	Slogan       string
	Story        string
	Avatar       string
	XURL         string
	XHandle      string // X 验证过的 handle（子站必有）
	XName        string // X 昵称（站名锁定为它）
	XAvatar      string // 本地缓存的头像文件名
	XID          string // X 数字用户 ID（改名后仍能认出同一人）
	Skin         int64  // 小人形象编号 0..7
	Listed       bool   // 是否收录进榜单
	Coins        int64  // 钢镚总数
	Wishes       string // 愿望清单 JSON
	PassHash     string
	PayMode      string // gateway | manual
	BPGAccountID string // 网关里的收款账号 ID；主站为空 = 网关默认账号
	BinanceUID   string
	ReceiveLink  string
	PayID        string
	Currency     string
	CreatedFrom  int64
	Status       string // active | disabled
	CreatedAt    int64
	UpdatedAt    int64
}

func (s *Site) IsMain() bool { return s.Slug == "" }
func (s *Site) Path() string { return "/" + s.Slug }

// PaymentReady 是否已配置可用的收款方式。
func (s *Site) PaymentReady() bool {
	if s.PayMode == "gateway" {
		return true
	}
	return s.ReceiveLink != "" || s.PayID != ""
}

type Donation struct {
	ID             int64
	Code           string // 公开编号，也是网关的 merchant_order_id
	SiteID         int64
	Nickname       string
	NickKey        string
	XHandle        string
	Message        string
	MsgBlocked     bool
	Blocked        bool   // 屏蔽此人：名号与留言都隐藏，记录保留
	Reply          string // 站长回复
	Amount         string // 施主填的金额
	AmountE8       int64
	ActualAmount   string // 确认到账的金额
	ActualE8       int64
	Currency       string
	Status         string // pending | claimed | paid | expired | closed | failed | rejected
	MatchedBy      string
	GwOrderID      string
	PayURL         string
	PayAmount      string
	PayLink        string // 收款链接（二维码内容 / 唤起 App）
	PayUID         string // 收款方 UID
	ExpiresAt      int64
	NoteCode       string
	BinanceOrderID string
	PayerID        string
	ClaimToken     string
	IP             string
	SiteCreated    int64
	CreatedAt      int64
	PaidAt         int64
	LastSync       int64
}

func (d *Donation) IsGateway() bool { return d.GwOrderID != "" }

type Stats struct {
	TotalE8 int64
	Count   int64
	Donors  int64
	TodayE8 int64
}

type DonorRow struct {
	NickKey  string
	Nickname string
	TotalE8  int64
	Count    int64
	Sites    int64
	LastAt   int64
}

type SiteRow struct {
	ID        int64
	Slug      string
	Name      string
	Avatar    string
	XAvatar   string
	XHandle   string
	Status    string
	PayMode   string
	Listed    bool
	Coins     int64
	CreatedAt int64
	TotalE8   int64
	Count     int64
	Donors    int64
	Exp       int64  // 钱 + 钢镚折算
	Title     string // 丐帮职位（按 Exp 综合排名）
}

func (s SiteRow) Path() string { return "/" + s.Slug }
func (s SiteRow) AvatarURL() string {
	if s.XAvatar == "" {
		return ""
	}
	return "/a/" + s.XAvatar
}

type Wish struct {
	Label  string `json:"label"`
	Amount string `json:"amount"`
}

type XProfile struct {
	Handle    string
	Name      string
	Avatar    string
	FetchedAt int64
}

type Verify struct {
	Code      string
	Purpose   string // new | reset
	Secret    string // 绑定发起验证的浏览器（cookie 里同名密钥），别人看到推文里的码也用不了
	Profile   string // JSON
	Used      bool
	CreatedAt int64
}

type AdminMessage struct {
	Donation
	SiteName string
	SiteSlug string
}

type Store struct{ db *sql.DB }

var schema = []string{
	`CREATE TABLE IF NOT EXISTS sites (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		slug TEXT NOT NULL UNIQUE,
		name TEXT NOT NULL,
		slogan TEXT NOT NULL DEFAULT '',
		story TEXT NOT NULL DEFAULT '',
		avatar TEXT NOT NULL DEFAULT '🥣',
		x_url TEXT NOT NULL DEFAULT '',
		x_handle TEXT NOT NULL DEFAULT '',
		x_name TEXT NOT NULL DEFAULT '',
		x_avatar TEXT NOT NULL DEFAULT '',
		listed INTEGER NOT NULL DEFAULT 1,
		coins INTEGER NOT NULL DEFAULT 0,
		wishes TEXT NOT NULL DEFAULT '',
		pass_hash TEXT NOT NULL DEFAULT '',
		pay_mode TEXT NOT NULL DEFAULT 'manual',
		bpg_account_id TEXT NOT NULL DEFAULT '',
		binance_uid TEXT NOT NULL DEFAULT '',
		receive_link TEXT NOT NULL DEFAULT '',
		pay_id TEXT NOT NULL DEFAULT '',
		currency TEXT NOT NULL DEFAULT 'USDT',
		created_from INTEGER NOT NULL DEFAULT 0,
		status TEXT NOT NULL DEFAULT 'active',
		created_at INTEGER NOT NULL,
		updated_at INTEGER NOT NULL
	)`,
	`CREATE TABLE IF NOT EXISTS donations (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		code TEXT NOT NULL UNIQUE,
		site_id INTEGER NOT NULL,
		nickname TEXT NOT NULL,
		nick_key TEXT NOT NULL,
		x_handle TEXT NOT NULL DEFAULT '',
		message TEXT NOT NULL DEFAULT '',
		msg_blocked INTEGER NOT NULL DEFAULT 0,
		blocked INTEGER NOT NULL DEFAULT 0,
		reply TEXT NOT NULL DEFAULT '',
		amount TEXT NOT NULL,
		amount_e8 INTEGER NOT NULL,
		actual_amount TEXT NOT NULL DEFAULT '',
		actual_e8 INTEGER NOT NULL DEFAULT 0,
		currency TEXT NOT NULL,
		status TEXT NOT NULL DEFAULT 'pending',
		matched_by TEXT NOT NULL DEFAULT '',
		gw_order_id TEXT NOT NULL DEFAULT '',
		pay_url TEXT NOT NULL DEFAULT '',
		pay_amount TEXT NOT NULL DEFAULT '',
		pay_link TEXT NOT NULL DEFAULT '',
		pay_uid TEXT NOT NULL DEFAULT '',
		expires_at INTEGER NOT NULL DEFAULT 0,
		note_code TEXT NOT NULL DEFAULT '',
		binance_order_id TEXT NOT NULL DEFAULT '',
		payer_id TEXT NOT NULL DEFAULT '',
		claim_token TEXT NOT NULL,
		ip TEXT NOT NULL DEFAULT '',
		site_created INTEGER NOT NULL DEFAULT 0,
		created_at INTEGER NOT NULL,
		paid_at INTEGER NOT NULL DEFAULT 0,
		last_sync INTEGER NOT NULL DEFAULT 0
	)`,
	`CREATE INDEX IF NOT EXISTS idx_don_site ON donations(site_id, status, paid_at)`,
	`CREATE INDEX IF NOT EXISTS idx_don_boid ON donations(binance_order_id)`,
	`CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS xverify (code TEXT PRIMARY KEY, purpose TEXT NOT NULL DEFAULT 'new', secret TEXT NOT NULL DEFAULT '', profile TEXT NOT NULL DEFAULT '', used INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS xprofiles (handle TEXT PRIMARY KEY, name TEXT NOT NULL DEFAULT '', avatar TEXT NOT NULL DEFAULT '', fetched_at INTEGER NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS coins (site_id INTEGER NOT NULL, visitor TEXT NOT NULL, day TEXT NOT NULL, ip TEXT NOT NULL DEFAULT '', n INTEGER NOT NULL DEFAULT 1, created_at INTEGER NOT NULL, PRIMARY KEY(site_id, visitor, day))`,
	`CREATE INDEX IF NOT EXISTS idx_coins_day ON coins(site_id, day)`,
	`CREATE TABLE IF NOT EXISTS blocked_nicks (site_id INTEGER NOT NULL, nick_key TEXT NOT NULL, PRIMARY KEY(site_id, nick_key))`,
}

// migrations 给旧库补列（重复执行报 duplicate column，忽略）。
var migrations = []string{
	`ALTER TABLE sites ADD COLUMN x_handle TEXT NOT NULL DEFAULT ''`,
	`ALTER TABLE sites ADD COLUMN x_name TEXT NOT NULL DEFAULT ''`,
	`ALTER TABLE sites ADD COLUMN x_avatar TEXT NOT NULL DEFAULT ''`,
	`ALTER TABLE sites ADD COLUMN x_id TEXT NOT NULL DEFAULT ''`,
	`ALTER TABLE sites ADD COLUMN skin INTEGER NOT NULL DEFAULT 0`,
	`ALTER TABLE sites ADD COLUMN listed INTEGER NOT NULL DEFAULT 1`,
	`ALTER TABLE sites ADD COLUMN coins INTEGER NOT NULL DEFAULT 0`,
	`ALTER TABLE sites ADD COLUMN wishes TEXT NOT NULL DEFAULT ''`,
	`ALTER TABLE donations ADD COLUMN x_handle TEXT NOT NULL DEFAULT ''`,
	`ALTER TABLE donations ADD COLUMN blocked INTEGER NOT NULL DEFAULT 0`,
	`ALTER TABLE donations ADD COLUMN reply TEXT NOT NULL DEFAULT ''`,
	`ALTER TABLE xverify ADD COLUMN secret TEXT NOT NULL DEFAULT ''`,
	`ALTER TABLE donations ADD COLUMN pay_link TEXT NOT NULL DEFAULT ''`,
	`ALTER TABLE donations ADD COLUMN pay_uid TEXT NOT NULL DEFAULT ''`,
	`ALTER TABLE donations ADD COLUMN expires_at INTEGER NOT NULL DEFAULT 0`,
}

// postSchema 依赖新列的索引，必须在迁移之后建。
var postSchema = []string{
	`CREATE UNIQUE INDEX IF NOT EXISTS idx_sites_xhandle ON sites(lower(x_handle)) WHERE x_handle<>''`,
}

func openStore(path string) (*Store, error) {
	db, err := sql.Open("sqlite", path)
	if err != nil {
		return nil, err
	}
	db.SetMaxOpenConns(1)
	for _, q := range []string{"PRAGMA journal_mode=WAL", "PRAGMA busy_timeout=5000", "PRAGMA synchronous=NORMAL"} {
		if _, err := db.Exec(q); err != nil {
			db.Close()
			return nil, err
		}
	}
	for _, q := range schema {
		if _, err := db.Exec(q); err != nil {
			db.Close()
			return nil, err
		}
	}
	for _, q := range migrations {
		if _, err := db.Exec(q); err != nil && !strings.Contains(err.Error(), "duplicate column") {
			db.Close()
			return nil, err
		}
	}
	for _, q := range postSchema {
		if _, err := db.Exec(q); err != nil {
			db.Close()
			return nil, err
		}
	}
	return &Store{db: db}, nil
}

func (s *Store) Close() error { return s.db.Close() }

func isUniqueErr(err error) bool { return err != nil && strings.Contains(err.Error(), "UNIQUE") }

// ---------- meta ----------

func (s *Store) GetMeta(key string) (string, error) {
	var v string
	err := s.db.QueryRow(`SELECT value FROM meta WHERE key=?`, key).Scan(&v)
	if err == sql.ErrNoRows {
		return "", nil
	}
	return v, err
}

func (s *Store) SetMeta(key, value string) error {
	_, err := s.db.Exec(`INSERT INTO meta(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`, key, value)
	return err
}

// ---------- sites ----------

const siteCols = `id, slug, name, slogan, story, avatar, x_url, x_handle, x_name, x_avatar, x_id, skin, listed, coins, wishes, pass_hash, pay_mode, bpg_account_id, binance_uid, receive_link, pay_id, currency, created_from, status, created_at, updated_at`

type scanner interface{ Scan(dest ...any) error }

func scanSite(sc scanner) (*Site, error) {
	var s Site
	var listed int
	err := sc.Scan(&s.ID, &s.Slug, &s.Name, &s.Slogan, &s.Story, &s.Avatar, &s.XURL, &s.XHandle, &s.XName, &s.XAvatar, &s.XID, &s.Skin, &listed, &s.Coins, &s.Wishes,
		&s.PassHash, &s.PayMode, &s.BPGAccountID, &s.BinanceUID, &s.ReceiveLink, &s.PayID, &s.Currency, &s.CreatedFrom, &s.Status, &s.CreatedAt, &s.UpdatedAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	s.Listed = listed != 0
	return &s, nil
}

func (s *Store) GetSiteBySlug(slug string) (*Site, error) {
	return scanSite(s.db.QueryRow(`SELECT `+siteCols+` FROM sites WHERE slug=?`, slug))
}

func (s *Store) GetSiteByID(id int64) (*Site, error) {
	return scanSite(s.db.QueryRow(`SELECT `+siteCols+` FROM sites WHERE id=?`, id))
}

// GetSiteByXID 按 X 数字 ID 找站（X 改了用户名也认得出来）。
func (s *Store) GetSiteByXID(xid string) (*Site, error) {
	if xid == "" {
		return nil, nil
	}
	return scanSite(s.db.QueryRow(`SELECT `+siteCols+` FROM sites WHERE x_id<>'' AND x_id=?`, xid))
}

// SyncSiteX 找回口令时按推文里的最新资料同步：用户名、昵称（站名跟随）、数字 ID、头像。
// 新用户名被别的站占着（理论上不可能）只回错误，不影响改口令。
func (s *Store) SyncSiteX(id int64, xid, handle, name, avatarFile string) error {
	q := `UPDATE sites SET x_id=CASE WHEN x_id='' THEN ? ELSE x_id END, x_handle=?, x_url=?, x_name=?, name=?, updated_at=?`
	args := []any{xid, handle, "https://x.com/" + handle, name, name, ms()}
	if avatarFile != "" {
		q += `, x_avatar=?`
		args = append(args, avatarFile)
	}
	q += ` WHERE id=?`
	args = append(args, id)
	_, err := s.db.Exec(q, args...)
	return err
}

func (s *Store) GetSiteByXHandle(handle string) (*Site, error) {
	return scanSite(s.db.QueryRow(`SELECT `+siteCols+` FROM sites WHERE x_handle<>'' AND lower(x_handle)=lower(?)`, handle))
}

// EnsureMainSite 首次启动用 config 建主站；之后每次启动把收款配置按 config 覆盖（资料不动）。
// 口令未变则沿用旧哈希（会话绑定口令哈希，避免每次重启管理员掉线）。
func (s *Store) EnsureMainSite(cfg *Config, matches func(hash string) bool, newHash func() string) error {
	mode := "manual"
	if cfg.BPGURL != "" {
		mode = "gateway"
	}
	now := ms()
	main, err := s.GetSiteBySlug("")
	if err != nil {
		return err
	}
	if main == nil {
		hash := newHash()
		_, err = s.db.Exec(`INSERT INTO sites(slug,name,slogan,story,avatar,x_url,x_handle,pass_hash,pay_mode,bpg_account_id,binance_uid,receive_link,pay_id,currency,created_from,status,created_at,updated_at)
			VALUES('',?,?,?,?,?,?,?,?,'','',?,?,?,0,'active',?,?)`,
			cfg.MainName, cfg.MainSlogan, cfg.MainStory, cfg.MainAvatar, cfg.MainX, xHandle(cfg.MainX), hash, mode, cfg.MainReceiveLink, cfg.MainPayID, cfg.Currency, now, now)
		if err != nil {
			return err
		}
		return s.SetMeta("admin_pw_hash", hash)
	}
	// 口令：ADMIN_PASSWORD 只在「config 里的值变了」时覆盖。meta 里记的是上次应用的 PBKDF2 哈希
	// （不是快哈希，库泄漏也不能离线爆破），这样主站在后台改的口令重启不会被冲掉；想强制重置就改 config.env 再重启。
	passHash := main.PassHash
	applied, _ := s.GetMeta("admin_pw_hash")
	if applied == "" || !matches(applied) {
		if !matches(passHash) {
			passHash = newHash()
		}
		if err := s.SetMeta("admin_pw_hash", passHash); err != nil {
			return err
		}
	}
	_, err = s.db.Exec(`UPDATE sites SET pass_hash=?, pay_mode=?, bpg_account_id='', receive_link=?, pay_id=?, currency=?, status='active', updated_at=? WHERE id=?`,
		passHash, mode, cfg.MainReceiveLink, cfg.MainPayID, cfg.Currency, now, main.ID)
	if err != nil {
		return err
	}
	// 主站的 X 账号跟随 MAIN_X（x_handle 用来拉 X 头像）；被某个子站占了就只记日志，不阻塞启动。
	if h := xHandle(cfg.MainX); cfg.MainX != "" && (!strings.EqualFold(h, main.XHandle) || cfg.MainX != main.XURL) {
		if _, err := s.db.Exec(`UPDATE sites SET x_url=?, x_handle=?, x_avatar=CASE WHEN lower(x_handle)=lower(?) THEN x_avatar ELSE '' END, updated_at=? WHERE id=?`,
			cfg.MainX, h, h, now, main.ID); err != nil {
			log.Printf("[warn] 主站 MAIN_X=%s 未能写入（可能已被子站绑定）: %v", cfg.MainX, err)
		}
	}
	return nil
}

// FillSiteAvatarByHandle 给还没有头像的同 X 账号站点补上头像（主站 MAIN_X 首次抓到头像时用）。
func (s *Store) FillSiteAvatarByHandle(handle, file string) {
	if handle == "" || file == "" {
		return
	}
	s.db.Exec(`UPDATE sites SET x_avatar=?, updated_at=? WHERE x_avatar='' AND x_handle<>'' AND lower(x_handle)=lower(?)`, file, ms(), handle)
}

// CreateSite 建子站（X 验证后调用）。
func (s *Store) CreateSite(site *Site) (int64, error) {
	now := ms()
	listed := 0
	if site.Listed {
		listed = 1
	}
	res, err := s.db.Exec(`INSERT INTO sites(slug,name,slogan,story,avatar,x_url,x_handle,x_name,x_avatar,x_id,skin,listed,pass_hash,pay_mode,bpg_account_id,binance_uid,receive_link,pay_id,currency,created_from,status,created_at,updated_at)
		VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,'manual','','','','',?,0,'active',?,?)`,
		site.Slug, site.Name, site.Slogan, site.Story, site.Avatar, site.XURL, site.XHandle, site.XName, site.XAvatar, site.XID, site.Skin, listed, site.PassHash, site.Currency, now, now)
	if err != nil {
		if isUniqueErr(err) {
			if strings.Contains(err.Error(), "xhandle") {
				return 0, ErrXTaken
			}
			return 0, ErrSlugTaken
		}
		return 0, err
	}
	return res.LastInsertId()
}

func (s *Store) UpdateSiteProfile(id int64, name, slogan, story, avatar, xURL string) error {
	_, err := s.db.Exec(`UPDATE sites SET name=?, slogan=?, story=?, avatar=?, x_url=?, updated_at=? WHERE id=?`, name, slogan, story, avatar, xURL, ms(), id)
	return err
}

func (s *Store) UpdateSitePayment(id int64, mode, accountID, uid, link, payID string) error {
	_, err := s.db.Exec(`UPDATE sites SET pay_mode=?, bpg_account_id=?, binance_uid=?, receive_link=?, pay_id=?, updated_at=? WHERE id=?`,
		mode, accountID, uid, link, payID, ms(), id)
	return err
}

// SetSiteSkin 换小人形象（站长自己点「换个形象」）。
func (s *Store) SetSiteSkin(id, skin int64) error {
	_, err := s.db.Exec(`UPDATE sites SET skin=?, updated_at=? WHERE id=?`, skin, ms(), id)
	return err
}

func (s *Store) SetSitePassword(id int64, hash string) error {
	_, err := s.db.Exec(`UPDATE sites SET pass_hash=?, updated_at=? WHERE id=?`, hash, ms(), id)
	return err
}

func (s *Store) SetSiteListed(id int64, listed bool) error {
	v := 0
	if listed {
		v = 1
	}
	_, err := s.db.Exec(`UPDATE sites SET listed=?, updated_at=? WHERE id=? AND slug<>''`, v, ms(), id)
	return err
}

func (s *Store) UpdateSiteWishes(id int64, wishes string) error {
	_, err := s.db.Exec(`UPDATE sites SET wishes=?, updated_at=? WHERE id=?`, wishes, ms(), id)
	return err
}

func (s *Store) SetSiteStatus(id int64, status string) error {
	_, err := s.db.Exec(`UPDATE sites SET status=?, updated_at=? WHERE id=? AND slug<>''`, status, ms(), id)
	return err
}

// SubsiteRank 子站榜。by: amount（总额）| week（本周金额）| coins（钢镚）。管理员视图含未收录/已除名。
func (s *Store) SubsiteRank(limit int, admin bool, by string) ([]SiteRow, error) {
	cond := `d.site_id=s.id AND d.status='paid'`
	if by == "week" {
		cond += ` AND d.paid_at>=` + strconv.FormatInt(weekStart(), 10)
	}
	q := `SELECT s.id, s.slug, s.name, s.avatar, s.x_avatar, s.x_handle, s.status, s.pay_mode, s.listed, s.coins, s.created_at,
			COALESCE(SUM(d.actual_e8),0) AS total, COUNT(d.id) AS n, COUNT(DISTINCT d.nick_key) AS donors
		FROM sites s LEFT JOIN donations d ON ` + cond
	if admin {
		q += ` WHERE s.slug<>''` // 管理视图只管子站
	} else {
		q += ` WHERE s.status='active' AND (s.listed=1 OR s.slug='')` // 榜上带主站（总舵）
	}
	order := `total DESC, s.coins DESC`
	if by == "coins" {
		order = `s.coins DESC, total DESC`
	}
	q += ` GROUP BY s.id ORDER BY ` + order + `, s.id ASC LIMIT ?`
	rows, err := s.db.Query(q, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []SiteRow
	for rows.Next() {
		var r SiteRow
		var listed int
		if err := rows.Scan(&r.ID, &r.Slug, &r.Name, &r.Avatar, &r.XAvatar, &r.XHandle, &r.Status, &r.PayMode, &listed, &r.Coins, &r.CreatedAt, &r.TotalE8, &r.Count, &r.Donors); err != nil {
			return nil, err
		}
		r.Listed = listed != 0
		out = append(out, r)
	}
	return out, rows.Err()
}

// SitePositions 所有已收录子站按综合 EXP（钱×moneyExp + 钢镚×coinExp）的名次，用来授职位（帮主/副帮主/长老…）。
func (s *Store) SitePositions(moneyExp, coinExp int64) (map[int64]int, error) {
	rows, err := s.db.Query(`SELECT s.id FROM sites s LEFT JOIN donations d ON d.site_id=s.id AND d.status='paid'
		WHERE s.slug<>'' AND s.status='active' AND s.listed=1
		GROUP BY s.id HAVING COALESCE(SUM(d.actual_e8),0)*?/100000000+s.coins*?>0
		ORDER BY COALESCE(SUM(d.actual_e8),0)*?/100000000+s.coins*? DESC, s.id ASC`, moneyExp, coinExp, moneyExp, coinExp)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := map[int64]int{}
	pos := 0
	for rows.Next() {
		var id int64
		if err := rows.Scan(&id); err != nil {
			return nil, err
		}
		pos++
		out[id] = pos
	}
	return out, rows.Err()
}

// ---------- 钢镚 ----------

// AddCoin 丢一个钢镚：每人（visitor cookie）每站每天 perDay 个，每 IP 每站每天 ipCap 个。
func (s *Store) AddCoin(siteID int64, visitor, ip, day string, perDay, ipCap, ipTotal int64) (bool, string, error) {
	tx, err := s.db.Begin()
	if err != nil {
		return false, "", err
	}
	defer tx.Rollback()
	var ipN int64
	if err := tx.QueryRow(`SELECT COALESCE(SUM(n),0) FROM coins WHERE site_id=? AND day=? AND ip=?`, siteID, day, ip).Scan(&ipN); err != nil {
		return false, "", err
	}
	if ipN >= ipCap {
		return false, "这个网络今天丢得够多了", nil
	}
	if ipTotal > 0 { // 全站总量：防止一个 IP 挨个站刷
		var allN int64
		if err := tx.QueryRow(`SELECT COALESCE(SUM(n),0) FROM coins WHERE day=? AND ip=?`, day, ip).Scan(&allN); err != nil {
			return false, "", err
		}
		if allN >= ipTotal {
			return false, "这个网络今天丢得够多了", nil
		}
	}
	var n int64
	err = tx.QueryRow(`SELECT n FROM coins WHERE site_id=? AND visitor=? AND day=?`, siteID, visitor, day).Scan(&n)
	if err != nil && err != sql.ErrNoRows {
		return false, "", err
	}
	if n >= perDay {
		return false, "今天已经丢过了，明天再来", nil
	}
	if err == sql.ErrNoRows {
		_, err = tx.Exec(`INSERT INTO coins(site_id,visitor,day,ip,n,created_at) VALUES(?,?,?,?,1,?)`, siteID, visitor, day, ip, ms())
	} else {
		_, err = tx.Exec(`UPDATE coins SET n=n+1 WHERE site_id=? AND visitor=? AND day=?`, siteID, visitor, day)
	}
	if err != nil {
		return false, "", err
	}
	if _, err := tx.Exec(`UPDATE sites SET coins=coins+1 WHERE id=?`, siteID); err != nil {
		return false, "", err
	}
	return true, "", tx.Commit()
}

func (s *Store) CoinStats(siteID int64) (total, todayN int64, err error) {
	if err = s.db.QueryRow(`SELECT coins FROM sites WHERE id=?`, siteID).Scan(&total); err != nil {
		return
	}
	err = s.db.QueryRow(`SELECT COALESCE(SUM(n),0) FROM coins WHERE site_id=? AND day=?`, siteID, today()).Scan(&todayN)
	return
}

// VisitorCoinsToday 某访客今天在该站丢了几个。
func (s *Store) VisitorCoinsToday(siteID int64, visitor string) (int64, error) {
	var n int64
	err := s.db.QueryRow(`SELECT COALESCE(SUM(n),0) FROM coins WHERE site_id=? AND visitor=? AND day=?`, siteID, visitor, today()).Scan(&n)
	return n, err
}

// ---------- X 验证 / 资料 ----------

func (s *Store) CreateVerify(code, purpose, secret string) error {
	_, err := s.db.Exec(`INSERT INTO xverify(code,purpose,secret,created_at) VALUES(?,?,?,?)`, code, purpose, secret, ms())
	return err
}

// PruneVerify 删除过期验证记录，返回其中下载过但没被任何站点使用的头像文件名（供删除）。
func (s *Store) PruneVerify() ([]string, error) {
	rows, err := s.db.Query(`SELECT profile FROM xverify WHERE created_at<? AND profile<>''`, ms()-24*3600*1000)
	if err != nil {
		return nil, err
	}
	var profiles []string
	for rows.Next() {
		var p string
		if err := rows.Scan(&p); err != nil {
			rows.Close()
			return nil, err
		}
		profiles = append(profiles, p)
	}
	rows.Close()
	var files []string
	for _, p := range profiles {
		var v struct {
			AvatarFile string `json:"avatar_file"`
		}
		if json.Unmarshal([]byte(p), &v) != nil || v.AvatarFile == "" {
			continue
		}
		var n int
		s.db.QueryRow(`SELECT COUNT(*) FROM sites WHERE x_avatar=?`, v.AvatarFile).Scan(&n)
		if n == 0 {
			files = append(files, v.AvatarFile)
		}
	}
	_, err = s.db.Exec(`DELETE FROM xverify WHERE created_at<?`, ms()-24*3600*1000)
	return files, err
}

func (s *Store) GetVerify(code string) (*Verify, error) {
	var v Verify
	var used int
	err := s.db.QueryRow(`SELECT code,purpose,secret,profile,used,created_at FROM xverify WHERE code=?`, code).Scan(&v.Code, &v.Purpose, &v.Secret, &v.Profile, &used, &v.CreatedAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	v.Used = used != 0
	return &v, nil
}

func (s *Store) SetVerifyProfile(code, profile string) error {
	_, err := s.db.Exec(`UPDATE xverify SET profile=? WHERE code=?`, profile, code)
	return err
}

// UseVerify 标记验证码已使用（只能成功一次）。
func (s *Store) UseVerify(code string) (bool, error) {
	res, err := s.db.Exec(`UPDATE xverify SET used=1 WHERE code=? AND used=0`, code)
	if err != nil {
		return false, err
	}
	n, _ := res.RowsAffected()
	return n > 0, nil
}

func (s *Store) GetXProfile(handle string) (*XProfile, error) {
	var p XProfile
	err := s.db.QueryRow(`SELECT handle,name,avatar,fetched_at FROM xprofiles WHERE handle=?`, handle).Scan(&p.Handle, &p.Name, &p.Avatar, &p.FetchedAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (s *Store) UpsertXProfile(handle, name, avatar string, fetchedAt int64) error {
	_, err := s.db.Exec(`INSERT INTO xprofiles(handle,name,avatar,fetched_at) VALUES(?,?,?,?)
		ON CONFLICT(handle) DO UPDATE SET name=CASE WHEN excluded.name<>'' THEN excluded.name ELSE name END, avatar=excluded.avatar, fetched_at=excluded.fetched_at`, handle, name, avatar, fetchedAt)
	return err
}

// AvatarInUse 头像文件是否被某个站点用作站长头像。
func (s *Store) AvatarInUse(file string) bool {
	var n int
	s.db.QueryRow(`SELECT (SELECT COUNT(*) FROM sites WHERE x_avatar=?)+(SELECT COUNT(*) FROM xprofiles WHERE avatar=?)`, file, file).Scan(&n)
	return n > 0
}

// SetSiteAvatarByHandle 同一 X 的站长头像随重抓更新。
func (s *Store) SetSiteAvatarByHandle(handle, file string) error {
	_, err := s.db.Exec(`UPDATE sites SET x_avatar=?, updated_at=? WHERE x_handle<>'' AND lower(x_handle)=lower(?)`, file, ms(), handle)
	return err
}

// ---------- 屏蔽此人 ----------

func (s *Store) BlockNick(siteID int64, nickKey string, blocked bool) error {
	v := 0
	if blocked {
		v = 1
	}
	if _, err := s.db.Exec(`UPDATE donations SET blocked=? WHERE site_id=? AND nick_key=?`, v, siteID, nickKey); err != nil {
		return err
	}
	if blocked {
		_, err := s.db.Exec(`INSERT OR IGNORE INTO blocked_nicks(site_id,nick_key) VALUES(?,?)`, siteID, nickKey)
		return err
	}
	_, err := s.db.Exec(`DELETE FROM blocked_nicks WHERE site_id=? AND nick_key=?`, siteID, nickKey)
	return err
}

func (s *Store) IsNickBlocked(siteID int64, nickKey string) (bool, error) {
	var x int
	err := s.db.QueryRow(`SELECT 1 FROM blocked_nicks WHERE site_id=? AND nick_key=?`, siteID, nickKey).Scan(&x)
	if err == sql.ErrNoRows {
		return false, nil
	}
	return err == nil, err
}

func (s *Store) SetReply(id int64, reply string) error {
	_, err := s.db.Exec(`UPDATE donations SET reply=? WHERE id=?`, reply, id)
	return err
}

// ---------- 徽章 ----------

// SiteBadges 本站施主徽章：🏁 首位施主、💎 单笔最大、🔥 常客（≥3 天投过）。
func (s *Store) SiteBadges(siteID int64) (map[string]string, error) {
	out := map[string]string{}
	var k string
	if err := s.db.QueryRow(`SELECT nick_key FROM donations WHERE site_id=? AND status='paid' AND blocked=0 ORDER BY paid_at ASC, id ASC LIMIT 1`, siteID).Scan(&k); err == nil {
		out[k] += "🏁"
	}
	if err := s.db.QueryRow(`SELECT nick_key FROM donations WHERE site_id=? AND status='paid' AND blocked=0 ORDER BY actual_e8 DESC, id ASC LIMIT 1`, siteID).Scan(&k); err == nil {
		out[k] += "💎"
	}
	rows, err := s.db.Query(`SELECT nick_key FROM donations WHERE site_id=? AND status='paid' AND blocked=0 GROUP BY nick_key HAVING COUNT(DISTINCT date(paid_at/1000,'unixepoch','localtime'))>=3`, siteID)
	if err != nil {
		return out, err
	}
	defer rows.Close()
	for rows.Next() {
		if err := rows.Scan(&k); err != nil {
			return out, err
		}
		out[k] += "🔥"
	}
	return out, rows.Err()
}

// ---------- donations ----------

const donCols = `id, code, site_id, nickname, nick_key, x_handle, message, msg_blocked, blocked, reply, amount, amount_e8, actual_amount, actual_e8, currency, status, matched_by, gw_order_id, pay_url, pay_amount, pay_link, pay_uid, expires_at, note_code, binance_order_id, payer_id, claim_token, ip, site_created, created_at, paid_at, last_sync`

var donColsD = "d." + strings.ReplaceAll(donCols, ", ", ", d.")

func scanDonation(sc scanner, extra ...any) (*Donation, error) {
	var d Donation
	var blocked, userBlocked int
	dest := []any{&d.ID, &d.Code, &d.SiteID, &d.Nickname, &d.NickKey, &d.XHandle, &d.Message, &blocked, &userBlocked, &d.Reply, &d.Amount, &d.AmountE8, &d.ActualAmount, &d.ActualE8,
		&d.Currency, &d.Status, &d.MatchedBy, &d.GwOrderID, &d.PayURL, &d.PayAmount, &d.PayLink, &d.PayUID, &d.ExpiresAt, &d.NoteCode, &d.BinanceOrderID, &d.PayerID, &d.ClaimToken,
		&d.IP, &d.SiteCreated, &d.CreatedAt, &d.PaidAt, &d.LastSync}
	dest = append(dest, extra...)
	err := sc.Scan(dest...)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	d.MsgBlocked = blocked != 0
	d.Blocked = userBlocked != 0
	return &d, nil
}

func (s *Store) queryDonations(q string, args ...any) ([]*Donation, error) {
	rows, err := s.db.Query(q, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []*Donation
	for rows.Next() {
		d, err := scanDonation(rows)
		if err != nil {
			return nil, err
		}
		out = append(out, d)
	}
	return out, rows.Err()
}

func (s *Store) CreateDonation(d *Donation) error {
	blocked := 0
	if d.Blocked {
		blocked = 1
	}
	res, err := s.db.Exec(`INSERT INTO donations(code,site_id,nickname,nick_key,x_handle,message,blocked,amount,amount_e8,currency,status,note_code,claim_token,ip,created_at)
		VALUES(?,?,?,?,?,?,?,?,?,?,'pending',?,?,?,?)`,
		d.Code, d.SiteID, d.Nickname, d.NickKey, d.XHandle, d.Message, blocked, d.Amount, d.AmountE8, d.Currency, d.NoteCode, d.ClaimToken, d.IP, d.CreatedAt)
	if err != nil {
		return err
	}
	d.ID, _ = res.LastInsertId()
	d.Status = "pending"
	return nil
}

func (s *Store) GetDonationByCode(code string) (*Donation, error) {
	return scanDonation(s.db.QueryRow(`SELECT `+donCols+` FROM donations WHERE code=?`, code))
}

func (s *Store) GetDonationByID(id int64) (*Donation, error) {
	return scanDonation(s.db.QueryRow(`SELECT `+donCols+` FROM donations WHERE id=?`, id))
}

func (s *Store) FindPaidByBinanceOrder(boid string) (*Donation, error) {
	return scanDonation(s.db.QueryRow(`SELECT `+donCols+` FROM donations WHERE binance_order_id=? AND status='paid' ORDER BY id DESC LIMIT 1`, boid))
}

func (s *Store) SetDonationGateway(id int64, gwOrderID, payURL, payAmount, noteCode, payLink, payUID string, expiresAt int64) error {
	_, err := s.db.Exec(`UPDATE donations SET gw_order_id=?, pay_url=?, pay_amount=?, note_code=?, pay_link=?, pay_uid=?, expires_at=? WHERE id=?`,
		gwOrderID, payURL, payAmount, noteCode, payLink, payUID, expiresAt, id)
	return err
}

// SetStatusIf 仅当当前状态在 from 中时改为 to。
func (s *Store) SetStatusIf(id int64, from []string, to string) (bool, error) {
	ph := strings.TrimSuffix(strings.Repeat("?,", len(from)), ",")
	args := []any{to, id}
	for _, f := range from {
		args = append(args, f)
	}
	res, err := s.db.Exec(`UPDATE donations SET status=? WHERE id=? AND status IN (`+ph+`)`, args...)
	if err != nil {
		return false, err
	}
	n, _ := res.RowsAffected()
	return n > 0, nil
}

func (s *Store) MarkClaimed(id int64, boid string) (bool, error) {
	res, err := s.db.Exec(`UPDATE donations SET status='claimed', binance_order_id=? WHERE id=? AND status='pending'`, boid, id)
	if err != nil {
		return false, err
	}
	n, _ := res.RowsAffected()
	return n > 0, nil
}

func (s *Store) MarkPaid(id int64, actual string, actualE8 int64, matchedBy, boid, payerID string, paidAt int64) (bool, error) {
	res, err := s.db.Exec(`UPDATE donations SET status='paid', actual_amount=?, actual_e8=?, matched_by=?,
		binance_order_id=CASE WHEN ?<>'' THEN ? ELSE binance_order_id END, payer_id=?, paid_at=?
		WHERE id=? AND status IN ('pending','claimed','expired')`,
		actual, actualE8, matchedBy, boid, boid, payerID, paidAt, id)
	if err != nil {
		return false, err
	}
	n, _ := res.RowsAffected()
	return n > 0, nil
}

// TouchSync 距上次向网关查单超过 gap 毫秒才允许再查（防止轮询打爆网关）。
func (s *Store) TouchSync(id int64, now, gap int64) (bool, error) {
	res, err := s.db.Exec(`UPDATE donations SET last_sync=? WHERE id=? AND last_sync<=?`, now, id, now-gap)
	if err != nil {
		return false, err
	}
	n, _ := res.RowsAffected()
	return n > 0, nil
}

func (s *Store) SetMsgBlocked(id int64, blocked bool) error {
	v := 0
	if blocked {
		v = 1
	}
	_, err := s.db.Exec(`UPDATE donations SET msg_blocked=? WHERE id=?`, v, id)
	return err
}

func (s *Store) SiteStats(siteID int64) (Stats, error) {
	var st Stats
	err := s.db.QueryRow(`SELECT COALESCE(SUM(actual_e8),0), COUNT(*), COUNT(DISTINCT CASE WHEN blocked=0 THEN nick_key END),
		COALESCE(SUM(CASE WHEN paid_at>=? THEN actual_e8 ELSE 0 END),0)
		FROM donations WHERE site_id=? AND status='paid'`, dayStart(), siteID).
		Scan(&st.TotalE8, &st.Count, &st.Donors, &st.TodayE8)
	return st, err
}

func (s *Store) SiteDonorRank(siteID int64, limit int, since int64) ([]DonorRow, error) {
	rows, err := s.db.Query(`SELECT d.nick_key,
			(SELECT nickname FROM donations x WHERE x.site_id=d.site_id AND x.nick_key=d.nick_key AND x.status='paid' ORDER BY x.id DESC LIMIT 1),
			SUM(d.actual_e8) AS total, COUNT(*) AS n, MAX(d.paid_at) AS last_at
		FROM donations d WHERE d.site_id=? AND d.status='paid' AND d.paid_at>=? AND d.blocked=0
		GROUP BY d.nick_key ORDER BY total DESC, last_at ASC LIMIT ?`, siteID, since, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []DonorRow
	for rows.Next() {
		var r DonorRow
		if err := rows.Scan(&r.NickKey, &r.Nickname, &r.TotalE8, &r.Count, &r.LastAt); err != nil {
			return nil, err
		}
		out = append(out, r)
	}
	return out, rows.Err()
}

func (s *Store) GlobalDonorRank(limit int, since int64) ([]DonorRow, error) {
	rows, err := s.db.Query(`SELECT d.nick_key,
			(SELECT nickname FROM donations x WHERE x.nick_key=d.nick_key AND x.status='paid' ORDER BY x.id DESC LIMIT 1),
			SUM(d.actual_e8) AS total, COUNT(*) AS n, COUNT(DISTINCT d.site_id) AS sites, MAX(d.paid_at) AS last_at
		FROM donations d JOIN sites s ON s.id=d.site_id AND s.status='active' AND s.listed=1
		WHERE d.status='paid' AND d.paid_at>=? AND d.blocked=0
		GROUP BY d.nick_key ORDER BY total DESC, last_at ASC LIMIT ?`, since, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []DonorRow
	for rows.Next() {
		var r DonorRow
		if err := rows.Scan(&r.NickKey, &r.Nickname, &r.TotalE8, &r.Count, &r.Sites, &r.LastAt); err != nil {
			return nil, err
		}
		out = append(out, r)
	}
	return out, rows.Err()
}

// DonorPosition 某施主在本站施主榜的名次（从 1 起）与其总额。
func (s *Store) DonorPosition(siteID int64, nickKey string) (int, int64, error) {
	var total int64
	if err := s.db.QueryRow(`SELECT COALESCE(SUM(actual_e8),0) FROM donations WHERE site_id=? AND status='paid' AND nick_key=? AND blocked=0`, siteID, nickKey).Scan(&total); err != nil {
		return 0, 0, err
	}
	var above int
	if err := s.db.QueryRow(`SELECT COUNT(*) FROM (SELECT SUM(actual_e8) t FROM donations WHERE site_id=? AND status='paid' AND blocked=0 GROUP BY nick_key) WHERE t>?`, siteID, total).Scan(&above); err != nil {
		return 0, 0, err
	}
	return above + 1, total, nil
}

func (s *Store) SiteFeed(siteID int64, limit int) ([]*Donation, error) {
	return s.queryDonations(`SELECT `+donCols+` FROM donations WHERE site_id=? AND status='paid' ORDER BY paid_at DESC, id DESC LIMIT ?`, siteID, limit)
}

func (s *Store) SiteDonations(siteID int64, limit int) ([]*Donation, error) {
	return s.queryDonations(`SELECT `+donCols+` FROM donations WHERE site_id=? ORDER BY id DESC LIMIT ?`, siteID, limit)
}

// SiteDonationsPage 后台施舍记录分页。
func (s *Store) SiteDonationsPage(siteID int64, offset, limit int) ([]*Donation, error) {
	return s.queryDonations(`SELECT `+donCols+` FROM donations WHERE site_id=? ORDER BY id DESC LIMIT ? OFFSET ?`, siteID, limit, offset)
}

func (s *Store) CountSiteDonations(siteID int64) int {
	var n int
	s.db.QueryRow(`SELECT COUNT(*) FROM donations WHERE site_id=?`, siteID).Scan(&n)
	return n
}

func (s *Store) CountMessages() int {
	var n int
	s.db.QueryRow(`SELECT COUNT(*) FROM donations WHERE status='paid' AND message<>''`).Scan(&n)
	return n
}

func (s *Store) SiteClaims(siteID int64) ([]*Donation, error) {
	return s.queryDonations(`SELECT `+donCols+` FROM donations WHERE site_id=? AND status='claimed' ORDER BY id ASC LIMIT 200`, siteID)
}

func (s *Store) RecentMessages(offset, limit int) ([]AdminMessage, error) {
	rows, err := s.db.Query(`SELECT `+donColsD+`, s.name, s.slug FROM donations d JOIN sites s ON s.id=d.site_id
		WHERE d.status='paid' AND d.message<>'' ORDER BY d.paid_at DESC, d.id DESC LIMIT ? OFFSET ?`, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []AdminMessage
	for rows.Next() {
		var m AdminMessage
		d, err := scanDonation(rows, &m.SiteName, &m.SiteSlug)
		if err != nil {
			return nil, err
		}
		m.Donation = *d
		out = append(out, m)
	}
	return out, rows.Err()
}

// XLabel X 展示名：优先验证过的 handle，否则从链接里取。
func (s *Site) XLabel() string {
	if s.XHandle != "" {
		return s.XHandle
	}
	return xHandle(s.XURL)
}

func (s *Site) AvatarURL() string {
	if s.XAvatar == "" {
		return ""
	}
	return "/a/" + s.XAvatar
}
