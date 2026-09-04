package main

import (
	"crypto/hmac"
	"crypto/pbkdf2"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"hash/fnv"
	"math"
	"net"
	"net/http"
	"net/url"
	"regexp"
	"strconv"
	"strings"
	"time"
	"unicode"
)

func ms() int64 { return time.Now().UnixMilli() }

func today() string { return time.Now().Format("2006-01-02") }

// weekStart 本周一 0 点（本地时区）。
func weekStart() int64 {
	t := time.Now()
	wd := int(t.Weekday())
	if wd == 0 {
		wd = 7
	}
	d := time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location()).AddDate(0, 0, -(wd - 1))
	return d.UnixMilli()
}

func dayStart() int64 {
	t := time.Now()
	return time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location()).UnixMilli()
}

// 去掉 0/O/1/I 的 32 字符表；256 % 32 == 0，取模无偏。
const codeAlphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"

func randBytes(n int) []byte {
	b := make([]byte, n)
	if _, err := rand.Read(b); err != nil {
		panic(err)
	}
	return b
}

func randHex(n int) string { return hex.EncodeToString(randBytes(n)) }

func randCode(n int) string {
	b := randBytes(n)
	for i := range b {
		b[i] = codeAlphabet[int(b[i])%len(codeAlphabet)]
	}
	return string(b)
}

func randToken() string { return base64.RawURLEncoding.EncodeToString(randBytes(24)) }

// ---- 口令：PBKDF2-SHA256 ----

const pbkdfIters = 120000

func hashPassword(pw string) string {
	salt := randBytes(16)
	key, err := pbkdf2.Key(sha256.New, pw, salt, pbkdfIters, 32)
	if err != nil {
		panic(err)
	}
	return fmt.Sprintf("pbkdf2$%d$%s$%s", pbkdfIters, base64.RawStdEncoding.EncodeToString(salt), base64.RawStdEncoding.EncodeToString(key))
}

func checkPassword(hash, pw string) bool {
	parts := strings.Split(hash, "$")
	if len(parts) != 4 || parts[0] != "pbkdf2" {
		return false
	}
	iters, err := strconv.Atoi(parts[1])
	if err != nil || iters < 1000 || iters > 10000000 {
		return false
	}
	salt, err1 := base64.RawStdEncoding.DecodeString(parts[2])
	want, err2 := base64.RawStdEncoding.DecodeString(parts[3])
	if err1 != nil || err2 != nil || len(want) == 0 {
		return false
	}
	got, err := pbkdf2.Key(sha256.New, pw, salt, iters, len(want))
	if err != nil {
		return false
	}
	return hmac.Equal(got, want)
}

// ---- 会话：siteID.exp.pwtag.hmac（pwtag 随口令变化，改口令后旧会话作废）----

func pwTag(passHash string) string { return hashToken(passHash)[:8] }

func signSession(secret []byte, siteID, exp int64, tag string) string {
	payload := strconv.FormatInt(siteID, 10) + "." + strconv.FormatInt(exp, 10) + "." + tag
	m := hmac.New(sha256.New, secret)
	m.Write([]byte(payload))
	return payload + "." + hex.EncodeToString(m.Sum(nil))[:40]
}

// parseSession 返回 siteID 与口令标签；无效返回 0。
func parseSession(secret []byte, v string) (int64, string) {
	parts := strings.Split(v, ".")
	if len(parts) != 4 {
		return 0, ""
	}
	siteID, err1 := strconv.ParseInt(parts[0], 10, 64)
	exp, err2 := strconv.ParseInt(parts[1], 10, 64)
	if err1 != nil || err2 != nil || exp < time.Now().Unix() {
		return 0, ""
	}
	if !hmac.Equal([]byte(signSession(secret, siteID, exp, parts[2])), []byte(v)) {
		return 0, ""
	}
	return siteID, parts[2]
}

