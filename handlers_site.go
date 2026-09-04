package main

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"

	qrcode "github.com/skip2/go-qrcode"
)

type sitePage struct {
	Base
	Site         *Site
	Stats        Stats
	Presets      []string
	Rank         []DonorRow
	RankWeek     []DonorRow
	Subsites     []SiteRow
	SubsitesWeek []SiteRow
	Popular      []SiteRow
	Badges       map[string]string
	Feed         []*Donation
	Coins        int64
	CoinsToday   int64
	MyCoins      int64
	CoinsPerDay  int64
	Ready        bool
	Exp          int64  // 钱 + 钢镚折算，袋位按它算
	Position     int    // 综合名次
	SectTitle    string // 丐帮职位
	CoinExp      int64  // 一个钢镚 = 多少 EXP
	MoneyExp     int64  // 1 U = 多少 EXP
	Err          string
	Nick         string
	XHandle      string
	Amount       string
	Message      string
	MinAmount    string
	MaxAmount    string
}

func (a *App) handleRoot(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet && r.Method != http.MethodHead {
		a.errorPage(w, r, http.StatusMethodNotAllowed, "方法不允许", "")
		return
	}
	p := r.URL.Path
	if p == "/" {
		site, err := a.st.GetSiteBySlug("")
		if err != nil || site == nil {
			a.fail(w, r, errors.New("主站不存在"))
			return
		}
		a.renderSite(w, r, http.StatusOK, site, "", savedNick(r), cookieVal(r, "bx"), "", "")
		return
	}
	if slug := strings.ToLower(strings.Trim(p, "/")); validSlug(slug) {
		site, err := a.st.GetSiteBySlug(slug)
		if err != nil {
			a.fail(w, r, err)
			return
		}
		if site == nil || site.Status != "active" {
			a.errorPage(w, r, http.StatusNotFound, "这个乞丐不在", "要么还没开张，要么已被丐帮除名。")
			return
		}
		a.renderSite(w, r, http.StatusOK, site, "", savedNick(r), cookieVal(r, "bx"), "", "")
		return
	}
	a.errorPage(w, r, http.StatusNotFound, "页面不存在", "赛博丐帮没有这条路。")
}

func (a *App) renderSite(w http.ResponseWriter, r *http.Request, status int, site *Site, errMsg, nick, xh, amount, message string) {
	visitor := a.visitor(w, r)
	p := sitePage{Base: a.base(r), Site: site, Presets: a.cfg.PresetAmounts,
		Ready: site.PaymentReady(), Err: errMsg, Nick: nick, XHandle: xh, Amount: amount, Message: message,
		MinAmount: fmtE8(a.cfg.MinAmountE8), MaxAmount: fmtE8(a.cfg.MaxAmountE8), CoinsPerDay: a.cfg.CoinsPerDay}
	p.NoIndex = !site.Listed
	p.Desc = site.Name + "：" + site.Slogan + " · 赛博要饭，行行好"
	if site.AvatarURL() != "" {
		p.OGImage = a.cfg.BaseURL + site.AvatarURL()
	}
	var err error
	if p.Stats, err = a.st.SiteStats(site.ID); err != nil {
		a.fail(w, r, err)
		return
	}
	if p.Rank, err = a.st.SiteDonorRank(site.ID, 20, 0); err != nil {
		a.fail(w, r, err)
		return
	}
	if p.RankWeek, err = a.st.SiteDonorRank(site.ID, 20, weekStart()); err != nil {
		a.fail(w, r, err)
		return
	}
	if p.Feed, err = a.st.SiteFeed(site.ID, 30); err != nil {
		a.fail(w, r, err)
		return
	}
	if p.Subsites, err = a.st.SubsiteRank(20, false, "amount"); err != nil {
		a.fail(w, r, err)
		return
	}
	if p.SubsitesWeek, err = a.st.SubsiteRank(20, false, "week"); err != nil {
		a.fail(w, r, err)
		return
	}
	if p.Popular, err = a.st.SubsiteRank(20, false, "coins"); err != nil {
		a.fail(w, r, err)
		return
	}
	if p.Badges, err = a.st.SiteBadges(site.ID); err != nil {
		a.fail(w, r, err)
		return
	}
	if p.Coins, p.CoinsToday, err = a.st.CoinStats(site.ID); err != nil {
		a.fail(w, r, err)
		return
	}
	p.MyCoins, _ = a.st.VisitorCoinsToday(site.ID, visitor)
	if site.XHandle != "" && site.XAvatar == "" { // 绑了 X 还没头像（主站 MAIN_X / 开站时抓失败）
		if xp, _ := a.st.GetXProfile(strings.ToLower(site.XHandle)); xp != nil && xp.Avatar != "" {
			a.st.FillSiteAvatarByHandle(site.XHandle, xp.Avatar) // 施主头像缓存里已有，直接用
			site.XAvatar = xp.Avatar
		} else {
			a.ensureXProfile(site.XHandle) // 后台补抓，下次刷新就有
		}
	}
	p.Exp = expOf(p.Stats.TotalE8, p.Coins, a.cfg.MoneyExp, a.cfg.CoinExp)
	p.CoinExp, p.MoneyExp = a.cfg.CoinExp, a.cfg.MoneyExp
	positions, err := a.st.SitePositions(a.cfg.MoneyExp, a.cfg.CoinExp)
	if err != nil {
		a.fail(w, r, err)
		return
	}
	a.decorate(p.Subsites, positions)
	a.decorate(p.SubsitesWeek, positions)
	a.decorate(p.Popular, positions)
	if site.IsMain() {
		p.SectTitle = "总舵"
	} else if pos := positions[site.ID]; pos > 0 {
		p.Position, p.SectTitle = pos, sectTitle(pos)
	}
	a.render(w, status, "site", p)
}

