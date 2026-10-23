import os
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1920, 1080

def get_font(name, size):
    font_path = f"C:/Windows/Fonts/{name}"
    if os.path.exists(font_path):
        return ImageFont.truetype(font_path, size)
    return ImageFont.load_default()

def create_luvcutlet_cover():
    """
    Creates an authentic, high-impact Luv Cutlet cover using the user's uploaded
    violet & yellow theme and real food packaging photo.
    Colors:
      - Violet / Royal Purple: #5b2b82
      - Sunny Marigold Yellow: #fab818
      - Clean White: #ffffff
    """
    PURPLE = (91, 43, 130)       # #5b2b82
    PURPLE_DARK = (72, 32, 105)  # #482069
    YELLOW = (250, 184, 24)      # #fab818
    WHITE = (255, 255, 255)

    img = Image.new("RGB", (WIDTH, HEIGHT), PURPLE)
    draw = ImageDraw.Draw(img)

    # Subtle radial gradient for luxury depth
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = int(PURPLE[0] * (1.05 - ratio * 0.15))
        g = int(PURPLE[1] * (1.05 - ratio * 0.15))
        b = int(PURPLE[2] * (1.05 - ratio * 0.15))
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))

    # User uploaded sticker artwork
    user_theme_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\8226526a-1e51-458e-b5c7-c6398fff00ff\.user_uploaded\media_1791960981294.png"
    if os.path.exists(user_theme_path):
        theme_img = Image.open(user_theme_path).convert("RGBA")
        # Place it nicely in the left/center hero area
        tw, th = theme_img.size
        # scale to width 1100
        new_tw = 1100
        new_th = int(th * (new_tw / tw))
        theme_img = theme_img.resize((new_tw, new_th), Image.Resampling.LANCZOS)
        # Paste with alpha
        img.paste(theme_img, (80, 240), theme_img)

    # Real Cutlet Packaging Photo on the right side
    packaging_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\8226526a-1e51-458e-b5c7-c6398fff00ff\.tempmediaStorage\media_1791958392544.jpg"
    if os.path.exists(packaging_path):
        pack_img = Image.open(packaging_path).convert("RGB")
        # Crop square around the cutlets
        pw, ph = pack_img.size
        crop_box = (int(pw * 0.2), int(ph * 0.15), int(pw * 0.8), int(ph * 0.75))
        pack_cropped = pack_img.crop(crop_box)
        target_size = (620, 620)
        pack_cropped = pack_cropped.resize(target_size, Image.Resampling.LANCZOS)

        # Place inside a rounded showcase card with yellow border
        card_x, card_y = 1200, 220
        # Draw shadow
        draw.rounded_rectangle([(card_x - 10, card_y - 10), (card_x + target_size[0] + 10, card_y + target_size[1] + 10)],
                               radius=20, fill="#421a60", outline="#fab818", width=3)
        img.paste(pack_cropped, (card_x, card_y))

        # Card label
        f_badge = get_font("segoeuib.ttf", 18)
        draw.rounded_rectangle([(card_x + 30, card_y + target_size[1] - 65), (card_x + 320, card_y + target_size[1] - 15)],
                               radius=8, fill="#5b2b82", outline="#fab818", width=2)
        draw.text((card_x + 50, card_y + target_size[1] - 55), "FRESH GOLDEN CUTLETS", font=f_badge, fill="#fab818")

    # Fonts
    font_logo_big = get_font("arialbd.ttf", 48)
    font_nav = get_font("segoeuib.ttf", 17)
    font_eyebrow = get_font("courbd.ttf", 18)
    font_h1 = get_font("segoeuib.ttf", 64)
    font_body = get_font("segoeui.ttf", 22)
    font_pill = get_font("segoeuib.ttf", 16)
    font_meta = get_font("cour.ttf", 16)

    # --- TOP BRAND BAR ---
    # Logo
    draw.rounded_rectangle([(80, 60), (320, 125)], radius=12, fill="#fab818")
    draw.text((105, 68), "LUV CUTLET", font=get_font("arialbd.ttf", 36), fill="#5b2b82")

    # Sub-tag next to logo
    draw.text((350, 72), "INDIA'S 1ST CUTLET-ONLY QSR BRAND", font=font_nav, fill="#ffffff")
    draw.text((350, 100), "FLAVOR ON WHEELS  //  STREET HOMECOOKING", font=font_eyebrow, fill="#fab818")

    # Right badge
    draw.rounded_rectangle([(1520, 65), (1840, 120)], radius=25, fill="#fab818")
    draw.text((1550, 78), "ALL DAY CUTLET DAY", font=font_pill, fill="#5b2b82")

    # Divider below header
    draw.line([(80, 145), (1840, 145)], fill="#7a3ea8", width=2)

    # --- BOTTOM STRIP ---
    draw.rounded_rectangle([(80, 930), (1840, 1010)], radius=12, fill="#482069", outline="#7a3ea8", width=1)

    pills = [
        ("VIOLET & YELLOW THEME", "#fab818"),
        ("3-WHEELER HERITAGE", "#ffffff"),
        ("MULTI-CITY SCALE: KOCHI • TVM • PALAKKAD", "#fab818"),
        ("GLOBAL FRANCHISE FUNNEL", "#ffffff")
    ]
    px = 110
    for text, col in pills:
        draw.text((px, 955), text, font=font_pill, fill=col)
        px += 420

    # Save output
    out_path = "public/images/projects/luvcutlet-cover.jpg"
    img.save(out_path, quality=95)
    print("Created Luv Cutlet cover:", out_path)

if __name__ == "__main__":
    create_luvcutlet_cover()