// ---- 金额：内部一律用 1e-8 整数（e8），字符串进出 ----

var reAmount = regexp.MustCompile(`^(\d{1,10})(?:\.(\d{1,8}))?$`)

func parseAmountE8(s string, maxDecimals int) (int64, error) {
	s = strings.TrimSpace(s)
	s = strings.TrimPrefix(s, "+")
	if strings.HasPrefix(s, ".") {
		s = "0" + s
	}
	m := reAmount.FindStringSubmatch(s)
	if m == nil {
		return 0, errors.New("金额格式不对")
	}
	if len(m[2]) > maxDecimals {
		return 0, fmt.Errorf("最多 %d 位小数", maxDecimals)
	}
	ip, _ := strconv.ParseInt(m[1], 10, 64)
	frac := m[2] + strings.Repeat("0", 8-len(m[2]))
	fp, _ := strconv.ParseInt(frac, 10, 64)
	return ip*100000000 + fp, nil
}

func fmtE8(v int64) string {
	neg := v < 0
	if neg {
		v = -v
	}
	s := strconv.FormatInt(v/100000000, 10)
	if fp := v % 100000000; fp > 0 {
		s += "." + strings.TrimRight(fmt.Sprintf("%08d", fp), "0")
	}
	if neg {
		s = "-" + s
	}
	return s
}

// ---- 文本清洗 ----

func cleanText(s string, max int, multiline bool) string {
	var b strings.Builder
	for _, r := range s {
		if r == '\n' && multiline {
			b.WriteRune(r)
			continue
		}
		if unicode.IsControl(r) || r == '\uFEFF' {
			continue
		}
		b.WriteRune(r)
	}
	s = b.String()
	if multiline {
		lines := strings.Split(s, "\n")
		for i := range lines {
			lines[i] = strings.Join(strings.Fields(lines[i]), " ")
		}
		s = strings.Join(lines, "\n")
		for strings.Contains(s, "\n\n\n") {
			s = strings.ReplaceAll(s, "\n\n\n", "\n\n")
		}
	} else {
		s = strings.Join(strings.Fields(s), " ")
	}
	if r := []rune(s); len(r) > max {
		s = string(r[:max])
	}
	return strings.TrimSpace(s)
}

func nickKey(n string) string { return strings.ToLower(strings.Join(strings.Fields(n), " ")) }

var reSlug = regexp.MustCompile(`^[a-z0-9][a-z0-9_-]{1,23}$`)

var reservedSlugs = map[string]bool{
	"admin": true, "manage": true, "api": true, "pay": true, "d": true, "new": true, "rank": true, "login": true, "logout": true,
	"static": true, "bpg": true, "healthz": true, "u": true, "main": true, "www": true, "root": true, "assets": true,
	"about": true, "help": true, "me": true, "site": true, "sites": true, "donate": true, "beggar": true, "binance": true,
	"official": true, "qianyu": true, "x": true, "twitter": true, "robots.txt": true,
}

func validSlug(s string) bool { return reSlug.MatchString(s) && !reservedSlugs[s] }

// slugForHandle 站长路径 = X 用户名（小写）；撞上保留字或不合规（单字符/下划线开头）就加前缀 x_。
func slugForHandle(handle string) string {
	s := strings.ToLower(strings.TrimSpace(handle))
	if validSlug(s) {
		return s
	}
	return "x_" + s
}

var reBinanceOrder = regexp.MustCompile(`^\d{18}$`)

// reContact 广告/联系方式特征：网址、域名、微信/QQ/TG/WhatsApp、大陆手机号。
var reContact = regexp.MustCompile(`(?i)(https?://|www\.|[a-z0-9-]+\.(com|cn|net|org|io|xyz|top|vip|me|tv|cc|app|link|shop|site|club|pro|live|fun|icu)\b|微信|weixin|wechat|\bwx\b|(?:^|[^a-z])vx(?:[^a-z]|$)|v信|加v|威信|薇信|q{1,2}\s*[:：]?\s*\d{5,}|qq群|telegram|\bt\.me\b|电报|\btg\s*[:：]|whatsapp|\bwa\.me\b|line\s*id|1[3-9]\d{9})`)

