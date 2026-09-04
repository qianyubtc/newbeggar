package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	bpaygate "github.com/qianyubtc/BinancePayTool/sdk/go"
)

var errNoGateway = errors.New("未配置支付网关")

func (a *App) createGatewayOrder(site *Site, d *Donation) error {
	if a.gwc == nil {
		return errNoGateway
	}
	o, err := a.gwc.CreateOrder(bpaygate.CreateOrderReq{
		AccountID:       site.BPGAccountID, // 主站为空 = 网关默认账号
		MerchantOrderID: d.Code,
		Currency:        d.Currency,
		Amount:          d.Amount,
		CallbackURL:     a.cfg.BaseURL + "/bpg/notify",
		ReturnURL:       a.cfg.BaseURL + "/d/" + d.Code,
		Timeout:         a.cfg.OrderTTL,
	})
	if err != nil {
		return err
	}
	d.GwOrderID, d.PayURL, d.PayAmount, d.NoteCode = o.OrderID, o.PayURL, o.PayAmount, o.NoteCode
	d.PayLink, d.PayUID, d.ExpiresAt = o.ReceiveLink, o.ReceiveUID, o.ExpiresAt
	return a.st.SetDonationGateway(d.ID, o.OrderID, o.PayURL, o.PayAmount, o.NoteCode, o.ReceiveLink, o.ReceiveUID, o.ExpiresAt)
}

// refreshFromGateway 不受 4 秒节流地向网关查一次单（回填订单编号后用）。
func (a *App) refreshFromGateway(d *Donation) {
	if a.gwc == nil || !d.IsGateway() {
		return
	}
	o, err := a.gwc.GetOrder(d.GwOrderID)
	if err != nil {
		log.Printf("[warn] 查单 %s: %v", d.Code, err)
		return
	}
	a.applyGatewayStatus(d, o.Status, o.ActualAmount, o.PayAmount, o.MatchedBy, o.BinanceOrderID, o.PayerID, o.PaidAt)
	if nd, err := a.st.GetDonationByID(d.ID); err == nil && nd != nil {
		*d = *nd
	}
}

var claimMsgs = map[string]string{
	"OK":        "核对成功，已到账",
	"UNDERPAID": "查到了这笔转账但金额不足，已按实付记账",
	"NOT_FOUND": "没查到这笔转账：确认订单编号是否正确、是否转给了正确的账号，币安到账后再试",
	"CONSUMED":  "这笔转账已经被别的订单用过了",
	"CURRENCY":  "币种不对",
	"STATE":     "这笔施舍当前状态不能回填",
}

