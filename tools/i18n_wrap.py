#!/usr/bin/env python3
"""把模板里的中文包成 {{T "…"}}，并打印 key 清单。
用法：python3 tools/i18n_wrap.py --dry templates/site.html   （只列 key）
      python3 tools/i18n_wrap.py templates/*.html              （原地改写）
规则：只处理标签之间的文本节点和 placeholder/title/aria-label/alt/content 属性；
      文本里夹着 {{…}} 动作时按动作切开，每段中文各自包一层。
"""
import re, sys

CJK = re.compile(r'[一-鿿]')
ACTION = re.compile(r'\{\{.*?\}\}', re.S)
ATTR = re.compile(r'\b(placeholder|title|aria-label|alt|content|data-tip)="([^"{}]*[一-鿿][^"{}]*)"')
keys = []

def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

def wrap_segment(seg):
    """seg 是不含 {{}} 与 <> 的纯文本；把其中的中文串（含中英混排的整句）包起来，保留首尾空白。"""
    if not CJK.search(seg):
        return seg
    lead = len(seg) - len(seg.lstrip())
    trail = len(seg) - len(seg.rstrip())
    core = seg.strip()
    if not core:
        return seg
    keys.append(core)
    return seg[:lead] + '{{T "' + esc(core) + '"}}' + seg[len(seg) - trail:] if trail else seg[:lead] + '{{T "' + esc(core) + '"}}'

def wrap_text(text):
    """标签之间的文本，可能含 {{…}}。"""
    if not CJK.search(text):
        return text
    out, pos = [], 0
    for m in ACTION.finditer(text):
        out.append(wrap_segment(text[pos:m.start()]))
        out.append(m.group(0))
        pos = m.end()
    out.append(wrap_segment(text[pos:]))
    return ''.join(out)

def process(src):
    # 跳过 <script>…</script> 与 <style>…</style>（里面的中文单独手工处理）
    parts = re.split(r'(<script\b.*?</script>|<style\b.*?</style>)', src, flags=re.S)
    res = []
    for i, part in enumerate(parts):
        if i % 2 == 1:
            res.append(part)
            continue
        # 属性
        part = ATTR.sub(lambda m: (keys.append(m.group(2)) or f'{m.group(1)}="{{{{T "{esc(m.group(2))}"}}}}"'), part)
        # 文本节点：按标签切
        toks = re.split(r'(<[^>]+>)', part)
        for j, t in enumerate(toks):
            if j % 2 == 0:
                toks[j] = wrap_text(t)
        res.append(''.join(toks))
    return ''.join(res)

def main():
    dry = '--dry' in sys.argv
    files = [a for a in sys.argv[1:] if not a.startswith('--')]
    for f in files:
        src = open(f, encoding='utf-8').read()
        out = process(src)
        if not dry:
            open(f, 'w', encoding='utf-8').write(out)
    seen = set()
    for k in keys:
        if k not in seen:
            seen.add(k)
            print(k)

if __name__ == '__main__':
    main()
