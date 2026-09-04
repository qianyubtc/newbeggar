#!/usr/bin/env bash
# 清空要饭站的测试数据（保留主站资料/头像、口令、会话密钥），上线前跑一次。
# 用法（在服务器上）：sudo bash reset-data.sh [/opt/beggar]
# 会先停服务、把库备份到 beggar.db.bak-<时间>，清完再启动。
set -euo pipefail
DIR="${1:-/opt/beggar}"
DB="$DIR/beggar.db"
[ -f "$DB" ] || { echo "找不到 $DB"; exit 1; }
systemctl stop beggar
TS=$(date +%Y%m%d-%H%M%S)
python3 - "$DB" "$DIR/avatars" "$TS" <<'PY'
import sqlite3, sys, os, shutil
db, avdir, ts = sys.argv[1], sys.argv[2], sys.argv[3]
c = sqlite3.connect(db); c.execute("PRAGMA wal_checkpoint(TRUNCATE)"); c.close()
bak = f"{db}.bak-{ts}"; shutil.copy2(db, bak); os.chmod(bak, 0o600); print("备份:", bak)
c = sqlite3.connect(db)
for t in ("donations", "coins", "xverify", "blocked_nicks"):
    c.execute(f"DELETE FROM {t}")
c.execute("DELETE FROM sites WHERE slug<>''")                       # 子站全删
c.execute("UPDATE sites SET coins=0, wishes='' WHERE slug=''")      # 主站钢镚/愿望清零，资料与头像保留
c.execute("DELETE FROM xprofiles WHERE lower(handle) NOT IN (SELECT lower(x_handle) FROM sites WHERE x_handle<>'')")
c.execute("DELETE FROM meta WHERE key='admin_pw_tag'")             # 旧版遗留键
c.execute("DELETE FROM sqlite_sequence WHERE name IN ('donations','sites')")
c.execute("INSERT INTO sqlite_sequence(name,seq) VALUES('sites',1)")
c.commit(); c.execute("VACUUM"); c.close()
c = sqlite3.connect(db)
keep = {r[0] for r in c.execute("SELECT x_avatar FROM sites WHERE x_avatar<>''")} | {r[0] for r in c.execute("SELECT avatar FROM xprofiles WHERE avatar<>''")}
for f in os.listdir(avdir):
    if f not in keep:
        os.remove(os.path.join(avdir, f)); print("删头像:", f)
for t in ("sites", "donations", "coins", "xverify", "xprofiles", "blocked_nicks", "meta"):
    print(t, c.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0])
print(list(c.execute("SELECT id,slug,name,x_handle,coins FROM sites")))
PY
chown beggar:beggar "$DB"; rm -f "$DB-wal" "$DB-shm"
systemctl start beggar; sleep 2; systemctl is-active beggar
