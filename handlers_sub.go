package main

import (
	"crypto/hmac"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

// ---------- 开站：X 发推验证 ----------

type newForm struct{ Slug, Slogan, Story string }

type newPage struct {
	Base
	Step      int    // 1 发推验证 / 2 填资料（或设新口令）
	Purpose   string // new | reset
	Code      string
	Texts     []string // 可选的发推话术（含验证码），页面上可编辑
	SiteBase  string   // 裸域名，前端把链接换成「域名/用户名」用
	IntentURL string
	TweetURL  string
	Err       string
	Prof      *xUser
	AvatarURL string
	F         newForm
	Site      *Site // reset：要重置口令的站
}

type verifyProfile struct {
	Name       string `json:"name"`
	Handle     string `json:"handle"`
	XID        string `json:"xid,omitempty"`
	AvatarURL  string `json:"avatar_url"`
	AvatarFile string `json:"avatar_file"`
	SiteID     int64  `json:"site_id,omitempty"`
}

// shuffleTexts 打乱话术顺序（页面用第一条当默认）。
func shuffleTexts(t []string) {
	for i := len(t) - 1; i > 0; i-- {
		j := int(randBytes(1)[0]) % (i + 1)
		t[i], t[j] = t[j], t[i]
	}
}

// tweetTexts 发推话术模板，第一条为默认；都带验证码和站点链接（顺便传播）。
func (a *App) tweetTexts(lang, code, purpose string) []string {
	site := shortURL(a.cfg.BaseURL) // 推文里只放裸域名，短
	if purpose == "reset" {
		return []string{
			tr(lang, "我在「%s」要饭的碗口令忘了，发推证明是我本人 🥣 %s %s", tr(lang, a.cfg.SiteTitle), code, site),
		}
	}
	return []string{
		tr(lang, "我在「%s」摆了个碗 🥣 行行好，赏口饭吃～ %s #赛博丐帮 %s", tr(lang, a.cfg.SiteTitle), code, site),
		tr(lang, "本人已加入赛博丐帮，正式开丐 🧎 一毛也是爱，投个钢镚也行 🪙 %s #赛博丐帮 %s", code, site),
		tr(lang, "不上班了，改行要饭。碗在这，各位大善人行行好 🥣 %s #赛博丐帮 %s", code, site),
		tr(lang, "丐帮招新，我先带头要饭 🥣 谁投币谁上功德簿，不投的丢个钢镚也算 %s #赛博丐帮 %s", code, site),
	}
}

func intentFor(text string) string { return "https://x.com/intent/post?text=" + url.QueryEscape(text) }

func (a *App) intentURL(lang, code string) string {
	return intentFor(a.tweetTexts(lang, code, "new")[0])
}

// startVerify 生成验证码并渲染第一步。验证码与浏览器 cookie 里的密钥绑定：推文是公开的，光知道码没用。
func (a *App) startVerify(w http.ResponseWriter, r *http.Request, purpose, errMsg string) {
	if !a.lim.allow("newcode:"+a.ip(r), 30, 10*time.Minute) {
		a.errorPage(w, r, http.StatusTooManyRequests, "手速太快了", "歇一会儿再来。")
		return
	}
	if files, err := a.st.PruneVerify(); err == nil {
		for _, f := range files {
			os.Remove(filepath.Join(a.cfg.AvatarDir, f))
		}
	}
	// 同一浏览器反复进来（从 X 发完推回来页面重载了）复用没用完的码，别每次刷新换一个把人搞糊涂
	code := ""
	if pc := cookieVal(r, "xvp_"+purpose); pc != "" {
		if v, err := a.st.GetVerify(pc); err == nil && v != nil && !v.Used && v.Purpose == purpose && ms()-v.CreatedAt < 20*3600*1000 && ownsVerify(r, v) {
			code = v.Code
		}
	}
	if code == "" {
		code = "BEG-" + randCode(5)
		secret := randHex(16)
		if err := a.st.CreateVerify(code, purpose, hashToken(secret)); err != nil {
			a.fail(w, r, err)
			return
		}
		a.setCookie(w, "xv_"+code, secret, 24*3600)
		a.setCookie(w, "xvp_"+purpose, code, 24*3600)
	}
	texts := a.tweetTexts(a.lang(r), code, purpose)
	shuffleTexts(texts) // 每个人进来默认看到的话术不同，避免 X 上清一色同一句
	a.render(w, http.StatusOK, "new", newPage{Base: a.base(r), Step: 1, Purpose: purpose, Code: code, Texts: texts, SiteBase: shortURL(a.cfg.BaseURL), IntentURL: intentFor(texts[0]), Err: errMsg})
}

// ownsVerify 当前浏览器是否持有这个验证码的密钥。
func ownsVerify(r *http.Request, v *Verify) bool {
	c := cookieVal(r, "xv_"+v.Code)
	return c != "" && v.Secret != "" && hmac.Equal([]byte(hashToken(c)), []byte(v.Secret))
}

func (a *App) handleNewGet(w http.ResponseWriter, r *http.Request) {
	if !a.cfg.SubsitesEnabled {
		a.errorPage(w, r, http.StatusNotFound, "本站未开放开站", "")
		return
	}
	if a.currentSite(r) != nil {
		http.Redirect(w, r, "/manage", http.StatusFound)
		return
	}
	a.startVerify(w, r, "new", "")
}

func (a *App) handleResetGet(w http.ResponseWriter, r *http.Request) {
	a.startVerify(w, r, "reset", "")
}

// verifyTweet 校验「验证码 + 推文链接」：读推文，正文须含验证码，返回作者资料。
func (a *App) verifyTweet(r *http.Request, purpose string) (*Verify, *xUser, string) {
	code := strings.ToUpper(strings.TrimSpace(r.FormValue("code")))
	v, err := a.st.GetVerify(code)
	if err != nil || v == nil || v.Used || v.Purpose != purpose || ms()-v.CreatedAt > 24*3600*1000 || !ownsVerify(r, v) {
		return nil, nil, "验证码已失效（或不是本浏览器生成的），请重新生成"
	}
	id := tweetIDFrom(r.FormValue("tweet_url"))
	if id == "" {
		return v, nil, "推文链接不对，应形如 https://x.com/你的名字/status/1234567890"
	}
	text, u, created, err := a.fetchTweet(id)
	if err != nil {
		return v, nil, a.T(r, err.Error())
	}
	if !strings.Contains(strings.ToUpper(text), code) {
		// 页面上的码和推文里的不一致（发推后页面重载换了码）：推文里只要有本浏览器生成过的任何一个有效码就认
		found := false
		for _, c := range reAnyCode.FindAllString(strings.ToUpper(text), -1) {
			if c == code {
				continue
			}
			if v2, err := a.st.GetVerify(c); err == nil && v2 != nil && !v2.Used && v2.Purpose == purpose && ms()-v2.CreatedAt < 24*3600*1000 && ownsVerify(r, v2) {
				v, code, found = v2, c, true
				break
			}
		}
		if !found {
			return v, nil, a.T(r, "这条推文里没有验证码 %s，请检查是否发对了", code)
		}
	}
	if created > 0 && created < v.CreatedAt-10*60*1000 {
		return v, nil, "这条推文比验证码还早，请用生成验证码之后发的推文"
	}
	return v, &u, ""
}

func (a *App) handleNewVerify(w http.ResponseWriter, r *http.Request) {
	if !a.cfg.SubsitesEnabled {
		a.errorPage(w, r, http.StatusNotFound, "本站未开放开站", "")
		return
	}
	if a.limited(w, r, "verify", 10, 10*time.Minute) {
		return
	}
	v, u, msg := a.verifyTweet(r, "new")
	if msg != "" {
		if v == nil {
			a.startVerify(w, r, "new", msg)
			return
		}
		a.render(w, http.StatusBadRequest, "new", newPage{Base: a.base(r), Step: 1, Purpose: "new", Code: v.Code, Texts: a.tweetTexts(a.lang(r), v.Code, "new"), IntentURL: a.intentURL(a.lang(r), v.Code), TweetURL: r.FormValue("tweet_url"), Err: msg})
		return
	}
	if exist := a.siteOfX(u); exist != nil {
		a.render(w, http.StatusBadRequest, "new", newPage{Base: a.base(r), Step: 1, Purpose: "new", Code: v.Code, Texts: a.tweetTexts(a.lang(r), v.Code, "new"), IntentURL: a.intentURL(a.lang(r), v.Code),
			Err: a.T(r, "@%s 已经开过站了：%s。忘了口令可以在登录页用 X 重置。", u.Handle, a.cfg.BaseURL+exist.Path())})
		return
	}
	prof := verifyProfile{Name: cleanText(u.Name, 20, false), Handle: u.Handle, XID: u.ID, AvatarURL: u.Avatar}
	if prof.Name == "" || hasContact(prof.Name) {
		prof.Name = "@" + u.Handle
	}
	var old verifyProfile
	if v.Profile != "" && json.Unmarshal([]byte(v.Profile), &old) == nil && old.AvatarFile != "" && strings.EqualFold(old.Handle, u.Handle) {
		prof.AvatarFile = old.AvatarFile // 同一验证码重复验证，不重复下载
	} else if u.Avatar != "" {
		if f, err := a.downloadAvatar(u.Handle, strings.Replace(u.Avatar, "_normal", "_200x200", 1)); err == nil {
			prof.AvatarFile = f
		} else {
			a.logf("[warn] 抓取 @%s 头像失败: %v", u.Handle, err)
		}
	}
	pj, _ := json.Marshal(prof)
	if err := a.st.SetVerifyProfile(v.Code, string(pj)); err != nil {
		a.fail(w, r, err)
		return
	}
	a.render(w, http.StatusOK, "new", newPage{Base: a.base(r), Step: 2, Purpose: "new", Code: v.Code, Prof: &xUser{Name: prof.Name, Handle: prof.Handle},
		AvatarURL: avatarURL(prof.AvatarFile), F: newForm{Slug: slugForHandle(prof.Handle), Slogan: "行行好，赏口饭吃 🙏"}})
}

func avatarURL(file string) string {
	if file == "" {
		return ""
	}
	return "/a/" + file
}

// loadVerified 第二步：取回已验证的资料。
func (a *App) loadVerified(r *http.Request, purpose string) (*Verify, *verifyProfile, string) {
	code := strings.ToUpper(strings.TrimSpace(r.FormValue("code")))
	v, err := a.st.GetVerify(code)
	if err != nil || v == nil || v.Used || v.Purpose != purpose || v.Profile == "" || ms()-v.CreatedAt > 24*3600*1000 || !ownsVerify(r, v) {
		return nil, nil, "验证已失效，请重新验证"
	}
	var prof verifyProfile
	if err := json.Unmarshal([]byte(v.Profile), &prof); err != nil || prof.Handle == "" {
		return nil, nil, "验证已失效，请重新验证"
	}
	return v, &prof, ""
}

func (a *App) handleNewPost(w http.ResponseWriter, r *http.Request) {
	if !a.cfg.SubsitesEnabled {
		a.errorPage(w, r, http.StatusNotFound, "本站未开放开站", "")
		return
	}
	if a.limited(w, r, "new", 5, 10*time.Minute) {
		return
	}
	v, prof, msg := a.loadVerified(r, "new")
	if msg != "" {
		a.startVerify(w, r, "new", msg)
		return
	}
	f := newForm{Slug: slugForHandle(prof.Handle), Slogan: cleanText(r.FormValue("slogan"), 60, false)} // 路径 = X 用户名，不让用户自己填
	p := newPage{Base: a.base(r), Step: 2, Purpose: "new", Code: v.Code, Prof: &xUser{Name: prof.Name, Handle: prof.Handle}, AvatarURL: avatarURL(prof.AvatarFile), F: f}
	bad := func(m string) {
		p.Err = m
		a.render(w, http.StatusBadRequest, "new", p)
	}
	if hasContact(f.Slogan) || hasContact(f.Story) {
		bad("口号和介绍里别放链接、联系方式")
		return
	}
	pw, pw2 := r.FormValue("password"), r.FormValue("password2")
	if len(pw) < 6 || len(pw) > 72 {
		bad("口令至少 6 位")
		return
	}
	if pw != pw2 {
		bad("两次口令不一致")
		return
	}
	if exist := a.siteOfX(&xUser{ID: prof.XID, Handle: prof.Handle}); exist != nil {
		bad(a.T(r, "@%s 已经开过站了", prof.Handle))
		return
	}
	site := &Site{Slug: f.Slug, Name: prof.Name, Slogan: f.Slogan, Story: f.Story, Avatar: "🥣", XURL: "https://x.com/" + prof.Handle,
		XHandle: prof.Handle, XName: prof.Name, XAvatar: prof.AvatarFile, XID: prof.XID, Skin: int64(randBytes(1)[0]) % skinCount,
		Listed: !a.cfg.SubsiteReview, PassHash: hashPassword(pw), Currency: a.cfg.Currency}
	id, err := a.st.CreateSite(site)
	if errors.Is(err, ErrSlugTaken) {
		bad(a.T(r, "路径 %s 已被占用（@%s 可能已经开过站，忘了口令可在登录页用 X 找回）", f.Slug, prof.Handle))
		return
	}
	if errors.Is(err, ErrXTaken) {
		bad(a.T(r, "@%s 已经开过站了", prof.Handle))
		return
	}
	if err != nil {
		a.fail(w, r, err)
		return
	}
	a.st.UseVerify(v.Code)
	a.st.UpsertXProfile(strings.ToLower(prof.Handle), prof.Name, prof.AvatarFile, ms())
	a.xp.mu.Lock()
	a.xp.files[strings.ToLower(prof.Handle)] = prof.AvatarFile
	a.xp.mu.Unlock()
	a.logf("[info] 新要饭站 #%d /%s（X @%s）", id, f.Slug, prof.Handle)
	if created, err := a.st.GetSiteByID(id); err == nil && created != nil {
		a.login(w, created)
	}
	http.Redirect(w, r, "/manage?welcome=1", http.StatusFound)
}

// ---------- 忘记口令：X 重新验证 ----------

func (a *App) handleResetVerify(w http.ResponseWriter, r *http.Request) {
	if a.limited(w, r, "verify", 10, 10*time.Minute) {
		return
	}
	v, u, msg := a.verifyTweet(r, "reset")
	if msg != "" {
		if v == nil {
			a.startVerify(w, r, "reset", msg)
			return
		}
		a.render(w, http.StatusBadRequest, "new", newPage{Base: a.base(r), Step: 1, Purpose: "reset", Code: v.Code, Texts: a.tweetTexts(a.lang(r), v.Code, "reset"), IntentURL: intentFor(a.tweetTexts(a.lang(r), v.Code, "reset")[0]), TweetURL: r.FormValue("tweet_url"), Err: msg})
		return
	}
	site := a.siteOfX(u) // 先按 X 数字 ID 认人（改过用户名也能找回），再按用户名
	if site != nil && site.IsMain() {
		a.render(w, http.StatusBadRequest, "new", newPage{Base: a.base(r), Step: 1, Purpose: "reset", Code: v.Code, Texts: a.tweetTexts(a.lang(r), v.Code, "reset"), IntentURL: intentFor(a.tweetTexts(a.lang(r), v.Code, "reset")[0]), Err: "主站口令在服务器 config.env 里改，不走 X 找回"})
		return
	}
	if site == nil {
		a.render(w, http.StatusBadRequest, "new", newPage{Base: a.base(r), Step: 1, Purpose: "reset", Code: v.Code, Texts: a.tweetTexts(a.lang(r), v.Code, "reset"), IntentURL: intentFor(a.tweetTexts(a.lang(r), v.Code, "reset")[0]), Err: a.T(r, "@%s 还没开过要饭站", u.Handle)})
		return
	}
	if !a.lim.allow("reset:"+strconv.FormatInt(site.ID, 10), 3, 24*time.Hour) {
		a.render(w, http.StatusTooManyRequests, "new", newPage{Base: a.base(r), Step: 1, Purpose: "reset", Code: v.Code, Texts: a.tweetTexts(a.lang(r), v.Code, "reset"), IntentURL: intentFor(a.tweetTexts(a.lang(r), v.Code, "reset")[0]), Err: "这个 X 今天重置得太频繁了，明天再来"})
		return
	}
	a.syncSiteX(site, u) // X 上改了昵称/用户名/头像：站点资料跟着更新
	pj, _ := json.Marshal(verifyProfile{Name: u.Name, Handle: u.Handle, XID: u.ID, SiteID: site.ID})
	a.st.SetVerifyProfile(v.Code, string(pj))
	a.render(w, http.StatusOK, "new", newPage{Base: a.base(r), Step: 2, Purpose: "reset", Code: v.Code, Prof: &xUser{Name: u.Name, Handle: u.Handle}, AvatarURL: site.AvatarURL(), Site: site})
}

// siteOfX 这个 X 用户开的站：先按数字 ID，再按用户名。
func (a *App) siteOfX(u *xUser) *Site {
	if site, _ := a.st.GetSiteByXID(u.ID); site != nil {
		return site
	}
	site, _ := a.st.GetSiteByXHandle(u.Handle)
	if site != nil && site.XID != "" && u.ID != "" && site.XID != u.ID {
		return nil // 用户名一样但不是同一个 X 账号（原主改名后被别人注册了）
	}
	return site
}

// syncSiteX 找回口令时把站点的 X 资料（数字 ID、用户名、昵称→站名、头像）同步成推文里的最新值。
func (a *App) syncSiteX(site *Site, u *xUser) {
	name := cleanText(u.Name, 20, false)
	if name == "" || hasContact(name) {
		name = "@" + u.Handle
	}
	file := ""
	if u.Avatar != "" {
		if f, err := a.downloadAvatar(u.Handle, strings.Replace(u.Avatar, "_normal", "_200x200", 1)); err == nil {
			file = f
		} else {
			a.logf("[warn] 找回口令时重抓 @%s 头像失败: %v", u.Handle, err)
		}
	}
	if err := a.st.SyncSiteX(site.ID, u.ID, u.Handle, name, file); err != nil {
		a.logf("[warn] 站点 /%s 同步 X 资料失败: %v", site.Slug, err)
		if file != "" {
			os.Remove(filepath.Join(a.cfg.AvatarDir, file))
		}
		return
	}
	if file != "" {
		a.st.UpsertXProfile(strings.ToLower(u.Handle), name, file, ms())
		a.xp.mu.Lock()
		a.xp.files[strings.ToLower(u.Handle)] = file
		if !strings.EqualFold(site.XHandle, u.Handle) {
			delete(a.xp.files, strings.ToLower(site.XHandle))
		}
		a.xp.mu.Unlock()
		if site.XAvatar != "" && site.XAvatar != file && !a.st.AvatarInUse(site.XAvatar) {
			os.Remove(filepath.Join(a.cfg.AvatarDir, site.XAvatar))
		}
	}
	if changed := !strings.EqualFold(site.XHandle, u.Handle) || site.Name != name; changed {
		a.logf("[info] 站点 /%s 的 X 资料已更新：@%s %q → @%s %q", site.Slug, site.XHandle, site.Name, u.Handle, name)
	}
	site.XHandle, site.XName, site.Name, site.XURL = u.Handle, name, name, "https://x.com/"+u.Handle
	if u.ID != "" {
		site.XID = u.ID
	}
	if file != "" {
		site.XAvatar = file
	}
}

func (a *App) handleResetPost(w http.ResponseWriter, r *http.Request) {
	v, prof, msg := a.loadVerified(r, "reset")
	if msg != "" || prof.SiteID == 0 {
		a.startVerify(w, r, "reset", "验证已失效，请重新验证")
		return
	}
	site, err := a.st.GetSiteByID(prof.SiteID)
	if err != nil || site == nil {
		a.fail(w, r, errors.New("站点不存在"))
		return
	}
	pw, pw2 := r.FormValue("password"), r.FormValue("password2")
	if len(pw) < 6 || len(pw) > 72 || pw != pw2 {
		a.render(w, http.StatusBadRequest, "new", newPage{Base: a.base(r), Step: 2, Purpose: "reset", Code: v.Code, Prof: &xUser{Name: prof.Name, Handle: prof.Handle}, AvatarURL: site.AvatarURL(), Site: site, Err: "口令至少 6 位，且两次一致"})
		return
	}
	if ok, _ := a.st.UseVerify(v.Code); !ok {
		a.startVerify(w, r, "reset", "验证已失效，请重新验证")
		return
	}
	if err := a.st.SetSitePassword(site.ID, hashPassword(pw)); err != nil {
		a.fail(w, r, err)
		return
	}
	a.logf("[info] 站点 /%s 通过 X 重置口令", site.Slug)
	if fresh, err := a.st.GetSiteByID(site.ID); err == nil && fresh != nil {
		a.login(w, fresh)
	}
	a.flash(w, "口令已重置，其它设备上的登录已失效")
	http.Redirect(w, r, "/manage", http.StatusFound)
}

// ---------- 登录 ----------

type loginPage struct {
	Base
	Slug string
	Err  string
}

func (a *App) handleLoginGet(w http.ResponseWriter, r *http.Request) {
	if a.currentSite(r) != nil {
		http.Redirect(w, r, "/manage", http.StatusFound)
		return
	}
	a.render(w, http.StatusOK, "login", loginPage{Base: a.base(r), Slug: strings.ToLower(strings.TrimSpace(r.URL.Query().Get("slug")))})
}

func normSlugInput(s string) string {
	s = strings.ToLower(strings.TrimSpace(s))
	s = strings.Trim(strings.TrimPrefix(s, "@"), "/")
	if s == "main" || s == "主站" {
		return ""
	}
	return s
}

func (a *App) handleLoginPost(w http.ResponseWriter, r *http.Request) {
	if a.limited(w, r, "login", 10, time.Minute) {
		return
	}
	slug := normSlugInput(r.FormValue("slug"))
	pw := r.FormValue("password")
	p := loginPage{Base: a.base(r), Slug: slug, Err: "X 用户名或口令不对"}
	if slug != "" && !validSlug(slug) {
		a.render(w, http.StatusBadRequest, "login", p)
		return
	}
	if a.lim.count("loginfail:"+slug, 10*time.Minute) >= 30 {
		a.errorPage(w, r, http.StatusTooManyRequests, "手速太快了", "这个站点的错误口令太多，歇一会儿。")
		return
	}
	site, err := a.st.GetSiteBySlug(slug)
	if err != nil {
		a.fail(w, r, err)
		return
	}
	if site == nil || site.Status != "active" || !checkPassword(site.PassHash, pw) {
		a.lim.allow("loginfail:"+slug, 1000, 10*time.Minute)
		a.render(w, http.StatusUnauthorized, "login", p)
		return
	}
	a.login(w, site)
	a.logf("[info] 站长登录 /%s", site.Slug)
	http.Redirect(w, r, "/manage", http.StatusFound)
}

func (a *App) handleLogout(w http.ResponseWriter, r *http.Request) {
	a.logout(w)
	http.Redirect(w, r, "/", http.StatusFound)
}

// ---------- 管理页 ----------

type managePage struct {
	Base
	PwErr      bool // 改口令出错：页面加载时直接弹开口令弹窗
	Site       *Site
	Stats      Stats
	Claims     []*Donation
	Donations  []*Donation
	Sites      []SiteRow
	Messages   []AdminMessage
	DonPager   Pager // 施舍记录分页
	SitePager  Pager // 所有要饭站分页（主站）
	MsgPager   Pager // 全站留言分页（主站）
	Welcome    bool
	Flash      string
	Err        string
	HasGateway bool
	LoginURL   string
	Coins      int64
	Presets    []string
}

func (a *App) ownerSite(w http.ResponseWriter, r *http.Request) (*Site, bool) {
	site := a.currentSite(r)
	if site == nil {
		if r.Method == http.MethodGet {
			http.Redirect(w, r, "/login", http.StatusFound)
		} else {
			a.errorPage(w, r, http.StatusUnauthorized, "请先登录", "登录状态已失效，请重新登录。")
		}
		return nil, false
	}
	return site, true
}

const managePageSize = 5

// Pager 列表分页：?dp=2#donations 这种，页码从 1 起。
type Pager struct {
	Path   string // 页面路径（/manage、/rank）
	Param  string // 查询参数名
	Anchor string // 跳回的锚点
	Page   int
	Pages  int
	Total  int
	Size   int
	Query  string // 其它分页参数原样带上（各列表独立翻页）
}

func newPager(r *http.Request, param, anchor string, total, size int) Pager {
	return newPagerAt(r, "/manage", []string{"dp", "sp", "mp"}, param, anchor, total, size)
}

// newPagerAt path 页面上的分页；siblings 是同页其它列表的分页参数，翻页时原样带上。
func newPagerAt(r *http.Request, path string, siblings []string, param, anchor string, total, size int) Pager {
	pg := Pager{Path: path, Param: param, Anchor: anchor, Total: total, Size: size, Page: 1}
	pg.Pages = (total + size - 1) / size
	if pg.Pages < 1 {
		pg.Pages = 1
	}
	if n, err := strconv.Atoi(r.URL.Query().Get(param)); err == nil && n > 1 {
		pg.Page = n
	}
	if pg.Page > pg.Pages {
		pg.Page = pg.Pages
	}
	q := url.Values{}
	for _, k := range siblings {
		if k != param && r.URL.Query().Get(k) != "" {
			q.Set(k, r.URL.Query().Get(k))
		}
	}
	pg.Query = q.Encode()
	return pg
}

func (p Pager) Offset() int   { return (p.Page - 1) * p.Size }
func (p Pager) HasPrev() bool { return p.Page > 1 }
func (p Pager) HasNext() bool { return p.Page < p.Pages }
func (p Pager) Prev() int     { return p.Page - 1 }
func (p Pager) Next() int     { return p.Page + 1 }

// Slice 对已在内存里的列表取当前页。
func (p Pager) Slice(rows []SiteRow) []SiteRow {
	lo := p.Offset()
	if lo >= len(rows) {
		return nil
	}
	hi := lo + p.Size
	if hi > len(rows) {
		hi = len(rows)
	}
	return rows[lo:hi]
}

// URL 第 n 页的链接（保留别的列表的页码）。
func (p Pager) URL(n int) string {
	q := p.Query
	if n > 1 {
		if q != "" {
			q += "&"
		}
		q += p.Param + "=" + strconv.Itoa(n)
	}
	if q != "" {
		q = "?" + q
	}
	return p.Path + q + p.Anchor
}

// Nums 要显示的页码：当前页前后各 2 页。
func (p Pager) Nums() []int {
	var out []int
	for i := p.Page - 2; i <= p.Page+2; i++ {
		if i >= 1 && i <= p.Pages {
			out = append(out, i)
		}
	}
	return out
}

// manageBack 操作完回到后台原来的那一页（Referer 里带着 ?dp=3 之类），否则回后台首页 + 锚点。
func (a *App) manageBack(r *http.Request, anchor string) string {
	if ref, err := url.Parse(r.Referer()); err == nil && ref.Path == "/manage" && ref.RawQuery != "" {
		return "/manage?" + ref.RawQuery + anchor
	}
	return "/manage" + anchor
}

func (a *App) renderManage(w http.ResponseWriter, r *http.Request, site *Site, errMsg string) {
	a.renderManageFlash(w, r, site, errMsg, "")
}

func (a *App) renderManageFlash(w http.ResponseWriter, r *http.Request, site *Site, errMsg, flash string) {
	a.renderManageFull(w, r, site, errMsg, flash, false)
}

func (a *App) renderManageFull(w http.ResponseWriter, r *http.Request, site *Site, errMsg, flash string, pwErr bool) {
	p := managePage{Base: a.base(r), PwErr: pwErr, Site: site, Welcome: r.URL.Query().Get("welcome") == "1", Err: errMsg,
		HasGateway: a.gwc != nil, LoginURL: a.cfg.BaseURL + "/login?slug=" + site.Slug, Presets: a.cfg.PresetAmounts}
	p.Flash = a.takeFlash(w, r)
	if flash != "" {
		p.Flash = flash
	}
	var err error
	if p.Stats, err = a.st.SiteStats(site.ID); err != nil {
		a.fail(w, r, err)
		return
	}
	p.Coins, _, _ = a.st.CoinStats(site.ID)
	if site.PayMode != "gateway" {
		if p.Claims, err = a.st.SiteClaims(site.ID); err != nil {
			a.fail(w, r, err)
			return
		}
	}
	p.DonPager = newPager(r, "dp", "#donations", a.st.CountSiteDonations(site.ID), managePageSize)
	if p.Donations, err = a.st.SiteDonationsPage(site.ID, p.DonPager.Offset(), managePageSize); err != nil {
		a.fail(w, r, err)
		return
	}
	if site.IsMain() {
		if p.Sites, err = a.st.SubsiteRank(2000, true, "amount"); err != nil {
			a.fail(w, r, err)
			return
		}
		if positions, err := a.st.SitePositions(a.cfg.MoneyExp, a.cfg.CoinExp); err == nil {
			a.decorate(p.Sites, positions)
			p.SitePager = newPager(r, "sp", "#sites", len(p.Sites), managePageSize)
			p.Sites = p.SitePager.Slice(p.Sites)
		}
		p.MsgPager = newPager(r, "mp", "#messages", a.st.CountMessages(), managePageSize)
		if p.Messages, err = a.st.RecentMessages(p.MsgPager.Offset(), managePageSize); err != nil {
			a.fail(w, r, err)
			return
		}
	}
	status := http.StatusOK
	if errMsg != "" {
		status = http.StatusBadRequest
	}
	a.render(w, status, "manage", p)
}

func (a *App) handleManage(w http.ResponseWriter, r *http.Request) {
	site, ok := a.ownerSite(w, r)
	if !ok {
		return
	}
	a.renderManage(w, r, site, "")
}

func (a *App) handleManageProfile(w http.ResponseWriter, r *http.Request) {
	site, ok := a.ownerSite(w, r)
	if !ok {
		return
	}
	name := site.Name // X 验证过的子站，站名锁定为 X 昵称；主站随便改
	if site.XHandle == "" || site.IsMain() {
		if name = cleanText(r.FormValue("name"), 20, false); name == "" {
			a.renderManage(w, r, site, "站点标题不能为空")
			return
		}
	}
	avatar := cleanText(r.FormValue("avatar"), 12, false)
	if avatar == "" {
		avatar = "🥣"
	}
	xURL := site.XURL
	if site.XHandle == "" {
		var err error
		if xURL, err = validateXLink(r.FormValue("x_url")); err != nil {
			a.renderManage(w, r, site, err.Error())
			return
		}
	}
	slogan, story := cleanText(r.FormValue("slogan"), 60, false), site.Story // 介绍模块已去掉，只保留口号
	if (site.XHandle == "" && hasContact(name)) || hasContact(slogan) || hasContact(story) {
		a.renderManage(w, r, site, "资料里别放链接、联系方式")
		return
	}
	if err := a.st.UpdateSiteProfile(site.ID, name, slogan, story, avatar, xURL); err != nil {
		a.fail(w, r, err)
		return
	}
	a.flash(w, "资料已保存")
	http.Redirect(w, r, "/manage#profile", http.StatusFound)
}

// handleManagePayment 直接转账模式：收款码 / Pay ID（会解绑已绑定的币安 Key）。
func (a *App) handleManagePayment(w http.ResponseWriter, r *http.Request) {
	site, ok := a.ownerSite(w, r)
	if !ok {
		return
	}
	if site.IsMain() {
		a.renderManage(w, r, site, "主站的收款方式在服务器 config.env 里改")
		return
	}
	link, err := validateBinanceLink(r.FormValue("receive_link"))
	if err != nil {
		a.renderManage(w, r, site, err.Error())
		return
	}
	payID := cleanText(r.FormValue("pay_id"), 60, false)
	if link == "" && r.FormValue("receive_link") == "" {
		link = site.ReceiveLink // 表单没这个字段了，保留库里已有的链接
	}
	if link == "" && payID == "" {
		a.renderManage(w, r, site, "填一下币安 UID，不然钱没处去")
		return
	}
	if site.PayMode == "gateway" {
		if err := a.unbindAccount(site); err != nil {
			a.renderManage(w, r, site, a.T(r, "解绑币安 Key 失败：%s", gatewayErrL(a.lang(r), err)))
			return
		}
	}
	if err := a.st.UpdateSitePayment(site.ID, "manual", "", "", link, payID); err != nil {
		a.fail(w, r, err)
		return
	}
	a.flash(w, "已切换为直接转账：施主转完自报，你在这里确认")
	http.Redirect(w, r, "/manage#payment", http.StatusFound)
}

// handleManageBind 绑定币安只读 Key：注册到网关成为独立收款账号，之后到账自动确认。
func (a *App) handleManageBind(w http.ResponseWriter, r *http.Request) {
	site, ok := a.ownerSite(w, r)
	if !ok {
		return
	}
	if site.IsMain() || a.gwc == nil {
		a.renderManage(w, r, site, "本站不支持绑定")
		return
	}
	if a.limited(w, r, "bind", 5, 10*time.Minute) {
		return
	}
	key, secret := strings.TrimSpace(r.FormValue("api_key")), strings.TrimSpace(r.FormValue("api_secret"))
	uid := strings.TrimSpace(r.FormValue("uid"))
	link, err := validateBinanceLink(r.FormValue("receive_link"))
	if err != nil {
		a.renderManage(w, r, site, err.Error())
		return
	}
	switch {
	case key == "" || secret == "" || len(key) > 128 || len(secret) > 128:
		a.renderManage(w, r, site, "API Key 和 Secret 都要填")
		return
	case !reUID.MatchString(uid):
		a.renderManage(w, r, site, "币安 UID 是纯数字（App 头像页可见）")
		return
	}
	acc, err := a.bindAccount(site, key, secret, uid, link)
	if err != nil {
		a.logf("[warn] 站点 /%s 绑定 Key 失败: %v", site.Slug, err)
		a.renderManage(w, r, site, a.T(r, "绑定失败：%s", gatewayErrL(a.lang(r), err)))
		return
	}
	if err := a.st.UpdateSitePayment(site.ID, "gateway", acc.AccountID, uid, link, site.PayID); err != nil {
		a.fail(w, r, err)
		return
	}
	a.logf("[info] 站点 /%s 绑定币安账号 %s uid=%s", site.Slug, acc.AccountID, uid)
	a.flash(w, "绑定成功！币安校验通过，之后给你的施舍会自动确认上榜")
	http.Redirect(w, r, "/manage#payment", http.StatusFound)
}

func (a *App) handleManageUnbind(w http.ResponseWriter, r *http.Request) {
	site, ok := a.ownerSite(w, r)
	if !ok {
		return
	}
	if site.IsMain() || site.PayMode != "gateway" {
		http.Redirect(w, r, "/manage#payment", http.StatusFound)
		return
	}
	if err := a.unbindAccount(site); err != nil {
		a.renderManage(w, r, site, a.T(r, "解绑失败：%s", gatewayErrL(a.lang(r), err)))
		return
	}
	if err := a.st.UpdateSitePayment(site.ID, "manual", "", "", site.ReceiveLink, site.PayID); err != nil {
		a.fail(w, r, err)
		return
	}
	a.logf("[info] 站点 /%s 解绑币安账号", site.Slug)
	a.flash(w, "已解绑。现在是直接转账模式，记得填好收款链接或 Pay ID")
	http.Redirect(w, r, "/manage#payment", http.StatusFound)
}

func (a *App) handleManageVerify(w http.ResponseWriter, r *http.Request) {
	site, ok := a.ownerSite(w, r)
	if !ok {
		return
	}
	if site.PayMode != "gateway" || a.gwc == nil {
		http.Redirect(w, r, "/manage#payment", http.StatusFound)
		return
	}
	if a.limited(w, r, "verifykey", 5, time.Minute) {
		return
	}
	if _, err := a.verifyAccount(site); err != nil {
		a.flash(w, a.T(r, "校验失败：%s", gatewayErrL(a.lang(r), err)))
	} else {
		a.flash(w, "校验通过：币安 Key 可用，到账会自动确认")
	}
	http.Redirect(w, r, "/manage#payment", http.StatusFound)
}

// skinCount 形象数量（templates/sprite.html 里的 sprite / sprite1..7）。
const skinCount = 8

// handleSkin 站长在自己的碗页面点「换个形象」：随机换一个并保存，返回新的编号。
func (a *App) handleSkin(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	site := a.currentSite(r)
	if site == nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{"ok":false}`))
		return
	}
	if !a.lim.allow("skin:"+strconv.FormatInt(site.ID, 10), 60, time.Minute) {
		w.WriteHeader(http.StatusTooManyRequests)
		w.Write([]byte(`{"ok":false}`))
		return
	}
	next := site.Skin
	for i := 0; i < 8 && next == site.Skin; i++ { // 随机换一个，别换成原来那个
		next = int64(randBytes(1)[0]) % skinCount
	}
	if err := a.st.SetSiteSkin(site.ID, next); err != nil {
		a.logf("[error] 换形象: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"ok":false}`))
		return
	}
	fmt.Fprintf(w, `{"ok":true,"skin":%d}`, next)
}

