package main

import (
	"net/http"
	"net/url"
	"testing"
)

func TestSiteMigrationRedirect(t *testing.T) {
	e := newEnv(t)
	mk := func(slug string) int64 {
		id, err := e.app.st.CreateSite(&Site{Slug: slug, Name: slug, PassHash: hashPassword("test-pass-123"), Currency: "USDT", Listed: true})
		if err != nil {
			t.Fatal(err)
		}
		return id
	}
	oldID, newID, nextID := mk("old_account"), mk("new_account"), mk("next_account")
	move := func(from, to int64) {
		if _, err := e.app.st.db.Exec(`UPDATE sites SET status='disabled', listed=0, moved_to=? WHERE id=?`, to, from); err != nil {
			t.Fatal(err)
		}
	}
	c := e.client()
	st, _, _ := c.post("/login", url.Values{"slug": {"old_account"}, "password": {"test-pass-123"}})
	must(t, st == http.StatusFound, "迁移前可登录")
	move(oldID, newID)
	st, _, h := c.get("/old_account?from=shared")
	must(t, st == http.StatusMovedPermanently && h.Get("Location") == "/new_account?from=shared", "旧地址永久跳转并保留参数: %d %v", st, h)
	st, _, h = c.get("/manage")
	must(t, st == http.StatusFound && h.Get("Location") == "/login", "旧站会话不能再管理: %d %v", st, h)
	st, _, _ = c.post("/login", url.Values{"slug": {"old_account"}, "password": {"test-pass-123"}})
	must(t, st == http.StatusUnauthorized, "旧站口令不能登录")
	st, _, _ = c.get("/new_account")
	must(t, st == http.StatusOK, "新站照常访问")
	move(newID, nextID)
	st, _, h = c.get("/old_account")
	must(t, st == http.StatusMovedPermanently && h.Get("Location") == "/next_account", "再次迁移后直接跳最终地址")
	move(nextID, oldID)
	st, _, _ = c.get("/old_account")
	must(t, st == http.StatusNotFound, "迁移环返回 404")
	move(oldID, 999999)
	st, _, _ = c.get("/old_account")
	must(t, st == http.StatusNotFound, "目标站不存在时返回 404")
	move(oldID, newID)
	move(newID, 0)
	st, _, _ = c.get("/old_account")
	must(t, st == http.StatusNotFound, "目标被除名时不重定向")
}
