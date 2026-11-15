package main

import (
	"bytes"
	"compress/gzip"
	"crypto/sha256"
	"fmt"
	"io/fs"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"
)

type packedAsset struct {
	body       []byte
	etag, mime string
}

var packedWorldAssets = sync.OnceValue(func() map[string]packedAsset {
	out := map[string]packedAsset{}
	files, _ := staticFS.ReadDir("static")
	for _, file := range files {
		name := file.Name()
		if !strings.HasPrefix(name, "world-") || !(strings.HasSuffix(name, ".js") || strings.HasSuffix(name, ".css")) {
			continue
		}
		raw, err := staticFS.ReadFile("static/" + name)
		if err != nil {
			continue
		}
		var buffer bytes.Buffer
		writer, _ := gzip.NewWriterLevel(&buffer, gzip.BestCompression)
		if _, err = writer.Write(raw); err != nil {
			continue
		}
		if err = writer.Close(); err != nil {
			continue
		}
		mime := "text/javascript; charset=utf-8"
		if strings.HasSuffix(name, ".css") {
			mime = "text/css; charset=utf-8"
		}
		out[name] = packedAsset{body: buffer.Bytes(), etag: fmt.Sprintf(`"%x-gzip"`, sha256.Sum256(raw)), mime: mime}
	}
	return out
})

func acceptsGzip(value string) bool {
	for _, part := range strings.Split(value, ",") {
		fields := strings.Split(strings.TrimSpace(part), ";")
		if !strings.EqualFold(fields[0], "gzip") {
			continue
		}
		for _, parameter := range fields[1:] {
			if value, ok := strings.CutPrefix(strings.TrimSpace(parameter), "q="); ok {
				q, err := strconv.ParseFloat(value, 64)
				if err != nil || !(q > 0 && q <= 1) {
					return false
				}
			}
		}
		return true
	}
	return false
}

func (a *App) handleStatic(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("file")
	if asset, ok := packedWorldAssets()[name]; ok {
		w.Header().Set("Vary", "Accept-Encoding")
		if acceptsGzip(r.Header.Get("Accept-Encoding")) {
			w.Header().Set("Content-Encoding", "gzip")
			w.Header().Set("Content-Type", asset.mime)
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
			w.Header().Set("ETag", asset.etag)
			http.ServeContent(w, r, name, time.Time{}, bytes.NewReader(asset.body))
			return
		}
	}
	if _, err := fs.Stat(staticFS, "static/"+name); err != nil {
		w.Header().Set("Cache-Control", "no-store")
		http.NotFound(w, r)
		return
	}
	w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
	if strings.HasSuffix(name, ".m4a") {
		w.Header().Set("Content-Type", "audio/mp4")
	}
	http.ServeFileFS(w, r, staticFS, "static/"+name)
}