// hasContact 判断文本里是否带链接或联系方式（拒绝，防广告）。
func hasContact(s string) bool { return reContact.MatchString(s) }

var reTweetID = regexp.MustCompile(`(?i)(?:x\.com|twitter\.com)/(?:[A-Za-z0-9_]{1,15}|i/web)/status(?:es)?/(\d{1,25})`)

// tweetIDFrom 从推文链接里取出 ID。
func tweetIDFrom(s string) string {
	m := reTweetID.FindStringSubmatch(strings.TrimSpace(s))
	if m == nil {
		return ""
	}
	return m[1]
}

// tweetToken 模拟 X 嵌入组件的 token 算法：(id/1e15*π) 的 36 进制去掉 0 和小数点。
func tweetToken(id string) string {
	n, err := strconv.ParseFloat(id, 64)
	if err != nil {
		return "x"
	}
	v := n / 1e15 * math.Pi
	ip := math.Floor(v)
	frac := v - ip
	out := strconv.FormatInt(int64(ip), 36)
	for i := 0; i < 12 && frac > 0; i++ {
		frac *= 36
		d := int(frac)
		out += strconv.FormatInt(int64(d), 36)
		frac -= float64(d)
	}
	return strings.NewReplacer("0", "", ".", "").Replace(out)
}

func normHandle(s string) string {
	s = strings.TrimSpace(s)
	s = strings.TrimPrefix(s, "@")
	if u, err := url.Parse(s); err == nil && u.Host != "" && xHosts[strings.ToLower(u.Hostname())] {
		s = strings.Trim(u.Path, "/")
		if i := strings.Index(s, "/"); i >= 0 {
			s = s[:i]
		}
	}
	if !reXHandle.MatchString(s) {
		return ""
	}
	return s
}

var reUID = regexp.MustCompile(`^\d{1,20}$`)

// ---- 展示 ----

func ago(t int64) string {
	if t <= 0 {
		return ""
	}
	d := time.Since(time.UnixMilli(t))
	switch {
	case d < time.Minute:
		return "刚刚"
	case d < time.Hour:
		return fmt.Sprintf("%d 分钟前", int(d.Minutes()))
	case d < 24*time.Hour:
		return fmt.Sprintf("%d 小时前", int(d.Hours()))
	case d < 30*24*time.Hour:
		return fmt.Sprintf("%d 天前", int(d.Hours()/24))
	}
	return time.UnixMilli(t).Format("2006-01-02")
}

// LevelInfo 丐帮袋位：按 EXP 分档（一袋弟子 … 九袋长老），Pct 为当前袋位内的进度。
// EXP = 钱(U) × MONEY_EXP + 钢镚 × COIN_EXP，默认 0.1 U = 1 EXP、1 钢镚 = 1 EXP。
type LevelInfo struct {
	Lv    int
	Title string
	Pct   int
	Next  string // 升到下一袋需要的 EXP，空表示满级
	NextT string // 下一袋名称
}

var levelSteps = []struct {
	Min   int64
	Title string
}{{0, "空碗未入帮"}, {1, "一袋弟子"}, {10, "二袋弟子"}, {50, "三袋弟子"}, {200, "四袋弟子"}, {500, "五袋弟子"},
	{1000, "六袋弟子"}, {3000, "七袋弟子"}, {10000, "八袋弟子"}, {50000, "九袋长老"}}