func (a *App) handleManagePassword(w http.ResponseWriter, r *http.Request) {
	site, ok := a.ownerSite(w, r)
	if !ok {
		return
	}
	if site.IsMain() {
		a.renderManage(w, r, site, "主站口令在服务器 config.env（ADMIN_PASSWORD）里改")
		return
	}
	pw, pw2 := r.FormValue("password"), r.FormValue("password2")
	if len(pw) < 6 || len(pw) > 72 {
		a.renderManageFull(w, r, site, "口令至少 6 位", "", true)
		return
	}
	if pw != pw2 {
		a.renderManageFull(w, r, site, "两次口令不一致", "", true)
		return
	}
	if err := a.st.SetSitePassword(site.ID, hashPassword(pw)); err != nil {
		a.fail(w, r, err)
		return
	}
	if fresh, err := a.st.GetSiteByID(site.ID); err == nil && fresh != nil {
		a.login(w, fresh)
	}
	a.flash(w, "口令已修改，其它设备上的登录已失效")
	http.Redirect(w, r, "/manage#password", http.StatusFound)
}

func (a *App) handleManageDonation(w http.ResponseWriter, r *http.Request) {
	site, ok := a.ownerSite(w, r)
	if !ok {
		return
	}
	id, _ := strconv.ParseInt(r.PathValue("id"), 10, 64)
	d, err := a.st.GetDonationByID(id)
	if err != nil {
		a.fail(w, r, err)
		return
	}
	action := r.PathValue("action")
	if d == nil || (d.SiteID != site.ID && !site.IsMain()) {
		a.errorPage(w, r, http.StatusNotFound, "没有这笔施舍", "")
		return
	}
	anchor := "#donations"
	switch action {
	case "confirm", "reject":
		if d.SiteID != site.ID || d.IsGateway() || d.Status != "claimed" {
			a.renderManage(w, r, site, "这笔施舍当前不能确认/拒绝")
			return
		}
		if action == "confirm" {
			_, err = a.st.MarkPaid(d.ID, d.Amount, d.AmountE8, "owner", d.BinanceOrderID, "", ms())
			a.logf("[info] 站长确认到账 %s %s %s（站点 %d）", d.Code, d.Amount, d.Currency, site.ID)
			if d.XHandle != "" {
				a.ensureXProfile(d.XHandle)
			}
		} else {
			_, err = a.st.SetStatusIf(d.ID, []string{"claimed"}, "rejected")
		}
		anchor = "#claims"
	case "block", "unblock":
		err = a.st.SetMsgBlocked(d.ID, action == "block")
		if action == "block" {
			a.logf("[info] 屏蔽留言 %s（站点 %d）: %q", d.Code, d.SiteID, d.Message)
		}
	case "blockuser", "unblockuser":
		err = a.st.BlockNick(d.SiteID, d.NickKey, action == "blockuser")
		a.logf("[info] %s %q（站点 %d）", action, d.Nickname, d.SiteID)
	case "reply":
		if d.SiteID != site.ID {
			a.errorPage(w, r, http.StatusForbidden, "只能回复自己站的施舍", "")
			return
		}
		text := cleanText(r.FormValue("reply"), 80, false)
		if hasContact(text) {
			a.renderManage(w, r, site, "回复里别放链接、联系方式")
			return
		}
		err = a.st.SetReply(d.ID, text)
	default:
		a.errorPage(w, r, http.StatusNotFound, "未知操作", "")
		return
	}
	if err != nil {
		a.fail(w, r, err)
		return
	}
	if d.SiteID != site.ID {
		anchor = "#messages"
	}
	if anchor == "#claims" {
		if left, _ := a.st.SiteClaims(site.ID); len(left) == 0 {
			anchor = "#donations"
		}
	}
	http.Redirect(w, r, a.manageBack(r, anchor), http.StatusFound)
}