// decorate 给榜单行补上综合 EXP 与丐帮职位。
func (a *App) decorate(rows []SiteRow, positions map[int64]int) {
	for i := range rows {
		rows[i].Exp = expOf(rows[i].TotalE8, rows[i].Coins, a.cfg.MoneyExp, a.cfg.CoinExp)
		rows[i].Title = sectTitle(positions[rows[i].ID])
		if rows[i].Slug == "" {
			rows[i].Title = "总舵"
		}
	}
}

func (a *App) handleDonate(w http.ResponseWriter, r *http.Request) {
	if a.limited(w, r, "donate", 10, time.Minute) {
		return
	}
	slug := strings.ToLower(strings.TrimSpace(r.FormValue("site")))
	site, err := a.st.GetSiteBySlug(slug)
	if err != nil {
		a.fail(w, r, err)
		return
	}
	if site == nil || site.Status != "active" {
		a.errorPage(w, r, http.StatusNotFound, "这个乞丐不在", "")
		return
	}
	nick := cleanText(r.FormValue("nickname"), 20, false)
	if nick == "" {
		nick = "匿名施主"
	}
	xh := normHandle(r.FormValue("x_handle"))
	msg := cleanText(r.FormValue("message"), 80, false)
	rawAmt := strings.TrimSpace(r.FormValue("amount"))
	ajax := r.FormValue("ajax") == "1"
	bad := func(m string) {
		if ajax {
			w.Header().Set("Content-Type", "text/plain; charset=utf-8")
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(m))
			return
		}
		a.renderSite(w, r, http.StatusBadRequest, site, m, cleanText(r.FormValue("nickname"), 20, false), r.FormValue("x_handle"), rawAmt, msg)
	}
	if !site.PaymentReady() {
		bad("这位乞丐还没摆碗（未配置收款方式），暂时收不了钱")
		return
	}
	if strings.TrimSpace(r.FormValue("x_handle")) != "" && xh == "" {
		bad("X 用户名只能是字母、数字、下划线（不带 @ 也行）")
		return
	}
	if hasContact(nick) || hasContact(msg) {
		bad("名号和留言里别放链接、联系方式，乞丐不接广告")
		return
	}
	e8, err := parseAmountE8(rawAmt, 2)
	if err != nil {
		bad("金额" + err.Error() + "（最多两位小数）")
		return
	}
	if e8 < a.cfg.MinAmountE8 {
		bad("最少施舍 " + fmtE8(a.cfg.MinAmountE8) + " " + site.Currency)
		return
	}
	if e8 > a.cfg.MaxAmountE8 {
		bad("最多施舍 " + fmtE8(a.cfg.MaxAmountE8) + " " + site.Currency + "，真有这么多请分几次")
		return
	}
	key := nickKey(nick)
	if xh != "" {
		key = "x:" + strings.ToLower(xh)
	}
	d := &Donation{
		Code: "BEG" + randCode(10), SiteID: site.ID, Nickname: nick, NickKey: key, XHandle: xh, Message: msg,
		Amount: fmtE8(e8), AmountE8: e8, Currency: site.Currency, ClaimToken: randHex(16), IP: a.ip(r), CreatedAt: ms(),
	}
	if blocked, _ := a.st.IsNickBlocked(site.ID, key); blocked {
		d.Blocked = true // 被屏蔽的人再投：钱照收，内容不显示
	}
	if site.PayMode != "gateway" {
		d.NoteCode = randCode(6)
	}
	if err := a.st.CreateDonation(d); err != nil {
		a.fail(w, r, err)
		return
	}
	a.rememberDonor(w, d)
	if site.PayMode == "gateway" {
		if err := a.createGatewayOrder(site, d); err != nil {
			a.st.SetStatusIf(d.ID, []string{"pending"}, "failed")
			a.logf("[error] 下单 %s 失败: %v", d.Code, err)
			bad("支付网关开小差了：" + gatewayErr(err))
			return
		}
	}
	if ajax { // 弹窗：返回付款面板片段（cookie 刚设置，面板按本浏览器发起处理）
		panel := a.buildPanel(r, site, d)
		panel.Owned = true
		w.Header().Set("X-Donation", d.Code)
		a.renderFragment(w, http.StatusOK, "site", "paypanel", panel)
		return
	}
	if site.PayMode == "gateway" {
		http.Redirect(w, r, "/d/"+d.Code, http.StatusFound)
		return
	}
	http.Redirect(w, r, "/pay/"+d.Code, http.StatusFound)
}

