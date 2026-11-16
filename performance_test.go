package main

import (
	"fmt"
	"net/http/httptest"
	"path/filepath"
	"testing"
)

func performanceFixture(t testing.TB) *App {
	t.Helper()
	cfg := &Config{BaseURL: "http://localhost", DBPath: filepath.Join(t.TempDir(), "performance.db"), AdminPassword: "local-benchmark-only", MainName: "Benchmark", Currency: "USDT", CoinExp: 1, MoneyExp: 10, CoinsPerDay: 1, MinAmountE8: 10000000, MaxAmountE8: 1000000000000, WorldEnabled: true, RaidMaxBet: 50}
	a, err := newApp(cfg)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(a.Close)
	tx, err := a.st.db.Begin()
	if err != nil {
		t.Fatal(err)
	}
	for i := 1; i <= 540; i++ {
		_, err = tx.Exec(`INSERT INTO sites(slug,name,coins,created_at,updated_at) VALUES(?,?,?,0,0)`, fmt.Sprintf("bench%d", i), fmt.Sprintf("Bench %d", i), i%100)
		if err != nil {
			t.Fatal(err)
		}
	}
	for i := 0; i < 5400; i++ {
		_, err = tx.Exec(`INSERT INTO donations(code,site_id,nickname,nick_key,amount,amount_e8,actual_e8,currency,status,claim_token,created_at,paid_at) VALUES(?,?,?,?, '1',100000000,100000000,'USDT','paid','benchmark',0,?)`, fmt.Sprintf("BENCH%d", i), i%541+1, "Benchmark", fmt.Sprintf("donor%d", i%100), ms())
		if err != nil {
			t.Fatal(err)
		}
	}
	if err = tx.Commit(); err != nil {
		t.Fatal(err)
	}
	if err = a.refreshWorldSites(); err != nil {
		t.Fatal(err)
	}
	return a
}
func BenchmarkPublicRanks(b *testing.B) {
	a := performanceFixture(b)
	b.ReportAllocs()
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		for _, by := range []string{"amount", "week", "coins"} {
			if _, err := a.st.SubsiteRank(2000, false, by); err != nil {
				b.Fatal(err)
			}
		}
		if _, err := a.st.SitePositions(10, 1); err != nil {
			b.Fatal(err)
		}
	}
}
func BenchmarkHomePage(b *testing.B) {
	a := performanceFixture(b)
	r := httptest.NewRequest("GET", "http://localhost/", nil)
	b.ReportAllocs()
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		w := httptest.NewRecorder()
		a.ServeHTTP(w, r)
		if w.Code != 200 {
			b.Fatal(w.Code)
		}
	}
}
func BenchmarkWorldCatalog(b *testing.B) {
	a := performanceFixture(b)
	r := httptest.NewRequest("GET", "http://localhost/api/world/sites", nil)
	b.ReportAllocs()
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		w := httptest.NewRecorder()
		a.ServeHTTP(w, r)
		if w.Code != 200 {
			b.Fatal(w.Code)
		}
	}
}
