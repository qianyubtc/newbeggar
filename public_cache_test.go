package main

import (
	"database/sql"
	"reflect"
	"testing"
	"time"
)

func TestPublicCacheInvalidationAndIsolation(t *testing.T) {
	a := performanceFixture(t)
	s := a.st
	check := func() {
		t.Helper()
		for _, by := range []string{"amount", "week", "coins"} {
			got, e := s.SubsiteRank(2000, false, by)
			if e != nil {
				t.Fatal(e)
			}
			want, e := s.querySubsiteRank(2000, false, by)
			if e != nil || !reflect.DeepEqual(got, want) {
				t.Fatalf("stale %s rankings: %v", by, e)
			}
		}
		got, e := s.SitePositions(10, 1)
		if e != nil {
			t.Fatal(e)
		}
		want, e := s.querySitePositions(10, 1)
		if e != nil || !reflect.DeepEqual(got, want) {
			t.Fatal("stale positions")
		}
	}
	check()
	rows, _ := s.SubsiteRank(2000, false, "coins")
	rows[0].Name = "caller mutation"
	positions, _ := s.SitePositions(10, 1)
	clear(positions)
	check()
	for _, q := range []string{`UPDATE sites SET coins=100000 WHERE id=2`, `UPDATE donations SET actual_e8=700000000 WHERE id=1`, `UPDATE sites SET listed=0 WHERE id=2`, `UPDATE sites SET status='disabled' WHERE id=3`, `UPDATE sites SET name='new name' WHERE id=4`} {
		if _, e := s.db.Exec(q); e != nil {
			t.Fatal(e)
		}
		check()
	}
	// Out-of-process writes must not rely on this connection's total_changes().
	other, e := sql.Open("sqlite", a.cfg.DBPath)
	if e != nil {
		t.Fatal(e)
	}
	defer other.Close()
	if _, e = other.Exec(`UPDATE sites SET coins=200000 WHERE id=5`); e != nil {
		t.Fatal(e)
	}
	check()
	s.publicCache.mu.Lock()
	s.publicCache.expires = time.Time{}
	s.publicCache.mu.Unlock()
	check()
}
