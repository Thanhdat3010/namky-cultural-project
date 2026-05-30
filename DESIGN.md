# BẬU — Landing Page Design Specification

## Brand Identity

| Token | Value |
|---|---|
| Primary Red | `#AE2E13` |
| Navy Blue | `#01204E` |
| Warm Sand | `#F6DCAC` |
| Off-White | `#FFF9EE` |

**Heading Font:** Phudu (Google Fonts) — used for all headings, section titles, logo text  
**Body Font:** Krub (Google Fonts) — used for all body copy, nav links, labels, captions

---

## Global Layout Rules

- Max content width: **1200px**, centered with `auto` horizontal margins
- Base font size: 16px (body), scale up with clamp() for headings
- All page scroll: `scroll-behavior: smooth`
- Images: lazy-loaded with `loading="lazy"`, use `decoding="async"`; WebP images preloaded for hero
- Responsive breakpoints: mobile < 768px, tablet 768–1024px, desktop > 1024px

---

## Assets

| File | Usage |
|---|---|
| `Heading_BG.svg` | Full-width hero section background (inline SVG or `<img>`) |
| `Logo.svg` | Navbar logo, height 40px on desktop / 32px on mobile |
| `1780064086349_image.png` | Hero section supporting image (carousel slot 1) |
| Carousel images | `bitexco.webp`, `charner.webp`, `cho_lon.webp`, `cong_vien_23_9.webp`, `DJI_0947_2_znews.webp`, `sai_gon_1966.webp`, `sai_gon_1969.webp`, `sai_gon_1970.webp` |
| Historical timeline images | `sai_gon_1966.webp` (1986 section), `charner.webp` (1975 section), `DJI_0947_2_znews.webp` (2000 section), `bitexco.webp` (2026 section) |

---

## Section Map (top → bottom)

1. **Navbar**
2. **Hero** — "TIẾNG NÓI CỦA MỘT THÀNH PHỐ"
3. **Intro** — Side-by-side: language converter demo + "Phương ngữ Nam Bộ hình thành thế nào?"
4. **Converter** — "Người Sài Gòn Xưa Sẽ Nói Thế Nào?"
5. **Timeline** — "Sài Gòn Qua Âm Thanh"
6. **Memory Wall** — "Bức Tường Ký Ức"
7. **Ticket CTA** — "Vé Khởi Hành"
8. **Footer**

---

## 1. Navbar

**Background:** `#F6DCAC` (matches hero sand tone)  
**Position:** `sticky`, `top: 0`, `z-index: 100`  
**Box-shadow on scroll:** `0 2px 16px rgba(1,32,78,0.10)` — added via JS `scroll` event  
**Height:** 64px desktop, 56px mobile  
**Padding:** 0 48px desktop, 0 20px mobile  
**Layout:** flex, space-between, align-center

### Logo
- `Logo.svg` inline, height 40px
- Links to `#top` / reloads page

### Navigation Links
- Font: Krub, 15px, weight 500
- Color: `#01204E`
- Items: **Trang chủ** | **Sài Gòn Xưa** | **Tiếng Cũ**
- Active/hover: color `#AE2E13`, underline via `border-bottom: 2px solid #AE2E13`
- **"Sài Gòn Xưa"** → smooth scroll to `#section-phuong-ngu` (Phương ngữ Nam Bộ section)
- **"Tiếng Cũ"** → smooth scroll to `#section-converter` (Người Sài Gòn Xưa nói thế nào)

### Mobile Hamburger
- Show hamburger icon (≡) at < 768px
- Opens a full-width dropdown with same links, background `#F6DCAC`

---

## 2. Hero Section

**Background:** `Heading_BG.svg` — rendered as full-width `<img>` or inline SVG, `object-fit: cover`  
**Min-height:** 100vh  
**Layout:** Two-column on desktop (text left 50%, carousel right 50%), stacked on mobile

### Left Column — Text Block
- Tag/label: "bậu" in small-caps, Phudu, color `#AE2E13`, letter-spacing 0.2em
- Main heading: **"TIẾNG NÓI / CỦA MỘT / THÀNH PHỐ"** — Phudu, 72px desktop / 40px mobile, color `#01204E`, line-height 1.1
- Body paragraph: Krub, 16px, color `#01204E`, max-width 480px
- Caption: "Bản quyền hình ảnh: Zing News", Krub, 12px, italic, color `#01204E` opacity 0.6

