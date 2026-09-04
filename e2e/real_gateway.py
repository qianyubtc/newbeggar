#!/usr/bin/env python3
"""真实网关端到端：mock 币安 × 真实 BinancePayTool 二进制 × 本站二进制。

用法: python3 e2e/real_gateway.py [--serve] [--port=8124] [bpaygate 二进制路径]
  默认二进制 ~/Desktop/BinancePayTool/server/bpaygate（需为含多账号的版本）；本站二进制 ./beggar（先 go build -o beggar .）。
  --serve：跑完断言后不退出，留着整套环境（并造一批演示数据）供浏览器查看。
流程: 起 mock 币安（按 API Key 区分账号）→ 起网关 → 起本站
      ① 主站施舍 → 真实收银页 → 注入到账 → 网关回调 → 上榜
      ② 开子站（设口令，自动登录）→ 直接转账模式 → 施主自报 → 站长确认 → 屏蔽留言
      ③ 子站绑定币安只读 Key → 网关多账号 → 子站施舍 → 该 Key 的流水到账 → 自动确认
"""
import http.client
import json
import os
import re
import socket
import subprocess
import sys
import tempfile
import threading
import time
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
BPT = os.path.expanduser("~/Desktop/BinancePayTool")
sys.path.insert(0, os.path.join(BPT, "sdk", "python"))
from bpaygate import BPayGate  # noqa: E402

SECRET = "e2e-secret-0123456789abcdef"
ADMIN_PW = "admin-pass-123456"
SUB_PW = "qianyu-pass-1"
TXNS = {}  # api key → 流水列表
_seq = [452100000000000100]


TWEETS = {}  # id → (text, name, handle)
import struct
import zlib


def make_png(size=32):
    """生成一张有效的 32x32 渐变 PNG（stdlib 实现，供 mock 头像用）。"""
    rows = []
    for y in range(size):
        row = bytearray([0])
        for x in range(size):
            row += bytes([(x * 8) & 255, (y * 8) & 255, 120, 255])
        rows.append(bytes(row))
    data = zlib.compress(b"".join(rows))

    def chunk(tag, body):
        c = struct.pack(">I", len(body)) + tag + body
        return c + struct.pack(">I", zlib.crc32(tag + body) & 0xFFFFFFFF)

    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)) + chunk(b"IDAT", data) + chunk(b"IEND", b"")


PNG = make_png()