// handleManageSite 管理员对子站：除名 / 恢复 / 收录 / 取消收录 / 重置口令。
func (a *App) handleManageSite(w http.ResponseWriter, r *http.Request) {
	site, ok := a.ownerSite(w, r)
	if !ok {
		return
	}
	if !site.IsMain() {
		a.errorPage(w, r, http.StatusForbidden, "无权操作", "")
		return
	}
	id, _ := strconv.ParseInt(r.PathValue("id"), 10, 64)
	target, err := a.st.GetSiteByID(id)
	if err != nil {
		a.fail(w, r, err)
		return
	}
	if target == nil || target.IsMain() {
		a.errorPage(w, r, http.StatusNotFound, "没有这个站", "")
		return
	}
	switch r.PathValue("action") {
	case "disable", "enable":
		status := "disabled"
		if r.PathValue("action") == "enable" {
			status = "active"
		}
		err = a.st.SetSiteStatus(target.ID, status)
		a.logf("[info] 站点 /%s -> %s", target.Slug, status)
	case "list", "unlist":
		err = a.st.SetSiteListed(target.ID, r.PathValue("action") == "list")
		a.logf("[info] 站点 /%s -> %s", target.Slug, r.PathValue("action"))
	case "resetpw":
		pw := strings.ToLower(randCode(10))
		if err = a.st.SetSitePassword(target.ID, hashPassword(pw)); err == nil {
			a.logf("[info] 重置站点 /%s 口令", target.Slug)
			a.renderManageFlash(w, r, site, "", a.T(r, "已重置 /%s 的口令为 %s（只显示这一次，请转告站长）", target.Slug, pw))
			return
		}
	default:
		a.errorPage(w, r, http.StatusNotFound, "未知操作", "")
		return
	}
	if err != nil {
		a.fail(w, r, err)
		return
	}
	http.Redirect(w, r, a.manageBack(r, "#sites"), http.StatusFound)
}
