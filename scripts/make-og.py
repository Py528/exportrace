#!/usr/bin/env python
"""Generate public/og-image.jpg (1200x630) — dark brand card with mono command.

Run with any Python that has Pillow (exportrace-cli/.venv does).
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (10, 11, 13)
FG = (255, 255, 255)
DIM = (150, 155, 160)
LIME = (118, 185, 0)  # #76B900
MONO = "/System/Library/Fonts/Menlo.ttc"
SANS = "/System/Library/Fonts/SFPro.ttf"
SANS_B = "/System/Library/Fonts/SFProDisplay-Bold.ttf"

def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.truetype(MONO, size)

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# lime accent bar
d.rectangle([0, 0, 10, H], fill=LIME)

# logo chevrons
def chevron(x, y, s, w, fill):
    d.line([(x, y), (x + s, y + s), (x, y + 2 * s)], fill=fill, width=w, joint="curve")

chevron(64, 66, 20, 9, LIME)
chevron(96, 66, 20, 9, (140, 200, 60))
d.text((140, 66), "exportrace", font=font(SANS_B, 40), fill=FG)
d.text((372, 78), "v0.1", font=font(SANS, 22), fill=DIM)

# headline
d.text((64, 160), "One command.", font=font(SANS_B, 84), fill=FG)
d.text((64, 250), "Your best YOLO export config.", font=font(SANS_B, 60), fill=LIME)

# terminal pill
d.rounded_rectangle([64, 372, 820, 448], radius=16, fill=(20, 22, 25), outline=(60, 64, 70), width=2)
d.text((88, 392), "$", font=font(MONO, 30), fill=LIME)
d.text((122, 392), "exportrace run yolov8n.pt", font=font(MONO, 30), fill=FG)

# footer facts
facts = "MIT licensed   •   No accounts   •   Runs offline   •   Apple Silicon + Ultralytics"
d.text((64, 492), facts, font=font(SANS, 26), fill=DIM)

# right-side stat block
x = 900
d.text((x, 168), "273.8 FPS", font=font(SANS_B, 52), fill=LIME)
d.text((x, 232), "CoreML EP, real M5 Pro", font=font(SANS, 20), fill=DIM)
d.text((x, 300), "p99 4.9 ms", font=font(SANS_B, 40), fill=FG)
d.text((x, 352), "tail latency, E2E", font=font(SANS, 20), fill=DIM)
d.text((x, 414), "22×5 = 110", font=font(SANS_B, 40), fill=FG)
d.text((x, 466), "models × backends measured", font=font(SANS, 20), fill=DIM)

out = Path(__file__).resolve().parents[1] / "public" / "og-image.jpg"
img.save(out, quality=88)
print("wrote", out)