// handleCoin 丢钢镚（免费点赞，匿名，不能留言）。
func (a *App) handleCoin(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-store")
	reply := func(status int, v map[string]any) {
		w.WriteHeader(status)
		json.NewEncoder(w).Encode(v)
	}
	if !a.lim.allow("coin:"+a.ip(r), 60, time.Minute) {
		reply(429, map[string]any{"ok": false, "msg": "手速太快了"})
		return
	}
	slug := strings.ToLower(strings.TrimSpace(r.FormValue("site")))
	site, err := a.st.GetSiteBySlug(slug)
	if err != nil || site == nil || site.Status != "active" {
		reply(404, map[string]any{"ok": false, "msg": "这个乞丐不在"})
		return
	}
	visitor := cookieVal(r, "bv")
	if len(visitor) != 24 { // 访客标识只在打开页面时发放；跨站脚本发的请求带不上，直接拒
		reply(403, map[string]any{"ok": false, "msg": "请先打开要饭页再丢"})
		return
	}
	added, msg, err := a.st.AddCoin(site.ID, visitor, a.ip(r), today(), a.cfg.CoinsPerDay, a.cfg.CoinsIPCap)
	if err != nil {
		a.logf("[error] 丢钢镚: %v", err)
		reply(500, map[string]any{"ok": false, "msg": "服务器开小差了"})
		return
	}
	total, todayN, _ := a.st.CoinStats(site.ID)
	mine, _ := a.st.VisitorCoinsToday(site.ID, visitor)
	reply(200, map[string]any{"ok": true, "added": added, "msg": msg, "total": total, "today": todayN, "mine": mine, "per_day": a.cfg.CoinsPerDay})
}

// payPanel 付款面板（弹窗 / 状态页 / 付款页共用）。
type payPanel struct {
	D        *Donation
	Site     *Site
	Mode     string // gateway | manual
	Amount   string // 应付金额：网关模式为唯一尾数金额，直接转账为施主填的金额
	QR       string // base64 PNG
	AppLink  string
	PayID    string
	NoteCode string
	IsMobile bool
	Owned    bool   // 当前浏览器发起的（回填/自报要它）
	Fallback string // 网关收银页
	Site2    string
}

func (a *App) buildPanel(r *http.Request, site *Site, d *Donation) payPanel {
	p := payPanel{D: d, Site: site, IsMobile: isMobile(r), Owned: cookieVal(r, "bd_"+d.Code) == d.ClaimToken, NoteCode: d.NoteCode}
	if d.IsGateway() {
		p.Mode, p.Amount, p.AppLink, p.PayID, p.Fallback = "gateway", d.PayAmount, d.PayLink, d.PayUID, d.PayURL
		if p.AppLink == "" && site.ReceiveLink != "" {
			p.AppLink = site.ReceiveLink
		}
	} else {
		p.Mode, p.Amount, p.AppLink, p.PayID = "manual", d.Amount, site.ReceiveLink, site.PayID
	}
	if p.AppLink != "" {
		if png, err := qrcode.Encode(p.AppLink, qrcode.Medium, 220); err == nil {
			p.QR = base64.StdEncoding.EncodeToString(png)
		}
	}
	return p
}

