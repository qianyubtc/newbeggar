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
# 喇叭：分层（body / wave / x），CSS 按开关状态显示声波或叉
SPEAKER = [
    "............",
    "......K.....",
    ".....KK.....",
    "..KKKKK.....",
    "..KKKKK.....",
    "..KKKKK.....",
    "..KKKKK.....",
    ".....KK.....",
    "......K.....",
    "............",
]
SPK_WAVE = {3: {8: "K"}, 4: {8: "K"}, 5: {8: "K"}, 6: {8: "K"},
            2: {10: "K"}, 7: {10: "K"}}
SPK_WAVE2 = {3: {10: "K"}, 4: {10: "K"}, 5: {10: "K"}, 6: {10: "K"}}
SPK_X = {3: {8: "M", 10: "M"}, 4: {9: "M"}, 5: {8: "M", 10: "M"}}
# 奖杯（排行榜）
TROPHY = [
    "..KKKKKK..",
    ".KYYYYYYK.",
    "KKYYYYYYKK",
    "K.KYYYYK.K",
    "KK.KYYK.KK",
    "...KYYK...",
    "....KK....",
    "...KKKK...",
    "..KKKKKK..",
]
# 分享（三个点连线）
SHARE = [
    ".....KK",
    "....KKKK",
    "..K.KKKK",
    ".KKK.KK.",
    "KKKK....",
    ".KKK.KK.",
    "..K.KKKK",
    "....KKKK",
    ".....KK.",
]
# 钥匙（登录）
KEY = [
    "..KKKK......",
    ".KK..KK.....",
    ".KK..KKKKKKK",
    ".KK..KK.K.K.",
    "..KKKK......",
]

