package main

import (
	"bytes"
	"crypto/hmac"
	"encoding/json"
	"fmt"
	"image"
	"image/color"
	"image/png"
	"io"
	"net"
	"net/http"
	"net/http/cookiejar"
	"net/http/httptest"
	"net/url"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"sync"
	"testing"
	"time"

	bpaygate "github.com/qianyubtc/BinancePayTool/sdk/go"
)

// ---------- mock 网关 ----------

type mockGW struct {
	t        *testing.T
	secret   string
	srv      *httptest.Server
	appBase  string
	mu       sync.Mutex
	n        int
	orders   map[string]*bpaygate.Order
	accounts map[string]*bpaygate.Account
	last     *bpaygate.Order
}

func newMockGW(t *testing.T, secret string) *mockGW {
	m := &mockGW{t: t, secret: secret, orders: map[string]*bpaygate.Order{}, accounts: map[string]*bpaygate.Account{}}
	mux := http.NewServeMux()
	mux.HandleFunc("POST /api/v1/orders", m.create)
	mux.HandleFunc("GET /api/v1/orders/{id}", m.get)
	mux.HandleFunc("POST /api/v1/accounts", m.createAccount)
	mux.HandleFunc("GET /api/v1/accounts/{id}", m.getAccount)
	mux.HandleFunc("POST /api/v1/accounts/{id}/verify", m.getAccount)
	mux.HandleFunc("POST /api/v1/accounts/{id}/disable", m.disableAccount)
	mux.HandleFunc("GET /pay/{tok}", func(w http.ResponseWriter, r *http.Request) { fmt.Fprint(w, "MOCK CASHIER") })
	mux.HandleFunc("POST /pay/{tok}/claim", m.claim)
	m.srv = httptest.NewServer(mux)
	t.Cleanup(m.srv.Close)
	return m
}

func (m *mockGW) verify(w http.ResponseWriter, r *http.Request, body []byte) bool {
	want := bpaygate.SignRequest(m.secret, r.Header.Get("X-BPG-Timestamp"), r.Header.Get("X-BPG-Nonce"), r.Method, r.URL.Path, body)
	if !hmac.Equal([]byte(want), []byte(r.Header.Get("X-BPG-Signature"))) {
		w.WriteHeader(401)
		fmt.Fprint(w, `{"code":"ERR_AUTH","message":"bad sig"}`)
		return false
	}
	return true
}

func (m *mockGW) create(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	if !m.verify(w, r, body) {
		return
	}
	var req bpaygate.CreateOrderReq
	json.Unmarshal(body, &req)
	accID := req.AccountID
	if accID == "" {
		accID = "default"
	}
	m.mu.Lock()
	defer m.mu.Unlock()
	if accID != "default" {
		if acc := m.accounts[accID]; acc == nil || acc.Status != "active" {
			w.WriteHeader(400)
			fmt.Fprint(w, `{"code":"ERR_PARAM","message":"account_id 不存在或已停用"}`)
			return
		}
	}
	e8, _ := parseAmountE8(req.Amount, 4)
	m.n++
	o := &bpaygate.Order{OrderID: fmt.Sprintf("gw-%d", m.n), AccountID: accID, MerchantOrderID: req.MerchantOrderID, Status: "pending", Currency: req.Currency,
		BaseAmount: req.Amount, PayAmount: fmtE8(e8 + 370000), NoteCode: "ABC123", PayURL: m.srv.URL + "/pay/tok" + strconv.Itoa(m.n), CreatedAt: ms(), ExpiresAt: ms() + req.Timeout*1000,
		ReceiveUID: "90000001", ReceiveLink: "https://app.binance.com/uni-qr/MOCK"}
	m.orders[o.OrderID] = o
	m.last = o
	json.NewEncoder(w).Encode(map[string]any{"code": "OK", "data": o})
}

func (m *mockGW) get(w http.ResponseWriter, r *http.Request) {
	if !m.verify(w, r, nil) {
		return
	}
	m.mu.Lock()
	o := m.orders[r.PathValue("id")]
	m.mu.Unlock()
	if o == nil {
		w.WriteHeader(404)
		fmt.Fprint(w, `{"code":"ERR_NOT_FOUND","message":"no"}`)
		return
	}
	json.NewEncoder(w).Encode(map[string]any{"code": "OK", "data": o})
}

// claim 收银页回填：订单编号 452100000000000123 视为真实到账。
func (m *mockGW) claim(w http.ResponseWriter, r *http.Request) {
	var req struct {
		BinanceOrderID string `json:"binance_order_id"`
	}
	json.NewDecoder(r.Body).Decode(&req)
	n := strings.TrimPrefix(r.PathValue("tok"), "tok")
	m.mu.Lock()
	defer m.mu.Unlock()
	o := m.orders["gw-"+n]
	if o == nil {
		w.WriteHeader(404)
		fmt.Fprint(w, `{"code":"ERR_NOT_FOUND","message":"no"}`)
		return
	}
	if req.BinanceOrderID != "452100000000000123" {
		json.NewEncoder(w).Encode(map[string]any{"code": "OK", "data": map[string]any{"code": "NOT_FOUND", "status": o.Status}})
		return
	}
	o.Status, o.ActualAmount, o.MatchedBy, o.BinanceOrderID, o.PaidAt = "paid", o.PayAmount, "claim", req.BinanceOrderID, ms()
	json.NewEncoder(w).Encode(map[string]any{"code": "OK", "data": map[string]any{"code": "OK", "status": "paid"}})
}

func (m *mockGW) createAccount(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	if !m.verify(w, r, body) {
		return
	}
	var req bpaygate.CreateAccountReq
	json.Unmarshal(body, &req)
	if req.APIKey == "bad" {
		w.WriteHeader(400)
		fmt.Fprint(w, `{"code":"ERR_BINANCE","message":"币安校验失败: Invalid API-key, IP, or permissions for action."}`)
		return
	}
	m.mu.Lock()
	defer m.mu.Unlock()
	acc := &bpaygate.Account{AccountID: "acc-" + req.APIKey, Label: req.Label, UID: req.UID, ReceiveLink: req.ReceiveLink, Status: "active", CreatedAt: ms()}
	m.accounts[acc.AccountID] = acc
	json.NewEncoder(w).Encode(map[string]any{"code": "OK", "data": acc})
}

