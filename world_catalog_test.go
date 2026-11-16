package main

import (
	"bytes"
	"compress/gzip"
	"io"
	"net/http/httptest"
	"testing"
)

func TestWorldCatalogRevalidation(t *testing.T) {
	a := performanceFixture(t)
	get := func(etag, encoding string) *httptest.ResponseRecorder {
		r := httptest.NewRequest("GET", "/api/world/sites", nil)
		r.Header.Set("If-None-Match", etag)
		r.Header.Set("Accept-Encoding", encoding)
		w := httptest.NewRecorder()
		a.ServeHTTP(w, r)
		return w
	}
	first := get("", "")
	etag := first.Header().Get("ETag")
	if first.Code != 200 || etag == "" {
		t.Fatal("missing catalog")
	}
	unchanged := get(etag, "")
	if unchanged.Code != 304 || unchanged.Body.Len() != 0 {
		t.Fatal("unchanged catalog must transfer no body")
	}
	packed := get("", "gzip")
	reader, e := gzip.NewReader(packed.Body)
	if e != nil {
		t.Fatal(e)
	}
	raw, e := io.ReadAll(reader)
	reader.Close()
	if e != nil || !bytes.Equal(raw, first.Body.Bytes()) {
		t.Fatal("gzip changed catalog")
	}
	if packed.Header().Get("Vary") != "Accept-Encoding" {
		t.Fatal("missing negotiation header")
	}
	a.world.coin(2, 100000, 1)
	if w := get(etag, ""); w.Code != 200 || w.Header().Get("ETag") == etag {
		t.Fatal("coin change didn't invalidate catalog")
	}
	old := get("", "").Header().Get("ETag")
	if _, e = a.st.db.Exec(`UPDATE sites SET name='changed' WHERE id=2`); e != nil {
		t.Fatal(e)
	}
	if e = a.refreshWorldSites(); e != nil {
		t.Fatal(e)
	}
	if w := get(old, ""); w.Code != 200 || w.Header().Get("ETag") == old {
		t.Fatal("registry refresh didn't invalidate catalog")
	}
	stable := get("", "").Header().Get("ETag")
	if e = a.refreshWorldSites(); e != nil {
		t.Fatal(e)
	}
	if w := get(stable, ""); w.Code != 304 {
		t.Fatal("identical refresh should retain content validator")
	}
}
