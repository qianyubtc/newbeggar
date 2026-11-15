package main

import (
	"context"
	"strings"
	"testing"
	"time"

	"github.com/coder/websocket/wsjson"
)

func TestWorldNearbyInteractions(t *testing.T) {
	e := newEnvWith(t, func(c *Config) { c.WorldEnabled = true })
	first, _, id := worldTestConnect(t, e)
	second, _, other := worldTestConnect(t, e)
	worldTestRead(t, second, func(f worldTestFrame) bool { return f.Type == "state" && len(f.Players) == 2 })
	must(t, wsjson.Write(context.Background(), first, worldInput{Type: "interact", Target: other, Kind: "clink"}) == nil, "附近碰碗")
	// The two clients must observe the same authoritative event.
	frame := worldTestRead(t, second, func(f worldTestFrame) bool { return f.Type == "interaction" })
	must(t, frame.From == id && frame.To == other && frame.Kind == "clink", "身份和动作由服务端决定")
	worldTestRead(t, first, func(f worldTestFrame) bool { return f.Type == "interaction" && f.To == other })
	worldTestRead(t, second, func(f worldTestFrame) bool {
		if f.Type != "state" {
			return false
		}
		n := 0
		for _, p := range f.Players {
			if p.Action == "clink" {
				n++
			}
		}
		return n == 2
	})
	must(t, wsjson.Write(context.Background(), first, worldInput{Type: "interact", Target: other, Kind: "hello"}) == nil, "再次打招呼")
	frame = worldTestRead(t, first, func(f worldTestFrame) bool { return f.Type == "notice" })
	must(t, strings.Contains(frame.Msg, "稍等"), "互动节流")
	e.app.world.mu.Lock()
	e.app.world.players[id].interactedAt = time.Time{}
	e.app.world.players[other].interactedAt = time.Time{}
	e.app.world.mu.Unlock()
	must(t, e.app.world.apply(other, worldInput{Type: "travel", Destination: "bridge"}), "邻居离开广场")
	must(t, wsjson.Write(context.Background(), first, worldInput{Type: "interact", Target: other, Kind: "hello"}) == nil, "远距离尝试")
	frame = worldTestRead(t, first, func(f worldTestFrame) bool { return f.Type == "notice" })
	must(t, strings.Contains(frame.Msg, "靠近"), "不能远程控制别人的动作")
	must(t, !e.app.world.apply(id, worldInput{Type: "interact", Target: other, Kind: "say", Phrase: "<script>"}), "固定短语白名单")
	e.app.world.tick(time.Now().Add(4*time.Second), .05, false)
	e.app.world.mu.Lock()
	action := e.app.world.players[id].player.Action
	e.app.world.mu.Unlock()
	must(t, action == "idle", "互动结束恢复自由状态")
}