func (m *mockGW) getAccount(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	if !m.verify(w, r, body) {
		return
	}
	m.mu.Lock()
	acc := m.accounts[r.PathValue("id")]
	m.mu.Unlock()
	if r.PathValue("id") == "default" {
		acc = &bpaygate.Account{AccountID: "default", UID: "90000001", Status: "active"}
	}
	if acc == nil {
		w.WriteHeader(404)
		fmt.Fprint(w, `{"code":"ERR_NOT_FOUND","message":"账号不存在"}`)
		return
	}
	json.NewEncoder(w).Encode(map[string]any{"code": "OK", "data": acc})
}

func (m *mockGW) disableAccount(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	if !m.verify(w, r, body) {
		return
	}
	m.mu.Lock()
	defer m.mu.Unlock()
	acc := m.accounts[r.PathValue("id")]
	if acc == nil {
		w.WriteHeader(404)
		fmt.Fprint(w, `{"code":"ERR_NOT_FOUND","message":"账号不存在"}`)
		return
	}
	acc.Status = "disabled"
	json.NewEncoder(w).Encode(map[string]any{"code": "OK", "data": acc})
}

func (m *mockGW) pay(orderID, actual, boid string, callback bool) int {
	m.mu.Lock()
	o := m.orders[orderID]
	o.Status, o.ActualAmount, o.MatchedBy, o.BinanceOrderID, o.PayerID, o.PaidAt = "paid", actual, "amount", boid, "1163000000", ms()
	cb := bpaygate.Callback{Event: "paid", OrderID: o.OrderID, AccountID: o.AccountID, MerchantOrderID: o.MerchantOrderID, Status: "paid", Currency: o.Currency,
		BaseAmount: o.BaseAmount, PayAmount: o.PayAmount, ActualAmount: actual, MatchedBy: "amount", BinanceOrderID: boid, PayerID: "1163000000", PaidAt: o.PaidAt, Timestamp: ms()}
	m.mu.Unlock()
	if !callback {
		return 0
	}
	return m.sendCallback(cb, m.secret)
}

func (m *mockGW) sendCallback(cb bpaygate.Callback, secret string) int {
	body, _ := json.Marshal(cb)
	ts := strconv.FormatInt(ms(), 10)
	nonce := randHex(8)
	req, _ := http.NewRequest("POST", m.appBase+"/bpg/notify", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-BPG-Timestamp", ts)
	req.Header.Set("X-BPG-Nonce", nonce)
	req.Header.Set("X-BPG-Signature", bpaygate.SignCallback(secret, ts, nonce, body))
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		m.t.Fatal(err)
	}
	resp.Body.Close()
	return resp.StatusCode
}

// ---------- mock X（推文接口 + 头像服务）----------

type mockTweet struct{ text, name, handle string }

type mockX struct {
	srv    *httptest.Server
	mu     sync.Mutex
	tweets map[string]mockTweet
	pngHit int
}

func testPNG() []byte {
	img := image.NewRGBA(image.Rect(0, 0, 16, 16))
	for i := 0; i < 16; i++ {
		for j := 0; j < 16; j++ {
			img.Set(i, j, color.RGBA{uint8(i * 16), uint8(j * 16), 100, 255})
		}
	}
	var buf bytes.Buffer
	png.Encode(&buf, img)
	return buf.Bytes()
}

func newMockX(t *testing.T) *mockX {
	m := &mockX{tweets: map[string]mockTweet{}}
	pngData := testPNG()
	mux := http.NewServeMux()
	mux.HandleFunc("GET /tweet-result", func(w http.ResponseWriter, r *http.Request) {
		m.mu.Lock()
		tw, ok := m.tweets[r.URL.Query().Get("id")]
		m.mu.Unlock()
		if !ok {
			w.WriteHeader(404)
			return
		}
		json.NewEncoder(w).Encode(map[string]any{"__typename": "Tweet", "text": tw.text,
			"user": map[string]any{"id_str": "9" + tw.handle, "name": tw.name, "screen_name": tw.handle, "profile_image_url_https": m.srv.URL + "/pic/" + tw.handle + "_normal.jpg"}})
	})
	serve := func(w http.ResponseWriter, r *http.Request) {
		m.mu.Lock()
		m.pngHit++
		m.mu.Unlock()
		w.Header().Set("Content-Type", "image/png")
		w.Write(pngData)
	}
	mux.HandleFunc("GET /pic/{f}", serve)
	mux.HandleFunc("GET /x/{handle}", serve)
	m.srv = httptest.NewServer(mux)
	t.Cleanup(m.srv.Close)
	return m
}

func (m *mockX) set(id, text, name, handle string) {
	m.mu.Lock()
	m.tweets[id] = mockTweet{text, name, handle}
	m.mu.Unlock()
}

// ---------- 测试环境 ----------

type env struct {
	t    *testing.T
	app  *App
	base string
	gw   *mockGW
	x    *mockX
	cfg  *Config
}

func newEnvWith(t *testing.T, mod func(*Config)) *env {
	l, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	base := "http://" + l.Addr().String()
	gw := newMockGW(t, "test-secret-0123456789abcdef")
	gw.appBase = base
	x := newMockX(t)
	cfg := &Config{Listen: l.Addr().String(), BaseURL: base, DBPath: filepath.Join(t.TempDir(), "t.db"), AdminPassword: "admin-pass-123456",
		SiteTitle: "赛博要饭", RepoURL: "https://example.com/repo", MainName: "芊羽Wing", MainSlogan: "行行好", MainAvatar: "🥣",
		BPGURL: gw.srv.URL, BPGKey: gw.secret, Currency: "USDT", PresetAmounts: []string{"0.1", "1"},
		MinAmountE8: 10000000, MaxAmountE8: 1000000000000, OrderTTL: 900, SubsitesEnabled: true,
		XTweetAPI: x.srv.URL, XAvatarAPI: x.srv.URL, AvatarDir: filepath.Join(t.TempDir(), "avatars"), CoinsPerDay: 1, CoinsIPCap: 20, CoinExp: 1, MoneyExp: 10}
	if mod != nil {
		mod(cfg)
	}
	app, err := newApp(cfg)
	if err != nil {
		t.Fatal(err)
	}
	srv := &http.Server{Handler: app}
	go srv.Serve(l)
	t.Cleanup(func() { srv.Close(); app.st.Close() })
	return &env{t: t, app: app, base: base, gw: gw, x: x, cfg: cfg}
}

