package main

import (
	"math"
	"time"
)

// Keep geography.js and these public scene coordinates in sync.
func worldInPlaza(x, z float64) bool  { return x >= -70 && x <= -26 && z >= -18 && z <= 20 }
func worldInBridge(x, z float64) bool { return x >= -82 && x <= -14 && z >= -84 && z <= -22 }
func worldLandmarkWalkable(x, z float64) (bool, bool) {
	if worldInPlaza(x, z) {
		return math.Hypot(x+48, z) >= 3.1, true
	}
	if worldInBridge(x, z) || (x >= -54 && x <= -42 && z >= -24 && z <= -18) {
		if z > -75 && z < -25 && ((x > -53 && x < -51.8) || (x > -44.2 && x < -43)) {
			return false, true
		}
		return true, true
	}
	return false, false
}
func worldRoomPosition(room int) (float64, float64) {
	x := -69.0
	if room%2 == 1 {
		x = -27
	}
	return x, -32 - float64(room/2)*18
}
func (h *worldHub) spawnLocked(c *worldClient) {
	for slot := 0; slot < 64; slot++ {
		x, z := -48+float64((slot+3)%8-3)*2, 7+float64(slot/8)
		occupied := false
		for _, p := range h.players {
			if p != c && math.Hypot(p.player.X-x, p.player.Z-z) < .7 {
				occupied = true
				break
			}
		}
		if !occupied {
			c.player.X, c.player.Z = x, z
			break
		}
	}
	c.dx, c.dz = 0, 0
	c.player.Action = "idle"
	c.raidDeathAt = time.Time{}
}
func (h *worldHub) raidBetPlaced(siteID int64, room int, amount int64) {
	h.mu.Lock()
	defer h.mu.Unlock()
	for _, c := range h.players {
		if c.player.SiteID != siteID || !c.raidDeathAt.IsZero() {
			continue
		}
		if amount > 0 {
			c.player.X, c.player.Z = worldRoomPosition(room)
			c.player.Action = "beg"
		} else {
			c.player.X, c.player.Z = -48, -24
			c.player.Action = "idle"
		}
		c.dx, c.dz = 0, 0
	}
}
func (h *worldHub) raidSettled(round *raidRoundJSON) {
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.closed {
		return
	}
	for _, p := range round.Players {
		if p.ID <= 0 || round.Status != "settled" || p.Room != round.Killed {
			continue
		}
		for _, c := range h.players {
			if c.player.SiteID == p.ID {
				c.player.Action = "caught"
				c.dx, c.dz = 0, 0
				c.raidDeathAt = time.Now().Add(8 * time.Second)
			}
		}
	}
	h.broadcastLocked(map[string]any{"type": "raid-result", "round": round})
}
