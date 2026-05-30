# SKILL: Build "Bậu" Landing Page

## Purpose
Build a single-file `index.html` landing page for the "BẬU" project — a Vietnamese cultural web experience preserving Southern Vietnamese (Nam Bộ) dialect. Read `design.md` first for full visual specification.

---

## Required Fonts (Google Fonts)
Add to `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Phudu:wght@400;600;700;900&family=Krub:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
```
- `--font-heading: 'Phudu', sans-serif`
- `--font-body: 'Krub', sans-serif`

---

## CSS Variables (paste into `:root`)
```css
:root {
  --red:      #AE2E13;
  --navy:     #01204E;
  --sand:     #F6DCAC;
  --cream:    #FFF9EE;
  --font-heading: 'Phudu', sans-serif;
  --font-body:    'Krub', sans-serif;
  --max-w: 1200px;
  --nav-h: 64px;
}
```

---

## File Structure (single HTML file)
```
index.html
  <head>  fonts, meta, CSS
  <body>
    <nav>               ← sticky navbar
    <main>
      <section#hero>    ← Heading_BG + carousel
      <section#section-phuong-ngu>  ← 2-col intro
      <section#section-converter>  ← AI converter UI
      <section#timeline>           ← Sài Gòn âm thanh
      <section#memory-wall>        ← Bức tường ký ức
      <section#ticket>             ← CTA ticket
    </main>
    <footer>
  </body>
```

---

## Implementation Steps

### Step 1 — HTML Skeleton
Create the full document with all sections, IDs, and semantic elements.  
Include ALL content text in Vietnamese exactly as provided in `design.md`.

### Step 2 — CSS Reset + Base
```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; scroll-padding-top: var(--nav-h); }
body { font-family: var(--font-body); background: var(--cream); color: var(--navy); }
img { display: block; max-width: 100%; }
```

### Step 3 — Navbar
```css
nav {
  position: sticky; top: 0; z-index: 100;
  background: var(--sand);
  height: var(--nav-h);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px;
  transition: box-shadow 0.3s ease;
}
nav.scrolled { box-shadow: 0 2px 16px rgba(1,32,78,0.12); }
```

**JS for scroll shadow:**
```js
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 10);
});
```

**Logo:** Inline the SVG from `Logo.svg` directly — do NOT use `<img src>` for SVG logo.  
Logo SVG path fill: `#01204E`.

**Nav links:**
```css
.nav-links a {
  font-family: var(--font-body); font-size: 15px; font-weight: 500;
  color: var(--navy); text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.nav-links a:hover { color: var(--red); border-bottom-color: var(--red); }
```

**Smooth scroll targets (JS):**
```js
document.querySelectorAll('a[data-scroll]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.dataset.scroll)
      .scrollIntoView({ behavior: 'smooth' });
  });
});
```

**Mobile hamburger:** hidden on desktop, show at < 768px using CSS + JS toggle.

---

### Step 4 — Hero Section
```html
<section id="hero">
  <div class="hero-bg">
    <!-- Heading_BG.svg as <img> with loading="eager" -->
    <img src="asset/Heading_BG.svg" alt="" class="hero-bg-img" aria-hidden="true">
  </div>
  <div class="hero-content">
    <div class="hero-text"> ... </div>
    <div class="hero-carousel"> ... </div>
  </div>
</section>
```

```css
#hero { position: relative; min-height: 100vh; overflow: hidden; }
.hero-bg-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero-content { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; align-items: center; min-height: 100vh; max-width: var(--max-w); margin: 0 auto; padding: 80px 48px; gap: 64px; }
```

**Carousel implementation:**
```html
<div class="carousel" aria-label="Ảnh Sài Gòn xưa">
  <div class="carousel-track">
    <!-- duplicate slides for infinite loop: original + clone -->
    <div class="slide"><img src="asset/bitexco.webp" loading="eager" decoding="async" alt="Bitexco"></div>
    <!-- ... 7 more slides + clones ... -->
  </div>
  <div class="carousel-fade-left"></div>
  <div class="carousel-fade-right"></div>
  <div class="carousel-dots"> ... </div>
</div>
```

```css
.carousel { position: relative; overflow: hidden; border-radius: 12px; }
.carousel-track { display: flex; transition: transform 0.7s cubic-bezier(0.4,0,0.2,1); }
.slide { flex: 0 0 100%; }
.slide img { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
.carousel-fade-left, .carousel-fade-right {
  position: absolute; top: 0; bottom: 0; width: 60px; pointer-events: none;
}
.carousel-fade-left  { left:  0; background: linear-gradient(to right, var(--sand), transparent); }
.carousel-fade-right { right: 0; background: linear-gradient(to left,  var(--sand), transparent); }
```

