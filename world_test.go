package main

import (
	"context"
	"encoding/json"
	"fmt"
	"math"
	"net/http"
	"net/url"
	"strings"
	"testing"
	"time"

	"github.com/coder/websocket"
	"github.com/coder/websocket/wsjson"
)

type worldTestFrame struct {
	Type    string        `json:"type"`
	ID      string        `json:"id"`
	Players []worldPlayer `json:"players"`
	SiteID  int64         `json:"siteId"`
	Coins   int64         `json:"coins"`
	From    string        `json:"from"`
	To      string        `json:"to"`
	Kind    string        `json:"kind"`
	Msg     string        `json:"msg"`
}

func worldTestConnect(t *testing.T, e *env) (*websocket.Conn, *client, string) {
	t.Helper()
	c := e.client()
	return worldTestConnectClient(t, e, c)
}
func worldTestConnectClient(t *testing.T, e *env, c *client) (*websocket.Conn, *client, string) {
	t.Helper()
	status, body, _ := c.get("/world")
	must(t, status == 200 && strings.Contains(body, "data-visitor"), "街区页面: %d", status)
	u, _ := url.Parse(e.base)
	visitor := ""
	for _, cookie := range c.hc.Jar.Cookies(u) {
		if cookie.Name == "bv" {
			visitor = cookie.Value
		}
	}
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	ws, _, err := websocket.Dial(ctx, strings.Replace(e.base, "http:", "ws:", 1)+"/world/live", &websocket.DialOptions{HTTPClient: c.hc, HTTPHeader: http.Header{"Origin": {e.base}}})
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { ws.CloseNow() })
	if err := wsjson.Write(ctx, ws, worldInput{Type: "join", Visitor: visitor}); err != nil {
		t.Fatal(err)
	}
	f := worldTestRead(t, ws, func(f worldTestFrame) bool { return f.Type == "welcome" })
	return ws, c, f.ID
}
func worldTestRead(t *testing.T, c *websocket.Conn, accept func(worldTestFrame) bool) worldTestFrame {
	t.Helper()
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	for {
		var f worldTestFrame
		if err := wsjson.Read(ctx, c, &f); err != nil {
			t.Fatal(err)
		}
		if accept(f) {
			return f
		}
	}
}
func TestWorldPlazaRaidAndRespawn(t *testing.T) {
	e := newEnvWith(t, func(c *Config) { c.WorldEnabled = true; c.RaidBots = 0 })
	client := e.client()
	status, _, _ := client.post("/login", url.Values{"slug": {""}, "password": {e.cfg.AdminPassword}})
	must(t, status == 302, "演示站长登录")
	_, err := e.app.st.db.Exec(`UPDATE sites SET coins=40 WHERE id=1`)
	must(t, err == nil, "准备钢镚")
	conn, _, id := worldTestConnectClient(t, e, client)
	frame := worldTestRead(t, conn, func(f worldTestFrame) bool { return f.Type == "state" && len(f.Players) == 1 })
	must(t, worldInPlaza(frame.Players[0].X, frame.Players[0].Z), "所有新人在广场出生")
	must(t, wsjson.Write(context.Background(), conn, worldInput{Type: "travel", Destination: "bridge"}) == nil, "前往天桥")
	worldTestRead(t, conn, func(f worldTestFrame) bool {
		for _, p := range f.Players {
			if p.ID == id && worldInBridge(p.X, p.Z) {
				return true
			}
		}
		return false
	})
	rd, _ := e.app.st.RaidOpenRound()
	killed := raidKillIndex(rd.Seed, rd.ID, 2)
	must(t, e.app.st.RaidBotBet(rd.ID, 0, 1-killed, 4, ms()) == nil, "另一个藏身点")
	status, _, _ = client.post("/raid/bet", url.Values{"room": {fmt.Sprint(killed)}, "amount": {"3"}, "round": {fmt.Sprint(rd.ID + 99)}})
	must(t, status == 409, "拒绝过期局号，不能误扣下一局")
	status, body, _ := client.post("/raid/bet", url.Values{"room": {fmt.Sprint(killed)}, "amount": {"3"}, "round": {fmt.Sprint(rd.ID)}})
	must(t, status == 200 && strings.Contains(body, `"coins":37`), "沿用真实钢镚接口: %s", body)
	x, z := worldRoomPosition(killed)
	worldTestRead(t, conn, func(f worldTestFrame) bool {
		for _, p := range f.Players {
			if p.ID == id && p.X == x && p.Z == z && p.Action == "beg" {
				return true
			}
		}
		return false
	})
	e.app.raidTick(rd.LocksAt + 1)
	worldTestRead(t, conn, func(f worldTestFrame) bool {
		for _, p := range f.Players {
			if p.ID == id && p.Action == "caught" {
				return true
			}
		}
		return false
	})
	e.app.world.tick(time.Now().Add(9*time.Second), .05, true)
	worldTestRead(t, conn, func(f worldTestFrame) bool {
		for _, p := range f.Players {
			if p.ID == id && p.Action == "idle" && worldInPlaza(p.X, p.Z) {
				return true
			}
		}
		return false
	})
	site, _ := e.app.st.GetSiteByID(1)
	must(t, site.Coins == 37, "抓捕与复活不会重复扣款")
}
func TestWorldMultiplayer(t *testing.T) {
	e := newEnvWith(t, func(c *Config) { c.WorldEnabled = true })
	// 至少两排真实摊位：以前仅有主站的夹具没有覆盖出生点被第二排房屋挡住。
	for i := 0; i < 18; i++ {
		_, err := e.app.st.CreateSite(&Site{Slug: "neighbor_" + string(rune('a'+i)), Name: "街坊", Listed: true, Currency: "USDT"})
		must(t, err == nil, "建立完整街区")
	}
	must(t, e.app.refreshWorldSites() == nil, "刷新完整街区")
	first, _, id := worldTestConnect(t, e)
	second, client, _ := worldTestConnect(t, e)
	frame := worldTestRead(t, second, func(f worldTestFrame) bool { return f.Type == "state" && len(f.Players) == 2 })
	var start float64
	for _, p := range frame.Players {
		if p.ID == id {
			start = p.X
			e.app.world.mu.Lock()
			walkable := e.app.world.walkable(p.X, p.Z)
			e.app.world.mu.Unlock()
			must(t, walkable, "新人不能出生在房屋内: %+v", p)
		}
	}
	must(t, wsjson.Write(context.Background(), first, worldInput{Type: "move", DX: 1}) == nil, "发送移动")
	frame = worldTestRead(t, second, func(f worldTestFrame) bool {
		for _, p := range f.Players {
			if p.ID == id && p.X > start+.1 {
				return true
			}
		}
		return false
	})
	for _, p := range frame.Players {
		if p.ID == id {
			must(t, p.X-start < 1.8, "服务端限制移动速度: %f", p.X-start)
		}
	}
	for _, action := range []string{"beg", "wave"} {
		must(t, wsjson.Write(context.Background(), first, worldInput{Type: "action", Action: action}) == nil, "发送动作")
		worldTestRead(t, second, func(f worldTestFrame) bool {
			for _, p := range f.Players {
				if p.ID == id && p.Action == action {
					return true
				}
			}
			return false
		})
	}
	status, body, _ := client.post("/coin", url.Values{"site": {""}})
	must(t, status == 200 && strings.Contains(body, `"added":true`), "共享原有钢镚接口: %d %s", status, body)
	worldTestRead(t, second, func(f worldTestFrame) bool { return f.Type == "coin" && f.SiteID == 1 && f.Coins == 1 })
	status, body, _ = client.post("/coin", url.Values{"site": {""}})
	must(t, status == 200 && strings.Contains(body, `"added":false`), "不能重复领取钢镚")
	first.CloseNow()
	worldTestRead(t, second, func(f worldTestFrame) bool { return f.Type == "state" && len(f.Players) == 1 })
}
func TestWorldSecurityAndPublicData(t *testing.T) {
	e := newEnvWith(t, func(c *Config) { c.WorldEnabled = true })
	st := e.app.st
	hidden, err := st.CreateSite(&Site{Slug: "private_owner", Name: "Hidden", XHandle: "private_owner", PassHash: hashPassword("secret-password"), Currency: "USDT"})
	must(t, err == nil, "创建未收录站")
	disabled, err := st.CreateSite(&Site{Slug: "disabled_owner", Name: "Disabled", Listed: true, PassHash: hashPassword("secret-password"), Currency: "USDT"})
	must(t, err == nil, "创建停用站")
	must(t, st.SetSiteStatus(disabled, "disabled") == nil, "停用")
	must(t, e.app.refreshWorldSites() == nil, "刷新")
	c := e.client()
	status, body, _ := c.get("/api/world/sites")
	must(t, status == 200, "公开数据")
	var payload struct {
		Sites []worldSite `json:"sites"`
	}
	must(t, json.Unmarshal([]byte(body), &payload) == nil, "JSON")
	for _, s := range payload.Sites {
		must(t, s.ID != hidden && s.ID != disabled, "不暴露未收录或停用站")
	}
	for _, secret := range []string{"pass_hash", "PassHash", "bpg_account_id", "PayID", "ClaimToken", "secret-password"} {
		must(t, !strings.Contains(body, secret), "公开 DTO 不泄漏 %s", secret)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	bad, resp, err := websocket.Dial(ctx, strings.Replace(e.base, "http:", "ws:", 1)+"/world/live", &websocket.DialOptions{HTTPHeader: http.Header{"Origin": {"https://evil.example"}}})
	if bad != nil {
		bad.CloseNow()
	}
	must(t, err != nil && resp != nil && resp.StatusCode == 403, "拒绝跨站 WebSocket")
	bad, _, err = websocket.Dial(ctx, strings.Replace(e.base, "http:", "ws:", 1)+"/world/live", &websocket.DialOptions{HTTPHeader: http.Header{"Origin": {e.base}}})
	must(t, err == nil, "无 cookie 连接需先验证令牌")
	defer bad.CloseNow()
	must(t, wsjson.Write(ctx, bad, worldInput{Type: "join", Visitor: "forged"}) == nil, "伪造令牌")
	_, _, err = bad.Read(ctx)
	must(t, websocket.CloseStatus(err) == websocket.StatusPolicyViolation, "拒绝伪造访客令牌: %v", err)
	ws, _, _ := worldTestConnect(t, e)
	must(t, wsjson.Write(context.Background(), ws, worldInput{Type: "move", DX: 1000}) == nil, "异常输入")
	_, _, err = ws.Read(ctx)
	for err == nil {
		_, _, err = ws.Read(ctx)
	}
	must(t, websocket.CloseStatus(err) == websocket.StatusPolicyViolation, "拒绝瞬移输入")
}
func TestWorldSimulationAndLimits(t *testing.T) {
	h := newWorldHub()
	h.siteMap[1] = worldSite{ID: 1, X: -16, Z: -9}
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	_ = ctx
	c := &worldClient{player: worldPlayer{ID: "one", Action: "idle"}, visitor: "v", ip: "ip", send: make(chan []byte, 16), cancel: cancel}
	must(t, h.register(c), "加入")
	defer h.wg.Done()
	must(t, !h.apply("one", worldInput{Type: "move", DX: math.Inf(1)}), "拒绝无穷大")
	must(t, !h.apply("one", worldInput{Type: "action", Action: "grant_coins"}), "动作白名单")
	must(t, !h.apply("one", worldInput{Type: "visit", SiteID: 999}), "不能访问私密或不存在站")
	must(t, h.apply("one", worldInput{Type: "visit", SiteID: 1}), "访问已公开站")
	must(t, c.player.X == -16 && c.player.Z == -5.2, "安全落点: %+v", c.player)
	must(t, !h.walkable(-16, -10) && !h.walkable(worldCoordinateLimit+1, 0), "房屋和数值保护边界")
	must(t, h.apply("one", worldInput{Type: "move", DX: 1, DZ: 1}), "移动")
	must(t, math.Abs(math.Hypot(c.dx, c.dz)-1) < .0001, "斜走也不能加速")
	h.tick(time.Now().Add(time.Second), .05, true)
	must(t, c.dx == 0 && c.dz == 0, "断续输入不能无限滑行")
	for i := 0; i < 3; i++ {
		p := &worldClient{player: worldPlayer{ID: string(rune('a' + i))}, visitor: "v", ip: "ip", send: make(chan []byte, 16), cancel: cancel}
		must(t, h.register(p), "同访客允许有限窗口")
		defer h.wg.Done()
	}
	must(t, !h.register(&worldClient{player: worldPlayer{ID: "fifth"}, visitor: "v", ip: "ip"}), "限制同访客多开")
}
func TestWorldEndlessStreets(t *testing.T) {
	h := newWorldHub()
	c := &worldClient{player: worldPlayer{ID: "walker", X: 78, Z: 0, Action: "walk"}, dx: 1}
	h.players[c.player.ID] = c
	now := time.Now()
	for i := 0; i < 160; i++ {
		now = now.Add(50 * time.Millisecond)
		c.inputAt = now
		h.tick(now, .05, false)
	}
	must(t, c.player.X > 120, "可以连续走出旧地图边界: %f", c.player.X)
	for _, p := range [][2]float64{{-200, 0}, {5000, 0}, {-12, -5000}, {100000, 16000}} {
		must(t, h.walkable(p[0], p[1]), "延伸街道可通行: %v", p)
	}
	must(t, !h.walkable(math.NaN(), 0), "拒绝非法坐标")
	// Fixed vectors also appear in the JS terrain tests; negative modulo must agree.
	must(t, worldTerrainSeed(-1, -1) == 63386 && worldTerrainSeed(1000, -1000) == 33623, "前后端种子一致")
}
func TestWorldDisabled(t *testing.T) {
	e := newEnv(t)
	status, body, _ := e.client().get("/")
	must(t, status == 200 && !strings.Contains(body, `href="/world"`), "关闭时原页面不增加入口")
	status, _, _ = e.client().get("/world")
	must(t, status == 404, "默认关闭原型")
}