class MockBinance(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/mock/pay"):  # 演示：模拟一笔到账 /mock/pay?amount=1.0036[&note=XXXX]
            qs = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            amt = qs.get("amount", [""])[0]
            oid = inject_payment("k", amt, qs.get("note", [""])[0]) if amt else ""
            body = json.dumps({"ok": bool(oid), "binance_order_id": oid, "amount": amt}).encode()
            self.send_response(200 if oid else 400)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(body)
            return
        if self.path.startswith("/tweet-result"):
            qs = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            tw = TWEETS.get(qs.get("id", [""])[0])
            if not tw:
                self.send_response(404)
                self.end_headers()
                return
            body = json.dumps({"__typename": "Tweet", "text": tw[0], "user": {"id_str": "9001", "name": tw[1], "screen_name": tw[2],
                               "profile_image_url_https": f"http://127.0.0.1:{self.server.server_address[1]}/pic/{tw[2]}_normal.jpg"}}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(body)
            return
        if self.path.startswith("/pic/") or self.path.startswith("/x/"):
            self.send_response(200)
            self.send_header("Content-Type", "image/png")
            self.end_headers()
            self.wfile.write(PNG)
            return
        if self.path.startswith("/sapi/v1/pay/transactions"):
            key = self.headers.get("X-MBX-APIKEY", "")
            if key == "bad":
                body = json.dumps({"code": -2015, "msg": "Invalid API-key, IP, or permissions for action."}).encode()
                self.send_response(401)
            else:
                body = json.dumps({"code": "000000", "message": "success", "data": TXNS.get(key, []), "success": True}).encode()
                self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(body)
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, *a):
        pass


def free_port():
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    p = s.getsockname()[1]
    s.close()
    return p


def wait_http(url, seconds=15):
    for _ in range(seconds * 10):
        try:
            urllib.request.urlopen(url, timeout=1)
            return True
        except Exception:
            time.sleep(0.1)
    return False


class Session:
    """带 cookie、不跟随跳转的极简客户端。"""

    def __init__(self, base):
        u = urllib.parse.urlparse(base)
        self.host, self.port = u.hostname, u.port
        self.cookies = {}

    def req(self, method, path, form=None):
        c = http.client.HTTPConnection(self.host, self.port, timeout=15)
        headers = {}
        if self.cookies:
            headers["Cookie"] = "; ".join(f"{k}={v}" for k, v in self.cookies.items())
        body = None
        if form is not None:
            body = urllib.parse.urlencode(form).encode()
            headers["Content-Type"] = "application/x-www-form-urlencoded"
        c.request(method, path, body=body, headers=headers)
        r = c.getresponse()
        data = r.read().decode()
        for sc in r.msg.get_all("Set-Cookie") or []:
            kv, attrs = sc.split(";", 1)[0], sc.lower()
            k, v = kv.split("=", 1)
            if "max-age=-1" in attrs or "max-age=0" in attrs:
                self.cookies.pop(k, None)
            else:
                self.cookies[k] = v
        out = (r.status, dict(r.getheaders()), data)
        c.close()
        return out

    def get(self, path):
        return self.req("GET", path)

    def post(self, path, form):
        return self.req("POST", path, form or {})

    def code(self):
        return next((k[3:] for k in self.cookies if k.startswith("bd_")), "")


def inject_payment(key, amount, note=""):
    _seq[0] += 1
    TXNS.setdefault(key, []).append({"orderId": str(_seq[0]), "note": note, "orderType": "C2C", "transactionId": f"P_E2E{_seq[0]}",
                                     "transactionTime": int(time.time() * 1000), "amount": amount, "currency": "USDT",
                                     "counterpartyId": 1163000000, "payerInfo": {"name": "e2e-payer"}})
    return str(_seq[0])


def wait_status(s, code, want, seconds=20):
    for _ in range(seconds * 5):
        st, _, body = s.get(f"/d/{code}/status")
        if st == 200 and json.loads(body)["status"] == want:
            return True
        time.sleep(0.2)
    return False


def donate_and_pay(gw, base, key, site, nick, amount, msg):
    """网关模式站点施舍一笔并让它到账，返回 (session, code)。"""
    s = Session(base)
    st, h, _ = s.post("/donate", {"site": site, "nickname": nick, "amount": amount, "message": msg})
    assert st == 302 and h.get("Location", "").startswith("/d/"), (st, h)
    code = h["Location"][3:]
    st, _, page = s.get(f"/d/{code}")
    assert st == 200 and 'class="paypanel"' in page and "等待到账" in page, "状态页应内嵌付款面板"
    order = gw.get_order_by_merchant_id(code)
    assert order["status"] == "pending" and order["base_amount"] == amount, order
    inject_payment(key, order["pay_amount"])
    assert wait_status(s, code, "paid"), f"{code} 未到账"
    return s, code, order


def main():
    serve = "--serve" in sys.argv
    port_arg = next((a.split("=", 1)[1] for a in sys.argv[1:] if a.startswith("--port=")), "")
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    binary = os.path.abspath(args[0] if args else os.path.join(BPT, "server", "bpaygate"))
    beggar = os.path.abspath(os.path.join(HERE, "..", "beggar"))
    for p in (binary, beggar):
        if not os.path.isfile(p):
            sys.exit(f"找不到二进制: {p}")

    mock = ThreadingHTTPServer(("127.0.0.1", 0), MockBinance)
    threading.Thread(target=mock.serve_forever, daemon=True).start()
    tmp = tempfile.mkdtemp(prefix="beggar-e2e-")
    gw_port, app_port = free_port(), (int(port_arg) if port_arg else free_port())
    gw_base, base = f"http://127.0.0.1:{gw_port}", f"http://127.0.0.1:{app_port}"

    with open(os.path.join(tmp, "gw.env"), "w") as f:
        f.write(f"""LISTEN=127.0.0.1:{gw_port}
BASE_URL={gw_base}
API_AUTH_KEY={SECRET}
BINANCE_API_KEY=k
BINANCE_API_SECRET=s
BINANCE_UID=90000001
BINANCE_API_BASE=http://127.0.0.1:{mock.server_address[1]}
CURRENCIES=USDT,USDC
POLL_INTERVAL=1
RECEIVE_LINK=https://app.binance.com/uni-qr/E2ETEST
DB_PATH={tmp}/gw.db
""")
    with open(os.path.join(tmp, "beggar.env"), "w") as f:
        f.write(f"""LISTEN=127.0.0.1:{app_port}
BASE_URL={base}
DB_PATH={tmp}/beggar.db
ADMIN_PASSWORD={ADMIN_PW}
BPG_URL={gw_base}
BPG_KEY={SECRET}
X_TWEET_API=http://127.0.0.1:{mock.server_address[1]}
X_AVATAR_API=http://127.0.0.1:{mock.server_address[1]}
AVATAR_DIR={tmp}/avatars
MAIN_NAME=芊羽Wing
MAIN_SLOGAN=行行好，赏口饭吃，别问，问就是没饭吃 🙏
MAIN_STORY=在赛博丐帮蹲了三年，碗里只有代码。
MAIN_X=@qianyuwing
""")
    procs = [subprocess.Popen([binary, "-config", os.path.join(tmp, "gw.env")], stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)]
    try:
        assert wait_http(gw_base + "/healthz"), "网关未就绪"
        procs.append(subprocess.Popen([beggar, "-config", os.path.join(tmp, "beggar.env")], stdout=None if serve else subprocess.DEVNULL, stderr=subprocess.STDOUT))
        assert wait_http(base + "/healthz"), "本站未就绪"
        gw = BPayGate(gw_base, SECRET)

        # ① 主站施舍：跳真实收银页 → 注入到账 → 网关回调 → 上榜
        s1, code1, order1 = donate_and_pay(gw, base, "k", "", "赛博善人", "5", "别买烟了，去吃饭")
        st, _, cashier = Session(gw_base).get("/pay/" + order1["pay_url"].rsplit("/", 1)[1])
        assert st == 200 and "币安" in cashier, "网关收银页异常"
        st, _, body = s1.get("/")
        assert "赛博善人" in body and "别买烟了，去吃饭" in body and "5.00" in body, "主页未展示到账"
        st, _, body = s1.get(f"/d/{code1}")
        assert "谢谢施主 赛博善人" in body and 'href="/new"' in body and "生成分享卡" in body, "到账页缺开站入口/分享卡"
        print("① 主站施舍 → 真实网关 → 回调到账 ... PASS")

        # ② 用 X 发推验证开子站（不需要先施舍）→ 直接转账 → 自报 → 站长确认 → 屏蔽留言
        st, _, body = s1.get("/new")
        code = re.search(r"BEG-[A-Z0-9]{5}", body).group(0)
        TWEETS["9001"] = (f"我在赛博要饭摆了个碗 {code} #赛博要饭", "芊羽分舵🐸", "qianyufendo")
        st, _, body = s1.post("/new/verify", {"code": code, "tweet_url": "https://x.com/qianyufendo/status/9001"})
        assert st == 200 and "X 验证通过" in body and "@qianyufendo" in body, ("verify", st)
        st, h, _ = s1.post("/new", {"code": code, "slug": "qianyufendo", "slogan": "分舵也要吃饭", "password": SUB_PW, "password2": SUB_PW})
        assert st == 302 and h["Location"] == "/manage?welcome=1", (st, h)
        assert "bs" in s1.cookies, "开站后应自动登录"
        st, _, body = s1.get("/manage?welcome=1")
        assert st == 200 and "开张大吉" in body and "方式一：填币安 UID" in body and "不用设 IP 白名单" in body, "管理页异常"
        st, h, _ = s1.post("/manage/payment", {"pay_id": "12345678"})
        assert st == 302, st
        s2 = Session(base)
        st, h, _ = s2.post("/donate", {"site": "qianyufendo", "nickname": "过路财神", "x_handle": "@caishen", "amount": "8", "message": "分舵铁粉专属留言"})
        assert st == 302 and h["Location"].startswith("/pay/"), (st, h)
        code2 = h["Location"][5:]
        st, _, body = s2.get(f"/pay/{code2}")
        assert "12345678" in body and "我已施舍" in body, "手动付款页异常"
        assert s2.post(f"/pay/{code2}/claim", {"binance_order_id": "452100000000000999"})[0] == 302
        st, _, body = s1.get("/manage")
        assert "待确认的施舍" in body and "452100000000000999" in body, "站长未看到待确认"
        did = re.search(r"/donation/(\d+)/confirm", body).group(1)
        assert s1.post(f"/manage/donation/{did}/confirm", {})[0] == 302
        assert wait_status(s2, code2, "paid", 3), "站长确认后应为 paid"
        st, _, body = s2.get("/qianyufendo")
        assert "过路财神" in body and "分舵铁粉专属留言" in body and "x.com/qianyufendo" in body and "芊羽分舵🐸" in body, "子站未展示"
        assert s1.post(f"/manage/donation/{did}/block", {})[0] == 302
        st, _, body = s2.get("/qianyufendo")
        assert "过路财神" in body and "***" in body and "专属留言" not in body, "屏蔽后应显示 ***"
        # 广告留言直接拒绝；钢镚免费且每人一天一个
        assert s2.post("/donate", {"site": "qianyufendo", "nickname": "广告狗", "amount": "8", "message": "加我微信领福利"})[0] == 400
        st, _, body = s2.post("/coin", {"site": "qianyufendo"})
        assert st == 200 and json.loads(body)["added"] is True, body
        assert json.loads(s2.post("/coin", {"site": "qianyufendo"})[2])["added"] is False
        # 登录制：退出后凭路径 + 口令登录
        s1.post("/logout", {})
        assert s1.get("/manage")[0] == 302, "退出后应跳登录"
        assert s1.post("/login", {"slug": "qianyufendo", "password": "wrong"})[0] == 401
        assert s1.post("/login", {"slug": "qianyufendo", "password": SUB_PW})[0] == 302
        print("② X 发推开站 → 直接转账 → 站长确认 → 屏蔽留言 → 钢镚 ... PASS")

        # ③ 子站绑定币安只读 Key（真实网关校验 mock 币安）→ 子站施舍自动到账
        st, _, body = s1.post("/manage/bind", {"api_key": "bad", "api_secret": "s", "uid": "90000002"})
        assert st == 400 and "Invalid API-key" in body, "坏 Key 应把币安原因带回来"
        st, h, _ = s1.post("/manage/bind", {"api_key": "sub-key-0123456789", "api_secret": "sub-secret", "uid": "90000002",
                                             "receive_link": "https://app.binance.com/uni-qr/SUBQR"})
        assert st == 302, (st, h)
        st, _, body = s1.get("/manage")
        assert "绑定成功" in body and "UID 90000002" in body, "绑定后管理页异常"
        s3, code3, order3 = donate_and_pay(gw, base, "sub-key-0123456789", "qianyufendo", "分舵铁粉", "3", "分舵加油")
        assert order3["receive_uid"] == "90000002" and order3["account_id"] != "default", order3
        st, _, cashier = Session(gw_base).get("/pay/" + order3["pay_url"].rsplit("/", 1)[1])
        assert "90000002" in cashier and "扫码支付" in cashier, "子账号收银页应展示其 UID 与二维码"
        st, _, body = s3.get("/qianyufendo")
        assert "分舵铁粉" in body and "分舵加油" in body, "子站自动到账未上榜"
        print("③ 子站绑定币安 Key → 网关多账号 → 自动到账 ... PASS")
        print("REAL-GATEWAY E2E ALL PASS")

        if serve:
            for nick, amt, msg in [("匿名施主", "1", ""), ("老铁666", "10", "看你可怜"), ("V神", "50", "买个域名吧"), ("路过", "0.5", "钢镚儿拿去")]:
                donate_and_pay(gw, base, "k", "", nick, amt, msg)
            for nick, amt, msg in [("隔壁老王", "20", "拿去吃饭"), ("夜猫子", "2", "凌晨三点还在要饭，敬业")]:
                donate_and_pay(gw, base, "sub-key-0123456789", "qianyufendo", nick, amt, msg)
            s = Session(base)
            st, h, _ = s.post("/donate", {"site": "", "nickname": "犹豫中", "amount": "2", "message": "先看看"})
            if st == 429:  # 同一 IP 每分钟 10 笔限流
                time.sleep(61)
                st, h, _ = s.post("/donate", {"site": "", "nickname": "犹豫中", "amount": "2", "message": "先看看"})
            mock_base = f"http://127.0.0.1:{mock.server_address[1]}"
            print(f"\n主站            {base}/\n子站            {base}/qianyufendo\n排行榜          {base}/rank\n登录            {base}/login  （主站：路径留空 口令 {ADMIN_PW}；子站：qianyufendo / {SUB_PW}）\n"
                  f"未支付付款页    {base}{h['Location']}\n开站页          {base}/new\n"
                  f"模拟付款        curl '{mock_base}/mock/pay?amount=<弹窗里的唯一金额>'  （主站的单；子站绑的是另一把 Key，用 &key=... 不支持，直接测主站即可）\n\nCtrl-C 退出。", flush=True)
            while True:
                time.sleep(3600)
    finally:
        for p in procs:
            p.terminate()
        for p in procs:
            try:
                p.wait(timeout=5)
            except subprocess.TimeoutExpired:
                p.kill()


if __name__ == "__main__":
    main()