### Right Column — Auto-playing Carousel
**Images:** All 8 `.webp` photos from the asset folder  
**Behavior:**
- Auto-advance every **3.5 seconds**, infinite loop (cyclic)
- CSS `transition: transform 0.7s cubic-bezier(0.4,0,0.2,1)` for slide
- No pause on hover (continuous)
- Soft fade on left/right edges using `::before`/`::after` pseudo-elements with gradient overlays in `#F6DCAC`
- Images: `aspect-ratio: 4/3`, `object-fit: cover`, border-radius 8px
- Dots indicator at bottom: filled = `#AE2E13`, empty = `#F6DCAC` with border

---

## 3. Two-Column Intro Section

**Background:** `#FFF9EE`  
**Padding:** 80px 48px desktop, 48px 20px mobile  
**Layout:** Two columns, gap 64px, stacked on mobile (right column first on mobile)

### Left Column — "TIẾNG NÓI HIỆN NAY / PHƯƠNG NGỮ NAM BỘ" demo box
- Section label: Krub, 12px uppercase, `#AE2E13`
- Two text boxes side by side:
  - Left box header: "TIẾNG NÓI HIỆN NAY" — Phudu 14px, `#01204E`
  - Right box header: "PHƯƠNG NGỮ NAM BỘ" — Phudu 14px, `#AE2E13`
  - Both boxes: background `#F6DCAC`, border-radius 8px, padding 16px, Krub 14px
  - Example text as shown in design (modern Vietnamese → Nam Bộ dialect)
- Arrow icon between boxes: `→`, color `#AE2E13`

### Right Column — "Phương Ngữ Nam Bộ Hình Thành Thế Nào?"
- **ID:** `section-phuong-ngu` (nav anchor target)
- Heading: Phudu, 36px desktop / 28px mobile, color `#AE2E13`
- Body: Krub, 16px, color `#01204E`, two paragraphs as per design text

---

## 4. Converter Section — "Người Sài Gòn Xưa Sẽ Nói Thế Nào?"

**ID:** `section-converter`  
**Background:** `#F6DCAC`  
**Padding:** 80px 48px desktop, 48px 20px mobile  

### Heading
- Phudu, 48px desktop / 32px mobile, color `#01204E`
- Subheading paragraph: Krub, 16px, color `#01204E`, max-width 720px, centered

### Input/Output Area
**Layout:** Two text areas stacked vertically, centered, max-width 720px

**Input Textarea**
- Placeholder: "Ví dụ: Mình làm gì bây giờ?" then below "Hãy cho BẬU biết câu nói của bạn"
- Background: `#FFF9EE`, border: `2px solid #01204E`, border-radius 8px
- Padding: 16px, min-height: 100px, Krub 16px, color `#01204E`
- Focus: border-color `#AE2E13`, box-shadow `0 0 0 3px rgba(174,46,19,0.15)`

**Convert Button**
- Label: "Chuyển đổi"
- Background: `#AE2E13`, color: `#FFF9EE`, Phudu 18px
- Border-radius: 6px, padding: 12px 40px
- Hover: background `#01204E`
- Centered below input

**Output Textarea**
- Placeholder: "Câu nói tiếng Phương ngữ sẽ hiện ra ở đây"
- Background: `#FFF9EE` with slight opacity difference (0.7), border: `2px dashed #01204E`
- `readonly` attribute — output only, no user input
- Same sizing as input

**Footer note** under output:  
"Mỗi câu nói được chuyển đổi…" — Krub, 14px, italic, color `#01204E` opacity 0.7, centered

---

## 5. Timeline Section — "Sài Gòn Qua Âm Thanh"

**Background:** `#FFF9EE`  
**Padding:** 80px 48px desktop, 48px 20px mobile  

### Heading
- Phudu, 48px, color `#01204E`, centered  
- Decorative line under: `2px solid #AE2E13`, width 80px, centered

### Timeline Layout
**Desktop:** Horizontal timeline — 4 nodes evenly spaced across a horizontal line  
**Mobile:** Vertical timeline — stacked cards with line on left side

**Connecting line:** `2px solid #AE2E13`  
**Node dot:** circle 16px, background `#AE2E13`, border `4px solid #FFF9EE`, centered on line

**4 Cards (alternating above/below on desktop):**

| Year | Title | Image |
|---|---|---|
| 1975 | Tiếng radio và những con hẻm nhỏ | `charner.webp` |
| 1986 | Thành phố bắt đầu chuyển mình | `sai_gon_1966.webp` |
| 2000 | Nhịp sống hiện đại dần xuất hiện | `DJI_0947_2_znews.webp` |
| 2026 | Ký ức được lưu giữ bằng công nghệ | `bitexco.webp` |

**Card style:**
- Background: `#F6DCAC`, border-radius 10px, padding 16px
- Image: top of card, aspect-ratio 16/9, object-fit cover, border-radius 6px
- Year label: Phudu 20px bold, color `#AE2E13`
- Title: Phudu 15px, color `#01204E`
- Body: Krub 13px, color `#01204E` opacity 0.8
- Image caption: Krub 11px italic, `#01204E` opacity 0.5