func newEnv(t *testing.T) *env { return newEnvWith(t, nil) }

type client struct {
	t  *testing.T
	hc *http.Client
	e  *env
}

func (e *env) client() *client {
	jar, _ := cookiejar.New(nil)
	return &client{t: e.t, e: e, hc: &http.Client{Jar: jar, CheckRedirect: func(*http.Request, []*http.Request) error { return http.ErrUseLastResponse }}}
}

func (c *client) get(path string) (int, string, http.Header) {
	resp, err := c.hc.Get(c.e.base + path)
	if err != nil {
		c.t.Fatal(err)
	}
	defer resp.Body.Close()
	b, _ := io.ReadAll(resp.Body)
	return resp.StatusCode, string(b), resp.Header
}

func (c *client) post(path string, form url.Values) (int, string, http.Header) {
	resp, err := c.hc.PostForm(c.e.base+path, form)
	if err != nil {
		c.t.Fatal(err)
	}
	defer resp.Body.Close()
	b, _ := io.ReadAll(resp.Body)
	return resp.StatusCode, string(b), resp.Header
}

var reCode = regexp.MustCompile(`BEG-[A-Z0-9]{5}`)

// openSite 走完整的 X 发推验证开站流程，返回 slug。
func (c *client) openSite(handle, name, slug, pw string) (int, string, http.Header) {
	st, body, _ := c.get("/new")
	must(c.t, st == 200 && strings.Contains(body, "一键去 X 发推"), "开站第一步: %d", st)
	code := reCode.FindString(body)
	must(c.t, code != "", "应有验证码")
	id := strconv.Itoa(int(ms() % 1000000000))
	c.e.x.set(id, "我在赛博要饭摆了个碗 "+code+" #赛博要饭", name, handle)
	st, body, _ = c.post("/new/verify", url.Values{"code": {code}, "tweet_url": {"https://x.com/" + handle + "/status/" + id + "?s=20"}})
	must(c.t, st == 200 && strings.Contains(body, "X 验证通过"), "验证: %d %s", st, body[:0])
	return c.post("/new", url.Values{"code": {code}, "slug": {slug}, "slogan": {"给点"}, "password": {pw}, "password2": {pw}})
}

func must(t *testing.T, cond bool, msg string, args ...any) {
	t.Helper()
	if !cond {
		t.Fatalf(msg, args...)
	}
}

