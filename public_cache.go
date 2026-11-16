package main

import (
	"encoding/base64"
	"fmt"
	"maps"
	"slices"
	"sync"
	"time"

	qrcode "github.com/skip2/go-qrcode"
)

// Only public rankings are memoized. Auth, balances and payment state always
// read the store. SQLite's write counter invalidates even direct SQL changes.
type publicRankCache struct {
	mu               sync.Mutex
	changes, version int64
	expires          time.Time
	rows             map[string][]SiteRow
	positions        map[string]map[int64]int
}

func (s *Store) checkPublicCache() error {
	var changes, version int64
	// Store uses a single SQLite connection. data_version also catches other
	// connections writing to the database; the TTL bounds connection replacement.
	if err := s.db.QueryRow(`SELECT total_changes(),data_version FROM pragma_data_version`).Scan(&changes, &version); err != nil {
		return err
	}
	c := &s.publicCache
	if c.rows == nil || changes != c.changes || version != c.version || time.Now().After(c.expires) {
		c.rows = map[string][]SiteRow{}
		c.positions = map[string]map[int64]int{}
		c.changes = changes
		c.version = version
		c.expires = time.Now().Add(2 * time.Second)
	}
	return nil
}
func (s *Store) SubsiteRank(limit int, admin bool, by string) ([]SiteRow, error) {
	if admin {
		return s.querySubsiteRank(limit, admin, by)
	}
	c := &s.publicCache
	c.mu.Lock()
	defer c.mu.Unlock()
	if err := s.checkPublicCache(); err != nil {
		return nil, err
	}
	key := fmt.Sprintf("%d/%s/%d", limit, by, weekStart())
	if rows, ok := c.rows[key]; ok {
		return slices.Clone(rows), nil
	}
	rows, err := s.querySubsiteRank(limit, false, by)
	if err == nil {
		if len(c.rows) >= 16 {
			clear(c.rows)
		}
		c.rows[key] = slices.Clone(rows)
	}
	return rows, err
}
func (s *Store) SitePositions(moneyExp, coinExp int64) (map[int64]int, error) {
	c := &s.publicCache
	c.mu.Lock()
	defer c.mu.Unlock()
	if err := s.checkPublicCache(); err != nil {
		return nil, err
	}
	key := fmt.Sprintf("%d/%d", moneyExp, coinExp)
	if positions, ok := c.positions[key]; ok {
		return maps.Clone(positions), nil
	}
	positions, err := s.querySitePositions(moneyExp, coinExp)
	if err == nil {
		if len(c.positions) >= 16 {
			clear(c.positions)
		}
		c.positions[key] = maps.Clone(positions)
	}
	return positions, err
}
func (a *App) shareQRCode(url string) string {
	a.qrMu.Lock()
	defer a.qrMu.Unlock()
	if value, ok := a.qrCache[url]; ok {
		return value
	}
	png, err := qrcode.Encode(url, qrcode.Medium, 300)
	if err != nil {
		return ""
	}
	if a.qrCache == nil || len(a.qrCache) >= 256 {
		a.qrCache = map[string]string{}
	}
	value := base64.StdEncoding.EncodeToString(png)
	a.qrCache[url] = value
	return value
}
