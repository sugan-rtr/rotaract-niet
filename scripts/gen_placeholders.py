"""
Generates on-brand placeholder JPEGs (navy/gold gradient + label) for every
image path referenced in the app, so the site renders correctly before real
photos are dropped in. Re-run any time new image paths are added to data/content.ts.
"""
import os
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.join(os.path.dirname(__file__), "..", "public")

NAVY = (5, 8, 22)
NAVY_2 = (10, 15, 40)
GOLD = (255, 215, 0)
GOLD_DIM = (140, 110, 20)

JPG_TARGETS = {
    "images/about/club-photo.jpg": ("Club Photo", (900, 1125)),
    "images/board/president.jpg": ("President", (600, 800)),
    "images/board/vp.jpg": ("Vice President", (600, 800)),
    "images/board/secretary.jpg": ("Secretary", (600, 800)),
    "images/board/treasurer.jpg": ("Treasurer", (600, 800)),
    "images/board/dir-community.jpg": ("Dir. Community", (600, 800)),
    "images/board/dir-pd.jpg": ("Dir. Prof. Dev.", (600, 800)),
    "images/board/dir-intl.jpg": ("Dir. Intl. Service", (600, 800)),
    "images/board/dir-media.jpg": ("Dir. Digital Media", (600, 800)),
    "images/projects/blood-donation.jpg": ("Blood Donation Drive", (960, 600)),
    "images/projects/tree-plantation.jpg": ("Tree Plantation", (960, 600)),
    "images/projects/cleanup.jpg": ("Beach & River Cleanup", (960, 600)),
    "images/projects/mental-health.jpg": ("Mental Health Week", (960, 600)),
    "images/projects/rural-education.jpg": ("Rural Education", (960, 600)),
    "images/projects/women-empowerment.jpg": ("Women Empowerment", (960, 600)),
    "images/events/induction.jpg": ("Induction Week", (640, 480)),
    "images/events/mental-health.jpg": ("Mental Health Week", (640, 480)),
    "images/events/summit.jpg": ("Rotaract Summit", (640, 480)),
    "images/events/cleanup.jpg": ("River Cleanup", (640, 480)),
    "images/events/blood-donation.jpg": ("Blood Donation", (640, 480)),
    "images/gallery/1.jpg": ("Service", (700, 900)),
    "images/gallery/2.jpg": ("Meetings", (700, 560)),
    "images/gallery/3.jpg": ("Community", (700, 780)),
    "images/gallery/4.jpg": ("Celebrations", (700, 620)),
    "images/gallery/5.jpg": ("Leadership", (700, 860)),
    "images/gallery/6.jpg": ("Service", (700, 700)),
    "images/gallery/7.jpg": ("Community", (700, 940)),
    "images/gallery/8.jpg": ("Celebrations", (700, 600)),
    "images/gallery/9.jpg": ("Meetings", (700, 760)),
}


def get_font(size):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def make_placeholder(path, label, size):
    w, h = size
    img = Image.new("RGB", (w, h), NAVY)
    draw = ImageDraw.Draw(img)

    # Diagonal gradient navy -> deep navy
    for y in range(h):
        t = y / h
        r = int(NAVY[0] + (NAVY_2[0] - NAVY[0]) * t)
        g = int(NAVY[1] + (NAVY_2[1] - NAVY[1]) * t)
        b = int(NAVY[2] + (NAVY_2[2] - NAVY[2]) * t)
        draw.line([(0, y), (w, y)], fill=(r, g, b))

    # Soft gold radial-ish accent circles for texture
    random.seed(hash(label) % 10000)
    for _ in range(5):
        cx, cy = random.randint(0, w), random.randint(0, h)
        r = random.randint(int(min(w, h) * 0.15), int(min(w, h) * 0.4))
        overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        odraw = ImageDraw.Draw(overlay)
        odraw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*GOLD_DIM, 22))
        overlay = overlay.filter(ImageFilter.GaussianBlur(r // 2))
        img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
        draw = ImageDraw.Draw(img)

    # Thin gold corner accent
    draw.line([(0, 0), (min(80, w), 0)], fill=GOLD, width=4)
    draw.line([(0, 0), (0, min(80, h))], fill=GOLD, width=4)

    # Label text, centered
    font_size = max(16, int(min(w, h) * 0.055))
    font = get_font(font_size)
    bbox = draw.textbbox((0, 0), label, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((w - tw) / 2, (h - th) / 2 - 6), label, fill=(255, 255, 255), font=font)

    sub = "ROTARACT NIET"
    sub_font = get_font(max(11, int(font_size * 0.42)))
    bbox2 = draw.textbbox((0, 0), sub, font=sub_font)
    stw = bbox2[2] - bbox2[0]
    draw.text(((w - stw) / 2, (h - th) / 2 + th + 4), sub, fill=GOLD, font=sub_font)

    full_path = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    img.save(full_path, "JPEG", quality=82)


if __name__ == "__main__":
    for rel_path, (label, size) in JPG_TARGETS.items():
        make_placeholder(rel_path, label, size)
    print(f"Generated {len(JPG_TARGETS)} placeholder images.")