func TestFullFlow(t *testing.T) {
	e := newEnv(t)
	c := e.client()

	st, body, _ := c.get("/")
	must(t, st == 200 && strings.Contains(body, "芊羽Wing") && strings.Contains(body, "榜上无人") && strings.Contains(body, `href="/login"`) && strings.Contains(body, "人气榜"), "主页: %d", st)

	// 金额 / 垃圾过滤
	st, body, _ = c.post("/donate", url.Values{"site": {""}, "amount": {"0.001"}})
	must(t, st == 400 && strings.Contains(body, "最多 2 位小数"), "小数校验: %d", st)
	st, body, _ = c.post("/donate", url.Values{"site": {""}, "amount": {"0.05"}})
	must(t, st == 400 && strings.Contains(body, "最少施舍 0.1"), "下限校验: %d", st)
	st, body, _ = c.post("/donate", url.Values{"site": {""}, "amount": {"1"}, "message": {"加微信 abc123 领福利"}})
	must(t, st == 400 && strings.Contains(body, "不接广告"), "留言广告过滤: %d", st)
	st, body, _ = c.post("/donate", url.Values{"site": {""}, "amount": {"1"}, "nickname": {"看 www.evil.com"}})
	must(t, st == 400 && strings.Contains(body, "不接广告"), "名号广告过滤: %d", st)
	st, body, _ = c.post("/donate", url.Values{"site": {""}, "amount": {"1"}, "x_handle": {"bad name"}})
	must(t, st == 400 && strings.Contains(body, "X 用户名"), "X 用户名校验: %d", st)

	// ① 主站施舍（带 X）→ 跳网关收银页
	st, _, h := c.post("/donate", url.Values{"site": {""}, "nickname": {"  路人 "}, "x_handle": {"@qianyu_fan"}, "amount": {"5"}, "message": {"加油要饭 <b>x</b>"}})
	code := e.gw.last.MerchantOrderID
	must(t, st == 302 && h.Get("Location") == "/d/"+code, "下单应留在本站: %d %s", st, h.Get("Location"))
	d1, _ := e.app.st.GetDonationByCode(code)
	must(t, d1 != nil && d1.XHandle == "qianyu_fan" && d1.NickKey == "x:qianyu_fan", "施主 X 落库: %+v", d1)
	st, body, _ = c.get("/d/" + code)
	must(t, st == 200 && strings.Contains(body, "等待到账") && strings.Contains(body, `class="paypanel"`) && strings.Contains(body, e.gw.last.PayAmount) && strings.Contains(body, "data:image/png;base64,") && strings.Contains(body, "帮我核对"), "等待页应内嵌付款面板: %d", st)

	bad := bpaygate.Callback{Event: "paid", OrderID: e.gw.last.OrderID, MerchantOrderID: code, Status: "paid", ActualAmount: "999"}
	must(t, e.gw.sendCallback(bad, "wrong-secret") == 401, "错签名应 401")
	must(t, e.gw.sendCallback(bpaygate.Callback{Event: "paid", MerchantOrderID: "BEGNOPE", Status: "paid"}, e.gw.secret) == 404, "未知订单应 404")

	// ② 回调到账 → 上榜（含 X 头像）
	must(t, e.gw.pay(e.gw.last.OrderID, "5.0037", "452100000000000001", true) == 200, "回调应 200")
	deadline := time.Now().Add(5 * time.Second)
	for time.Now().Before(deadline) {
		if p, _ := e.app.st.GetXProfile("qianyu_fan"); p != nil && p.Avatar != "" {
			break
		}
		time.Sleep(50 * time.Millisecond)
	}
	p1, _ := e.app.st.GetXProfile("qianyu_fan")
	must(t, p1 != nil && p1.Avatar != "", "施主头像应异步抓取: %+v", p1)
	st, body, _ = c.get("/d/" + code)
	must(t, st == 200 && strings.Contains(body, "谢谢施主 路人") && strings.Contains(body, "+5.0037") && strings.Contains(body, "生成分享卡"), "到账页: %d", st)
	must(t, strings.Contains(body, "排第 <b>1</b> 位"), "名次")
	st, body, _ = c.get("/")
	must(t, strings.Contains(body, "加油要饭 &lt;b&gt;x&lt;/b&gt;") && strings.Contains(body, "🥇") && strings.Contains(body, "5.0037"), "主页功德簿/榜")
	must(t, strings.Contains(body, "/a/"+p1.Avatar) && strings.Contains(body, "@qianyu_fan") && strings.Contains(body, "🏁"), "主页应显示 X 头像与徽章")
	must(t, strings.Contains(body, "三袋弟子") && strings.Contains(body, "总舵"), "主站袋位/总舵")
	st, _, h = c.get("/a/" + p1.Avatar)
	must(t, st == 200 && strings.HasPrefix(h.Get("Content-Type"), "image/"), "头像文件可访问: %d", st)
	must(t, e.gw.pay(e.gw.last.OrderID, "5.0037", "452100000000000001", true) == 200, "重复回调")
	stats, _ := e.app.st.SiteStats(1)
	must(t, stats.Count == 1 && stats.TotalE8 == 500370000, "幂等: %+v", stats)

	// ③ 回调丢失 → 轮询兜底查单
	c2 := e.client()
	st, _, _ = c2.post("/donate", url.Values{"site": {""}, "nickname": {"路人甲"}, "amount": {"1.25"}})
	must(t, st == 302, "第二笔下单")
	code2 := e.gw.last.MerchantOrderID
	e.gw.pay(e.gw.last.OrderID, "1.2537", "452100000000000002", false)
	st, body, _ = c2.get("/d/" + code2 + "/status")
	must(t, st == 200 && strings.Contains(body, `"status":"paid"`), "兜底查单: %s", body)

	// ④ X 发推验证开站（不需要先施舍）
	st, body, _ = c.get("/new")
	vcode := reCode.FindString(body)
	st, body, _ = c.get("/new")
	must(t, st == 200 && reCode.FindString(body) == vcode, "同一浏览器再进 /new 复用验证码: %s vs %s", reCode.FindString(body), vcode)
	must(t, st == 200 && vcode != "", "开站第一步")
	e.x.set("1001", "随便发点什么", "芊羽分舵🐸", "qianyuwing")
	st, body, _ = c.post("/new/verify", url.Values{"code": {vcode}, "tweet_url": {"https://x.com/qianyuwing/status/1001"}})
	must(t, st == 400 && strings.Contains(body, "没有验证码"), "推文无验证码应拒绝: %d", st)
	st, body, _ = c.post("/new/verify", url.Values{"code": {vcode}, "tweet_url": {"not a url"}})
	must(t, st == 400 && strings.Contains(body, "推文链接不对"), "链接格式: %d", st)
	e.x.set("1002", "我在赛博要饭 "+strings.ToLower(vcode)+" #赛博要饭", "芊羽分舵🐸", "qianyuwing")
	st, body, _ = c.post("/new/verify", url.Values{"code": {vcode}, "tweet_url": {"https://twitter.com/qianyuwing/status/1002?s=20"}})
	must(t, st == 200 && strings.Contains(body, "X 验证通过") && strings.Contains(body, "@qianyuwing") && strings.Contains(body, "/qianyuwing</div>") && strings.Contains(body, `src="/a/`), "验证通过页: %d", st)
	st, body, _ = c.post("/new", url.Values{"code": {vcode}, "slug": {"qianyuwing"}, "slogan": {"加 vx 12345"}, "password": {"pass-qianyu"}, "password2": {"pass-qianyu"}})
	must(t, st == 400 && strings.Contains(body, "别放链接"), "口号广告过滤")
	st, body, _ = c.post("/new", url.Values{"code": {vcode}, "slug": {"qianyuwing"}, "password": {"pass-qianyu"}, "password2": {"nope"}})
	must(t, st == 400 && strings.Contains(body, "两次口令不一致"), "口令确认")
	st, _, h = c.post("/new", url.Values{"code": {vcode}, "slug": {"QianyuWing"}, "slogan": {"给点"}, "password": {"pass-qianyu"}, "password2": {"pass-qianyu"}})
	must(t, st == 302 && h.Get("Location") == "/manage?welcome=1", "建站跳转: %d %s", st, h.Get("Location"))
	site, _ := e.app.st.GetSiteBySlug("qianyuwing")
	must(t, site != nil && site.XHandle == "qianyuwing" && site.Name == "芊羽分舵🐸" && site.XAvatar != "" && site.Listed, "建站落库: %+v", site)
	must(t, inAppBrowser("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Twitter for iPhone") && inAppBrowser("Mozilla/5.0 (Linux; Android 14; wv) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36") && !inAppBrowser("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1") && !inAppBrowser("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120 Mobile/15E148 Safari/604.1"), "内置浏览器识别")
	must(t, slugForHandle("Admin") == "x_admin" && slugForHandle("_a") == "x__a" && slugForHandle("DemoX") == "demox", "路径 = X 用户名，保留字加前缀")
	st, body, _ = c.get("/manage?welcome=1")
	must(t, st == 200 && strings.Contains(body, "开张大吉") && strings.Contains(body, "方式一：填币安 UID") && strings.Contains(body, "方式二：绑定币安只读 API Key") && strings.Contains(body, "readonly"), "管理页: %d", st)
	// 验证码不能复用；同一 X 不能开第二个
	st, _, h = c.get("/new")
	must(t, st == 302 && h.Get("Location") == "/manage", "已登录再开站应跳后台: %d", st)
	c.post("/logout", nil)
	st, body, _ = c.post("/new", url.Values{"code": {vcode}, "slug": {"qianyuwing2"}, "password": {"pass-qianyu"}, "password2": {"pass-qianyu"}})
	must(t, st == 200 && strings.Contains(body, "验证已失效"), "验证码复用应失效: %d", st)
	st, body, _ = c.get("/new")
	vcode2 := reCode.FindString(body)
	e.x.set("1003", "again "+vcode2, "芊羽分舵🐸", "qianyuwing")
	st, body, _ = c.post("/new/verify", url.Values{"code": {vcode2}, "tweet_url": {"https://x.com/qianyuwing/status/1003"}})
	must(t, st == 400 && strings.Contains(body, "已经开过站了"), "同一 X 不能开第二个: %d", st)

	// ⑤ 未配置收款的子站
	st, body, _ = c2.get("/qianyuwing")
	must(t, st == 200 && strings.Contains(body, "芊羽分舵🐸") && strings.Contains(body, "给点") && strings.Contains(body, "还没摆碗") && strings.Contains(body, `src="/a/`+site.XAvatar), "子站页: %d", st)
	must(t, strings.Contains(body, `href="https://x.com/qianyuwing"`) && strings.Contains(body, "@qianyuwing"), "X 展示")
	st, body, _ = c2.post("/donate", url.Values{"site": {"qianyuwing"}, "nickname": {"路人甲"}, "amount": {"2"}})
	must(t, st == 400 && strings.Contains(body, "还没摆碗"), "未配置收款应拒绝: %d", st)

	// ⑥ 钢镚：免费、每人每天 1 个、不能留言
	st, body, _ = c2.post("/coin", url.Values{"site": {"qianyuwing"}})
	must(t, st == 200 && strings.Contains(body, `"added":true`) && strings.Contains(body, `"total":1`), "丢钢镚: %s", body)
	st, body, _ = c2.post("/coin", url.Values{"site": {"qianyuwing"}})
	must(t, st == 200 && strings.Contains(body, `"added":false`) && strings.Contains(body, "明天再来"), "同一人再丢: %s", body)
	c3 := e.client()
	st, body, _ = c3.post("/coin", url.Values{"site": {"qianyuwing"}})
	must(t, st == 403, "没打开过页面（无访客 cookie）不能丢: %d", st)
	c3.get("/qianyuwing")
	st, body, _ = c3.post("/coin", url.Values{"site": {"qianyuwing"}})
	must(t, st == 200 && strings.Contains(body, `"total":2`), "另一人丢: %s", body)
	st, body, _ = c2.get("/qianyuwing")
	must(t, strings.Contains(body, `class="pf coinN">2<`) && strings.Contains(body, `class="coinN">2</b><small>钢镚<`) && strings.Contains(body, "今天丢过了"), "钢镚计数展示")
	st, body, _ = c.get("/rank")
	must(t, st == 200 && strings.Contains(body, "人气榜") && strings.Contains(body, "🪙 2"), "人气榜")

	// ⑦ 登录制 + 直接转账 → 自报 → 站长确认 → 屏蔽留言 / 屏蔽此人 / 回复
	st, body, _ = c.post("/login", url.Values{"slug": {"qianyuwing"}, "password": {"wrong"}})
	must(t, st == 401 && strings.Contains(body, "X 用户名或口令不对"), "错口令: %d", st)
	st, _, h = c.post("/login", url.Values{"slug": {"/QianyuWing/"}, "password": {"pass-qianyu"}})
	must(t, st == 302 && h.Get("Location") == "/manage", "登录: %d", st)
	st, _, _ = c.post("/manage/payment", url.Values{"pay_id": {"123456"}})
	must(t, st == 302, "保存直接转账")
	st, _, h = c2.post("/donate", url.Values{"site": {"qianyuwing"}, "nickname": {"路人甲"}, "amount": {"2"}, "message": {"广告：加我微信 xxx"}})
	must(t, st == 400, "广告留言应拒绝")
	st, _, h = c2.post("/donate", url.Values{"site": {"qianyuwing"}, "nickname": {"路人甲"}, "amount": {"2"}, "message": {"这是一条正常留言"}})
	must(t, st == 302 && strings.HasPrefix(h.Get("Location"), "/pay/BEG"), "子站下单: %d %s", st, h.Get("Location"))
	code3 := strings.TrimPrefix(h.Get("Location"), "/pay/")
	st, body, _ = c2.get("/pay/" + code3)
	must(t, st == 200 && strings.Contains(body, "123456") && strings.Contains(body, "支付</b>」→「<b>转账") && strings.Contains(body, "我已施舍"), "手动付款页: %d", st)
	st, _, h = c2.post("/pay/"+code3+"/claim", url.Values{"binance_order_id": {"452100000000000077"}})
	must(t, st == 302 && h.Get("Location") == "/d/"+code3, "自报: %d", st)
	st, body, _ = c.get("/manage")
	must(t, strings.Contains(body, "待确认的施舍") && strings.Contains(body, "452100000000000077"), "站长看到待确认")
	d3, _ := e.app.st.GetDonationByCode(code3)
	st, _, _ = c.post(fmt.Sprintf("/manage/donation/%d/confirm", d3.ID), nil)
	must(t, st == 302, "确认")
	st, body, _ = c2.get("/qianyuwing")
	must(t, strings.Contains(body, "路人甲") && strings.Contains(body, "这是一条正常留言") && strings.Contains(body, "本站"), "确认后上榜")
	must(t, strings.Contains(body, "帮主") && strings.Contains(body, "榜 #1") && strings.Contains(body, "二袋弟子") && strings.Contains(body, "EXP <b>22</b>"), "子站职位与袋位（2U=20 + 2 钢镚=2）")
	st, _, _ = c.post(fmt.Sprintf("/manage/donation/%d/reply", d3.ID), url.Values{"reply": {"谢谢老铁"}})
	must(t, st == 302, "回复")
	st, body, _ = c2.get("/qianyuwing")
	must(t, strings.Contains(body, "站长：谢谢老铁"), "回复展示")
	st, _, _ = c.post(fmt.Sprintf("/manage/donation/%d/block", d3.ID), nil)
	st, body, _ = c2.get("/qianyuwing")
	must(t, strings.Contains(body, "***") && !strings.Contains(body, "这是一条正常留言"), "屏蔽留言后")
	st, _, _ = c.post(fmt.Sprintf("/manage/donation/%d/blockuser", d3.ID), nil)
	must(t, st == 302, "屏蔽此人")
	st, body, _ = c2.get("/qianyuwing")
	must(t, strings.Contains(body, "已屏蔽的施主") && !strings.Contains(body, "路人甲</span>"), "屏蔽此人后名号隐藏")
	e.app.lim = newLimiter() // 测试里所有客户端同一 IP，重置限流
	st, _, h = c2.post("/donate", url.Values{"site": {"qianyuwing"}, "nickname": {"路人甲"}, "amount": {"2"}, "message": {"我又来了"}})
	must(t, st == 302, "被屏蔽的人再投: %d", st)
	d4, _ := e.app.st.GetDonationByCode(strings.TrimPrefix(h.Get("Location"), "/pay/"))
	must(t, d4 != nil && d4.Blocked, "同名再投自动屏蔽: %+v", d4)
	st, _, _ = c.post(fmt.Sprintf("/manage/donation/%d/unblockuser", d3.ID), nil)
	st, body, _ = c2.get("/qianyuwing")
	must(t, strings.Contains(body, "路人甲"), "恢复此人")
	stats, _ = e.app.st.SiteStats(d3.SiteID)
	must(t, stats.Count == 1 && stats.TotalE8 == 200000000, "屏蔽不影响记录: %+v", stats)
	d1, _ = e.app.st.GetDonationByCode(code)
	st, _, _ = c.post(fmt.Sprintf("/manage/donation/%d/block", d1.ID), nil)
	must(t, st == 404, "越权屏蔽应 404: %d", st)

	// ⑨ 绑定币安 Key → 网关多账号 → 自动确认
	e.app.lim = newLimiter()
	st, body, _ = c.post("/manage/bind", url.Values{"api_key": {"bad"}, "api_secret": {"s"}, "uid": {"90000002"}})
	must(t, st == 400 && strings.Contains(body, "Invalid API-key"), "坏 Key 应显示币安原因: %d", st)
	st, _, _ = c.post("/manage/bind", url.Values{"api_key": {"k2"}, "api_secret": {"s2"}, "uid": {"90000002"}})
	must(t, st == 302, "绑定: %d", st)
	site, _ = e.app.st.GetSiteBySlug("qianyuwing")
	must(t, site.PayMode == "gateway" && site.BPGAccountID == "acc-k2", "绑定落库: %+v", site)
	st, _, h = c2.post("/donate", url.Values{"site": {"qianyuwing"}, "nickname": {"路人乙"}, "amount": {"3"}})
	must(t, st == 302 && e.gw.last.AccountID == "acc-k2" && strings.HasPrefix(h.Get("Location"), "/d/"), "子站网关下单: %+v %s", e.gw.last, h.Get("Location"))
	code4 := e.gw.last.MerchantOrderID
	must(t, e.gw.pay(e.gw.last.OrderID, "3.0037", "452100000000000004", true) == 200, "子站回调")
	st, body, _ = c2.get("/d/" + code4)
	must(t, strings.Contains(body, "谢谢施主 路人乙"), "子站网关到账")
	st, _, _ = c.post("/manage/unbind", nil)
	must(t, st == 302 && e.gw.accounts["acc-k2"].Status == "disabled", "解绑")

	// 改口令后旧会话失效
	stale := e.client()
	stale.post("/login", url.Values{"slug": {"qianyuwing"}, "password": {"pass-qianyu"}})
	st, _, _ = stale.get("/manage")
	must(t, st == 200, "旧设备登录: %d", st)
	st, _, _ = c.post("/manage/password", url.Values{"password": {"pass-qianyu2"}, "password2": {"pass-qianyu2"}})
	must(t, st == 302, "改口令")
	st, _, h = stale.get("/manage")
	must(t, st == 302 && h.Get("Location") == "/login", "改口令后旧会话应失效: %d", st)
	st, _, _ = c.get("/manage")
	must(t, st == 200, "改口令的设备仍在线: %d", st)
	// 跨站 POST 一律拒绝
	req, _ := http.NewRequest("POST", e.base+"/coin", strings.NewReader("site=qianyuwing"))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Origin", "https://evil.example")
	resp, err := http.DefaultClient.Do(req)
	must(t, err == nil && resp.StatusCode == 403, "跨站 POST 应 403")
	resp.Body.Close()

	// ⑩ 忘记口令：X 重新验证
	c.post("/logout", nil)
	st, body, _ = c.get("/reset")
	rcode := reCode.FindString(body)
	must(t, st == 200 && rcode != "", "找回第一步")
	e.x.set("1004", "找回口令 "+rcode, "芊羽分舵🐸", "stranger")
	st, body, _ = c.post("/reset/verify", url.Values{"code": {rcode}, "tweet_url": {"https://x.com/stranger/status/1004"}})
	must(t, st == 400 && strings.Contains(body, "还没开过要饭站"), "陌生 X 不能重置: %d", st)
	e.x.set("1005", "找回口令 "+rcode, "芊羽分舵🐸", "qianyuwing")
	st, body, _ = c.post("/reset/verify", url.Values{"code": {rcode}, "tweet_url": {"https://x.com/qianyuwing/status/1005"}})
	must(t, st == 200 && strings.Contains(body, "设置新口令"), "重置第二步: %d", st)
	st, _, h = c.post("/reset", url.Values{"code": {rcode}, "password": {"newpass2"}, "password2": {"newpass2"}})
	must(t, st == 302 && h.Get("Location") == "/manage", "重置口令: %d", st)
	c.post("/logout", nil)
	st, _, _ = c.post("/login", url.Values{"slug": {"qianyuwing"}, "password": {"pass-qianyu2"}})
	must(t, st == 401, "旧口令失效")
	st, _, _ = c.post("/login", url.Values{"slug": {"qianyuwing"}, "password": {"newpass2"}})
	must(t, st == 302, "新口令可登录")

	// ⑪ 管理员：巡查 / 除名 / 收录 / 重置口令
	admin := e.client()
	st, _, h = admin.post("/login", url.Values{"slug": {""}, "password": {e.cfg.AdminPassword}})
	must(t, st == 302 && h.Get("Location") == "/manage", "管理员登录: %d", st)
	st, body, _ = admin.get("/manage")
	must(t, st == 200 && strings.Contains(body, "全站最新留言") && strings.Contains(body, "/qianyuwing") && strings.Contains(body, "取消收录"), "管理员页: %d", st)
	st, _, _ = admin.post(fmt.Sprintf("/manage/site/%d/unlist", site.ID), nil)
	must(t, st == 302, "取消收录")
	st, body, _ = admin.get("/")
	must(t, !strings.Contains(body, "芊羽分舵🐸"), "未收录不进榜")
	st, body, _ = admin.get("/qianyuwing")
	must(t, st == 200 && strings.Contains(body, `name="robots" content="noindex"`) && strings.Contains(body, "还没被丐帮收录"), "未收录页 noindex")
	st, _, _ = admin.post(fmt.Sprintf("/manage/site/%d/list", site.ID), nil)
	st, body, _ = admin.get("/")
	must(t, strings.Contains(body, "芊羽分舵🐸"), "收录后进榜")
	st, _, _ = admin.post(fmt.Sprintf("/manage/site/%d/disable", site.ID), nil)
	st, _, _ = admin.get("/qianyuwing")
	must(t, st == 404, "除名后 404: %d", st)
	st, _, _ = admin.post(fmt.Sprintf("/manage/site/%d/enable", site.ID), nil)
	st, body, _ = admin.post(fmt.Sprintf("/manage/site/%d/resetpw", site.ID), nil)
	must(t, st == 200, "重置口令直接渲染: %d", st)
	i := strings.Index(body, "的口令为 ")
	must(t, i > 0, "应显示新口令")
	newpw := strings.TrimSpace(strings.SplitN(body[i+len("的口令为 "):], " ", 2)[0])
	st, _, _ = c.get("/manage")
	must(t, st == 302, "管理员重置口令后站长旧会话应失效: %d", st)
	st, _, _ = c.post("/login", url.Values{"slug": {"qianyuwing"}, "password": {newpw}})
	must(t, st == 302, "重置后的口令可登录: %q", newpw)
	st, _, _ = c.post(fmt.Sprintf("/manage/site/%d/disable", site.ID), nil)
	must(t, st == 403, "子站无权除名: %d", st)

	// ⑫ 网关状态机：order_id 不符 → 404；underpaid 按实付记账；expired 后补付复活
	c6 := e.client()
	c6.post("/donate", url.Values{"site": {""}, "nickname": {"少付的"}, "amount": {"9"}})
	code6 := e.gw.last.MerchantOrderID
	mis := bpaygate.Callback{Event: "paid", OrderID: "gw-nope", MerchantOrderID: code6, Status: "paid", ActualAmount: "9"}
	must(t, e.gw.sendCallback(mis, e.gw.secret) == 404, "order_id 不符应 404")
	under := bpaygate.Callback{Event: "underpaid", OrderID: e.gw.last.OrderID, MerchantOrderID: code6, Status: "underpaid", ActualAmount: "8.5", MatchedBy: "note", PaidAt: ms(), Timestamp: ms()}
	must(t, e.gw.sendCallback(under, e.gw.secret) == 200, "underpaid 回调")
	d6, _ := e.app.st.GetDonationByCode(code6)
	must(t, d6.Status == "paid" && d6.ActualE8 == 850000000, "少付按实付记账: %+v", d6)
	c7 := e.client()
	c7.post("/donate", url.Values{"site": {""}, "nickname": {"迟到的"}, "amount": {"4"}})
	code7 := e.gw.last.MerchantOrderID
	e.gw.sendCallback(bpaygate.Callback{Event: "expired", OrderID: e.gw.last.OrderID, MerchantOrderID: code7, Status: "expired", Timestamp: ms()}, e.gw.secret)
	must(t, e.gw.pay(e.gw.last.OrderID, "4.0037", "452100000000000099", true) == 200, "过期后补付")
	d7, _ := e.app.st.GetDonationByCode(code7)
	must(t, d7.Status == "paid", "过期后补付应复活: %s", d7.Status)
	// 验证码 purpose 串用：/new 的码不能拿去 /reset
	cx := e.client()
	st, body, _ = cx.get("/new")
	xcode := reCode.FindString(body)
	e.x.set("2001", "串用 "+xcode, "芊羽分舵🐸", "qianyuwing")
	st, body, _ = cx.post("/reset/verify", url.Values{"code": {xcode}, "tweet_url": {"https://x.com/qianyuwing/status/2001"}})
	must(t, st == 200 && strings.Contains(body, "验证码已失效"), "purpose 串用应拒绝: %d", st)

	// ⑬ 弹窗：异步下单返回付款面板；回填订单编号由本站代转网关核对
	c8 := e.client()
	st, body, h = c8.post("/donate", url.Values{"site": {""}, "amount": {"0.001"}, "ajax": {"1"}})
	must(t, st == 400 && strings.Contains(body, "最多 2 位小数") && !strings.Contains(body, "<html"), "异步下单错误应为纯文本: %d", st)
	st, body, h = c8.post("/donate", url.Values{"site": {""}, "nickname": {"弹窗党"}, "amount": {"2"}, "ajax": {"1"}})
	code8 := h.Get("X-Donation")
	must(t, st == 200 && strings.HasPrefix(code8, "BEG") && strings.Contains(body, `class="paypanel"`) && strings.Contains(body, "帮我核对") && !strings.Contains(body, "<html"), "异步下单应返回面板片段: %d", st)
	st, body, _ = c8.post("/d/"+code8+"/claim", url.Values{"binance_order_id": {"452100000000000999"}, "ajax": {"1"}})
	must(t, st == 200 && strings.Contains(body, `"ok":false`) && strings.Contains(body, "没查到"), "回填未命中: %s", body)
	st, body, _ = c8.post("/d/"+code8+"/claim", url.Values{"binance_order_id": {"452100000000000123"}, "ajax": {"1"}})
	must(t, st == 200 && strings.Contains(body, `"status":"paid"`), "回填命中应到账: %s", body)
	st, body, _ = c8.get("/d/" + code8)
	must(t, strings.Contains(body, "谢谢施主 弹窗党"), "回填后感谢页")
	st, body, _ = e.client().post("/d/"+code8+"/claim", url.Values{"binance_order_id": {"452100000000000123"}, "ajax": {"1"}})
	must(t, st == 403, "别的浏览器不能替人回填: %d", st)

	// ⑭ 过期回调
	c5 := e.client()
	c5.post("/donate", url.Values{"site": {""}, "amount": {"7"}})
	code5 := e.gw.last.MerchantOrderID
	exp := bpaygate.Callback{Event: "expired", OrderID: e.gw.last.OrderID, MerchantOrderID: code5, Status: "expired", Timestamp: ms()}
	must(t, e.gw.sendCallback(exp, e.gw.secret) == 200, "过期回调")
	st, body, _ = c5.get("/d/" + code5)
	must(t, strings.Contains(body, "已过期"), "过期页")
}

