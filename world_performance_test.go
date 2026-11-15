package main

import (
	"encoding/json"
	"fmt"
	"math"
	"testing"
	"time"
)

func TestWorldIdleHeartbeatAndWirePrecision(t *testing.T) {
	h := newWorldHub()
	c := &worldClient{player: worldPlayer{ID: "a", Name: "路人", X: -48.123456789, Z: 7.123456789, Yaw: math.Pi, Action: "idle"}, send: make(chan []byte, 16), cancel: func() {}}
	h.players["a"] = c
	now := time.Now()
	h.tick(now, .05, true)
	var first struct {
		Players []worldPlayer `json:"players"`
	}
	if err := json.Unmarshal(<-c.send, &first); err != nil {
		t.Fatal(err)
	}
	if first.Players[0].X != -48.123 || c.player.X != -48.123456789 {
		t.Fatal("round wire values only; preserve simulation precision")
	}
	for i := 1; i < 10; i++ {
		h.tick(now.Add(time.Duration(i)*100*time.Millisecond), .05, true)
	}
	if len(c.send) != 0 {
		t.Fatal("idle scene should suppress duplicate 10 Hz snapshots")
	}
	h.tick(now.Add(time.Second), .05, true)
	if len(c.send) != 1 {
		t.Fatal("idle heartbeat missing")
	}
	<-c.send
	c.dx = 1
	c.inputAt = now.Add(1100 * time.Millisecond)
	c.player.Action = "walk"
	h.tick(c.inputAt, .05, true)
	if len(c.send) != 1 {
		t.Fatal("movement must broadcast immediately")
	}
	<-c.send
	c.dx = 0
	c.player.Action = "wave"
	c.actionUntil = now.Add(3 * time.Second)
	h.tick(now.Add(1200*time.Millisecond), .05, true)
	if len(c.send) != 1 {
		t.Fatal("action changes must broadcast immediately")
	}
	<-c.send
	h.players["b"] = &worldClient{player: worldPlayer{ID: "b", Action: "idle", X: -48, Z: 8}, send: make(chan []byte, 16), cancel: func() {}}
	h.tick(now.Add(1300*time.Millisecond), .05, true)
	if len(c.send) != 1 {
		t.Fatal("joining players must broadcast immediately")
	}
	<-c.send
	delete(h.players, "b")
	h.tick(now.Add(1400*time.Millisecond), .05, true)
	if len(c.send) != 1 {
		t.Fatal("departing players must broadcast immediately")
	}
}

func BenchmarkWorld64Players(b *testing.B) {
	h := newWorldHub()
	now := time.Now()
	for i := 0; i < 64; i++ {
		id := fmt.Sprint(i)
		h.players[id] = &worldClient{player: worldPlayer{ID: id, Name: "街坊", Action: "walk", X: -48, Z: 7}, dx: .5, send: make(chan []byte, 16), cancel: func() {}}
	}
	b.ReportAllocs()
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		now = now.Add(100 * time.Millisecond)
		for _, c := range h.players {
			c.inputAt = now
		}
		h.tick(now, .1, true)
		for _, c := range h.players {
			select {
			case <-c.send:
			default:
			}
		}
	}
}