func levelOf(exp int64) LevelInfo {
	lv := 0
	for i, st := range levelSteps {
		if exp >= st.Min {
			lv = i
		}
	}
	info := LevelInfo{Lv: lv, Title: levelSteps[lv].Title, Pct: 100}
	if lv+1 < len(levelSteps) {
		lo, hi := levelSteps[lv].Min, levelSteps[lv+1].Min
		info.Pct = int((exp - lo) * 100 / (hi - lo))
		info.Next = strconv.FormatInt(hi, 10)
		info.NextT = levelSteps[lv+1].Title
	}
	if exp <= 0 {
		info.Pct = 0
	}
	return info
}

// sectTitle 丐帮职位：按乞丐榜名次授予，掉出名次自动易主。pos 从 1 起，0 = 未上榜。
func sectTitle(pos int) string {
	switch {
	case pos <= 0:
		return ""
	case pos == 1:
		return "帮主"
	case pos == 2:
		return "副帮主"
	case pos == 3:
		return "传功长老"
	case pos == 4:
		return "执法长老"
	case pos == 5:
		return "掌棒龙头"
	case pos == 6:
		return "掌钵龙头"
	case pos <= 10:
		return "长老"
	case pos <= 30:
		return "舵主"
	}
	return "弟子"
}

// satiety 饱食度：今天每收到 1 个币 +20%，封顶 100（每天清零，所以「他今天还没吃饭」）。
func satiety(todayE8 int64) int {
	v := todayE8 * 20 / 1e8
	if v > 100 {
		return 100
	}
	return int(v)
}

// expOf 钱 + 钢镚折算成 EXP。
func expOf(totalE8, coins, moneyExp, coinExp int64) int64 {
	return totalE8*moneyExp/100000000 + coins*coinExp
}

func beggarLevel(exp int64) string { return levelOf(exp).Title }

func donorTier(e8 int64) string {
	switch {
	case e8 < 1e8:
		return "投了个硬币"
	case e8 < 10*1e8:
		return "善心人"
	case e8 < 100*1e8:
		return "大善人"
	case e8 < 1000*1e8:
		return "活菩萨"
	}
	return "财神爷"
}

func rankBadge(i int) string {
	switch i {
	case 0:
		return "🥇"
	case 1:
		return "🥈"
	case 2:
		return "🥉"
	}
	return strconv.Itoa(i + 1)
}

// initial 取名号首字用作头像。
func initial(s string) string {
	for _, r := range s {
		return string(unicode.ToUpper(r))
	}
	return "?"
}

// hue 名号 → 稳定色相，头像配色用。
func hue(key string) int {
	h := fnv.New32a()
	h.Write([]byte(key))
	return int(h.Sum32() % 360)
}

// ---- HTTP 辅助 ----

var reMobileUA = regexp.MustCompile(`(?i)android|iphone|ipad|ipod|mobile|harmonyos`)

func isMobile(r *http.Request) bool { return reMobileUA.MatchString(r.UserAgent()) }

// clientIP 访客 IP。开启 TRUST_PROXY 时，只有请求来自回环/内网（即反代）才信 header；
// X-Forwarded-For 取最后一跳（反代自己追加的那个，客户端伪造不了），其它头取整值。
func clientIP(r *http.Request, trustProxy bool, header string) string {
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		host = r.RemoteAddr
	}
	if !trustProxy {
		return host
	}
	if ip := net.ParseIP(host); ip == nil || !(ip.IsLoopback() || ip.IsPrivate() || ip.IsUnspecified()) {
		return host
	}
	v := strings.TrimSpace(r.Header.Get(header))
	if v == "" {
		return host
	}
	if strings.EqualFold(header, "X-Forwarded-For") {
		parts := strings.Split(v, ",")
		v = strings.TrimSpace(parts[len(parts)-1])
	}
	if net.ParseIP(v) == nil {
		return host
	}
	return v
}

// validateBinanceLink 只接受币安域名的 https 链接，防止有人借本站挂钓鱼链接。
var reHTTPS = regexp.MustCompile(`https://[^\s<>"'）)]+`)

