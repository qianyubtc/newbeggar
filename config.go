package main

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// Config 全部来自 config.env（KEY=VALUE）或同名环境变量（环境变量优先）。
type Config struct {
	Listen  string
	BaseURL string
	DBPath  string

	AdminPassword string // 主站登录口令（路径留空 + 此口令）
	SiteTitle     string
	RepoURL       string
	SourceURL     string // 本站自己的开源仓库，页脚展示（留空不显示）
	AuthorGitHub  string // 页脚作者 GitHub 链接
	AuthorX       string // 页脚作者 X 链接

	// 主站资料（首次启动写入数据库，之后在管理页改）
	MainName   string
	MainSlogan string
	MainStory  string
	MainAvatar string
	MainX      string

	// 收款：配置 BPG_URL 则主站走 BinancePayTool 网关自动确认，子站也能绑定自己的币安 Key；否则主站走直接转账
	BPGURL          string
	BPGKey          string
	MainReceiveLink string
	MainPayID       string

	Currency      string
	PresetAmounts []string
	MinAmountE8   int64
	MaxAmountE8   int64
	OrderTTL      int64 // 秒

	SubsitesEnabled bool
	SubsiteReview   bool // 新子站默认未收录（不进榜、noindex），主站后台收录
	TrustProxy      bool
	TrustHeader     string // 反代传真实 IP 的头：X-Forwarded-For（取最后一跳）或 CF-Connecting-IP

	// X（推特）：发推验证 / 头像抓取的接口基址，测试时可指向 mock
	XTweetAPI    string
	XAvatarAPI   string
	AvatarDir    string
	CoinsPerDay  int64 // 每人每站每天可丢的钢镚数
	CoinsIPCap   int64 // 每 IP 每站每天上限（防脚本）
	CoinsIPTotal int64 // 每 IP 每天全站总上限，0 = 不限
	CoinExp      int64 // 一个钢镚 = 多少 EXP
	MoneyExp     int64 // 1 个币 = 多少 EXP（默认 10，即 0.1 U = 1 EXP）
}

