package main

import (
	"bytes"
	"compress/gzip"
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

type worldCatalog struct {
	body, compressed []byte
	etag, key        string
}

func (h *worldHub) publicCatalog(cfg *Config) *worldCatalog {
	h.mu.Lock()
	defer h.mu.Unlock()
	key := fmt.Sprintf("%d/%t/%d", cfg.CoinExp, cfg.RaidEnabled, cfg.RaidMaxBet)
	if h.catalog != nil && h.catalog.key == key {
		return h.catalog
	}
	raw, _ := json.Marshal(map[string]any{"sites": h.sites, "coinExp": cfg.CoinExp, "raid": map[string]any{"enabled": cfg.RaidEnabled, "maxBet": cfg.RaidMaxBet}, "bounds": map[string]any{"streamed": true, "limit": worldCoordinateLimit}})
	var packed bytes.Buffer
	writer, _ := gzip.NewWriterLevel(&packed, gzip.BestSpeed)
	writer.Write(raw)
	writer.Close()
	h.catalog = &worldCatalog{body: raw, compressed: packed.Bytes(), etag: fmt.Sprintf(`W/"%x"`, sha256.Sum256(raw)), key: key}
	return h.catalog
}
func etagMatches(header, etag string) bool {
	for _, value := range strings.Split(header, ",") {
		value = strings.TrimSpace(value)
		if value == "*" || strings.TrimPrefix(value, "W/") == strings.TrimPrefix(etag, "W/") {
			return true
		}
	}
	return false
}
func (a *App) handleWorldSites(w http.ResponseWriter, r *http.Request) {
	catalog := a.world.publicCatalog(a.cfg)
	w.Header().Set("Cache-Control", "private, no-cache")
	w.Header().Set("Vary", "Accept-Encoding")
	w.Header().Set("ETag", catalog.etag)
	if etagMatches(r.Header.Get("If-None-Match"), catalog.etag) {
		w.WriteHeader(http.StatusNotModified)
		return
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	body := catalog.body
	if acceptsGzip(r.Header.Get("Accept-Encoding")) {
		body = catalog.compressed
		w.Header().Set("Content-Encoding", "gzip")
	}
	if r.Method != http.MethodHead {
		w.Write(body)
	}
}