**JS carousel — auto-advance, infinite loop:**
```js
const track = document.querySelector('.carousel-track');
const slides = track.querySelectorAll('.slide');
const total = slides.length;
let current = 0;
let timer;

function goTo(n) {
  current = ((n % total) + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  // update dots
  document.querySelectorAll('.dot').forEach((d,i) =>
    d.classList.toggle('active', i === current));
}

function next() { goTo(current + 1); }

function startTimer() { timer = setInterval(next, 3500); }
startTimer();

// dots click
document.querySelectorAll('.dot').forEach((d,i) => {
  d.addEventListener('click', () => { clearInterval(timer); goTo(i); startTimer(); });
});
```

```css
.carousel-dots { display: flex; justify-content: center; gap: 8px; padding: 12px 0; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: transparent; border: 2px solid var(--red); cursor: pointer; transition: background 0.2s; }
.dot.active { background: var(--red); }
```

---

### Step 5 — Intro Two-Column Section
**ID:** `section-phuong-ngu` (nav anchor)

```css
#section-phuong-ngu { background: var(--cream); padding: 80px 48px; }
.intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; max-width: var(--max-w); margin: 0 auto; align-items: start; }
```

Left col: demo comparison box  
Right col: heading "Phương Ngữ Nam Bộ Hình Thành Thế Nào?" + two paragraphs

---

### Step 6 — Converter Section
**ID:** `section-converter` (nav anchor)

```css
#section-converter { background: var(--sand); padding: 80px 48px; text-align: center; }
.converter-wrap { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
textarea {
  width: 100%; padding: 16px; border-radius: 8px; border: 2px solid var(--navy);
  background: var(--cream); font-family: var(--font-body); font-size: 16px;
  color: var(--navy); min-height: 120px; resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
}
textarea:focus { outline: none; border-color: var(--red); box-shadow: 0 0 0 3px rgba(174,46,19,0.15); }
textarea[readonly] { border-style: dashed; opacity: 0.85; cursor: default; }
.btn-convert {
  align-self: center; background: var(--red); color: var(--cream);
  font-family: var(--font-heading); font-size: 18px; border: none;
  padding: 12px 40px; border-radius: 6px; cursor: pointer;
  transition: background 0.2s;
}
.btn-convert:hover { background: var(--navy); }
```

> **Note for AI integration:** The button `#btn-convert` reads from `#input-text` and writes result to `#output-text`. Hook into `click` event of `#btn-convert`.

---

### Step 7 — Timeline Section

```css
#timeline { background: var(--cream); padding: 80px 48px; }
.timeline-track {
  position: relative; display: grid; grid-template-columns: repeat(4,1fr);
  gap: 24px; max-width: var(--max-w); margin: 40px auto 0;
}
.timeline-track::before {
  content: ''; position: absolute; top: 50%; left: 0; right: 0;
  height: 2px; background: var(--red); transform: translateY(-50%);
  z-index: 0;
}
.timeline-card { position: relative; z-index: 1; background: var(--sand); border-radius: 10px; overflow: hidden; }
/* alternating: even cards push down */
.timeline-card:nth-child(even) { margin-top: 60px; }
.timeline-card:nth-child(odd)  { margin-bottom: 60px; }
.timeline-card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.timeline-card .year { font-family: var(--font-heading); font-size: 20px; color: var(--red); padding: 12px 16px 4px; }
.timeline-card .card-title { font-family: var(--font-heading); font-size: 14px; color: var(--navy); padding: 0 16px 8px; }
.timeline-card .card-body { font-size: 13px; color: rgba(1,32,78,0.8); padding: 0 16px 16px; line-height: 1.6; }
.timeline-node {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 16px; height: 16px; border-radius: 50%;
  background: var(--red); border: 4px solid var(--cream);
  z-index: 2;
}
```

On mobile (< 768px): switch to single column vertical layout, remove the alternating offset.

---

### Step 8 — Memory Wall

```css
#memory-wall { background: var(--navy); padding: 60px 0; overflow: hidden; }
#memory-wall h2 { text-align: center; font-family: var(--font-heading); color: var(--sand); font-size: 48px; padding: 0 48px 40px; }
.marquee-row { display: flex; gap: 32px; white-space: nowrap; }
.marquee-row:nth-child(1) { animation: scroll-left  30s linear infinite; }
.marquee-row:nth-child(2) { animation: scroll-right 35s linear infinite; }
.marquee-row:nth-child(3) { animation: scroll-left  25s linear infinite; }

@keyframes scroll-left  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
@keyframes scroll-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }

.word-pill { display: inline-flex; flex-direction: column; align-items: center; padding: 8px 20px; }
.word-pill .word { font-family: var(--font-heading); color: var(--sand); }
.word-pill .gloss { font-family: var(--font-body); font-size: 11px; color: rgba(246,220,172,0.5); margin-top: 2px; }
```

**Word size variation:** assign class `size-sm`/`size-md`/`size-lg`/`size-xl` cyclically:
- `size-sm`: 20px; `size-md`: 28px; `size-lg`: 36px; `size-xl`: 48px
- Color alternates: `var(--sand)`, `var(--red)`, `rgba(246,220,172,0.65)`

