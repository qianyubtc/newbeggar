package main

import (
	"bytes"
	"context"
	"encoding/json"
	"math"
	"net/http"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/coder/websocket"
	"github.com/coder/websocket/wsjson"
)

// 世界只有公开站点数据；角色位置属于短暂在线状态，不写 SQLite。
type worldSite struct {
	ID       int64   `json:"id"`
	Slug     string  `json:"slug"`
	Name     string  `json:"name"`
	Slogan   string  `json:"slogan"`
	Avatar   string  `json:"avatar"`
	Skin     int64   `json:"skin"`
	Coins    int64   `json:"coins"`
	Total    string  `json:"total"`
	Currency string  `json:"currency"`
	Exp      int64   `json:"exp"`
	Ready    bool    `json:"ready"`
	Claimed  bool    `json:"claimed"`
	X        float64 `json:"x"`
	Z        float64 `json:"z"`
}
type worldPlayer struct {
	ID     string  `json:"id"`
	Name   string  `json:"name"`
	SiteID int64   `json:"siteId"`
	Skin   int64   `json:"skin"`
	X      float64 `json:"x"`
	Z      float64 `json:"z"`
	Yaw    float64 `json:"yaw"`
	Action string  `json:"action"`
}
type worldInput struct {
	Type        string  `json:"type"`
	Visitor     string  `json:"visitor,omitempty"`
	DX          float64 `json:"dx,omitempty"`
	DZ          float64 `json:"dz,omitempty"`
	Action      string  `json:"action,omitempty"`
	SiteID      int64   `json:"siteId,omitempty"`
	Destination string  `json:"destination,omitempty"`
	Target      string  `json:"target,omitempty"`
	Kind        string  `json:"kind,omitempty"`
	Phrase      string  `json:"phrase,omitempty"`
	Col         int64   `json:"col,omitempty"`
	Row         int64   `json:"row,omitempty"`
}
type worldClient struct {
	player       worldPlayer
	visitor      string
	ip           string
	dx, dz       float64
	inputAt      time.Time
	actionUntil  time.Time
	send         chan []byte
	cancel       context.CancelFunc
	authTag      string
	raidDeathAt  time.Time
	interactedAt time.Time
}
type worldHub struct {
	registryMu sync.Mutex // Serialize persisted shop moves and periodic registry refreshes.
	mu         sync.Mutex
	players    map[string]*worldClient
	sites      []worldSite
	siteMap    map[int64]worldSite
	shopCells  map[worldCell]int64
	maxZ       float64
	closed     bool
	wg         sync.WaitGroup
	slots      chan struct{}
	lastState  []byte
	stateAt    time.Time
	catalog    *worldCatalog
}