---

## 6. Memory Wall — "Bức Tường Ký Ức"

**Background:** `#01204E`  
**Padding:** 60px 0 (no horizontal padding — full bleed)  
**Overflow:** hidden

### Heading
- Phudu, 48px, color `#F6DCAC`, centered, padding 0 48px

### Word Wall Layout
Three rows of scrolling text, each row scrolling in **opposite direction** (row 1 & 3 → left; row 2 → right).  
**Infinite marquee animation** using CSS `@keyframes` with `translateX`.  
**Speed:** ~30s per cycle for a natural drift feel.

**Word display format:** Each word is a `<span>` pill:
- Large words (tu): Phudu, varied sizes (20px–48px), color alternating `#F6DCAC` / `#AE2E13` / `#F6DCAC80`
- Small gloss (nghia): Krub, 11px, color `#F6DCAC` opacity 0.5, shown below the word

### Word Data (first 10 from dictionary — representative sample):
```
bậu       — tiếng gọi người tiếp chuyện, có ý thương mến
bả        — bà ấy (ngôi III, nữ)
lẹ        — nhanh, mau lẹ
hén       — nhỉ, phải không
nghen     — nhé, nghe
hổm rày   — mấy ngày vừa qua
má        — mẹ
tía       — cha, ba
mượn      — vay tiền
nhậu      — uống rượu bia cùng nhau
```

---

## 7. Ticket CTA Section — "Vé Khởi Hành"

**Background:** Split — left 60% is a full-bleed city photo (`bitexco.webp`, darkened with `rgba(1,32,78,0.5)` overlay), right 40% is `#AE2E13`  
**Min-height:** 400px  
**Layout:** Two-column, stacked on mobile (image top, card bottom)

### Right — Ticket Card
**Background:** `#AE2E13`  
**Padding:** 48px 40px  
**Font color:** `#FFF9EE`

- Stars: ★★★★★ — Phudu 18px, `#F6DCAC`
- Kicker label: "Vé khởi hành / Trở về Sài Gòn xưa" — Phudu 32px
- Location line: "Địa điểm: Thành Phố Hồ Chí Minh" — Krub 14px
- Price line: "Chi phí: Miễn Phí" — Krub 14px
- Body paragraph: Krub 14px, opacity 0.9

---

## 8. Footer

**Background:** `#01204E`  
**Padding:** 40px 48px, 24px 20px mobile  
**Layout:** Three columns desktop, stacked mobile

- Col 1: "BẬU — Một câu nói, hai thời đại" (Phudu 18px `#F6DCAC`) + taglines
- Col 2: "Sài Gòn Xưa" / "Tiếng Cũ" nav links (Krub 14px `#F6DCAC` opacity 0.7)
- Col 3: Source credit + contact (Krub 13px `#F6DCAC` opacity 0.6)
  - "Nguồn tham khảo từ điển: 'Từ điển từ ngữ Nam Bộ' — Huỳnh Công Tín"
  - Contact: Trần Duy Nhân — nhantd.rs@gmail.com

Divider: `1px solid rgba(246,220,172,0.2)` above footer bottom bar  
Bottom bar: copyright line, Krub 12px, centered, `#F6DCAC` opacity 0.4

---

## Animation & Performance Notes

- **WebP preload:** Add `<link rel="preload">` for carousel images visible in first viewport
- **Lazy loading:** All images below fold use `loading="lazy"` + `decoding="async"`
- **Carousel:** Pure CSS + minimal JS (requestAnimationFrame or setInterval 3500ms), no library dependency
- **Marquee:** Pure CSS `@keyframes scroll-left` / `scroll-right`, `will-change: transform`
- **Scroll animations:** Intersection Observer API — fade-up cards/sections as they enter viewport (`opacity: 0 → 1`, `translateY: 30px → 0`, duration 0.6s ease)
- **Smooth scroll:** `html { scroll-behavior: smooth }` + CSS `scroll-padding-top: 64px` for navbar offset
- **No layout shift:** Reserve image aspect-ratio with `aspect-ratio` CSS property, not fixed heights

---

## Accessibility

- All images: meaningful `alt` text in Vietnamese
- Navbar: `aria-label="Điều hướng chính"`, hamburger button `aria-expanded`
- Converter textareas: `<label>` elements linked via `for`/`id`
- Color contrast: all text meets WCAG AA (dark text on light backgrounds, light text on dark)
- Focus states: visible outline `2px solid #AE2E13` on all interactive elements
