#!/usr/bin/env bash
# 给已有站点随机分配小人形象（老数据的 skin 都是 0）。只影响还没换过形象的站。
# 用法（服务器上）：sudo bash randomize-skins.sh [--apply] [/opt/beggar]
#   不带 --apply 只统计（dry-run）；带 --apply 才写库，写前自动备份并停/起服务。
set -euo pipefail
APPLY=0; DIR="/opt/beggar"
for a in "$@"; do case "$a" in --apply) APPLY=1;; /*) DIR="$a";; esac; done
DB="$DIR/beggar.db"
[ -f "$DB" ] || { echo "找不到 $DB"; exit 1; }
[ "$APPLY" = 1 ] && systemctl stop beggar
python3 - "$DB" "$APPLY" <<'PY'
import sqlite3, sys, os, shutil, time, secrets
db, apply_ = sys.argv[1], sys.argv[2] == "1"
SKINS = 8
if apply_:
    c = sqlite3.connect(db); c.execute("PRAGMA wal_checkpoint(TRUNCATE)"); c.close()
    bak = f"{db}.bak-{time.strftime('%Y%m%d-%H%M%S')}"; shutil.copy2(db, bak); os.chmod(bak, 0o600); print("备份:", bak)
c = sqlite3.connect(db if apply_ else f"file:{db}?mode=ro", uri=not apply_)
ids = [r[0] for r in c.execute("SELECT id FROM sites WHERE skin=0")]
print(f"待分配 {len(ids)} 个站（skin=0 的）")
if not apply_:
    print("（dry-run，未改动。加 --apply 才写库）"); raise SystemExit(0)
now = int(time.time() * 1000)
for i in ids:
    c.execute("UPDATE sites SET skin=?, updated_at=? WHERE id=?", (secrets.randbelow(SKINS), now, i))
c.commit()
print("分配结果:", dict(c.execute("SELECT skin, COUNT(*) FROM sites GROUP BY skin")))
c.close()
PY
if [ "$APPLY" = 1 ]; then
  chown beggar:beggar "$DB"; rm -f "$DB-wal" "$DB-shm"
  systemctl start beggar; sleep 2; systemctl is-active beggar
fi