func newWorldHub() *worldHub {
	return &worldHub{players: map[string]*worldClient{}, siteMap: map[int64]worldSite{}, shopCells: map[worldCell]int64{}, maxZ: 40, slots: make(chan struct{}, 64)}
}
func worldPosition(id int64) (float64, float64) {
	n := max(int64(0), id-1)
	return float64(n%12-2) * 8, float64(n/12)*16 - 9
}
func (a *App) refreshWorldSites() error {
	a.world.registryMu.Lock()
	defer a.world.registryMu.Unlock()
	return a.refreshWorldSitesLocked()
}
func (a *App) refreshWorldSitesLocked() error {
	rows, err := a.st.db.Query(`SELECT s.id,s.slug,s.name,s.slogan,s.x_avatar,s.skin,s.coins,s.pay_mode,s.receive_link,s.pay_id,s.currency,
 COALESCE((SELECT SUM(d.actual_e8) FROM donations d WHERE d.site_id=s.id AND d.status='paid' AND d.blocked=0),0)
 FROM sites s WHERE s.status='active' AND s.moved_to=0 AND (s.listed=1 OR s.slug='') ORDER BY s.id LIMIT 2000`)
	if err != nil {
		return err
	}
	defer rows.Close()
	sites := []worldSite{}
	for rows.Next() {
		var s worldSite
		var avatar, mode, link, payID string
		var total int64
		if err := rows.Scan(&s.ID, &s.Slug, &s.Name, &s.Slogan, &avatar, &s.Skin, &s.Coins, &mode, &link, &payID, &s.Currency, &total); err != nil {
			return err
		}
		s.Avatar = avatarURL(avatar)
		s.Total = fmtE8(total)
		s.Ready = mode == "gateway" || link != "" || payID != ""
		s.Exp = total*a.cfg.MoneyExp/100000000 + s.Coins*a.cfg.CoinExp
		s.X, s.Z = worldPosition(s.ID)
		sites = append(sites, s)
	}
	if err := rows.Err(); err != nil {
		return err
	}
	// Release the query before opening another one (SQLite uses one connection).
	rows.Close()
	claims, err := a.st.db.Query(`SELECT w.site_id,w.col,w.row FROM world_shops w JOIN sites s ON s.id=w.site_id
 WHERE s.status='active' AND s.moved_to=0 AND (s.listed=1 OR s.slug='')`)
	if err != nil {
		return err
	}
	claimed := map[int64]worldCell{}
	for claims.Next() {
		var id int64
		var cell worldCell
		if err := claims.Scan(&id, &cell.Col, &cell.Row); err != nil {
			claims.Close()
			return err
		}
		claimed[id] = cell
	}
	err = claims.Err()
	claims.Close()
	if err != nil {
		return err
	}
	occupied := map[worldCell]int64{}
	for _, s := range sites {
		if cell, ok := claimed[s.ID]; ok {
			occupied[cell] = s.ID
		}
	}
	for i := range sites {
		s := &sites[i]
		if cell, ok := claimed[s.ID]; ok {
			s.X, s.Z = cell.position()
			s.Claimed = true
			continue
		}
		// Existing sites retain their original shop unless a later registration lands
		// on a chosen shop. New arrivals receive the next free default address.
		for n := s.ID; n < s.ID+int64(len(sites))+1; n++ {
			x, z := worldPosition(n)
			cell := worldCellAt(x, z)
			if _, taken := occupied[cell]; !taken {
				s.X, s.Z = x, z
				occupied[cell] = s.ID
				break
			}
		}
	}
	h := a.world
	h.mu.Lock()
	defer h.mu.Unlock()
	h.catalog = nil
	h.sites = sites
	h.siteMap = map[int64]worldSite{}
	h.shopCells = occupied
	h.maxZ = 40
	for _, s := range sites {
		h.siteMap[s.ID] = s
		h.maxZ = math.Max(h.maxZ, s.Z+20)
	}
	return nil
}
func (h *worldHub) publicSites() ([]worldSite, float64) {
	h.mu.Lock()
	defer h.mu.Unlock()
	return append([]worldSite{}, h.sites...), h.maxZ
}
func (a *App) handleWorld(w http.ResponseWriter, r *http.Request) {
	visitor := a.visitor(w, r)
	base := a.base(r)
	a.render(w, 200, "world", struct {
		Base
		Visitor string
	}{base, visitor})
}
func (h *worldHub) register(c *worldClient) bool {
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.closed || len(h.players) >= 64 {
		return false
	}
	sameVisitor, sameIP := 0, 0
	for _, p := range h.players {
		if p.visitor == c.visitor {
			sameVisitor++
		}
		if p.ip == c.ip {
			sameIP++
		}
	}
	if sameVisitor >= 4 || sameIP >= 12 {
		return false
	}
	h.spawnLocked(c)
	h.players[c.player.ID] = c
	h.wg.Add(1)
	return true
}
func (h *worldHub) remove(id string) { h.mu.Lock(); delete(h.players, id); h.mu.Unlock() }
func (h *worldHub) shutdown() {
	h.mu.Lock()
	h.closed = true
	for _, c := range h.players {
		c.cancel()
	}
	h.mu.Unlock()
	h.wg.Wait()
}
func worldFinite(v float64) bool { return !math.IsNaN(v) && !math.IsInf(v, 0) }

const worldCoordinateLimit = 1_000_000 // Numerical guard, far beyond a practical walking session.

