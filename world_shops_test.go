package main

import (
	"context"
	"fmt"
	"net/http"
	"net/url"
	"strings"
	"testing"

	"github.com/coder/websocket/wsjson"
)

func TestWorldShopOwnershipAndEntries(t *testing.T) {
	e := newEnvWith(t, func(c *Config) { c.WorldEnabled = true })
	otherID, err := e.app.st.CreateSite(&Site{Slug: "shop_neighbor", Name: "隔壁的碗", Listed: true, Currency: "USDT", PassHash: hashPassword("shop-test-pass")})
	must(t, err == nil, "建立邻居")
	must(t, e.app.refreshWorldSites() == nil, "刷新店铺")
	guest := e.client()
	owner := e.client()
	neighbor := e.client()
	st, _, _ := owner.post("/login", url.Values{"password": {e.cfg.AdminPassword}})
	must(t, st == 302, "主站登录")
	st, _, _ = neighbor.post("/login", url.Values{"slug": {"shop_neighbor"}, "password": {"shop-test-pass"}})
	must(t, st == 302, "邻居登录")
	cell := worldCell{20, 2}
	for !worldShopAvailableCell(cell) {
		cell.Col++
	}
	form := url.Values{"col": {fmt.Sprint(cell.Col)}, "row": {fmt.Sprint(cell.Row)}, "siteId": {fmt.Sprint(otherID)}}
	st, _, _ = guest.post("/api/world/shop", form)
	must(t, st == 401, "访客不能占店")
	req, _ := http.NewRequest("POST", e.base+"/api/world/shop", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Origin", "https://evil.invalid")
	response, err := owner.hc.Do(req)
	must(t, err == nil, "跨站请求")
	response.Body.Close()
	must(t, response.StatusCode == 403, "跨站不能占店")
	st, _, _ = owner.post("/api/world/shop", url.Values{"col": {"-4"}, "row": {"0"}})
	must(t, st == 400, "不能占广场")
	st, _, _ = owner.post("/api/world/shop", url.Values{"col": {"0.5"}, "row": {"0"}})
	must(t, st == 400, "不能使用任意坐标")
	peer, _, _ := worldTestConnect(t, e)
	st, body, _ := owner.post("/api/world/shop", form)
	must(t, st == 200, "入驻: %d %s", st, body)
	worldTestRead(t, peer, func(f worldTestFrame) bool { return f.Type == "shops-changed" })
	restarted := &App{cfg: e.cfg, st: e.app.st, world: newWorldHub()}
	must(t, restarted.refreshWorldSites() == nil, "重新加载持久化位置")
	x, z := cell.position()
	shop := restarted.world.siteMap[1]
	must(t, shop.Claimed && shop.X == x && shop.Z == z, "服务器确定主人，伪造 siteId 无效: %+v", shop)
	st, _, _ = neighbor.post("/api/world/shop", form)
	must(t, st == 409, "不能抢占别人店铺")
	st, body, _ = guest.get("/")
	must(t, st == 200 && strings.Contains(body, `id="world-enter"`) && strings.Contains(body, `href="/world"`), "首页醒目入口")
	st, body, _ = guest.get("/shop_neighbor")
	must(t, st == 200 && strings.Contains(body, `href="/world?site=shop_neighbor"`) && strings.Contains(body, "去 TA 的 3D 店铺"), "个人主页精确指向店铺")
	must(t, wsjson.Write(context.Background(), peer, worldInput{Type: "visit", SiteID: 1}) == nil, "访问迁移后的店铺")
	worldTestRead(t, peer, func(f worldTestFrame) bool {
		for _, p := range f.Players {
			if p.X == x && p.Z == z+3.8 {
				return true
			}
		}
		return false
	})
	next := worldCell{cell.Col + 1, cell.Row}
	for !worldShopAvailableCell(next) {
		next.Col++
	}
	st, _, _ = owner.post("/api/world/shop", url.Values{"col": {fmt.Sprint(next.Col)}, "row": {fmt.Sprint(next.Row)}})
	must(t, st == 200, "允许换铺")
	var count int
	must(t, e.app.st.db.QueryRow(`SELECT COUNT(*) FROM world_shops WHERE site_id=1`).Scan(&count) == nil && count == 1, "一人仅一铺")
	e.app.world.mu.Lock()
	oldOwner := e.app.world.shopCells[cell]
	e.app.world.mu.Unlock()
	must(t, oldOwner == 0, "换铺释放原位置")
	st, _, _ = neighbor.post("/api/world/shop", form)
	must(t, st == 200, "其他街坊能入驻释放的店铺")
}

func TestWorldShopNewArrivalsCannotOverwriteChosenShop(t *testing.T) {
	e := newEnvWith(t, func(c *Config) { c.WorldEnabled = true })
	cell := worldCell{4, 0}
	for !worldShopAvailableCell(cell) {
		cell.Col++
	}
	_, err := e.app.st.db.Exec(`INSERT INTO world_shops(site_id,col,row,updated_at) VALUES(1,?,?,?)`, cell.Col, cell.Row, ms())
	must(t, err == nil, "提前入驻未来默认地址")
	for i := 0; i < 16; i++ {
		_, err = e.app.st.CreateSite(&Site{Slug: fmt.Sprintf("arrival_%d", i), Name: "新街坊", Listed: true, Currency: "USDT"})
		must(t, err == nil, "新增站点")
	}
	must(t, e.app.refreshWorldSites() == nil, "新站点入场")
	sites, _ := e.app.world.publicSites()
	seen := map[worldCell]bool{}
	for _, s := range sites {
		c := worldCellAt(s.X, s.Z)
		must(t, !seen[c], "新店不能重叠: %+v", s)
		seen[c] = true
	}
	e.app.world.mu.Lock()
	owner := e.app.world.shopCells[cell]
	e.app.world.mu.Unlock()
	must(t, owner == 1, "原店主始终保留所选店铺")
}

func TestWorldShopConcurrentClaims(t *testing.T) {
	e := newEnvWith(t, func(c *Config) { c.WorldEnabled = true })
	id, err := e.app.st.CreateSite(&Site{Slug: "other_shop", Name: "另一位店主", Listed: true, Currency: "USDT", PassHash: hashPassword("shop-test-pass")})
	must(t, err == nil, "建立账号")
	first, second := e.client(), e.client()
	first.post("/login", url.Values{"password": {e.cfg.AdminPassword}})
	second.post("/login", url.Values{"slug": {"other_shop"}, "password": {"shop-test-pass"}})
	cell := worldCell{30, 4}
	for !worldShopAvailableCell(cell) {
		cell.Col++
	}
	form := url.Values{"col": {fmt.Sprint(cell.Col)}, "row": {fmt.Sprint(cell.Row)}}
	start := make(chan struct{})
	results := make(chan int, 2)
	for _, c := range []*client{first, second} {
		go func(c *client) {
			<-start
			response, err := c.hc.PostForm(e.base+"/api/world/shop", form)
			if err != nil {
				results <- 0
				return
			}
			status := response.StatusCode
			response.Body.Close()
			results <- status
		}(c)
	}
	close(start)
	a, b := <-results, <-results
	must(t, a == 200 && b == 409 || a == 409 && b == 200, "同时入驻只能有一个成功: %d / %d", a, b)
	var winner int64
	must(t, e.app.st.db.QueryRow(`SELECT site_id FROM world_shops WHERE col=? AND row=?`, cell.Col, cell.Row).Scan(&winner) == nil, "位置已唯一保存")
	loser := first
	if winner == 1 {
		loser = second
	} else {
		must(t, winner == id, "店主来自已登录账号")
	}
	_, err = e.app.st.db.Exec(`UPDATE sites SET status='disabled' WHERE id=?`, winner)
	must(t, err == nil, "停用店主夹具")
	status, _, _ := loser.post("/api/world/shop", form)
	must(t, status == 200, "停用账号不再占用公共铺位")
}
