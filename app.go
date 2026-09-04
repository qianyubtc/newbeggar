package main

import (
	"bytes"
	"embed"
	"html/template"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"

	bpaygate "github.com/qianyubtc/BinancePayTool/sdk/go"
)

//go:embed templates/*.html
var tplFS embed.FS

//go:embed static/*
var staticFS embed.FS

// hasBGM 背景音乐是可选的：把你的循环片段放到 static/bgm.m4a（AAC）再编译即可，没有就只有音效。
var hasBGM = func() bool {
	f, err := staticFS.Open("static/bgm.m4a")
	if err == nil {
		f.Close()
	}
	return err == nil
}()

type App struct {
	cfg     *Config
	st      *Store
	mux     *http.ServeMux
	tpl     map[string]*template.Template
	lim     *limiter
	secure  bool
	session []byte           // 会话签名密钥（首次启动生成，存 meta 表）
	gwc     *bpaygate.Client // nil = 未配置网关
	xp      *xProfileCache
	origin  string // BaseURL 的 scheme://host，POST 同源校验用
}

// Base 每个页面都带的公共字段。
type Base struct {
	SiteTitle       string
	BaseURL         string
	RepoURL         string
	AuthorGitHub    string
	AuthorX         string
	SubsitesEnabled bool
	IsMobile        bool
	Me              *Site  // 已登录的站长，可能为 nil
	MeID            int64  // Me 的 ID（模板里比较用，未登录为 0）
	InApp           bool   // App 内置浏览器（X/微信等）
	HasBGM          bool   // static/bgm.m4a 存在才渲染背景音乐
	NoIndex         bool   // 未收录的子站不让搜索引擎收录
	Desc            string // 页面描述（站点页用站名 + 口号）
	OGImage         string // 分享缩略图（站点页用 X 头像）
}

func newApp(cfg *Config) (*App, error) {
	st, err := openStore(cfg.DBPath)
	if err != nil {
		return nil, err
	}
	if err := st.EnsureMainSite(cfg, func(h string) bool { return checkPassword(h, cfg.AdminPassword) }, func() string { return hashPassword(cfg.AdminPassword) }); err != nil {
		st.Close()
		return nil, err
	}
	sec, err := st.GetMeta("session_secret")
	if err != nil {
		st.Close()
		return nil, err
	}
	if sec == "" {
		sec = randHex(32)
		if err := st.SetMeta("session_secret", sec); err != nil {
			st.Close()
			return nil, err
		}
	}
	a := &App{cfg: cfg, st: st, lim: newLimiter(), secure: strings.HasPrefix(cfg.BaseURL, "https://"), session: []byte(sec),
		xp: &xProfileCache{files: map[string]string{}, inflight: map[string]bool{}}}
	if u, err := url.Parse(cfg.BaseURL); err == nil {
		a.origin = u.Scheme + "://" + u.Host
	}
	if cfg.BPGURL != "" {
		a.gwc = bpaygate.New(cfg.BPGURL, cfg.BPGKey)
	}
	if err := a.loadTemplates(); err != nil {
		st.Close()
		return nil, err
	}
	a.routes()
	return a, nil
}

func (a *App) loadTemplates() error {
	funcs := template.FuncMap{
		"fmtAmt":      fmtE8,
		"ago":         ago,
		"beggarLevel": beggarLevel,
		"donorTier":   donorTier,
		"rankBadge":   rankBadge,
		"initial":     initial,
		"hue":         hue,
		"level":       levelOf,
		"satiety":     satiety,
		"sectTitle":   sectTitle,
		"statusText":  statusText,
		"inc":         func(i int) int { return i + 1 },
		"div10":       func(v int64) string { return fmtE8(v * 10000000) },
		"xav":         a.xAvatar,
		"handleOf":    handleOf,
		"lastSeg":     xHandle,
		"dict": func(kv ...any) map[string]any {
			m := map[string]any{}
			for i := 0; i+1 < len(kv); i += 2 {
				m[kv[i].(string)] = kv[i+1]
			}
			return m
		},
	}
	a.tpl = map[string]*template.Template{}
	for _, p := range []string{"site", "pay", "status", "new", "login", "manage", "rank", "error"} {
		t, err := template.New(p).Funcs(funcs).ParseFS(tplFS, "templates/layout.html", "templates/sprite.html", "templates/paypanel.html", "templates/"+p+".html")
		if err != nil {
			return err
		}
		a.tpl[p] = t
	}
	return nil
}

