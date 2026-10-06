package main

import (
	"encoding/json"
	"net"
	"net/http"
	"time"
)

// 按 X 账号互通（2026-10-07）：芊羽的其他产品（蓝不住）按 X 用户名找这个人的要饭站。
//   GET /x/{handle}      有站跳到站，没有跳到开站页
//   GET /api/x/{handle}  {"handle","url","name","xid"}；没有站 url 为 null（只给已收录的站：没收录的站不进榜，也不往外推）
// 回 X 数字 ID：对方拿去和自己记的比，账号改过名、旧名被别人注册了就对不上，不会把两个人挂到一起。

// siteForX 按 X 用户名找还在营业的站（主站也算：站长本人的碗就是总舵）。
func (a *App) siteForX(raw string) (*Site, error) {
	h := normHandle(raw)
	if h == "" {
		return nil, nil
	}
	s, err := a.st.GetSiteByXHandle(h)
	if err != nil || s == nil || s.Status != "active" {
		return nil, err
	}
	return s, nil
}

func (a *App) handleXGo(w http.ResponseWriter, r *http.Request) {
	s, err := a.siteForX(r.PathValue("handle"))
	if err != nil {
		a.fail(w, r, err)
		return
	}
	if s != nil {
		http.Redirect(w, r, s.Path(), http.StatusFound)
		return
	}
	http.Redirect(w, r, "/new", http.StatusFound)
}

func (a *App) handleXAPI(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	if !directLocal(r, a.cfg.TrustHeader) && !a.lim.allow("xapi:"+a.ip(r), 120, time.Minute) {
		w.WriteHeader(http.StatusTooManyRequests)
		json.NewEncoder(w).Encode(map[string]any{"error": "too many requests"})
		return
	}
	s, err := a.siteForX(r.PathValue("handle"))
	if err != nil { // 查库出错别说成「没有这个人」：对方会把「没有」缓存很久
		w.WriteHeader(http.StatusServiceUnavailable)
		json.NewEncoder(w).Encode(map[string]any{"error": "unavailable"})
		return
	}
	out := map[string]any{"handle": normHandle(r.PathValue("handle")), "url": nil}
	if s != nil && (s.Listed || s.IsMain()) {
		out["handle"], out["url"], out["name"], out["xid"] = s.XLabel(), a.cfg.BaseURL+s.Path(), s.Name, s.XID
	}
	w.Header().Set("Cache-Control", "public, max-age=300")
	json.NewEncoder(w).Encode(out)
}

// directLocal 同一台机器上的程序直接来问（蓝不住走 127.0.0.1，没经过 Caddy，不带转发头）：不限流，
// 免得和绕过 Cloudflare 直连源站的请求挤在同一个 127.0.0.1 的桶里被挤爆。经 Caddy 进来的请求一定带 X-Forwarded-For。
func directLocal(r *http.Request, trustHeader string) bool {
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return false
	}
	ip := net.ParseIP(host)
	if ip == nil || !ip.IsLoopback() {
		return false
	}
	for _, h := range []string{"X-Forwarded-For", "X-Real-IP", "CF-Connecting-IP", trustHeader} {
		if h != "" && r.Header.Get(h) != "" {
			return false
		}
	}
	return true
}
