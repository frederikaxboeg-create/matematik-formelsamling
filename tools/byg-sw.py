#!/usr/bin/env python3
"""Opdaterer sw.js før en udgivelse: hæver CACHE-versionen og genskaber FILES-listen.

Kør fra projektmappen:  python3 tools/byg-sw.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SW = ROOT / "sw.js"
FOLDERS = ["css", "js", "icons", "vendor"]
TOP = ["index.html", "manifest.webmanifest"]
SKIP = {".DS_Store", "LICENSE"}


def files():
    out = ["./", *TOP]
    for folder in FOLDERS:
        found = sorted(
            p.relative_to(ROOT).as_posix()
            for p in (ROOT / folder).rglob("*")
            if p.is_file() and p.name not in SKIP
        )
        out.extend(found)
    return out


def main():
    text = SW.read_text(encoding="utf-8")
    version = int(re.search(r"const CACHE = 'formelsamling-v(\d+)'", text).group(1)) + 1
    text = re.sub(r"const CACHE = 'formelsamling-v\d+'", f"const CACHE = 'formelsamling-v{version}'", text)
    listing = "const FILES = [\n" + "".join(f"  '{f}',\n" for f in files()) + "];"
    text = re.sub(r"const FILES = \[.*?\];", lambda _: listing, text, flags=re.S)
    SW.write_text(text, encoding="utf-8")
    print(f"sw.js: version v{version}, {len(files())} filer")


if __name__ == "__main__":
    main()
