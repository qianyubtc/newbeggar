package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestAmount(t *testing.T) {
	cases := map[string]string{"5": "5", "5.5": "5.5", "05.50": "5.5", ".5": "0.5", "10.0037": "10.0037", "1.00000001": "1.00000001", "0.10": "0.1"}
	for in, want := range cases {
		e8, err := parseAmountE8(in, 8)
		if err != nil {
			t.Fatalf("%s: %v", in, err)
		}
		if got := fmtE8(e8); got != want {
			t.Errorf("%s: got %s want %s", in, got, want)
		}
	}
	for _, bad := range []string{"", "abc", "-1", "1.", "1,5", "1e3", "12345678901"} {
		if _, err := parseAmountE8(bad, 8); err == nil {
			t.Errorf("%q should fail", bad)
		}
	}
	if _, err := parseAmountE8("1.001", 2); err == nil {
		t.Error("1.001 with 2 decimals should fail")
	}
	if fmtE8(0) != "0" {
		t.Error("zero")
	}
}

func TestSlug(t *testing.T) {
	for _, ok := range []string{"qianyuwing", "a1", "my-site_2", "abcdefghijklmnopqrstuvwx"} {
		if !validSlug(ok) {
			t.Errorf("%s should be valid", ok)
		}
	}
	for _, bad := range []string{"a", "-ab", "Admin", "admin", "new", "login", "有中文", "abcdefghijklmnopqrstuvwxy", "a b"} {
		if validSlug(bad) {
			t.Errorf("%s should be invalid", bad)
		}
	}
}

func TestCleanText(t *testing.T) {
	if got := cleanText("  hello \t\x00world​  ", 20, false); got != "hello world​" {
		t.Errorf("got %q", got)
	}
	if got := cleanText("一二三四五六", 3, false); got != "一二三" {
		t.Errorf("got %q", got)
	}
	if got := cleanText("a\n\n\n\nb\n", 20, true); got != "a\n\nb" {
		t.Errorf("got %q", got)
	}
	if nickKey("  QianyuWing  X ") != "qianyuwing x" {
		t.Error("nickKey")
	}
}

func TestValidateURLs(t *testing.T) {
	if _, err := validateBinanceLink("https://app.binance.com/uni-qr/abc"); err != nil {
		t.Error(err)
	}
	for _, bad := range []string{"http://app.binance.com/x", "https://binance.com.evil.io/x", "https://evil.io/binance.com", "javascript:alert(1)"} {
		if _, err := validateBinanceLink(bad); err == nil {
			t.Errorf("%s should fail", bad)
		}
	}
}

func TestXLink(t *testing.T) {
	for in, want := range map[string]string{"@qianyuwing": "https://x.com/qianyuwing", "qianyuwing_1": "https://x.com/qianyuwing_1", "https://x.com/QianyuWing/status/1": "https://x.com/QianyuWing",
		"twitter.com/abc?s=1": "https://x.com/abc", "https://www.x.com/abc/": "https://x.com/abc", "": ""} {
		if got, err := validateXLink(in); err != nil || got != want {
			t.Errorf("%q: got %q %v want %q", in, got, err, want)
		}
	}
	for _, bad := range []string{"https://evil.io/x", "https://x.com/", "https://x.com/this-is-not-valid", "@toolongtoolongtoolong"} {
		if _, err := validateXLink(bad); err == nil {
			t.Errorf("%q should fail", bad)
		}
	}
	if xHandle("https://x.com/abc") != "abc" {
		t.Error("xHandle")
	}
}

func TestSpamAndTweet(t *testing.T) {
	for _, bad := range []string{"加微信 abc", "vx: 123", "看 www.evil.com", "https://x.y", "shop.xyz 好物", "QQ 12345678", "电报找我", "打 13812345678", "wechat me"} {
		if !hasContact(bad) {
			t.Errorf("%q 应判为广告", bad)
		}
	}
	for _, ok := range []string{"别买烟了，去吃饭", "加油要饭", "我的名字 qianyuwing", "5 块钱拿去", "v神牛逼", "devx 团队加油", "avx512"} {
		if hasContact(ok) {
			t.Errorf("%q 不应判为广告", ok)
		}
	}
	for in, want := range map[string]string{"https://x.com/i/web/status/1234567890": "1234567890", "https://x.com/jack/status/20": "20", "https://twitter.com/a_b/statuses/1234567890123?s=20": "1234567890123", "x.com/jack/status/20": "20", "https://x.com/jack": "", "junk": ""} {
		if got := tweetIDFrom(in); got != want {
			t.Errorf("tweetIDFrom(%q)=%q want %q", in, got, want)
		}
	}
	if tok := tweetToken("20"); tok == "" || strings.ContainsAny(tok, "0.") {
		t.Errorf("token 不应含 0 或小数点: %q", tok)
	}
	for in, want := range map[string]string{"@qianyuwing": "qianyuwing", "qianyuwing_1": "qianyuwing_1", "https://x.com/QianyuWing/status/1": "QianyuWing", "bad name": "", "": ""} {
		if got := normHandle(in); got != want {
			t.Errorf("normHandle(%q)=%q want %q", in, got, want)
		}
	}
	if ws := weekStart(); ws <= 0 || ms()-ws > 7*24*3600*1000 || ms() < ws {
		t.Errorf("weekStart 不合理: %d", ws)
	}
}