**Duplicate content for seamless loop:** Each row's HTML must contain the words **twice** (original + exact clone) so the marquee loops without a gap.

**Word data to embed (10 words from Từ Điển Nam Bộ):**
```
bậu      — tiếng gọi người tiếp chuyện, có ý thương mến
bả       — bà ấy (ngôi III, nữ)
lẹ       — nhanh, mau lẹ
hén      — nhỉ, phải không
nghen    — nhé, nghe
hổm rày  — mấy ngày vừa qua
má       — mẹ
tía      — cha, ba
nhậu     — uống rượu bia cùng bạn bè
mượn     — vay, vay tiền
```
Distribute words unevenly across 3 rows (e.g. row1: 4 words, row2: 3 words, row3: 3 words).

---

### Step 9 — Ticket CTA

```css
#ticket { display: grid; grid-template-columns: 1.5fr 1fr; min-height: 400px; }
.ticket-photo { position: relative; overflow: hidden; }
.ticket-photo img { width: 100%; height: 100%; object-fit: cover; }
.ticket-photo::after { content: ''; position: absolute; inset: 0; background: rgba(1,32,78,0.45); }
.ticket-card { background: var(--red); color: var(--cream); padding: 48px 40px; display: flex; flex-direction: column; justify-content: center; gap: 12px; }
.ticket-stars { color: var(--sand); font-size: 18px; letter-spacing: 3px; }
.ticket-heading { font-family: var(--font-heading); font-size: 32px; line-height: 1.2; }
.ticket-meta { font-size: 14px; opacity: 0.85; }
.ticket-body { font-size: 14px; line-height: 1.7; opacity: 0.9; margin-top: 8px; }
```

---

### Step 10 — Footer

```css
footer { background: var(--navy); color: var(--sand); padding: 40px 48px; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 2fr; gap: 40px; max-width: var(--max-w); margin: 0 auto; }
footer a { color: rgba(246,220,172,0.7); text-decoration: none; font-size: 14px; }
footer a:hover { color: var(--sand); }
.footer-brand { font-family: var(--font-heading); font-size: 18px; color: var(--sand); }
.footer-divider { border: none; border-top: 1px solid rgba(246,220,172,0.15); margin: 24px 0 16px; }
.footer-copy { text-align: center; font-size: 12px; color: rgba(246,220,172,0.35); }
```

---

### Step 11 — Scroll Reveal Animation

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

```css
.reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

Apply `.reveal` class to: section headings, timeline cards, intro columns, ticket card.

---

### Step 12 — Responsive Rules

```css
@media (max-width: 1024px) {
  .hero-content { padding: 60px 32px; gap: 40px; }
  .intro-grid { gap: 40px; }
}
@media (max-width: 768px) {
  :root { --nav-h: 56px; }
  nav { padding: 0 20px; }
  .nav-links { display: none; flex-direction: column; position: absolute; top: var(--nav-h); left: 0; right: 0; background: var(--sand); padding: 20px; gap: 16px; box-shadow: 0 4px 12px rgba(1,32,78,0.1); }
  .nav-links.open { display: flex; }
  .hero-content { grid-template-columns: 1fr; padding: 40px 20px; }
  .intro-grid { grid-template-columns: 1fr; padding: 48px 20px; }
  #section-converter { padding: 48px 20px; }
  #timeline { padding: 48px 20px; }
  .timeline-track { grid-template-columns: 1fr; }
  .timeline-card:nth-child(even), .timeline-card:nth-child(odd) { margin: 0; }
  .timeline-track::before { display: none; }
  #ticket { grid-template-columns: 1fr; }
  .ticket-photo { min-height: 240px; }
  footer { padding: 32px 20px; }
  .footer-grid { grid-template-columns: 1fr; gap: 24px; }
}
```

---

## Performance Checklist

- [ ] Hero images: `loading="eager"`, all others `loading="lazy" decoding="async"`
- [ ] Add `<link rel="preload" as="image" href="asset/Heading_BG.svg">` in `<head>`
- [ ] Carousel images preloaded for first 2 slides
- [ ] `will-change: transform` on `.carousel-track` and `.marquee-row`
- [ ] No blocking scripts — all `<script>` tags at bottom of `<body>` or `defer`
- [ ] `aspect-ratio` on all images to prevent layout shift
- [ ] CSS `contain: layout style` on memory wall rows

---

## Output

Deliver a single `index.html` file.  
Reference assets with relative paths like `asset/bitexco.webp`, `asset/Logo.svg`, etc.  
The file must be self-contained except for asset references and Google Fonts CDN.

> **AI Converter hook point:**  
> `document.getElementById('btn-convert')` — add click listener  
> Input: `document.getElementById('input-text').value`  
> Output: set `document.getElementById('output-text').value = result`
