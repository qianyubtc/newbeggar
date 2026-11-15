package main

import (
	"math"
	"net/http"
	"strconv"
	"time"
)

type worldCell struct{ Col, Row int64 }

func worldCellAt(x, z float64) worldCell {
	return worldCell{int64(math.Floor(x/8 + 2.5)), int64(math.Floor((z+10)/16 + .5))}
}
func (c worldCell) position() (float64, float64) { return float64(c.Col)*8 - 16, float64(c.Row)*16 - 9 }

// Only real generated shop buildings may be occupied. Plazas, the bridge,
// public gardens and spaces between buildings remain public space.
func worldShopAvailableCell(c worldCell) bool {
	if c.Col < -10000 || c.Col > 10000 || c.Row < -10000 || c.Row > 10000 || worldTerrainSeed(c.Col, c.Row)%5 == 0 {
		return false
	}
	x, z := c.position()
	for _, r := range [][4]float64{{-70, -26, -18, 20}, {-82, -14, -84, -22}, {-54, -42, -24, -18}} {
		if x+3.4 >= r[0] && x-3.4 <= r[1] && z+4.2 >= r[2] && z-3.9 <= r[3] {
			return false
		}
	}
	return true
}

func (a *App) handleWorldShop(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-store")
	reply := func(status int, msg string) { replyJSON(w, status, map[string]any{"ok": false, "msg": msg}) }
	s := a.currentSite(r)
	if s == nil {
		reply(401, "登录站长账号后，就能选择自己的店铺")
		return
	}
	if !s.Listed && !s.IsMain() {
		reply(403, "站点收录后即可入驻街区")
		return
	}
	if !a.lim.allow("worldshop:"+strconv.FormatInt(s.ID, 10), 12, time.Minute) {
		reply(429, "换铺太快了，稍等一下")
		return
	}
	col, e1 := strconv.ParseInt(r.FormValue("col"), 10, 64)
	row, e2 := strconv.ParseInt(r.FormValue("row"), 10, 64)
	cell := worldCell{col, row}
	if e1 != nil || e2 != nil || !worldShopAvailableCell(cell) {
		reply(400, "这里是公共空间，请选择标有待入驻的空店铺")
		return
	}
	h := a.world
	h.registryMu.Lock()
	defer h.registryMu.Unlock()
	if err := a.refreshWorldSitesLocked(); err != nil {
		a.logf("[warn] 读取店铺: %v", err)
		reply(500, "暂时无法读取店铺，请稍后再试")
		return
	}
	h.mu.Lock()
	owner := h.shopCells[cell]
	_, eligible := h.siteMap[s.ID]
	h.mu.Unlock()
	if !eligible {
		reply(403, "站点暂未进入街区，请稍后再试")
		return
	}
	if owner != 0 && owner != s.ID {
		reply(409, "这间店铺已经有主人了，换一间看看")
		return
	}
	// Both unique keys are enforced in SQLite as well as in the live registry.
	tx, err := a.st.db.Begin()
	if err != nil {
		reply(500, "暂时无法入驻，请稍后再试")
		return
	}
	defer tx.Rollback()
	// A disabled, migrated or delisted account does not keep a public shop locked.
	_, err = tx.Exec(`DELETE FROM world_shops WHERE col=? AND row=? AND site_id IN
 (SELECT id FROM sites WHERE status!='active' OR moved_to!=0 OR (listed=0 AND slug!=''))`, col, row)
	if err == nil {
		_, err = tx.Exec(`INSERT INTO world_shops(site_id,col,row,updated_at) VALUES(?,?,?,?)
 ON CONFLICT(site_id) DO UPDATE SET col=excluded.col,row=excluded.row,updated_at=excluded.updated_at`, s.ID, col, row, ms())
	}
	if err == nil {
		err = tx.Commit()
	}
	if err != nil {
		a.logf("[warn] 入驻店铺: %v", err)
		reply(409, "店铺状态已变化，请刷新后重试")
		return
	}
	if err = a.refreshWorldSitesLocked(); err != nil {
		a.logf("[warn] 刷新入驻店铺: %v", err)
		reply(500, "入驻记录已保存，请刷新确认")
		return
	}
	h.mu.Lock()
	h.broadcastLocked(map[string]any{"type": "shops-changed"})
	h.mu.Unlock()
	replyJSON(w, 200, map[string]any{"ok": true, "siteId": s.ID, "msg": "入驻成功，招牌已经换成你的名字"})
}