func (a *App) routes() {
	m := http.NewServeMux()
	m.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"ok":true}`))
	})
	m.HandleFunc("GET /static/{file}", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		if strings.HasSuffix(r.PathValue("file"), ".m4a") {
			w.Header().Set("Content-Type", "audio/mp4") // Go 自带的 audio/mp4a-latm 部分浏览器不认
		}
		http.ServeFileFS(w, r, staticFS, "static/"+r.PathValue("file"))
	})
	m.HandleFunc("GET /a/{file}", a.serveAvatar)
	m.HandleFunc("POST /donate", a.handleDonate)
	m.HandleFunc("POST /coin", a.handleCoin)
	m.HandleFunc("GET /pay/{code}", a.handlePay)
	m.HandleFunc("POST /pay/{code}/claim", a.handleClaim)
	m.HandleFunc("GET /d/{code}", a.handleDonationPage)
	m.HandleFunc("GET /d/{code}/status", a.handleDonationStatus)
	m.HandleFunc("POST /d/{code}/claim", a.handleGatewayClaim)
	m.HandleFunc("POST /bpg/notify", a.handleNotify)
	m.HandleFunc("GET /rank", a.handleRank)
	m.HandleFunc("GET /new", a.handleNewGet)
	m.HandleFunc("POST /new/verify", a.handleNewVerify)
	m.HandleFunc("POST /new", a.handleNewPost)
	m.HandleFunc("GET /reset", a.handleResetGet)
	m.HandleFunc("POST /reset/verify", a.handleResetVerify)
	m.HandleFunc("POST /reset", a.handleResetPost)
	m.HandleFunc("GET /login", a.handleLoginGet)
	m.HandleFunc("POST /login", a.handleLoginPost)
	m.HandleFunc("POST /logout", a.handleLogout)
	m.HandleFunc("GET /manage", a.handleManage)
	m.HandleFunc("POST /manage/profile", a.handleManageProfile)
	m.HandleFunc("POST /manage/payment", a.handleManagePayment)
	m.HandleFunc("POST /manage/bind", a.handleManageBind)
	m.HandleFunc("POST /manage/unbind", a.handleManageUnbind)
	m.HandleFunc("POST /manage/verify", a.handleManageVerify)
	m.HandleFunc("POST /manage/password", a.handleManagePassword)
	m.HandleFunc("POST /manage/donation/{id}/{action}", a.handleManageDonation)
	m.HandleFunc("POST /manage/site/{id}/{action}", a.handleManageSite)
	m.HandleFunc("/", a.handleRoot) // 主站 / 与子站 /{slug}，以及 404
	a.mux = m
}

// ServeHTTP 统一加安全响应头、限制请求体、POST 同源校验（网关回调除外）。
func (a *App) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h := w.Header()
	h.Set("X-Content-Type-Options", "nosniff")
	h.Set("X-Frame-Options", "SAMEORIGIN")
	h.Set("Referrer-Policy", "strict-origin-when-cross-origin")
	if r.URL.Path != "/bpg/notify" {
		r.Body = http.MaxBytesReader(w, r.Body, 64<<10)
		if r.Method == http.MethodPost && !a.sameOrigin(r) {
			a.errorPage(w, r, http.StatusForbidden, "请求来源不对", "请从本站页面操作。")
			return
		}
	}
	a.mux.ServeHTTP(w, r)
}

// sameOrigin 浏览器发的跨站 POST 一律拒绝（Origin 或 Sec-Fetch-Site 判断）；没有这些头的（脚本/工具）放行。
func (a *App) sameOrigin(r *http.Request) bool {
	if o := r.Header.Get("Origin"); o != "" {
		if o == a.origin {
			return true
		}
		if u, err := url.Parse(o); err == nil && u.Host == r.Host {
			return true
		}
		return false
	}
	switch r.Header.Get("Sec-Fetch-Site") {
	case "", "same-origin", "none":
		return true
	}
	return false
}

func (a *App) base(r *http.Request) Base {
	b := Base{SiteTitle: a.cfg.SiteTitle, BaseURL: a.cfg.BaseURL, RepoURL: a.cfg.RepoURL, AuthorGitHub: a.cfg.AuthorGitHub, AuthorX: a.cfg.AuthorX, SubsitesEnabled: a.cfg.SubsitesEnabled,
		IsMobile: isMobile(r), InApp: inAppBrowser(r.UserAgent()), HasBGM: hasBGM, Me: a.currentSite(r)}
	if b.Me != nil {
		b.MeID = b.Me.ID
	}
	return b
}

// renderFragment 只渲染某个 define（弹窗用的 HTML 片段）。
func (a *App) renderFragment(w http.ResponseWriter, status int, page, name string, data any) {
	var buf bytes.Buffer
	if err := a.tpl[page].ExecuteTemplate(&buf, name, data); err != nil {
		log.Printf("[error] 渲染片段 %s: %v", name, err)
		http.Error(w, "页面渲染失败", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store")
	w.WriteHeader(status)
	w.Write(buf.Bytes())
}

func (a *App) render(w http.ResponseWriter, status int, name string, data any) {
	var buf bytes.Buffer
	if err := a.tpl[name].ExecuteTemplate(&buf, "layout", data); err != nil {
		log.Printf("[error] 渲染 %s: %v", name, err)
		http.Error(w, "页面渲染失败", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store")
	w.WriteHeader(status)
	w.Write(buf.Bytes())
}

type errorPageData struct {
	Base
	Title string
	Msg   string
}

func (a *App) errorPage(w http.ResponseWriter, r *http.Request, status int, title, msg string) {
	a.render(w, status, "error", errorPageData{Base: a.base(r), Title: title, Msg: msg})
}

func (a *App) fail(w http.ResponseWriter, r *http.Request, err error) {
	log.Printf("[error] %s %s: %v", r.Method, r.URL.Path, err)
	a.errorPage(w, r, http.StatusInternalServerError, "服务器开小差了", "稍后再试。")
}

func (a *App) logf(f string, args ...any) { log.Printf(f, args...) }

func (a *App) setCookie(w http.ResponseWriter, name, val string, maxAge int) {
	http.SetCookie(w, &http.Cookie{Name: name, Value: val, Path: "/", MaxAge: maxAge, HttpOnly: true, Secure: a.secure, SameSite: http.SameSiteLaxMode})
}

func cookieVal(r *http.Request, name string) string {
	c, err := r.Cookie(name)
	if err != nil {
		return ""
	}
	return c.Value
}

// ---- 站长会话 ----

func (a *App) currentSite(r *http.Request) *Site {
	id, tag := parseSession(a.session, cookieVal(r, "bs"))
	if id == 0 {
		return nil
	}
	s, err := a.st.GetSiteByID(id)
	if err != nil || s == nil || s.Status != "active" || tag != pwTag(s.PassHash) {
		return nil
	}
	return s
}

// login 发会话 cookie；会话绑定当前口令，改口令后其它设备自动掉线。
func (a *App) login(w http.ResponseWriter, s *Site) {
	exp := time.Now().Add(30 * 24 * time.Hour).Unix()
	a.setCookie(w, "bs", signSession(a.session, s.ID, exp, pwTag(s.PassHash)), 30*24*3600)
}

func (a *App) logout(w http.ResponseWriter) { a.setCookie(w, "bs", "", -1) }

// flash 一次性提示（下一次管理页展示后清除）。
func (a *App) flash(w http.ResponseWriter, msg string) {
	a.setCookie(w, "bflash", url.QueryEscape(msg), 120)
}

func (a *App) takeFlash(w http.ResponseWriter, r *http.Request) string {
	v := cookieVal(r, "bflash")
	if v == "" {
		return ""
	}
	a.setCookie(w, "bflash", "", -1)
	s, _ := url.QueryUnescape(v)
	return s
}

// ---- 施主 ----

func (a *App) rememberDonor(w http.ResponseWriter, d *Donation) {
	a.setCookie(w, "bd_"+d.Code, d.ClaimToken, 30*24*3600) // 标记「这笔是本浏览器发起的」
	a.setCookie(w, "bnick", url.QueryEscape(d.Nickname), 365*24*3600)
	if d.XHandle != "" {
		a.setCookie(w, "bx", d.XHandle, 365*24*3600)
	}
}

func savedNick(r *http.Request) string {
	v, _ := url.QueryUnescape(cookieVal(r, "bnick"))
	return cleanText(v, 20, false)
}

// visitor 访客标识（钢镚去重用），没有就发一个。
func (a *App) visitor(w http.ResponseWriter, r *http.Request) string {
	v := cookieVal(r, "bv")
	if len(v) != 24 {
		v = randHex(12)
		a.setCookie(w, "bv", v, 365*24*3600)
	}
	return v
}

var statusNames = map[string]string{"pending": "未付款", "claimed": "待确认", "paid": "已到账", "expired": "已过期", "closed": "已关闭", "failed": "下单失败", "rejected": "已拒绝"}

func statusText(s string) string {
	if v, ok := statusNames[s]; ok {
		return v
	}
	return s
}

// handleOf 从榜单分组键里取 X handle（"x:name" → name）。
func handleOf(nickKey string) string {
	if strings.HasPrefix(nickKey, "x:") {
		return nickKey[2:]
	}
	return ""
}

func (a *App) ip(r *http.Request) string { return clientIP(r, a.cfg.TrustProxy, a.cfg.TrustHeader) }

func (a *App) limited(w http.ResponseWriter, r *http.Request, key string, max int, window time.Duration) bool {
	if a.lim.allow(key+":"+a.ip(r), max, window) {
		return false
	}
	a.errorPage(w, r, http.StatusTooManyRequests, "手速太快了", "歇一会儿再来。")
	return true
}
