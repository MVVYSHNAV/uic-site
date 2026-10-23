import os
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1920, 1080

def get_font(name, size):
    font_path = f"C:/Windows/Fonts/{name}"
    if os.path.exists(font_path):
        return ImageFont.truetype(font_path, size)
    return ImageFont.load_default()

def create_pixpil_cover():
    """
    Creates an authentic editorial Pixpil (PXPL) website showcase.
    Color theme: Black/Charcoal (#0c0f0e), Crisp White (#ffffff), Pixpil Electric Green (#00dc4c).
    Zero violet, zero yellow, zero missing glyphs.
    Matches live pixpildesign.com exact nav (Work, About us, Blog, Contact).
    """
    img = Image.new("RGB", (WIDTH, HEIGHT), "#0c0f0e")
    draw = ImageDraw.Draw(img)

    # Subtle ambient background gradient
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = int(10 + ratio * 6)
        g = int(14 + ratio * 6)
        b = int(13 + ratio * 6)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))

    # Grid lines (Pixpil architectural branding)
    grid_color = (255, 255, 255, 10)
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    for x in range(120, WIDTH, 240):
        overlay_draw.line([(x, 0), (x, HEIGHT)], fill=grid_color, width=1)
    for y in range(100, HEIGHT, 160):
        overlay_draw.line([(0, y), (WIDTH, y)], fill=grid_color, width=1)
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # Fonts
    font_nav = get_font("segoeui.ttf", 18)
    font_nav_bold = get_font("segoeuib.ttf", 18)
    font_hero_big = get_font("segoeuib.ttf", 80)
    font_body = get_font("segoeui.ttf", 23)
    font_mono = get_font("cour.ttf", 17)
    font_mono_bold = get_font("courbd.ttf", 18)
    font_tag = get_font("segoeuib.ttf", 16)
    font_small = get_font("segoeui.ttf", 15)

    # --- TOP NAVBAR ---
    # Draw PXPL logo
    logo_path = "public/images/projects/pixpil-logo.png"
    if os.path.exists(logo_path):
        logo_img = Image.open(logo_path).convert("RGBA")
        w, h = logo_img.size
        new_w = int(w * (38 / h))
        logo_img = logo_img.resize((new_w, 38), Image.Resampling.LANCZOS)
        img.paste(logo_img, (120, 68), logo_img)
    else:
        draw.text((120, 68), "PXPL", font=get_font("segoeuib.ttf", 34), fill="#ffffff")

    # Exact 4 live nav links from pixpildesign.com
    nav_items = ["WORK", "ABOUT US", "BLOG", "CONTACT"]
    nav_x = 1060
    for idx, item in enumerate(nav_items):
        f = font_nav_bold if item == "WORK" else font_nav
        c = "#ffffff" if item == "WORK" else "#8c9693"
        draw.text((nav_x, 78), item, font=f, fill=c)
        if item == "WORK":
            # Active indicator in Pixpil Electric Green (#00dc4c)
            draw.rectangle([(nav_x, 108), (nav_x + 55, 110)], fill="#00dc4c")
        nav_x += 140

    # Button: "START A PROJECT"
    draw.rounded_rectangle([(1640, 64), (1800, 114)], radius=25, fill="#1c2422", outline="#2f3b38", width=1)
    draw.text((1665, 78), "LET'S TALK ->", font=font_tag, fill="#ffffff")

    # Divider below header
    draw.line([(120, 140), (1800, 140)], fill="#1a2220", width=1)

    # --- LEFT COLUMN: HERO HEADLINE ---
    # Eyebrow in Electric Green
    draw.text((120, 200), "THE BRAND EXPERIENCE (BX) COMPANY  //  KOCHI • SHANGHAI", font=font_mono_bold, fill="#00dc4c")

    # Big headline
    draw.text((120, 240), "WHERE\nSTRATEGY\nMEETS PURE\nCRAFT.", font=font_hero_big, fill="#ffffff", spacing=8)

    # Body description
    desc = (
        "We are a market-driven, strategy-led creative agency.\n"
        "The PXPL BX(R) Method is our globally registered\n"
        "framework for creating iconic brand experiences."
    )
    draw.text((120, 670), desc, font=font_body, fill="#9aa5a1", spacing=8)

    # Meta credentials
    draw.rounded_rectangle([(120, 800), (460, 850)], radius=6, fill="#131a18", outline="#25332f", width=1)
    draw.text((140, 816), "EST. 2018  •  PXPL BX(R) REGISTERED", font=font_tag, fill="#d0dad6")

    # --- RIGHT COLUMN: SHOWCASE MOCKUP SCREEN ---
    sc_x0, sc_y0, sc_x1, sc_y1 = 880, 200, 1800, 880
    draw.rounded_rectangle([(sc_x0, sc_y0), (sc_x1, sc_y1)], radius=14, fill="#131a18", outline="#26332f", width=1)

    # Browser header
    draw.rounded_rectangle([(sc_x0, sc_y0), (sc_x1, sc_y0 + 50)], radius=14, fill="#192220")
    draw.rectangle([(sc_x0, sc_y0 + 25), (sc_x1, sc_y0 + 50)], fill="#192220")
    # Window dots
    draw.ellipse([(sc_x0 + 20, sc_y0 + 20), (sc_x0 + 30, sc_y0 + 30)], fill="#ff5f56")
    draw.ellipse([(sc_x0 + 38, sc_y0 + 20), (sc_x0 + 48, sc_y0 + 30)], fill="#ffbd2e")
    draw.ellipse([(sc_x0 + 56, sc_y0 + 20), (sc_x0 + 66, sc_y0 + 30)], fill="#27c93f")
    # Address bar
    draw.rounded_rectangle([(sc_x0 + 100, sc_y0 + 12), (sc_x1 - 100, sc_y0 + 38)], radius=6, fill="#0d1210")
    draw.text((sc_x0 + 120, sc_y0 + 17), "https://www.pixpildesign.com/work/", font=font_small, fill="#7b8884")

    # Inside showcase: Featured Case Study
    vp_x0, vp_y0, vp_x1, vp_y1 = sc_x0 + 40, sc_y0 + 80, sc_x1 - 40, sc_y0 + 430
    draw.rounded_rectangle([(vp_x0, vp_y0), (vp_x1, vp_y1)], radius=10, fill="#090c0b", outline="#222e2b", width=1)

    case_path = "public/images/projects/pixpil-case.png"
    if os.path.exists(case_path):
        case_img = Image.open(case_path).convert("RGBA")
        target_w = vp_x1 - vp_x0
        target_h = vp_y1 - vp_y0
        case_img = case_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        img.paste(case_img, (vp_x0, vp_y0), case_img)
        # Subtle vignette over the banner
        grad = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
        g_draw = ImageDraw.Draw(grad)
        g_draw.rectangle([(0, 0), (target_w, target_h)], fill=(0, 0, 0, 40))
        g_draw.text((36, target_h - 50), "FEATURED BX CASE: WHERE SOUTH MEETS WEST", font=font_tag, fill="#ffffff")
        img.paste(grad, (vp_x0, vp_y0), grad)

    # Three Real Client Case Study Chips at the bottom of showcase
    cs_y = sc_y0 + 460
    draw.text((sc_x0 + 40, cs_y), "SELECTED BRAND RELEASES", font=font_mono, fill="#7b8884")

    cards = [
        ("01", "LUV CUTLET", "QSR Digital Experience", "#00dc4c"),
        ("02", "DAFY", "Mobility Platform", "#f4f3ee"),
        ("03", "KOCO TREAT", "Street to Store BX", "#f4f3ee"),
    ]
    card_w = 260
    card_x = sc_x0 + 40
    for num, title, cat, accent in cards:
        draw.rounded_rectangle([(card_x, cs_y + 30), (card_x + card_w, cs_y + 160)], radius=8, fill="#0d1210", outline="#1f2a27", width=1)
        draw.text((card_x + 18, cs_y + 45), num, font=font_mono_bold, fill=accent)
        draw.text((card_x + 18, cs_y + 75), title, font=font_tag, fill="#ffffff")
        draw.text((card_x + 18, cs_y + 105), cat, font=font_small, fill="#8c9693")
        draw.text((card_x + card_w - 35, cs_y + 45), "->", font=font_tag, fill="#8c9693")
        card_x += card_w + 20

    # Save output
    out_path = "public/images/projects/pixpil-cover.jpg"
    img.save(out_path, quality=95)
    print("Created Pixpil cover:", out_path)

