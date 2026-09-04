#!/usr/bin/env python3
"""像素画生成器：把字符网格变成内联 SVG（每行同色连续像素合并成一个 rect）。

用法: python3 tools/sprite.py > templates/sprite.html
产出 {{define "sprite"}}（端碗小人，分层：body / eyes / tear / bowl，便于 CSS 动画）
     {{define "coin"}}（金币）{{define "bowlicon"}}（小碗）
"""
PAL = {
    "K": "#1e1e2e", "H": "#3b2a1e", "S": "#f7c9a3", "R": "#a86f3d", "P": "#f2c14e", "G": "#556677",
    "B": "#ece7d8", "D": "#b9b3a3", "Y": "#ffcc00", "O": "#e09a00", "W": "#ffffff", "T": "#6fb7ff", "M": "#c0392b",
}

BEGGAR = [
    "........K.KKK.K.........",
    ".......KHKHHHKHK........",
    "......KHHHHHHHHHK.......",
    ".....KHHHHHHHHHHHK......",
    ".....KHHHHHHHHHHHK......",
    ".....KHSSSSSSSSSHK......",
    "....KHSSSSSSSSSSSHK.....",
    "....KSSSSSSSSSSSSSK.....",
    "....KSSSSSSSSSSSSSK.....",
    "....KSSeeSSSSSSeeSK.....",  # e = 眼睛（身体层画皮肤，眼睛层再画）
    "....KSSeeSSSSSSeeSK.....",
    "....KSStSSSSSSSSSSK.....",  # t = 眼泪
    "....KSSSSSMMSSSSSSK.....",
    "....KSSSSMSSMSSSSSK.....",
    ".....KSSSSSSSSSSSK......",
    "......KKKSSSSKKK........",
    ".....KRRRRKSSKRRRRK.....",
    "....KRRRRRRKKRRRRRRK....",
    "....KRRRRRRRRRRRRRRK....",
    "....KRPPRRRRRRRRRRRK....",
    "....KRPbbbbbbbbbbbRRK...",  # b = 碗层（碗沿）
    "...bbbbbbbbbbbbbbbbbbb..",
    "...bbbbbbbbbbbbbbbbbbb..",
    "....bbbbbbbbbbbbbbbbb...",
    "......KRRbbbbbbbbRRK....",
    "......KRRRRKKKKKRRRRK...",
    "......KRRRRRRRRRRRRRK...",
    "......KRRRRRRRRRRRRRK...",
    "......KRKRRRRRRRRRKRK...",
    "......KGGKGGGGGGGKGGK...",
    "......KGGK.......KGGK...",
    "......KSSK.......KSSK...",
    "......KKKK.......KKKK...",
]
# 碗 + 双手层（与身体层同坐标系，只画非空像素）
BOWL = {
    20: "......KKKKKKKKKKKKK.....",
    21: "...KSSKDBBBBBBBBBDKSSK..",
    22: "...KSSKDBYOYBBYOYDKSSK..",
    23: "....KKKDBBBBBBBBBDKKK...",
    24: ".........KKDDDDDKK......",
}
EYES = {9: {7: "K", 8: "W", 14: "K", 15: "W"}, 10: {7: "K", 8: "K", 14: "K", 15: "K"}}
TEAR = {11: {7: "T"}}

COIN = [
    "..KKKK..",
    ".KYYYYK.",
    "KYWYYYYK",
    "KYYKKYYK",
    "KYYKKYYK",
    "KYYYYOYK",
    ".KYOOYK.",
    "..KKKK..",
]
BOWLICON = [
    "....KYK.KYK.....",
    "...KYOYKYOYK....",
    "KKKKKKKKKKKKKKKK",
    "KBBBBBBBBBBBBBBK",
    ".KDBBBBBBBBBBDK.",
    "..KDDDDDDDDDDK..",
    "...KKKKKKKKKK...",
]


def rects(grid, skip=".", only=None, override=None):
    """把网格转成 rect 列表。only: 只画这些字符；override: {char: color}。"""
    out = []
    for y, row in enumerate(grid):
        x = 0
        while x < len(row):
            c = row[x]
            if c == skip or (only is not None and c not in only) or c not in PAL and c not in (override or {}):
                x += 1
                continue
            x2 = x
            while x2 + 1 < len(row) and row[x2 + 1] == c:
                x2 += 1
            color = (override or {}).get(c, PAL.get(c))
            out.append(f'<rect x="{x}" y="{y}" width="{x2 - x + 1}" height="1" fill="{color}"/>')
            x = x2 + 1
    return "".join(out)


def layer(cells):
    out = []
    for y, row in cells.items():
        for x, c in row.items():
            out.append(f'<rect x="{x}" y="{y}" width="1" height="1" fill="{PAL[c]}"/>')
    return "".join(out)


def main():
    # 身体层：眼睛 / 眼泪位置画皮肤，碗层位置留空（由碗层画）
    body_grid = [r.replace("e", "S").replace("t", "S").replace("b", ".") for r in BEGGAR]
    body = rects(body_grid)
    bowl = rects([BOWL.get(y, "." * 24) for y in range(len(BEGGAR))])
    h = len(BEGGAR)
    print('{{define "sprite"}}<svg class="sprite" viewBox="0 0 24 %d" width="96" height="%d" shape-rendering="crispEdges" aria-label="端着碗的赛博乞丐" role="img">'
          '<g class="body">%s</g><g class="eyes">%s</g><g class="tear">%s</g><g class="bowl">%s</g></svg>{{end}}' % (h, h * 4, body, layer(EYES), layer(TEAR), bowl))
    print('{{define "coin"}}<svg class="px-coin" viewBox="0 0 8 8" width="16" height="16" shape-rendering="crispEdges" aria-hidden="true">%s</svg>{{end}}' % rects(COIN))
    print('{{define "bowlicon"}}<svg class="px-bowl" viewBox="0 0 16 7" width="32" height="14" shape-rendering="crispEdges" aria-hidden="true">%s</svg>{{end}}' % rects(BOWLICON))


if __name__ == "__main__":
    main()
