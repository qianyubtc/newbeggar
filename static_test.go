package main

import (
	"bytes"
	"compress/gzip"
	"io"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestWorldStaticRepresentations(t *testing.T) {
	for name, asset := range packedWorldAssets() {
		request := func(encoding, etag, method string) *httptest.ResponseRecorder {
			r := httptest.NewRequest(method, "/static/"+name, nil)
			r.SetPathValue("file", name)
			r.Header.Set("Accept-Encoding", encoding)
			r.Header.Set("If-None-Match", etag)
			w := httptest.NewRecorder()
			new(App).handleStatic(w, r)
			return w
		}
		raw, err := staticFS.ReadFile("static/" + name)
		if err != nil {
			t.Fatal(err)
		}
		w := request("gzip, br", "", "GET")
		if w.Code != 200 || w.Header().Get("Content-Encoding") != "gzip" || w.Header().Get("Vary") != "Accept-Encoding" || !strings.Contains(w.Header().Get("Cache-Control"), "immutable") {
			t.Fatalf("compressed headers: %v %d", w.Header(), w.Code)
		}
		reader, err := gzip.NewReader(bytes.NewReader(w.Body.Bytes()))
		if err != nil {
			t.Fatal(err)
		}
		unpacked, err := io.ReadAll(reader)
		reader.Close()
		if err != nil || !bytes.Equal(raw, unpacked) {
			t.Fatal("gzip representation changed asset content")
		}
		if len(asset.body) >= len(raw)/2 {
			t.Fatalf("expected useful compression for %s", name)
		}
		for _, encoding := range []string{"", "gzip;q=0", "br, gzip;q=NaN", "gzip;q=invalid"} {
			w = request(encoding, "", "GET")
			if w.Header().Get("Content-Encoding") != "" || !bytes.Equal(w.Body.Bytes(), raw) {
				t.Fatalf("identity negotiation: %q", encoding)
			}
		}
		if w = request("gzip", asset.etag, "GET"); w.Code != 304 || w.Body.Len() != 0 {
			t.Fatal("conditional request must return 304 without body")
		}
		if w = request("gzip", "", "HEAD"); w.Code != 200 || w.Body.Len() != 0 {
			t.Fatal("HEAD must not send body")
		}
		t.Logf("%s: %d -> %d bytes (%.1f%% smaller)", name, len(raw), len(asset.body), 100*(1-float64(len(asset.body))/float64(len(raw))))
	}
	r := httptest.NewRequest("GET", "/static/missing-world.js", nil)
	r.SetPathValue("file", "missing-world.js")
	w := httptest.NewRecorder()
	new(App).handleStatic(w, r)
	if w.Code != 404 || w.Header().Get("Cache-Control") != "no-store" {
		t.Fatal("missing assets must not be cached permanently")
	}
}