type payPage struct {
	Base
	Site  *Site
	D     *Donation
	Panel payPanel
	Err   string
}

func (a *App) loadDonation(w http.ResponseWriter, r *http.Request) (*Donation, *Site, bool) {
	d, err := a.st.GetDonationByCode(r.PathValue("code"))
	if err != nil {
		a.fail(w, r, err)
		return nil, nil, false
	}
	if d == nil {
		a.errorPage(w, r, http.StatusNotFound, "没有这笔施舍", "")
		return nil, nil, false
	}
	site, err := a.st.GetSiteByID(d.SiteID)
	if err != nil || site == nil {
		a.fail(w, r, errors.New("站点不存在"))
		return nil, nil, false
	}
	return d, site, true
}

func (a *App) handlePay(w http.ResponseWriter, r *http.Request) {
	d, site, ok := a.loadDonation(w, r)
	if !ok {
		return
	}
	if d.IsGateway() || d.Status != "pending" {
		http.Redirect(w, r, "/d/"+d.Code, http.StatusFound)
		return
	}
	a.renderPay(w, r, http.StatusOK, site, d, "")
}

func (a *App) renderPay(w http.ResponseWriter, r *http.Request, status int, site *Site, d *Donation, errMsg string) {
	a.render(w, status, "pay", payPage{Base: a.base(r), Site: site, D: d, Panel: a.buildPanel(r, site, d), Err: errMsg})
}

// replyJSON 弹窗里的异步请求统一回 JSON。
func replyJSON(w http.ResponseWriter, status int, v map[string]any) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-store")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

// handleClaim 直接转账模式：施主自报「我已施舍」。
func (a *App) handleClaim(w http.ResponseWriter, r *http.Request) {
	ajax := r.FormValue("ajax") == "1"
	if !a.lim.allow("claim:"+a.ip(r), 5, time.Minute) {
		if ajax {
			replyJSON(w, 429, map[string]any{"ok": false, "msg": "手速太快了，歇一会儿"})
		} else {
			a.errorPage(w, r, http.StatusTooManyRequests, "手速太快了", "歇一会儿再来。")
		}
		return
	}
	d, site, ok := a.loadDonation(w, r)
	if !ok {
		return
	}
	if d.IsGateway() || d.Status != "pending" {
		if ajax {
			replyJSON(w, 200, map[string]any{"ok": true, "status": d.Status})
		} else {
			http.Redirect(w, r, "/d/"+d.Code, http.StatusFound)
		}
		return
	}
	fail := func(status int, m string) {
		if ajax {
			replyJSON(w, status, map[string]any{"ok": false, "msg": m})
		} else {
			a.renderPay(w, r, status, site, d, m)
		}
	}
	if cookieVal(r, "bd_"+d.Code) != d.ClaimToken {
		fail(http.StatusForbidden, "请在发起施舍的那台设备上点「我已施舍」")
		return
	}
	boid := strings.TrimSpace(r.FormValue("binance_order_id"))
	if boid != "" && !reBinanceOrder.MatchString(boid) {
		fail(http.StatusBadRequest, "币安订单编号是 18 位数字，不填也行")
		return
	}
	if _, err := a.st.MarkClaimed(d.ID, boid); err != nil {
		a.fail(w, r, err)
		return
	}
	a.logf("[info] 施舍 %s 自报已转账 %s %s（站点 %d）", d.Code, d.Amount, d.Currency, site.ID)
	if ajax {
		replyJSON(w, 200, map[string]any{"ok": true, "status": "claimed", "msg": "已提交，等站长确认"})
		return
	}
	http.Redirect(w, r, "/d/"+d.Code, http.StatusFound)
}