func TestReviewGate(t *testing.T) {
	e := newEnvWith(t, func(c *Config) { c.SubsiteReview = true })
	c := e.client()
	st, _, h := c.openSite("newbie", "新丐", "newbie", "pass-newbie")
	must(t, st == 302 && h.Get("Location") == "/manage?welcome=1", "开站: %d", st)
	site, _ := e.app.st.GetSiteBySlug("newbie")
	must(t, site != nil && !site.Listed, "审核模式下新站未收录")
	st, body, _ := c.get("/manage?welcome=1")
	must(t, st == 200 && strings.Contains(body, "待主站站长收录"), "欢迎语提示待收录")
	st, body, _ = e.client().get("/")
	must(t, !strings.Contains(body, "新丐"), "未收录不进榜")
	admin := e.client()
	admin.post("/login", url.Values{"slug": {""}, "password": {e.cfg.AdminPassword}})
	st, _, _ = admin.post(fmt.Sprintf("/manage/site/%d/list", site.ID), nil)
	must(t, st == 302, "收录")
	st, body, _ = e.client().get("/")
	must(t, strings.Contains(body, "新丐"), "收录后进榜")
}

func TestPassword(t *testing.T) {
	h := hashPassword("secret-1")
	must(t, checkPassword(h, "secret-1") && !checkPassword(h, "secret-2") && !checkPassword("garbage", "x"), "口令哈希")
	sec := []byte("k")
	v := signSession(sec, 7, ms()/1000+60, "abcd1234")
	id, tag := parseSession(sec, v)
	must(t, id == 7 && tag == "abcd1234", "会话签名")
	id, _ = parseSession([]byte("other"), v)
	must(t, id == 0, "错密钥")
	id, _ = parseSession(sec, v+"x")
	must(t, id == 0, "篡改")
	id, _ = parseSession(sec, signSession(sec, 7, ms()/1000-1, "abcd1234"))
	must(t, id == 0, "过期会话")
}

