package main

import (
	"bytes"
	"crypto/sha1"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"
)

// xUser X 用户资料（来自推文接口或头像服务）。
type xUser struct {
	ID     string // 数字用户 ID（id_str）
	Name   string
	Handle string
	Avatar string // 原始头像 URL
}

var xHC = &http.Client{Timeout: 12 * time.Second}

// avatarHC 抓头像：不跟随跳转（防跳到内网），域名白名单在 downloadAvatar 里校验。
var avatarHC = &http.Client{Timeout: 12 * time.Second, CheckRedirect: func(*http.Request, []*http.Request) error { return http.ErrUseLastResponse }}

// fetchTweet 用 X 嵌入组件的公开接口读一条推文（免 API Key），返回正文、作者与发推时间（毫秒，解析失败为 0）。
func (a *App) fetchTweet(id string) (string, xUser, int64, error) {
	req, _ := http.NewRequest("GET", a.cfg.XTweetAPI+"/tweet-result?id="+id+"&token="+tweetToken(id), nil)
	req.Header.Set("Accept", "application/json")
	req.Header.Set("User-Agent", "Mozilla/5.0 (newbeggar)")
	resp, err := xHC.Do(req)
	if err != nil {
		return "", xUser{}, 0, fmt.Errorf("连不上 X 接口: %w", err)
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(io.LimitReader(resp.Body, 1<<20))
	if resp.StatusCode == 404 {
		return "", xUser{}, 0, errors.New("找不到这条推文（链接不对，或推文不公开）")
	}
	if resp.StatusCode != 200 {
		return "", xUser{}, 0, fmt.Errorf("X 接口暂时不可用（HTTP %d），稍后再试", resp.StatusCode)
	}
	var t struct {
		Typename  string `json:"__typename"`
		Text      string `json:"text"`
		CreatedAt string `json:"created_at"`
		User      struct {
			IDStr      string `json:"id_str"`
			Name       string `json:"name"`
			ScreenName string `json:"screen_name"`
			Avatar     string `json:"profile_image_url_https"`
		} `json:"user"`
	}
	if err := json.Unmarshal(body, &t); err != nil || t.User.ScreenName == "" {
		return "", xUser{}, 0, errors.New("推文读不到（可能被删除或账号受保护）")
	}
	var created int64
	for _, layout := range []string{time.RubyDate, time.RFC3339} {
		if ts, err := time.Parse(layout, t.CreatedAt); err == nil {
			created = ts.UnixMilli()
			break
		}
	}
	return t.Text, xUser{ID: t.User.IDStr, Name: t.User.Name, Handle: t.User.ScreenName, Avatar: t.User.Avatar}, created, nil
}

// avatarHostOK 头像只从 X 图片域和配置的头像服务抓。
func (a *App) avatarHostOK(rawURL string) bool {
	u, err := url.Parse(rawURL)
	if err != nil || u.Host == "" {
		return false
	}
	host := strings.ToLower(u.Hostname())
	for _, base := range []string{a.cfg.XTweetAPI, a.cfg.XAvatarAPI} {
		if bu, err := url.Parse(base); err == nil && strings.EqualFold(bu.Host, u.Host) {
			return true
		}
	}
	return u.Scheme == "https" && (host == "twimg.com" || strings.HasSuffix(host, ".twimg.com"))
}

// avatarFile 头像文件名：sha1(handle 小写 + 抓取时间) + 扩展名——每次抓取换名字，浏览器缓存不会拿到旧图。
func avatarFile(handle, contentType string) string {
	h := sha1.Sum([]byte(strings.ToLower(handle) + ":" + strconv.FormatInt(ms(), 10)))
	ext := ".jpg"
	switch {
	case strings.Contains(contentType, "png"):
		ext = ".png"
	case strings.Contains(contentType, "webp"):
		ext = ".webp"
	case strings.Contains(contentType, "gif"):
		ext = ".gif"
	}
	return hex.EncodeToString(h[:]) + ext
}

// downloadAvatar 把头像抓到本地（≤2MB，必须是能解码的图片，域名白名单，不跟随跳转），返回文件名。
func (a *App) downloadAvatar(handle, rawURL string) (string, error) {
	if !a.avatarHostOK(rawURL) {
		return "", errors.New("头像地址不在允许的域名")
	}
	req, _ := http.NewRequest("GET", rawURL, nil)
	req.Header.Set("User-Agent", "Mozilla/5.0 (newbeggar)")
	resp, err := avatarHC.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	ct := resp.Header.Get("Content-Type")
	if resp.StatusCode != 200 || !strings.HasPrefix(ct, "image/") {
		return "", fmt.Errorf("头像不可用 (HTTP %d %s)", resp.StatusCode, ct)
	}
	data, err := io.ReadAll(io.LimitReader(resp.Body, 2<<20))
	if err != nil || len(data) < 32 {
		return "", errors.New("头像下载失败")
	}
	if !strings.Contains(ct, "webp") {
		if _, _, err := image.DecodeConfig(bytes.NewReader(data)); err != nil {
			return "", errors.New("头像不是有效图片")
		}
	}
	if err := os.MkdirAll(a.cfg.AvatarDir, 0o755); err != nil {
		return "", err
	}
	name := avatarFile(handle, ct)
	tmp := filepath.Join(a.cfg.AvatarDir, name+".tmp")
	if err := os.WriteFile(tmp, data, 0o644); err != nil {
		return "", err
	}
	return name, os.Rename(tmp, filepath.Join(a.cfg.AvatarDir, name))
}

// xProfileCache 施主 X 头像缓存（内存 + xprofiles 表）。
type xProfileCache struct {
	mu       sync.Mutex
	files    map[string]string // handle 小写 → 文件名（"" 表示抓过但没有）
	inflight map[string]bool
}

func (a *App) xAvatar(handle string) string {
	if handle == "" {
		return ""
	}
	key := strings.ToLower(handle)
	a.xp.mu.Lock()
	f, ok := a.xp.files[key]
	a.xp.mu.Unlock()
	if ok {
		return f
	}
	if p, err := a.st.GetXProfile(key); err == nil && p != nil {
		a.xp.mu.Lock()
		a.xp.files[key] = p.Avatar
		a.xp.mu.Unlock()
		return p.Avatar
	}
	return ""
}

// ensureXProfile 异步抓取施主头像（7 天内抓过的不重复抓）。
func (a *App) ensureXProfile(handle string) {
	key := strings.ToLower(handle)
	if key == "" {
		return
	}
	if p, err := a.st.GetXProfile(key); err == nil && p != nil && ms()-p.FetchedAt < 7*24*3600*1000 {
		return
	}
	a.xp.mu.Lock()
	if a.xp.inflight[key] {
		a.xp.mu.Unlock()
		return
	}
	a.xp.inflight[key] = true
	a.xp.mu.Unlock()
	go func() {
		defer func() {
			a.xp.mu.Lock()
			delete(a.xp.inflight, key)
			a.xp.mu.Unlock()
		}()
		old, _ := a.st.GetXProfile(key)
		fetchedAt := ms()
		file, err := a.downloadAvatar(handle, a.cfg.XAvatarAPI+"/x/"+handle+"?fallback=false")
		if err != nil {
			log.Printf("[warn] 抓取 @%s 头像失败: %v", handle, err)
			if old != nil && old.Avatar != "" {
				file = old.Avatar // 抓失败沿用旧图
			} else {
				fetchedAt = ms() - (7*24-1)*3600*1000 // 没图：1 小时后允许重试
			}
		}
		if err := a.st.UpsertXProfile(key, "", file, fetchedAt); err != nil {
			log.Printf("[error] 保存 X 资料 %s: %v", key, err)
			return
		}
		if old != nil && old.Avatar != "" && old.Avatar != file {
			if a.st.AvatarInUse(old.Avatar) {
				a.st.SetSiteAvatarByHandle(handle, file) // 站长头像随之更新，再删旧文件
			}
			os.Remove(filepath.Join(a.cfg.AvatarDir, old.Avatar))
		}
		a.st.FillSiteAvatarByHandle(handle, file) // 主站（MAIN_X）等还没头像的站点补上
		a.xp.mu.Lock()
		a.xp.files[key] = file
		a.xp.mu.Unlock()
	}()
}

// siteAvatar 站长头像：X 验证过的用 X 头像，否则用 emoji。
func (a *App) serveAvatar(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("file")
	if !reAvatarFile.MatchString(name) {
		http.NotFound(w, r)
		return
	}
	w.Header().Set("Cache-Control", "public, max-age=604800")
	http.ServeFile(w, r, filepath.Join(a.cfg.AvatarDir, name))
}