def create_dafy_cover():
    """
    Creates an authentic Dafy cover using the genuine banner from dafy.in.
    Color theme: Dafy Yellow (#fdb813 / #ffc107), Slate Navy (#1b294b), Crisp White.
    Zero violet, zero missing glyphs.
    """
    banner_path = "public/images/projects/dafy-banner.jpg"
    if os.path.exists(banner_path):
        base_img = Image.open(banner_path).convert("RGB")
        base_img = base_img.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    else:
        base_img = Image.new("RGB", (WIDTH, HEIGHT), "#141c2b")

    # Dark cinematic gradient overlay
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    d_over = ImageDraw.Draw(overlay)

    # Dark gradient from left
    for x in range(950):
        alpha = int(225 * (1.0 - x / 950))
        d_over.line([(x, 0), (x, HEIGHT)], fill=(20, 28, 48, alpha))

    # Dark top vignette
    for y in range(200):
        alpha = int(180 * (1.0 - y / 200))
        d_over.line([(0, y), (WIDTH, y)], fill=(20, 28, 48, alpha))

    # Dark bottom vignette
    for y in range(HEIGHT - 200, HEIGHT):
        alpha = int(220 * ((y - (HEIGHT - 200)) / 200))
        d_over.line([(0, y), (WIDTH, y)], fill=(20, 28, 48, alpha))

    comp = Image.alpha_composite(base_img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(comp)

    # Fonts
    font_logo_big = get_font("arialbd.ttf", 52)
    font_h1 = get_font("segoeuib.ttf", 74)
    font_body = get_font("segoeui.ttf", 22)
    font_tag = get_font("segoeuib.ttf", 17)
    font_pill = get_font("segoeuib.ttf", 15)
    font_mono = get_font("courbd.ttf", 16)
    font_meta = get_font("cour.ttf", 16)

    # --- TOP BRAND BAR ---
    # Dafy Yellow Badge
    draw.rounded_rectangle([(100, 70), (280, 130)], radius=8, fill="#fdb813")
    draw.text((120, 74), "DAFY", font=font_logo_big, fill="#1b294b")

    # Sub-tag next to logo
    draw.text((310, 82), "ON-DEMAND CHAUFFEURS", font=font_tag, fill="#ffffff")
    draw.text((310, 108), "YOUR CAR • OUR DRIVER", font=font_mono, fill="#fdb813")

    # Rating pill (Clean text without special character squares)
    draw.rounded_rectangle([(1500, 75), (1820, 125)], radius=25, fill="#1b294b", outline="#fdb813", width=2)
    draw.text((1535, 88), "RATED 4.98 / 5.0 STARS", font=font_pill, fill="#fdb813")

    # --- LEFT HERO CONTENT ---
    draw.rounded_rectangle([(100, 220), (410, 260)], radius=4, fill="#1b294b", outline="#2c3e66", width=1)
    draw.text((115, 230), "PROFESSIONAL CHAUFFEURS ON TAP", font=font_pill, fill="#fdb813")

    # Headline
    draw.text((100, 280), "YOUR CAR.\nOUR DRIVER.\nZERO HASSLE.", font=font_h1, fill="#ffffff", spacing=12)

    # Body
    body_text = (
        "Book verified, background-checked professional drivers\n"
        "for round trips, airport drops, daily commutes, and outstation.\n"
        "Seamless 3-tap instant mobile dispatch."
    )
    draw.text((100, 570), body_text, font=font_body, fill="#e2e8f0", spacing=8)

    # Feature badges row (clean bullets)
    badges = [
        "VERIFIED DRIVERS",
        "ROUND TRIPS & DROPS",
        "10X DISPATCH SCALE"
    ]
    bx = 100
    for b in badges:
        draw.rounded_rectangle([(bx, 710), (bx + 230, 755)], radius=6, fill="#0f172a", outline="#334155", width=1)
        draw.text((bx + 24, 723), b, font=font_pill, fill="#fdb813")
        bx += 250

    # Bottom strip
    draw.text((100, 990), "DAFY ONLINE PVT. LTD  •  MOBILITY SUITE & BOOKING APP  •  DAFY.IN", font=font_meta, fill="#94a3b8")

    out_path = "public/images/projects/dafy-cover.jpg"
    comp.save(out_path, quality=95)
    print("Created Dafy cover:", out_path)

if __name__ == "__main__":
    create_pixpil_cover()
    create_dafy_cover()