// TestAdminPasswordSticky 主站在后台改的口令重启不被 ADMIN_PASSWORD 冲掉；config 值变了才覆盖。
func TestAdminPasswordSticky(t *testing.T) {
	st, err := openStore(filepath.Join(t.TempDir(), "s.db"))
	if err != nil {
		t.Fatal(err)
	}
	defer st.Close()
	ensure := func(pw string) {
		cfg := &Config{AdminPassword: pw, MainName: "主站", MainAvatar: "🥣", Currency: "USDT"}
		if err := st.EnsureMainSite(cfg, func(h string) bool { return checkPassword(h, pw) }, func() string { return hashPassword(pw) }); err != nil {
			t.Fatal(err)
		}
	}
	ensure("config-pw-1")
	main, _ := st.GetSiteBySlug("")
	must(t, checkPassword(main.PassHash, "config-pw-1"), "首次按 config 设口令")
	st.SetSitePassword(main.ID, hashPassword("ui-pw-2"))
	ensure("config-pw-1")
	main, _ = st.GetSiteBySlug("")
	must(t, checkPassword(main.PassHash, "ui-pw-2"), "config 没变，后台改的口令要保留")
	ensure("config-pw-3")
	main, _ = st.GetSiteBySlug("")
	must(t, checkPassword(main.PassHash, "config-pw-3"), "config 变了才覆盖")
}