func loadConfig(path string) (*Config, error) {
	vals := map[string]string{}
	if f, err := os.Open(path); err == nil {
		sc := bufio.NewScanner(f)
		for sc.Scan() {
			line := strings.TrimSpace(sc.Text())
			if line == "" || strings.HasPrefix(line, "#") {
				continue
			}
			k, v, ok := strings.Cut(line, "=")
			if !ok {
				continue
			}
			v = strings.TrimSpace(v)
			if len(v) >= 2 && (v[0] == '"' && v[len(v)-1] == '"' || v[0] == '\'' && v[len(v)-1] == '\'') {
				v = v[1 : len(v)-1]
			}
			vals[strings.TrimSpace(k)] = v
		}
		f.Close()
	} else if !os.IsNotExist(err) {
		return nil, err
	}
	get := func(k, def string) string {
		if v := os.Getenv(k); v != "" {
			return v
		}
		if v, ok := vals[k]; ok && v != "" {
			return v
		}
		return def
	}
	getBool := func(k string, def bool) bool {
		v := strings.ToLower(get(k, ""))
		if v == "" {
			return def
		}
		return v == "1" || v == "true" || v == "yes" || v == "on"
	}
	getInt := func(k string, def int64) (int64, error) {
		v := get(k, "")
		if v == "" {
			return def, nil
		}
		n, err := strconv.ParseInt(v, 10, 64)
		if err != nil {
			return 0, fmt.Errorf("%s 须为整数: %q", k, v)
		}
		return n, nil
	}

	var err error
	c := &Config{
		Listen:          get("LISTEN", "127.0.0.1:8124"),
		BaseURL:         strings.TrimRight(get("BASE_URL", "http://127.0.0.1:8124"), "/"),
		DBPath:          get("DB_PATH", "./beggar.db"),
		AdminPassword:   get("ADMIN_PASSWORD", get("ADMIN_TOKEN", "")),
		SiteTitle:       get("SITE_TITLE", "赛博要饭"),
		RepoURL:         get("REPO_URL", "https://github.com/qianyubtc/BinancePayTool"),
		SourceURL:       get("SOURCE_URL", "https://github.com/qianyubtc/newbeggar"),
		AuthorGitHub:    get("AUTHOR_GITHUB", "https://github.com/qianyubtc"),
		AuthorX:         get("AUTHOR_X", "https://x.com/qianyuwing"),
		MainName:        get("MAIN_NAME", "站长"),
		MainSlogan:      get("MAIN_SLOGAN", "行行好，赏口饭吃 🙏"),
		MainStory:       get("MAIN_STORY", ""),
		MainAvatar:      get("MAIN_AVATAR", "🥣"),
		MainX:           get("MAIN_X", ""),
		BPGURL:          strings.TrimRight(get("BPG_URL", ""), "/"),
		BPGKey:          get("BPG_KEY", ""),
		MainReceiveLink: get("MAIN_RECEIVE_LINK", ""),
		MainPayID:       get("MAIN_PAY_ID", ""),
		Currency:        strings.ToUpper(get("CURRENCY", "USDT")),
		SubsitesEnabled: getBool("SUBSITES_ENABLED", true),
		SubsiteReview:   getBool("SUBSITE_REVIEW", false),
		TrustProxy:      getBool("TRUST_PROXY", false),
		TrustHeader:     get("TRUST_PROXY_HEADER", "X-Forwarded-For"),
		XTweetAPI:       strings.TrimRight(get("X_TWEET_API", "https://cdn.syndication.twimg.com"), "/"),
		XAvatarAPI:      strings.TrimRight(get("X_AVATAR_API", "https://unavatar.io"), "/"),
		AvatarDir:       get("AVATAR_DIR", "./avatars"),
	}
	if c.CoinsPerDay, err = getInt("COINS_PER_DAY", 1); err != nil {
		return nil, err
	}
	if c.CoinsIPCap, err = getInt("COINS_IP_CAP", 3); err != nil {
		return nil, err
	}
	if c.CoinsIPTotal, err = getInt("COINS_IP_TOTAL", 30); err != nil {
		return nil, err
	}
	if c.CoinsPerDay < 1 || c.CoinsPerDay > 100 || c.CoinsIPCap < c.CoinsPerDay {
		return nil, errors.New("COINS_PER_DAY / COINS_IP_CAP 不合理")
	}
	if c.CoinsIPTotal < 0 || (c.CoinsIPTotal > 0 && c.CoinsIPTotal < c.CoinsIPCap) {
		return nil, errors.New("COINS_IP_TOTAL 不能小于 COINS_IP_CAP（0 表示不限）")
	}
	if c.CoinExp, err = getInt("COIN_EXP", 1); err != nil {
		return nil, err
	}
	if c.MoneyExp, err = getInt("MONEY_EXP", 10); err != nil {
		return nil, err
	}
	if c.CoinExp < 0 || c.CoinExp > 1000 || c.MoneyExp < 1 || c.MoneyExp > 1000 {
		return nil, errors.New("COIN_EXP / MONEY_EXP 不合理（COIN_EXP 0–1000，MONEY_EXP 1–1000）")
	}
	if !strings.HasPrefix(c.BaseURL, "http://") && !strings.HasPrefix(c.BaseURL, "https://") {
		return nil, errors.New("BASE_URL 须以 http:// 或 https:// 开头")
	}
	for _, p := range c.PresetAmounts {
		if e8, _ := parseAmountE8(p, 8); e8 < c.MinAmountE8 || e8 > c.MaxAmountE8 {
			return nil, fmt.Errorf("PRESET_AMOUNTS 里的 %s 不在 MIN_AMOUNT–MAX_AMOUNT 之间", p)
		}
	}
	if len(c.AdminPassword) < 8 {
		return nil, errors.New("ADMIN_PASSWORD 未设置或太短（≥8 字符），可用 -gen-key 生成一个填入 config.env")
	}
	if c.BPGURL == "" && c.MainReceiveLink == "" && c.MainPayID == "" {
		return nil, errors.New("主站至少配置一种收款方式：BPG_URL+BPG_KEY（网关自动确认）或 MAIN_RECEIVE_LINK / MAIN_PAY_ID（直接转账）")
	}
	if c.BPGURL != "" && c.BPGKey == "" {
		return nil, errors.New("配置了 BPG_URL 就必须配置 BPG_KEY")
	}
	if c.MainReceiveLink != "" {
		l, err := validateBinanceLink(c.MainReceiveLink)
		if err != nil {
			return nil, fmt.Errorf("MAIN_RECEIVE_LINK: %w", err)
		}
		c.MainReceiveLink = l
	}
	if c.MainX != "" {
		x, err := validateXLink(c.MainX)
		if err != nil {
			return nil, fmt.Errorf("MAIN_X: %w", err)
		}
		c.MainX = x
	}
	for _, p := range strings.Split(get("PRESET_AMOUNTS", "0.1,1"), ",") {
		p = strings.TrimSpace(p)
		if p == "" {
			continue
		}
		e8, err := parseAmountE8(p, 2)
		if err != nil {
			return nil, fmt.Errorf("PRESET_AMOUNTS 含非法金额 %q", p)
		}
		c.PresetAmounts = append(c.PresetAmounts, fmtE8(e8))
	}
	if c.MinAmountE8, err = parseAmountE8(get("MIN_AMOUNT", "0.1"), 8); err != nil {
		return nil, fmt.Errorf("MIN_AMOUNT: %w", err)
	}
	if c.MaxAmountE8, err = parseAmountE8(get("MAX_AMOUNT", "10000"), 8); err != nil {
		return nil, fmt.Errorf("MAX_AMOUNT: %w", err)
	}
	if c.MinAmountE8 <= 0 || c.MaxAmountE8 < c.MinAmountE8 {
		return nil, errors.New("MIN_AMOUNT / MAX_AMOUNT 不合理")
	}
	if c.OrderTTL, err = getInt("ORDER_TTL", 900); err != nil {
		return nil, err
	}
	if c.OrderTTL < 120 || c.OrderTTL > 86400 {
		return nil, errors.New("ORDER_TTL 须在 120–86400 秒之间")
	}
	return c, nil
}