// handleGatewayClaim 网关模式：施主回填币安订单编号，本站代转网关核对。
func (a *App) handleGatewayClaim(w http.ResponseWriter, r *http.Request) {
	ajax := r.FormValue("ajax") == "1"
	d, _, ok := a.loadDonation(w, r)
	if !ok {
		return
	}
	fail := func(status int, m string) {
		if ajax {
			replyJSON(w, status, map[string]any{"ok": false, "status": d.Status, "msg": m})
		} else {
			a.errorPage(w, r, status, "核对失败", m)
		}
	}
	if !d.IsGateway() {
		fail(http.StatusBadRequest, "这笔施舍不是网关模式")
		return
	}
	if !a.lim.allow("gclaim:"+a.ip(r), 5, time.Minute) {
		fail(http.StatusTooManyRequests, "试得太频繁了，一分钟后再试")
		return
	}
	if cookieVal(r, "bd_"+d.Code) != d.ClaimToken {
		fail(http.StatusForbidden, "请在发起施舍的那台设备上回填")
		return
	}
	boid := strings.TrimSpace(r.FormValue("binance_order_id"))
	if !reBinanceOrder.MatchString(boid) {
		fail(http.StatusBadRequest, "币安订单编号是 18 位数字")
		return
	}
	code, err := a.gatewayClaim(d, boid)
	if err != nil {
		fail(http.StatusBadGateway, gatewayErr(err))
		return
	}
	a.refreshFromGateway(d)
	msg := claimMsgs[code]
	if msg == "" {
		msg = "网关返回 " + code
	}
	if ajax {
		replyJSON(w, 200, map[string]any{"ok": d.Status == "paid", "status": d.Status, "msg": msg})
		return
	}
	http.Redirect(w, r, "/d/"+d.Code, http.StatusFound)
}

type statusPage struct {
	Base
	Site       *Site
	D          *Donation
	Stale      bool
	Position   int
	DonorTotal int64
	ShareURL   string
	Panel      payPanel
}

func (a *App) handleDonationPage(w http.ResponseWriter, r *http.Request) {
	d, site, ok := a.loadDonation(w, r)
	if !ok {
		return
	}
	a.syncFromGateway(d)
	p := statusPage{Base: a.base(r), Site: site, D: d, ShareURL: a.cfg.BaseURL + site.Path()}
	p.Stale = d.Status == "pending" && ms()-d.CreatedAt > (a.cfg.OrderTTL+1800)*1000
	if (d.Status == "pending" && !p.Stale) || d.Status == "claimed" {
		p.Panel = a.buildPanel(r, site, d)
	}
	if d.Status == "paid" {
		if pos, total, err := a.st.DonorPosition(site.ID, d.NickKey); err == nil {
			p.Position, p.DonorTotal = pos, total
		}
	}
	a.render(w, http.StatusOK, "status", p)
}

func (a *App) handleDonationStatus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	d, err := a.st.GetDonationByCode(r.PathValue("code"))
	if err != nil || d == nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(`{"status":"unknown"}`))
		return
	}
	a.syncFromGateway(d)
	w.Header().Set("Cache-Control", "no-store")
	json.NewEncoder(w).Encode(map[string]any{"status": d.Status, "amount": d.ActualAmount, "paid_at": d.PaidAt})
}

type rankPage struct {
	Base
	Donors     []DonorRow
	DonorsWeek []DonorRow
	Sites      []SiteRow
	SitesWeek  []SiteRow
	Popular    []SiteRow
}

func (a *App) handleRank(w http.ResponseWriter, r *http.Request) {
	p := rankPage{Base: a.base(r)}
	var err error
	if p.Donors, err = a.st.GlobalDonorRank(100, 0); err != nil {
		a.fail(w, r, err)
		return
	}
	if p.DonorsWeek, err = a.st.GlobalDonorRank(100, weekStart()); err != nil {
		a.fail(w, r, err)
		return
	}
	if p.Sites, err = a.st.SubsiteRank(100, false, "amount"); err != nil {
		a.fail(w, r, err)
		return
	}
	if p.SitesWeek, err = a.st.SubsiteRank(100, false, "week"); err != nil {
		a.fail(w, r, err)
		return
	}
	if p.Popular, err = a.st.SubsiteRank(100, false, "coins"); err != nil {
		a.fail(w, r, err)
		return
	}
	positions, err := a.st.SitePositions(a.cfg.MoneyExp, a.cfg.CoinExp)
	if err != nil {
		a.fail(w, r, err)
		return
	}
	a.decorate(p.Sites, positions)
	a.decorate(p.SitesWeek, positions)
	a.decorate(p.Popular, positions)
	a.render(w, http.StatusOK, "rank", p)
}