// TestResetIdentity 找回口令只认同一个 X 数字 ID；旧用户名被别人注册不能接管；主站不走 X 找回。
func TestResetIdentity(t *testing.T) {
	st, err := openStore(filepath.Join(t.TempDir(), "s.db"))
	if err != nil {
		t.Fatal(err)
	}
	defer st.Close()
	if _, err := st.CreateSite(&Site{Slug: "alice", Name: "Alice", XURL: "https://x.com/alice", XHandle: "alice", XName: "Alice", XID: "9alice", PassHash: hashPassword("alice-pass-1"), Currency: "USDT"}); err != nil {
		t.Fatal(err)
	}
	a := &App{st: st}
	must(t, a.siteOfX(&xUser{ID: "9alice", Handle: "alice_new"}) != nil, "改了用户名，按数字 ID 仍能认出")
	must(t, a.siteOfX(&xUser{ID: "777", Handle: "alice"}) == nil, "同名但不是同一个 X 账号，不能认")
	must(t, a.siteOfX(&xUser{ID: "", Handle: "alice"}) != nil, "接口没给 id_str 时退回按用户名")
	must(t, st.SyncSiteX(1, "999", "alice2", "Alice2", "") == nil, "sync")
	s, _ := st.GetSiteByID(1)
	must(t, s.XID == "9alice" && s.XHandle == "alice2" && s.Name == "Alice2", "sync 不覆盖已有 x_id，只更新用户名/站名: %+v", s)
}