func TestClientIP(t *testing.T) {
	mk := func(remote string, hdr map[string]string) *http.Request {
		r := httptest.NewRequest("GET", "/", nil)
		r.RemoteAddr = remote
		for k, v := range hdr {
			r.Header.Set(k, v)
		}
		return r
	}
	// 不信代理：忽略所有头
	if ip := clientIP(mk("1.2.3.4:5", map[string]string{"X-Forwarded-For": "9.9.9.9"}), false, "X-Forwarded-For"); ip != "1.2.3.4" {
		t.Errorf("got %s", ip)
	}
	// 信代理但请求不是从内网来的：头无效
	if ip := clientIP(mk("1.2.3.4:5", map[string]string{"X-Forwarded-For": "9.9.9.9"}), true, "X-Forwarded-For"); ip != "1.2.3.4" {
		t.Errorf("got %s", ip)
	}
	// 反代来的：取最后一跳
	if ip := clientIP(mk("127.0.0.1:5", map[string]string{"X-Forwarded-For": "6.6.6.6, 9.9.9.9"}), true, "X-Forwarded-For"); ip != "9.9.9.9" {
		t.Errorf("got %s", ip)
	}
	// 配置的其它头才生效；伪造的 X-Real-IP 不看
	if ip := clientIP(mk("127.0.0.1:5", map[string]string{"X-Real-IP": "6.6.6.6", "CF-Connecting-IP": "7.7.7.7"}), true, "CF-Connecting-IP"); ip != "7.7.7.7" {
		t.Errorf("got %s", ip)
	}
	if ip := clientIP(mk("127.0.0.1:5", map[string]string{"X-Real-IP": "6.6.6.6"}), true, "X-Forwarded-For"); ip != "127.0.0.1" {
		t.Errorf("got %s", ip)
	}
	// 非法值回退
	if ip := clientIP(mk("127.0.0.1:5", map[string]string{"X-Forwarded-For": "evil"}), true, "X-Forwarded-For"); ip != "127.0.0.1" {
		t.Errorf("got %s", ip)
	}
}

func TestCoinCaps(t *testing.T) {
	st, err := openStore(t.TempDir() + "/c.db")
	if err != nil {
		t.Fatal(err)
	}
	defer st.Close()
	if _, err := st.db.Exec(`INSERT INTO sites(slug,name,pass_hash,created_at,updated_at) VALUES('s','s','',0,0)`); err != nil {
		t.Fatal(err)
	}
	add := func(v, ip string) (bool, string) {
		ok, msg, err := st.AddCoin(1, v, ip, "2000-01-01", 2, 3)
		if err != nil {
			t.Fatal(err)
		}
		return ok, msg
	}
	if ok, _ := add("v1", "ip1"); !ok {
		t.Error("第一次应成功")
	}
	if ok, _ := add("v1", "ip1"); !ok {
		t.Error("perDay=2 第二次应成功")
	}
	if ok, msg := add("v1", "ip1"); ok || !strings.Contains(msg, "明天") {
		t.Errorf("第三次应被拦: %v %s", ok, msg)
	}
	if ok, _ := add("v2", "ip1"); !ok {
		t.Error("同 IP 第三个应成功（ipCap=3）")
	}
	if ok, msg := add("v3", "ip1"); ok || !strings.Contains(msg, "网络") {
		t.Errorf("ipCap 应拦: %v %s", ok, msg)
	}
	if ok, _ := add("v3", "ip2"); !ok {
		t.Error("换 IP 应成功")
	}
	total, today, _ := st.CoinStats(1)
	if total != 4 || today != 0 {
		t.Errorf("计数: total=%d today=%d（today 按当前日期查，测试用固定日期）", total, today)
	}
}