func validateBinanceLink(s string) (string, error) {
	s = strings.TrimSpace(s)
	if s == "" {
		return "", nil
	}
	// 用户常把币安 App「分享」出来的整段文字一起贴进来：从里面挑出链接
	if !strings.HasPrefix(strings.ToLower(s), "https://") {
		if m := reHTTPS.FindString(s); m != "" {
			s = m
		}
	}
	if len(s) > 300 {
		return "", errors.New("收款链接过长")
	}
	u, err := url.Parse(s)
	if err != nil || u.Scheme != "https" || u.User != nil || u.Host == "" {
		return "", errors.New("收款链接须为 https 链接")
	}
	h := strings.ToLower(u.Hostname())
	if h != "binance.com" && !strings.HasSuffix(h, ".binance.com") {
		return "", errors.New("收款链接必须是币安域名（app.binance.com/… 之类）")
	}
	return s, nil
}

var reXHandle = regexp.MustCompile(`^[A-Za-z0-9_]{1,15}$`)
var reAvatarFile = regexp.MustCompile(`^[a-f0-9]{40}\.(jpg|png|webp|gif)$`)

var xHosts = map[string]bool{"x.com": true, "www.x.com": true, "twitter.com": true, "www.twitter.com": true, "mobile.twitter.com": true}

// validateXLink 接受 @名字 / 名字 / X 或 Twitter 主页链接，统一成 https://x.com/名字。
func validateXLink(s string) (string, error) {
	s = strings.TrimSpace(s)
	if s == "" {
		return "", nil
	}
	if h := strings.TrimPrefix(s, "@"); reXHandle.MatchString(h) {
		return "https://x.com/" + h, nil
	}
	if !strings.Contains(s, "://") {
		s = "https://" + s
	}
	u, err := url.Parse(s)
	if err != nil || !xHosts[strings.ToLower(u.Hostname())] {
		return "", errors.New("X 主页链接应形如 https://x.com/你的名字")
	}
	h := strings.Trim(u.Path, "/")
	if i := strings.Index(h, "/"); i >= 0 {
		h = h[:i]
	}
	if !reXHandle.MatchString(h) {
		return "", errors.New("X 主页链接应形如 https://x.com/你的名字")
	}
	return "https://x.com/" + h, nil
}

// shortURL 去掉 scheme 和末尾斜杠，给推文用：https://newbeggar.com/ → newbeggar.com（X 会自动识别成链接）。
func shortURL(u string) string {
	u = strings.TrimSuffix(u, "/")
	u = strings.TrimPrefix(strings.TrimPrefix(u, "https://"), "http://")
	return strings.TrimPrefix(u, "www.")
}

// reInApp 各家 App 的内置浏览器：X（Twitter for iPhone / TwitterAndroid）、Android WebView（; wv)）、微信、FB、Line、IG、微博。
var reInApp = regexp.MustCompile(`(?i)Twitter|; wv\)|FBAN|FBAV|MicroMessenger|Line/|Instagram|Weibo`)

// inAppBrowser 是否在 App 内置浏览器里（深链拉不起、cookie 不稳，要提示用系统浏览器打开）。
// iOS WKWebView 的 UA 有 Mobile/ 却没有 Safari/（Safari、Chrome、Firefox 都带 Safari/）。
func inAppBrowser(ua string) bool {
	if reInApp.MatchString(ua) {
		return true
	}
	return strings.Contains(ua, "Mobile/") && strings.Contains(ua, "AppleWebKit") && !strings.Contains(ua, "Safari/")
}

var reAnyCode = regexp.MustCompile(`BEG-[A-Z0-9]{5}`)

func xHandle(link string) string {
	if i := strings.LastIndex(link, "/"); i >= 0 {
		return link[i+1:]
	}
	return link
}

func hashToken(t string) string {
	h := sha256.Sum256([]byte(t))
	return hex.EncodeToString(h[:])
}