# ---- 城管夜巡：6 个过夜场景（32×18 夜景）、城管车、警灯图标 ----
SCENE_PAL = {
    "n": "#1b1d3a", "s": "#2a2d5a", "c": "#5f6270", "C": "#8a8d99", "e": "#3d3f4c", "b": "#7a3e2f", "B": "#9a5340",
    "g": "#2f6a3c", "G": "#4a9455", "y": "#ffd23f", "o": "#ff8c3a", "r": "#e04a3a", "w": "#f2f2f2", "k": "#1e1e2e",
    "t": "#2a2c3d", "m": "#c9ab7a", "d": "#6b4a2a", "p": "#8e5cff", "q": "#3d8bfd", "l": "#dbe9ff", "u": "#4d5470",
    "a": "#7c8ea8", "x": "#ff5aa0",
}
# 每个场景：base 网格 + f1/f2（两帧交替：火苗/灯光闪烁）+ tw（星星慢闪）
SCENES = [
    ("桥洞", [
        "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
        "nnnnlnnnnnnnnnnnnnnnnnnnnnnnnnnn",
        "nnnnnnnnnnnnnnnnnnnnnnnnnlnnnnnn",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
        "cccccccccccccccccccccccccccccccc",
        "ccccccccCCeeeeeeeeeeeeCCcccccccc",
        "cccccccCttttttttttttttttCccccccc",
        "cccccccCttttttttttttttttCccccccc",
        "ccccccCCttttttttttttttttCCcccccc",
        "ccccccCCttttttttttttttttCCcccccc",
        "ccccccCCtttttttttttttmmmCCcccccc",
        "ccccccCCttttttttttttdmmdCCcccccc",
        "ccccccCCtttttttttttdmmmdCCcccccc",
        "ccccccCCtttttttttttdmmmdCCcccccc",
        "ccccccCCttttdddddttdddddCCcccccc",
        "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "eCeeeeCeeeeeeCeeeeeeeCeeeeeeCeee",
    ], {14: {12: "o", 13: "o", 14: "y", 15: "o", 16: "o"}, 13: {13: "o", 14: "y", 15: "o"}, 12: {13: "o", 14: "y"}, 11: {14: "o"}},
       {14: {12: "o", 13: "y", 14: "y", 15: "y", 16: "o"}, 13: {12: "o", 13: "o", 14: "y", 15: "o", 16: "o"}, 12: {13: "o", 14: "y", 15: "o"}, 11: {13: "o", 15: "o"}},
       {1: {4: "l"}, 2: {25: "l"}}),
    ("破庙", [
        "nnnnnnnnnnnnnnnnnnnnnnnnnnnlllnn",
        "nnnnnnnnnnnnnnnnnnnnnnnnnnllllln",
        "nnnnnnnnnnnnnnkknnnnnnnnnnnlllnn",
        "nnnnnnnnnnnkkkkkkkknnnnnnnnnnnnn",
        "nnnnnnnkkkkddddddddkkkknnnnnnnnn",
        "nnnkkkkdddddddddddddddkkkknnnnnn",
        "nkkddddddddddddddddddddddkknnnnn",
        "kkkkkkkkkkkkkkkkkkkkkkkkkkkknnnn",
        "nbbbBbbbbbbbbbttttbbbbBbbbbbnnnn",
        "nbbbbbbbnnnbbbttttbbbbbbbBbbnnnn",
        "nbBbbbbnnnnbbbttttbbbBbbbbbbnnnn",
        "nbbbbbbbbnnbbbttttbbbbbbbbbbnnnn",
        "nbbbBbbbbbbbbbttttbbbBbbbbbbnnnn",
        "nbbbbbbbbbbbbbttttbbbbbbbbbbnnnn",
        "kkkkkkkkkkkkkkttttkkkkkkkkkkgggg",
        "ggggGgggggggggggggggggGggggggggg",
        "gggggggggggGgggggggggggggggggggg",
        "gGggggggggggggggggggGggggggggggg",
    ], {10: {15: "y", 16: "y"}, 11: {15: "o", 16: "o"}},
       {10: {15: "o", 16: "y"}, 11: {15: "y", 16: "o"}, 9: {16: "o"}},
       {1: {5: "l"}, 3: {24: "l"}}),
    ("天桥底", [
        "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "anananananananananananananananan",
        "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
        "cccccccccccccccccccccccccccccccc",
        "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnCCc",
        "nnnnnnnnnnnnnnnnnnnnnnnnnnnCCccc",
        "nnnnnnnnnnnnnnnnnnnnnnnnnCCccccc",
        "nnnnnnnnnnnnnnnnnnnnnnnCCccccccc",
        "nnnnnkkknnnnnnnnnnnnnCCccccccccc",
        "nnnnnyyynnnnnnnnnnnCCccccccccccc",
        "nnnnnnknnnnnnnnnnCCccccccccccccc",
        "nnnnnnknnnnnnnnCCccccccccccccccc",
        "nnnnnnknnnnnnCCccccccccccccccccc",
        "nnnnnnknnnnCCccccccccccccccccccc",
        "eeeeeekeemmmmmmmmeeeeeeeeeeeeeee",
        "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "eCeeeeeeCeeeeeeeeeeCeeeeeeeeeCee",
    ], {10: {4: "y", 8: "y"}, 11: {5: "y", 7: "y"}},
       {10: {4: "y"}},
       {6: {5: "l"}, 8: {17: "l"}, 7: {11: "l"}}),
    ("公园长椅", [
        "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
        "nnnlllnnnnnnnnnnnnnnnnnnnnnnnnnn",
        "nnlllllnnnnnnnnnnnnnnnnnnnnnnnnn",
        "nnnlllnnnnnnnnnnnnnnnnnnnnnnnnnn",
        "nnnnnnnnnnnnnnnnnnnnnnnnGGGnnnnn",
        "nnnnnnnnnnnnnnnnnnnnnnGGGGGGGnnn",
        "nnnnnnnnnnnnnnnnnnnnnGgGGGGgGGnn",
        "nnnnnnnnnnnnnnnnnnnnGGGgGGGGGGGn",
        "nnnnnnnnnnnnnnnnnnnnnGGGGgGGGGnn",
        "nnnnnnnnnnnnnnnnnnnnnnGGGGGGGnnn",
        "nnnnnnnnnnnnnnnnnnnnnnnnnddnnnnn",
        "nnnnnnnnnnnnnnnnnnnnnnnnnddnnnnn",
        "nnnnnnmmmmmmmmmmmmnnnnnnnddnnnnn",
        "nnnnnnddddddddddddnnnnnnnddnnnnn",
        "nnnnnnmmmmmmmmmmmmnnnnnnnddnnnnn",
        "nnnnnnkknnnnnnnnkknnnnnnnddnnnnn",
        "gggggggggggggggggggggggggggggggg",
        "gGggggggggGgggggggggGggggggggggg",
    ], {8: {10: "y"}, 11: {14: "y"}},
       {6: {12: "y"}, 13: {20: "y"}, 9: {4: "y"}},
       {1: {12: "l"}, 3: {17: "l"}}),
    ("地铁通道", [
        "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
        "ccccccccccwwwwwwwwwwwwcccccccccc",
        "cccccccccccccccccccccccccccccccc",
        "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
        "CCCCCCCCCCCCCrrrrrrCCCCCCCCCCCCC",
        "CCCCCCCCCCCCttttttttCCCCCCCCCCCC",
        "aaaaaaaaaaaattttttttaaaaaaaaaaaa",
        "CCCCCCCCCCCCttttttttCCCCCCCCCCCC",
        "qqqqqqqqqqqqttttttttqqqqqqqqqqqq",
        "CCCCCCCCCCCCttttttttCCCCCCCCCCCC",
        "aaaaaaaaaaaattttttttaaaaaaaaaaaa",
        "CCCCCCCCCCCCttttttttCCCCCCCCCCCC",
        "CCCCCCCCCCCCttttttttCCCCCCCCCCCC",
        "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "eeeeeeeddmmmmmddeeeeeeeeeeeeeeee",
        "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    ], {9: {15: "y", 16: "y"}},
       {1: {10: "l", 11: "l", 12: "l", 13: "l", 14: "l", 15: "l", 16: "l", 17: "l", 18: "l", 19: "l", 20: "l", 21: "l"}},
       {4: {15: "w", 16: "w"}}),
    ("烂尾楼", [
        "nnnnnnnnnnnnnnnnnnnnnnkkkkkkkkkk",
        "nnnnnnnnnnnnnnnnnnnnnnnnnnknnnnn",
        "nnnnnnnnnnnnnnnnnnnnnnnnnnknnnnn",
        "kknknnkknnnnnnnnnnnnnnnnnnknnnnn",
        "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
        "cCnnnnncCnnnnncCnnnnncCnnnnnncCn",
        "cCnnnnncCnnnnncCnnnnncCnnnnnncCn",
        "cCnnnnncCnnnnncCnnnnncCnnnnnncCn",
        "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
        "cCnnnnncCqqqqqcCnnnnncCnnnnnncCn",
        "cCnnnnncCqqqqqcCnnnnncCnnnnnncCn",
        "cCnnnnncCqqqqqcCnnnnncCnnnnnncCn",
        "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
        "cCnnnnncCnnnnncCnnnnncCnnnnnncCn",
        "cCnnnnncCnnnnncCnuuuncCnnnnnncCn",
        "cCnnnnncCnnnnncCnuuuncCnnnnnncCn",
        "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "eeCeeeeeeeeeCeeeeeeeeeeCeeeeeeee",
    ], {13: {17: "o", 18: "y", 19: "o"}},
       {13: {18: "y"}, 12: {}},
       {1: {8: "l"}, 2: {30: "l"}}),
]
# 城管车（28×14，车顶警灯两色交替）
VAN = [
    "..........kkkkkk............",
    "..........keeeek............",
    ".kkkkkkkkkkkkkkkkkkkkkkk....",
    "kwwwwwwwwwwwwwwwwwwwwwwwk...",
    "kwllllwllllwllllwwwlllllk...",
    "kwllllwllllwllllwwwlllllkk..",
    "kwwwwwwwwwwwwwwwwwwwwwwwwwk.",
    "kwwwwwwwrrrwwwwwwwwwwwwwwwk.",
    "kqqqqqqqqqqqqqqqqqqqqqqqqqk.",
    "kwwwwwwwwwwwwwwwwwwwwwwwwyk.",
    "kkkkkkkkkkkkkkkkkkkkkkkkkkk.",
    "...keeek..........keeek.....",
    "...keCek..........keCek.....",
    "....kkk............kkk......",
]
VAN_L1 = {1: {11: "r", 12: "r"}, 0: {11: "r"}}
VAN_L2 = {1: {13: "q", 14: "q"}, 0: {14: "q"}}
# 警灯图标（导航栏）
SIREN = [
    "...kkkk...",
    "..krrrrk..",
    ".krrwrrrk.",
    ".krrrrrrk.",
    ".krrrrrrk.",
    ".kkkkkkkk.",
    "kkkkkkkkkk",
    "keeeeeeeek",
    "kkkkkkkkkk",
]


def scene_svg(i, grid, f1, f2, tw):
    for y, row in enumerate(grid):
        assert len(row) == 32, f"场景 {i} 第 {y} 行宽 {len(row)}"
    return ('{{define "room%d"}}<svg class="scene" viewBox="0 0 32 18" width="256" height="144" shape-rendering="crispEdges" aria-hidden="true">'
            '<g class="base">%s</g><g class="f1">%s</g><g class="f2">%s</g><g class="tw">%s</g></svg>{{end}}'
            % (i, rects(grid, override=SCENE_PAL), layer(f1, SCENE_PAL), layer(f2, SCENE_PAL), layer(tw, SCENE_PAL)))


def rects(grid, skip=".", only=None, override=None):
    """把网格转成 rect 列表。only: 只画这些字符；override: {char: color}。"""
    out = []
    for y, row in enumerate(grid):
        x = 0
        while x < len(row):
            c = row[x]
            if c == skip or (only is not None and c not in only) or (c not in PAL and c not in (override or {})):
                x += 1
                continue
            x2 = x
            while x2 + 1 < len(row) and row[x2 + 1] == c:
                x2 += 1
            color = (override or {}).get(c, PAL.get(c))
            out.append(f'<rect x="{x}" y="{y}" width="{x2 - x + 1}" height="1" fill="{color}"/>')
            x = x2 + 1
    return "".join(out)


def layer(cells, pal=None):
    pal = pal or PAL
    out = []
    for y, row in cells.items():
        for x, c in row.items():
            out.append(f'<rect x="{x}" y="{y}" width="1" height="1" fill="{pal[c]}"/>')
    return "".join(out)


# 形象皮肤：换头发/衣服/皮肤三色，再配点小差异（帽子、胡子、补丁）
SKINS = [
    {"name": "0", "H": "#3b2a1e", "R": "#a86f3d", "S": "#f7c9a3"},          # 默认：棕发棕袍
    {"name": "1", "H": "#1e1e2e", "R": "#5b6b8a", "S": "#f2d0b0", "hat": "#c0392b"},   # 黑发蓝袍 + 红头巾
    {"name": "2", "H": "#c0392b", "R": "#4b7a52", "S": "#f7c9a3", "beard": "#8a6a4a"}, # 红发绿袍 + 胡子
    {"name": "3", "H": "#e6b800", "R": "#7a5c8a", "S": "#e8b98a"},          # 金发紫袍
    {"name": "4", "H": "#6b4a2a", "R": "#8a5a3a", "S": "#8d5a3b", "patch": "#556677"}, # 深肤色 + 补丁
    {"name": "5", "H": "#dfe3e8", "R": "#3f4a5a", "S": "#f2d0b0", "beard": "#dfe3e8"}, # 白发白须（老丐）
    {"name": "6", "H": "#2f7d6b", "R": "#2b2b3a", "S": "#f7c9a3", "hat": "#e6b800"},   # 绿毛黑袍 + 金头巾
    {"name": "7", "H": "#a8577d", "R": "#c96b4a", "S": "#f7c9a3"},          # 粉发橘袍
]
HAT = {1: {8: "X", 9: "X", 10: "X", 11: "X", 12: "X", 13: "X", 14: "X"}, 2: {7: "X", 15: "X"}}
BEARD = {13: {8: "X", 9: "X", 14: "X", 15: "X"}, 14: {9: "X", 10: "X", 11: "X", 12: "X", 13: "X", 14: "X"}}
PATCH = {26: {6: "X", 7: "X"}, 27: {6: "X", 7: "X"}}


def main():
    # 身体层：眼睛 / 眼泪位置画皮肤，碗层位置留空（由碗层画）
    body_grid = [r.replace("e", "S").replace("t", "S").replace("b", ".") for r in BEGGAR]
    bowl = rects([BOWL.get(y, "." * 24) for y in range(len(BEGGAR))])
    h = len(BEGGAR)
    for sk in SKINS:
        ov = {"H": sk["H"], "R": sk["R"], "S": sk["S"]}
        body = rects(body_grid, override=ov)
        extra = ""
        for key, cells in (("hat", HAT), ("beard", BEARD), ("patch", PATCH)):
            if sk.get(key):
                extra += "".join('<rect x="%d" y="%d" width="1" height="1" fill="%s"/>' % (x, y, sk[key])
                                 for y, row in cells.items() for x in row)
        name = "sprite" if sk["name"] == "0" else "sprite" + sk["name"]
        print('{{define "%s"}}<svg class="sprite" viewBox="0 0 24 %d" width="96" height="%d" shape-rendering="crispEdges" aria-label="端着碗的赛博乞丐" role="img">'
              '<g class="body">%s%s</g><g class="eyes">%s</g><g class="tear">%s</g><g class="bowl">%s</g></svg>{{end}}'
              % (name, h, h * 4, body, extra, layer(EYES), layer(TEAR), bowl))
    print('{{define "coin"}}<svg class="px-coin" viewBox="0 0 8 8" width="16" height="16" shape-rendering="crispEdges" aria-hidden="true">%s</svg>{{end}}' % rects(COIN))
    print('{{define "bowlicon"}}<svg class="px-bowl" viewBox="0 0 16 7" width="32" height="14" shape-rendering="crispEdges" aria-hidden="true">%s</svg>{{end}}' % rects(BOWLICON))
    print('{{define "spk"}}<svg class="px-spk" viewBox="0 0 12 10" width="20" height="17" shape-rendering="crispEdges" aria-hidden="true">'
          '<g class="spk-body">%s</g><g class="spk-w1">%s</g><g class="spk-w2">%s</g><g class="spk-x">%s</g></svg>{{end}}'
          % (rects(SPEAKER), layer(SPK_WAVE), layer(SPK_WAVE2), layer(SPK_X)))
    print('{{define "trophy"}}<svg class="px-trophy" viewBox="0 0 10 9" width="18" height="16" shape-rendering="crispEdges" aria-hidden="true">%s</svg>{{end}}' % rects(TROPHY))
    print('{{define "shareicon"}}<svg class="px-share" viewBox="0 0 8 9" width="14" height="16" shape-rendering="crispEdges" aria-hidden="true">%s</svg>{{end}}' % rects(SHARE))
    for i, (_, grid, f1, f2, tw) in enumerate(SCENES):
        print(scene_svg(i, grid, f1, f2, tw))
    for y, row in enumerate(VAN):
        assert len(row) == 28, f"城管车第 {y} 行宽 {len(row)}"
    print('{{define "van"}}<svg class="van" viewBox="0 0 28 14" width="112" height="56" shape-rendering="crispEdges" aria-hidden="true">'
          '<g class="vbody">%s</g><g class="l1">%s</g><g class="l2">%s</g></svg>{{end}}'
          % (rects(VAN, override=SCENE_PAL), layer(VAN_L1, SCENE_PAL), layer(VAN_L2, SCENE_PAL)))
    print('{{define "siren"}}<svg class="px-siren" viewBox="0 0 10 9" width="18" height="16" shape-rendering="crispEdges" aria-hidden="true">%s</svg>{{end}}' % rects(SIREN, override=SCENE_PAL))
    print('{{define "keyicon"}}<svg class="px-key" viewBox="0 0 12 5" width="19" height="8" shape-rendering="crispEdges" aria-hidden="true">%s</svg>{{end}}' % rects(KEY))
    # 形象分发：{{template "skin" 编号}}
    print('{{define "skin"}}' + ''.join('{{%s eq . %d}}{{template "sprite%d"}}' % ("if" if i == 1 else "else if", i, i) for i in range(1, len(SKINS))) + '{{else}}{{template "sprite"}}{{end}}{{end}}')


if __name__ == "__main__":
    main()