// gatewayClaim 把施主填的币安订单编号转给网关收银页的回填接口（公开接口，网关按 token 限流）。
func (a *App) gatewayClaim(d *Donation, boid string) (string, error) {
	if a.gwc == nil || d.PayURL == "" {
		return "", errNoGateway
	}
	token := d.PayURL[strings.LastIndex(d.PayURL, "/")+1:]
	body, _ := json.Marshal(map[string]string{"binance_order_id": boid})
	req, _ := http.NewRequest("POST", a.cfg.BPGURL+"/pay/"+token+"/claim", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	resp, err := a.gwc.HC.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	raw, _ := io.ReadAll(io.LimitReader(resp.Body, 1<<16))
	var env struct {
		Code    string `json:"code"`
		Message string `json:"message"`
		Data    struct {
			Code   string `json:"code"`
			Status string `json:"status"`
		} `json:"data"`
	}
	if err := json.Unmarshal(raw, &env); err != nil {
		return "", fmt.Errorf("网关响应异常 (HTTP %d)", resp.StatusCode)
	}
	if env.Code != "OK" {
		if env.Code == "ERR_RATE_LIMIT" {
			return "", errors.New("试得太频繁了，一分钟后再试")
		}
		return "", errors.New(env.Message)
	}
	return env.Data.Code, nil
}

// applyGatewayStatus 把网关侧状态落到本地（幂等）。少付也算施舍：按实付计。
func (a *App) applyGatewayStatus(d *Donation, status, actual, payAmount, matchedBy, boid, payerID string, paidAt int64) {
	switch status {
	case "paid", "underpaid":
		amt := actual
		if amt == "" {
			amt = payAmount
		}
		e8, err := parseAmountE8(amt, 8)
		if err != nil || e8 <= 0 {
			if status != "paid" {
				log.Printf("[error] %s 实付金额无法解析 %q，暂不记账", d.Code, amt)
				return
			}
			amt, e8 = d.Amount, d.AmountE8
		}
		if paidAt <= 0 {
			paidAt = ms()
		}
		ok, err := a.st.MarkPaid(d.ID, amt, e8, matchedBy, boid, payerID, paidAt)
		if err != nil {
			log.Printf("[error] 标记到账 %s: %v", d.Code, err)
		} else if ok {
			log.Printf("[info] 到账 %s %s %s by %s（站点 %d，%s）", d.Code, amt, d.Currency, matchedBy, d.SiteID, d.Nickname)
			if d.XHandle != "" {
				a.ensureXProfile(d.XHandle) // 真金白银到账后才抓头像，防止刷接口填盘
			}
		}
	case "expired", "closed":
		if _, err := a.st.SetStatusIf(d.ID, []string{"pending"}, status); err != nil {
			log.Printf("[error] 更新状态 %s: %v", d.Code, err)
		}
	}
}

// syncFromGateway 轮询兜底：回调没到也能靠主动查单确认（每笔最多 4 秒查一次）。
func (a *App) syncFromGateway(d *Donation) {
	if d.Status != "pending" || !d.IsGateway() || a.gwc == nil {
		return
	}
	if ok, err := a.st.TouchSync(d.ID, ms(), 4000); err != nil || !ok {
		return
	}
	o, err := a.gwc.GetOrder(d.GwOrderID)
	if err != nil {
		log.Printf("[warn] 查单 %s: %v", d.Code, err)
		return
	}
	a.applyGatewayStatus(d, o.Status, o.ActualAmount, o.PayAmount, o.MatchedBy, o.BinanceOrderID, o.PayerID, o.PaidAt)
	if nd, err := a.st.GetDonationByID(d.ID); err == nil && nd != nil {
		*d = *nd
	}
}

// handleNotify 网关回调：验签后按 merchant_order_id（= 施舍编号）落状态。
func (a *App) handleNotify(w http.ResponseWriter, r *http.Request) {
	if a.gwc == nil {
		http.Error(w, "no gateway", http.StatusNotFound)
		return
	}
	body, err := io.ReadAll(http.MaxBytesReader(w, r.Body, 1<<20))
	if err != nil {
		http.Error(w, "bad body", http.StatusBadRequest)
		return
	}
	cb, err := bpaygate.VerifyCallback(r.Header, body, a.cfg.BPGKey, 5*time.Minute)
	if err != nil {
		log.Printf("[warn] 回调验签失败: %v", err)
		http.Error(w, "bad signature", http.StatusUnauthorized)
		return
	}
	d, err := a.st.GetDonationByCode(cb.MerchantOrderID)
	if err != nil {
		http.Error(w, "db error", http.StatusInternalServerError)
		return
	}
	if d == nil || !d.IsGateway() || (cb.OrderID != "" && cb.OrderID != d.GwOrderID) {
		http.Error(w, "unknown order", http.StatusNotFound)
		return
	}
	a.applyGatewayStatus(d, cb.Status, cb.ActualAmount, cb.PayAmount, cb.MatchedBy, cb.BinanceOrderID, cb.PayerID, cb.PaidAt)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"ok":true}`))
}

// ---- 子站绑定币安只读 Key（网关多账号）----

func (a *App) bindAccount(site *Site, key, secret, uid, link string) (*bpaygate.Account, error) {
	if a.gwc == nil {
		return nil, errNoGateway
	}
	return a.gwc.CreateAccount(bpaygate.CreateAccountReq{Label: "beggar:" + site.Slug, APIKey: key, APISecret: secret, UID: uid, ReceiveLink: link})
}

func (a *App) unbindAccount(site *Site) error {
	if a.gwc == nil || site.BPGAccountID == "" {
		return nil
	}
	_, err := a.gwc.DisableAccount(site.BPGAccountID)
	var ae *bpaygate.APIError
	if errors.As(err, &ae) && ae.Code == "ERR_NOT_FOUND" {
		return nil
	}
	return err
}

func (a *App) verifyAccount(site *Site) (*bpaygate.Account, error) {
	if a.gwc == nil {
		return nil, errNoGateway
	}
	id := site.BPGAccountID
	if id == "" {
		id = "default"
	}
	return a.gwc.VerifyAccount(id)
}

// gatewayErr 把网关错误变成能给站长看的话。
func gatewayErr(err error) string {
	var ae *bpaygate.APIError
	if errors.As(err, &ae) {
		if ae.Message != "" {
			return ae.Message
		}
		return "网关返回 " + ae.Code
	}
	if errors.Is(err, errNoGateway) {
		return "本站未配置支付网关"
	}
	return "网关连不上，请稍后再试"
}
