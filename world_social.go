package main

import (
	"encoding/json"
	"math"
	"time"
)

var worldPhrases = map[string]string{"stroll": "一起逛街吧！", "luck": "祝你今天盆满钵满！", "shop": "有空来我店里坐坐～"}

func (h *worldHub) noticeLocked(c *worldClient, msg string) {
	raw, _ := json.Marshal(map[string]any{"type": "notice", "msg": msg})
	select {
	case c.send <- raw:
	default:
		c.cancel()
	}
}
func worldElevation(x, z float64) float64 {
	if x < -51.8 || x > -44.2 || z < -75 || z > -25 {
		return 0
	}
	if z >= -35 {
		return (-25 - z) * .4
	}
	if z <= -65 {
		return (z + 75) * .4
	}
	return 4
}

// Called under h.mu: neither the sender identity nor the distance is trusted
// from the browser. Messages are fixed phrases rather than arbitrary HTML/chat.
func (h *worldHub) interactLocked(c *worldClient, in worldInput) bool {
	if in.Kind != "hello" && in.Kind != "clink" && in.Kind != "say" {
		return false
	}
	if in.Kind == "say" && worldPhrases[in.Phrase] == "" {
		return false
	}
	target := h.players[in.Target]
	if target == nil || target == c {
		h.noticeLocked(c, "这位街坊已经离开了")
		return true
	}
	if !target.raidDeathAt.IsZero() {
		h.noticeLocked(c, "TA 正在返回广场，等一会再打招呼吧")
		return true
	}
	if math.Hypot(c.player.X-target.player.X, c.player.Z-target.player.Z) > 6 || math.Abs(worldElevation(c.player.X, c.player.Z)-worldElevation(target.player.X, target.player.Z)) > 1.5 {
		h.noticeLocked(c, "再靠近一点，走到街坊身边再互动")
		return true
	}
	now := time.Now()
	if now.Sub(c.interactedAt) < 2500*time.Millisecond || now.Sub(target.interactedAt) < 2500*time.Millisecond {
		h.noticeLocked(c, "稍等一下，再和街坊互动")
		return true
	}
	if in.Kind == "say" && in.Phrase == "shop" && c.player.SiteID == 0 {
		h.noticeLocked(c, "入驻自己的店铺后再邀请街坊吧")
		return true
	}
	c.interactedAt, target.interactedAt = now, now
	c.dx, c.dz, target.dx, target.dz = 0, 0, 0, 0
	c.player.Yaw = math.Atan2(target.player.X-c.player.X, target.player.Z-c.player.Z)
	target.player.Yaw = c.player.Yaw + math.Pi
	action := "wave"
	if in.Kind == "clink" {
		action = "clink"
	}
	c.player.Action, target.player.Action = action, action
	c.actionUntil, target.actionUntil = now.Add(2200*time.Millisecond), now.Add(2200*time.Millisecond)
	h.broadcastLocked(map[string]any{"type": "interaction", "from": c.player.ID, "to": target.player.ID, "kind": in.Kind, "phrase": in.Phrase})
	return true
}
