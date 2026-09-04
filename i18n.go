package main

import (
	"fmt"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// 多语言：模板与代码里的中文原文就是 key，按语言查表；查不到回落英文，再回落中文。
// 各语言表在 i18n_<lang>.go 里注册（translations[lang][中文] = 译文），占位符用 %s / %d。

type langInfo struct{ Code, Name, Short string }

var langs = []langInfo{
	{"zh", "中文", "中"}, {"en", "English", "EN"}, {"ja", "日本語", "日"}, {"ko", "한국어", "한"}, {"ru", "Русский", "RU"}, {"es", "Español", "ES"},
	{"pt", "Português", "PT"}, {"fr", "Français", "FR"}, {"de", "Deutsch", "DE"}, {"vi", "Tiếng Việt", "VI"}, {"id", "Bahasa Indonesia", "ID"}, {"tr", "Türkçe", "TR"},
}

// shortOf 当前语言的短标签，导航栏上显示（比地球图标更直观：一眼看出现在是哪种语言）。
func shortOf(code string) string {
	for _, l := range langs {
		if l.Code == code {
			return l.Short
		}
	}
	return "中"
}

var translations = map[string]map[string]string{}

func langOK(c string) bool {
	for _, l := range langs {
		if l.Code == c {
			return true
		}
	}
	return false
}

// tr 翻译一句（s 为中文原文），带参数时按 fmt 格式化。
func tr(lang, s string, args ...any) string {
	if lang != "zh" && s != "" {
		if t, ok := translations[lang][s]; ok {
			s = t // 译文为空串也算有（中文量词在别的语言里就是没有）
		} else if t, ok := translations["en"][s]; ok {
			s = t
		}
	}
	if len(args) > 0 {
		return fmt.Sprintf(s, args...)
	}
	return s
}

// lang 当前请求的语言：cookie lang 优先，其次 Accept-Language，都没有就中文。
func (a *App) lang(r *http.Request) string {
	if c := cookieVal(r, "lang"); langOK(c) {
		return c
	}
	for _, part := range strings.Split(r.Header.Get("Accept-Language"), ",") {
		tag := strings.ToLower(strings.TrimSpace(strings.SplitN(part, ";", 2)[0]))
		if tag == "" || tag == "*" {
			continue
		}
		primary := strings.SplitN(tag, "-", 2)[0]
		if langOK(primary) {
			return primary
		}
		return "en" // 列表外的语言一律英文
	}
	return "zh"
}

func (a *App) T(r *http.Request, s string, args ...any) string { return tr(a.lang(r), s, args...) }

// handleLang GET /lang?to=xx：记 cookie 一年，回到来时的页面。
func (a *App) handleLang(w http.ResponseWriter, r *http.Request) {
	to := r.URL.Query().Get("to")
	if !langOK(to) {
		http.Redirect(w, r, "/", http.StatusFound)
		return
	}
	a.setCookie(w, "lang", to, 365*24*3600)
	back := "/"
	if ref, err := url.Parse(r.Referer()); err == nil && ref.Path != "" && ref.Path != "/lang" {
		back = ref.Path
		if ref.RawQuery != "" {
			back += "?" + ref.RawQuery
		}
	}
	http.Redirect(w, r, back, http.StatusFound)
}

// agoL 相对时间（按语言）。
func agoL(lang string, t int64) string {
	if t <= 0 {
		return ""
	}
	d := time.Since(time.UnixMilli(t))
	switch {
	case d < time.Minute:
		return tr(lang, "刚刚")
	case d < time.Hour:
		return tr(lang, "%d 分钟前", int(d.Minutes()))
	case d < 24*time.Hour:
		return tr(lang, "%d 小时前", int(d.Hours()))
	case d < 30*24*time.Hour:
		return tr(lang, "%d 天前", int(d.Hours()/24))
	}
	return time.UnixMilli(t).Format("2006-01-02")
}

// langFuncs 每种语言一套模板函数：T 与几个会输出文案的函数都绑定到该语言。
func langFuncs(lang string) map[string]any {
	return map[string]any{
		"T":   func(s string, args ...any) string { return tr(lang, s, args...) },
		"ago": func(t int64) string { return agoL(lang, t) },
		"level": func(exp int64) LevelInfo {
			li := levelOf(exp)
			li.Title, li.NextT = tr(lang, li.Title), tr(lang, li.NextT)
			return li
		},
		"beggarLevel": func(exp int64) string { return tr(lang, beggarLevel(exp)) },
		"sectTitle":   func(pos int) string { return tr(lang, sectTitle(pos)) },
		"donorTier":   func(e8 int64) string { return tr(lang, donorTier(e8)) },
		"statusText":  func(s string) string { return tr(lang, statusText(s)) },
	}
}
