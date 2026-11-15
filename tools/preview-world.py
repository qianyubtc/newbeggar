#!/usr/bin/env python3
"""启动独立的本地 3D 演示。原站数据/线上服务不受影响。Ctrl-C 退出。"""
import argparse
import base64
import hashlib
import os
from pathlib import Path
import re
import secrets
import socket
import sqlite3
import subprocess
import tempfile
import time
import urllib.request

parser=argparse.ArgumentParser()
parser.add_argument('--port',type=int,default=18125)
args=parser.parse_args()
if not 1024<args.port<65536: parser.error('端口须在 1025–65535 之间')
root=Path(__file__).resolve().parent.parent
try:
    probe=socket.create_connection(('127.0.0.1',args.port),timeout=.3)
except OSError:
    pass
else:
    probe.close();parser.error('端口已被占用，请使用 --port 指定其它端口')
(root/'.toolchain').mkdir(exist_ok=True)
folder=Path(tempfile.mkdtemp(prefix='world-preview-',dir=root/'.toolchain'))
url=f'http://127.0.0.1:{args.port}'
config=folder/'config.env'
config.write_text(f'''LISTEN=127.0.0.1:{args.port}
BASE_URL={url}
DB_PATH={folder}/beggar.db
AVATAR_DIR={folder}/avatars
ADMIN_PASSWORD=local-preview-admin-only
MAIN_NAME=芊羽的碗
MAIN_SLOGAN=行行好，赏口饭吃，代码还没写完。
MAIN_PAY_ID=LOCAL-PREVIEW-NO-PAYMENTS
WORLD_ENABLED=true
RAID_ENABLED=true
RAID_ROUND_SEC=60
RAID_BOTS=6
''')
environment=os.environ.copy()
# config.env 会被同名环境变量覆盖，演示必须屏蔽外部真实配置。
for key in re.findall(r'(?:get|getBool|getInt)\("([A-Z0-9_]+)"',(root/'config.go').read_text()): environment.pop(key,None)
environment['TZ']='Asia/Shanghai'

def launch():
    return subprocess.Popen([str(root/'beggar'),'-config',str(config)],cwd=root,env=environment)

def ready():
    for _ in range(100):
        try:
            urllib.request.urlopen(url+'/healthz',timeout=.5).read();return
        except OSError: time.sleep(.1)
    raise RuntimeError('本地预览没有正常启动')

process=None
try:
    process=launch();ready();process.terminate();process.wait(timeout=5);process=None
    names=['桥洞诗人','今天也没睡醒','阿柴的碗','代码换口饭','小熊掌柜','流浪的星星','木鱼与铜板','奶茶续命中','地铁口老王','一只柠檬','月亮下班了','打工猫猫','晚风收集员','搬砖小分队','努力营业中','还有半个馒头','桃花坞路人','台阶上的阿布']
    slogans=['今天的愿望：吃一碗热面。','大哥大姐，路过也算缘分。','钢镚响一声，烦恼少一点。','代码写不动，先来街头坐坐。','谢谢施主，祝你每天都有好事。','风吹过桥洞，也吹来一点好运。']
    now=int(time.time()*1000)
    salt=secrets.token_bytes(16)
    password_hash='pbkdf2$120000$'+base64.b64encode(salt).decode().rstrip('=')+'$'+base64.b64encode(hashlib.pbkdf2_hmac('sha256',b'preview-beggar',salt,120000,32)).decode().rstrip('=')
    with sqlite3.connect(folder/'beggar.db') as db:
        db.execute('UPDATE sites SET coins=88,skin=0 WHERE slug=?',('',))
        # Seed a completed fictional round for immediate 3D replay; live rounds
        # still use the real server engine and its 60-second preview schedule.
        old=db.execute("SELECT id FROM raid_rounds WHERE status='open' ORDER BY id DESC LIMIT 1").fetchone()
        if old:
            rid=old[0];seed='local-preview-round'
            killed=int.from_bytes(hashlib.sha256(f'{seed}:{rid}'.encode()).digest()[:8],'big')%6
            db.execute("UPDATE raid_rounds SET opens_at=?,locks_at=?,status='settled',seed=?,seed_hash=?,killed=?,dead=3,prize=3,carry_out=3,players=6,settled_at=? WHERE id=?",(now-70000,now-10000,seed,hashlib.sha256(seed.encode()).hexdigest(),killed,now-9000,rid))
            db.execute('DELETE FROM raid_bets WHERE round_id=?',(rid,))
            for room in range(6):
                db.execute('INSERT INTO raid_bets(round_id,site_id,room,amount,payout,created_at,updated_at) VALUES(?,?,?,3,?,?,?)',(rid,-room-1,room,0 if room==killed else 3,now-60000,now-9000))

        for i,name in enumerate(names,1):
            cursor=db.execute("INSERT INTO sites(slug,name,slogan,skin,coins,pass_hash,pay_mode,pay_id,currency,listed,status,created_at,updated_at) VALUES(?,?,?,?,?,?,'manual','LOCAL-PREVIEW-NO-PAYMENTS','USDT',1,'active',?,?)",(f'demo{i:02}',name,slogans[(i-1)%len(slogans)],i%8,7+(i*13)%88,password_hash,now,now))
            amount=(i%7+1)*10000000
            db.execute("INSERT INTO donations(code,site_id,nickname,nick_key,message,amount,amount_e8,actual_amount,actual_e8,currency,status,claim_token,created_at,paid_at) VALUES(?,?,?,?,?,?,?,?,?,'USDT','paid',?,?,?)",(f'DEMO{i:04}',cursor.lastrowid,'本地演示施主','preview-donor','这是本地演示数据',str(amount/100000000),amount,str(amount/100000000),amount,secrets.token_hex(16),now,now))
    process=launch();ready()
    print(f'\n3D 街头预览：{url}/world\n原网页：{url}/\n独立演示数据，不收真实款。可用两个浏览器窗口验证真实多人同步。\n夜巡预览每 60 秒一局，可回放上一局抓捕。\n演示站长：demo01，口令：preview-beggar（仅这个本地临时数据库）\nCtrl-C 退出。\n',flush=True)
    process.wait()
except KeyboardInterrupt:
    pass
finally:
    if process and process.poll() is None:
        process.terminate()
        try: process.wait(timeout=5)
        except subprocess.TimeoutExpired: process.kill();process.wait()