func worldTerrainSeed(col, row int64) int64 {
	mod := func(v int64) int64 { return (v%997 + 997) % 997 }
	return (mod(col)*7381 + mod(row)*19391) % 65521
}
func (h *worldHub) walkable(x, z float64) bool {
	if !worldFinite(x) || !worldFinite(z) || math.Abs(x) > worldCoordinateLimit || math.Abs(z) > worldCoordinateLimit {
		return false
	}
	if pass, landmark := worldLandmarkWalkable(x, z); landmark {
		return pass
	}
	// All clients generate the same scenery cells, including negative coordinates.
	col := int64(math.Floor(x/8 + 2.5))
	row := int64(math.Floor((z+10)/16 + .5))
	solid := worldTerrainSeed(col, row)%5 != 0
	_, occupied := h.shopCells[worldCell{col, row}]
	if col >= 0 && col < 12 && row >= 0 {
		_, realSite := h.siteMap[row*12+col+1]
		// The fallback is for in-memory fixtures; live registries use actual cells.
		if len(h.shopCells) == 0 {
			occupied = realSite
		}
	}
	solid = solid || occupied
	cx, cz := float64(col)*8-16, float64(row)*16-9
	return !(solid && math.Abs(x-cx) < 3.35 && z > cz-3.85 && z < cz+1.85)
}
func (h *worldHub) apply(id string, in worldInput) bool {
	h.mu.Lock()
	defer h.mu.Unlock()
	c := h.players[id]
	if c == nil {
		return false
	}
	if !c.raidDeathAt.IsZero() {
		return true
	}
	switch in.Type {
	case "interact":
		return h.interactLocked(c, in)
	case "tour":
		cell := worldCell{in.Col, in.Row}
		if !worldShopAvailableCell(cell) {
			return false
		}
		c.player.X, c.player.Z = cell.position()
		c.player.Z += 6
		c.dx, c.dz = 0, 0
		c.player.Action = "idle"
	case "travel":
		switch in.Destination {
		case "plaza":
			h.spawnLocked(c)
		case "street":
			c.player.X, c.player.Z = -16, 0
		case "bridge":
			c.player.X, c.player.Z = -48, -24
		default:
			return false
		}
		c.dx, c.dz = 0, 0
		c.player.Action = "idle"
	case "move":
		if !worldFinite(in.DX) || !worldFinite(in.DZ) || math.Abs(in.DX) > 1.01 || math.Abs(in.DZ) > 1.01 {
			return false
		}
		length := math.Hypot(in.DX, in.DZ)
		if length > 1 {
			in.DX /= length
			in.DZ /= length
		}
		c.dx, c.dz = in.DX, in.DZ
		c.inputAt = time.Now()
		if length > .01 {
			c.player.Action = "walk"
			c.player.Yaw = math.Atan2(in.DX, in.DZ)
		} else if c.player.Action == "walk" {
			c.player.Action = "idle"
		}
	case "action":
		if in.Action != "wave" && in.Action != "beg" && in.Action != "idle" {
			return false
		}
		c.dx, c.dz = 0, 0
		c.player.Action = in.Action
		if in.Action == "wave" {
			c.actionUntil = time.Now().Add(2200 * time.Millisecond)
		}
	case "visit":
		s, ok := h.siteMap[in.SiteID]
		if !ok {
			return false
		}
		c.player.X, c.player.Z = s.X, s.Z+3.8
		c.player.Action = "idle"
		c.dx, c.dz = 0, 0
	case "ping":
	default:
		return false
	}
	return true
}
func (h *worldHub) broadcastLocked(message any) {
	raw, err := json.Marshal(message)
	if err != nil {
		return
	}
	h.broadcastRawLocked(raw)
}
func (h *worldHub) broadcastRawLocked(raw []byte) {
	for _, c := range h.players {
		select {
		case c.send <- raw:
		default:
			c.cancel()
		}
	}
}
func (h *worldHub) coin(siteID, coins, coinExp int64) {
	h.mu.Lock()
	defer h.mu.Unlock()
	if s, ok := h.siteMap[siteID]; ok {
		s.Exp += (coins - s.Coins) * coinExp
		s.Coins = coins
		h.siteMap[siteID] = s
		for i := range h.sites {
			if h.sites[i].ID == siteID {
				h.sites[i].Coins = coins
				h.sites[i].Exp = s.Exp
				break
			}
		}
	}
	h.catalog = nil
	h.broadcastLocked(map[string]any{"type": "coin", "siteId": siteID, "coins": coins})
}
func (h *worldHub) tick(now time.Time, dt float64, broadcast bool) {
	h.mu.Lock()
	defer h.mu.Unlock()
	for _, c := range h.players {
		if !c.raidDeathAt.IsZero() {
			if !now.Before(c.raidDeathAt) {
				h.spawnLocked(c)
			} else {
				continue
			}
		}
		if now.Sub(c.inputAt) > 500*time.Millisecond {
			c.dx, c.dz = 0, 0
			if c.player.Action == "walk" {
				c.player.Action = "idle"
			}
		}
		if (c.player.Action == "wave" || c.player.Action == "clink") && now.After(c.actionUntil) {
			c.player.Action = "idle"
		}
		x, z := c.player.X+c.dx*6*dt, c.player.Z+c.dz*6*dt
		if h.walkable(x, c.player.Z) {
			c.player.X = x
		}
		if h.walkable(c.player.X, z) {
			c.player.Z = z
		}
	}
	if broadcast && len(h.players) > 0 {
		players := make([]worldPlayer, 0, len(h.players))
		for _, c := range h.players {
			p := c.player
			// Limit wire precision without rounding the simulation or collision checks.
			p.X = math.Round(p.X*1000) / 1000
			p.Z = math.Round(p.Z*1000) / 1000
			p.Yaw = math.Round(p.Yaw*1000) / 1000
			players = append(players, p)
		}
		sort.Slice(players, func(i, j int) bool { return players[i].ID < players[j].ID })
		raw, err := json.Marshal(struct {
			Type    string        `json:"type"`
			Players []worldPlayer `json:"players"`
		}{"state", players})
		if err == nil && (!bytes.Equal(raw, h.lastState) || now.Sub(h.stateAt) >= time.Second) {
			h.broadcastRawLocked(raw)
			h.lastState = raw
			h.stateAt = now
		}
	}
}
func (a *App) worldLoop() {
	defer a.wg.Done()
	tick := time.NewTicker(50 * time.Millisecond)
	refresh := time.NewTicker(30 * time.Second)
	defer tick.Stop()
	defer refresh.Stop()
	last := time.Now()
	n := 0
	for {
		select {
		case <-a.stop:
			return
		case now := <-tick.C:
			n++
			a.world.tick(now, math.Min(now.Sub(last).Seconds(), .1), n%2 == 0)
			last = now
		case <-refresh.C:
			if err := a.refreshWorldSites(); err != nil {
				a.logf("[warn] 刷新街区站点: %v", err)
			}
			// 账号被停用/改口令后，在线身份也应失效。
			a.world.mu.Lock()
			list := make([]*worldClient, 0, len(a.world.players))
			for _, c := range a.world.players {
				if c.player.SiteID != 0 {
					list = append(list, c)
				}
			}
			a.world.mu.Unlock()
			for _, c := range list {
				s, err := a.st.GetSiteByID(c.player.SiteID)
				if err == nil && (s == nil || s.Status != "active" || !s.Listed && !s.IsMain() || pwTag(s.PassHash) != c.authTag) {
					c.cancel()
				}
			}
		}
	}
}
func (a *App) handleWorldLive(w http.ResponseWriter, r *http.Request) {
	if !a.sameOrigin(r) {
		http.Error(w, "forbidden origin", 403)
		return
	}
	if !a.lim.allow("world-connect:"+a.ip(r), 30, time.Minute) {
		http.Error(w, "too many connections", 429)
		return
	}
	select {
	case a.world.slots <- struct{}{}:
		defer func() { <-a.world.slots }()
	default:
		http.Error(w, "world is full", http.StatusServiceUnavailable)
		return
	}
	conn, err := websocket.Accept(w, r, nil)
	if err != nil {
		return
	}
	defer conn.CloseNow()
	conn.SetReadLimit(1024)
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	go func() {
		select {
		case <-a.stop:
			cancel()
		case <-ctx.Done():
		}
	}()
	helloCtx, stop := context.WithTimeout(ctx, 5*time.Second)
	var hello worldInput
	err = wsjson.Read(helloCtx, conn, &hello)
	stop()
	visitor := cookieVal(r, "bv")
	if parseVisitor(a.session, visitor) == 0 {
		visitor = hello.Visitor
	}
	if err != nil || hello.Type != "join" || parseVisitor(a.session, visitor) == 0 {
		conn.Close(websocket.StatusPolicyViolation, "请先打开街区页面")
		return
	}
	id := randHex(6)
	c := &worldClient{player: worldPlayer{ID: id, Name: "路人 " + strings.ToUpper(id[:4]), Skin: int64(id[0]) % 8, Action: "idle", X: float64(len(id) % 3), Z: 4}, visitor: hashToken(visitor), ip: a.ip(r), send: make(chan []byte, 16), cancel: cancel}
	if s := a.currentSite(r); s != nil && (s.Listed || s.IsMain()) {
		c.player.Name = s.Name
		c.player.SiteID = s.ID
		c.player.Skin = s.Skin
		c.authTag = pwTag(s.PassHash)
	}
	if !a.world.register(c) {
		conn.Close(websocket.StatusTryAgainLater, "街区暂时满员，请稍后再试")
		return
	}
	defer a.world.wg.Done()
	defer a.world.remove(id)
	if err := wsjson.Write(ctx, conn, map[string]any{"type": "welcome", "id": id}); err != nil {
		return
	}
	done := make(chan struct{})
	go func() {
		defer close(done)
		defer cancel()
		ping := time.NewTicker(20 * time.Second)
		defer ping.Stop()
		for {
			select {
			case <-ctx.Done():
				return
			case raw := <-c.send:
				writeCtx, stop := context.WithTimeout(ctx, 5*time.Second)
				err := conn.Write(writeCtx, websocket.MessageText, raw)
				stop()
				if err != nil {
					return
				}
			case <-ping.C:
				pingCtx, stop := context.WithTimeout(ctx, 5*time.Second)
				err := conn.Ping(pingCtx)
				stop()
				if err != nil {
					return
				}
			}
		}
	}()
	defer func() { cancel(); <-done }()
	window := time.Now()
	count := 0
	for {
		var in worldInput
		if err := wsjson.Read(ctx, conn, &in); err != nil {
			return
		}
		if time.Since(window) >= time.Second {
			window = time.Now()
			count = 0
		}
		count++
		if count > 40 {
			conn.Close(websocket.StatusPolicyViolation, "消息过于频繁")
			return
		}
		if !a.world.apply(id, in) {
			conn.Close(websocket.StatusPolicyViolation, "无效街区操作")
			return
		}
	}
}
