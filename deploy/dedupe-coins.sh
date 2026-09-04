#!/usr/bin/env bash
# 清理被刷的钢镚：指定站点每个 IP 每天只保留最早的 1 个，其余删除，并重算 sites.coins。
# 用法（服务器上）：sudo bash dedupe-coins.sh <slug> [--apply] [/opt/beggar]
#   不带 --apply 只打印将要删除多少（dry-run）；带 --apply 才真删，删前自动备份数据库。
set -euo pipefail
SLUG="${1:-}"
[ -n "$SLUG" ] || { echo "用法: sudo bash dedupe-coins.sh <slug> [--apply]"; exit 1; }
APPLY=0; DIR="/opt/beggar"
for a in "${@:2}"; do case "$a" in --apply) APPLY=1;; /*) DIR="$a";; esac; done
DB="$DIR/beggar.db"
[ -f "$DB" ] || { echo "找不到 $DB"; exit 1; }
[ "$APPLY" = 1 ] && systemctl stop beggar
python3 - "$DB" "$SLUG" "$APPLY" <<'PY'
import sqlite3, sys, os, shutil, time
db, slug, apply_ = sys.argv[1], sys.argv[2], sys.argv[3] == "1"
if apply_:
    c = sqlite3.connect(db); c.execute("PRAGMA wal_checkpoint(TRUNCATE)"); c.close()
    bak = f"{db}.bak-{time.strftime('%Y%m%d-%H%M%S')}"; shutil.copy2(db, bak); os.chmod(bak, 0o600)
    print("备份:", bak)
c = sqlite3.connect(db if apply_ else f"file:{db}?mode=ro", uri=not apply_)
row = c.execute("SELECT id, coins FROM sites WHERE slug=?", (slug,)).fetchone()
if not row:
    print("没有这个站:", slug); raise SystemExit(1)
sid, before = row
# 每个 (ip, day) 保留 created_at 最早的一行
dup = c.execute("""SELECT COUNT(*), COALESCE(SUM(n),0) FROM coins WHERE site_id=? AND rowid NOT IN
    (SELECT MIN(rowid) FROM coins WHERE site_id=? GROUP BY ip, day)""", (sid, sid)).fetchone()
print(f"/{slug}: 现有 {before} 钢镚，将删除 {dup[0]} 条（{dup[1]} 个），保留 {before - dup[1]}")
if not apply_:
    print("（dry-run，未改动。加 --apply 才真删）"); raise SystemExit(0)
c.execute("""DELETE FROM coins WHERE site_id=? AND rowid NOT IN
    (SELECT MIN(rowid) FROM coins WHERE site_id=? GROUP BY ip, day)""", (sid, sid))
c.execute("UPDATE sites SET coins=(SELECT COALESCE(SUM(n),0) FROM coins WHERE site_id=?), updated_at=? WHERE id=?",
          (sid, int(time.time() * 1000), sid))
c.commit()
print("完成，现在:", c.execute("SELECT coins FROM sites WHERE id=?", (sid,)).fetchone()[0], "钢镚")
c.close()
PY
if [ "$APPLY" = 1 ]; then
  chown beggar:beggar "$DB"; rm -f "$DB-wal" "$DB-shm"
  systemctl start beggar; sleep 2; systemctl is-active beggar
fi
