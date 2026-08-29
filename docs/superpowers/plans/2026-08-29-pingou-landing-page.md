# PINGOU! Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static one-page landing site for the fictional ice cream shop PINGOU!, with a distinctive playful visual identity and "trapalhada" (exaggerated elastic/bounce) GSAP animations.

**Architecture:** Single static site — `index.html` + `style.css` + `script.js`, no build step, no framework. GSAP + ScrollTrigger loaded via CDN. All content hardcoded in HTML (no CMS/backend).

**Tech Stack:** HTML5, CSS3 (custom properties, no preprocessor), vanilla JS, GSAP 3.12.5 (core + ScrollTrigger) via cdnjs CDN, Google Fonts (Baloo 2, Nunito, Space Mono).

## Global Constraints

- Design tokens (must be used verbatim everywhere, no ad-hoc colors/fonts):
  - Colors: `--cream:#FBF3E7` `--white:#FFFDF9` `--cherry:#E8342A` `--cherry-dark:#C21F1F` `--choc:#3A2318` `--strawberry:#F4A6B7` `--mint:#B8DFC9` `--gold:#E8B94A`
  - Fonts: display = `'Baloo 2'`, body = `'Nunito'`, utility/mono = `'Space Mono'`
- Vermelho (`--cherry`) is the accent color — used for CTAs, wordmark, tags, and the drip signature motif. Never used as a full-page background.
- Signature motif: a teardrop/drip SVG shape, reused in the hero, the "sobre" section, and the location pin. This is the one visual element that ties the whole page together — don't introduce a second competing motif.
- Layout is intentionally asymmetric/tilted (wobbly wordmark, scattered flavor cards) — this is a design choice, not a bug. Don't "fix" it into a perfectly aligned grid.
- Respect `prefers-reduced-motion: reduce` — when set, skip all GSAP animation creation entirely (content must still be fully visible and readable without JS running any tweens).
- **Testing adaptation:** this is a static visual/animation deliverable with no business logic, so there are no unit tests. Each task's "test" step is a manual browser verification (open `index.html` directly, or via a simple local server, and check the specific visual/console criteria listed in that task). Do not skip these checks.
- Commit after each task with Conventional Commits format (`feat:`, `style:`, etc.) per user's global convention.

---

### Task 1: Project scaffold & design tokens

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `script.js`

**Interfaces:**
- Produces: `index.html` skeleton with `<body>` containing an empty `<div class="cursor-drip" aria-hidden="true"></div>` and a `<script src="script.js"></script>` before `</body>`, ready for later tasks to insert `<section>` elements before the script tag.
- Produces: CSS custom properties on `:root` (`--cream`, `--white`, `--cherry`, `--cherry-dark`, `--choc`, `--strawberry`, `--mint`, `--gold`, `--font-display`, `--font-body`, `--font-mono`) that every later task's CSS must reference.

- [ ] **Step 1: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PINGOU! Sorveteria Artesanal</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="cursor-drip" aria-hidden="true"></div>

<!-- sections get inserted here by later tasks -->

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `style.css` with reset + design tokens**

```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--cream);
  color: var(--choc);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.5;
  overflow-x: hidden;
}
img, svg { max-width: 100%; display: block; }

:root {
  --cream: #FBF3E7;
  --white: #FFFDF9;
  --cherry: #E8342A;
  --cherry-dark: #C21F1F;
  --choc: #3A2318;
  --strawberry: #F4A6B7;
  --mint: #B8DFC9;
  --gold: #E8B94A;
  --font-display: 'Baloo 2', sans-serif;
  --font-body: 'Nunito', sans-serif;
  --font-mono: 'Space Mono', monospace;
}

.section-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: var(--choc);
  margin: 0 0 2rem;
  display: inline-block;
}

.btn {
  display: inline-block;
  font-family: var(--font-display);
  font-weight: 700;
  text-decoration: none;
  border-radius: 999px;
  padding: 0.9rem 2.2rem;
  cursor: pointer;
  border: none;
}
.btn--cta {
  background: var(--cherry);
  color: var(--white);
  box-shadow: 0 6px 0 var(--cherry-dark);
}

.cursor-drip {
  position: fixed;
  top: 0; left: 0;
  width: 22px; height: 28px;
  background: var(--cherry);
  border-radius: 50% 50% 50% 0;
  transform: rotate(45deg) translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.2s;
}
.cursor-drip.is-active { opacity: 0.85; }
@media (hover: none) { .cursor-drip { display: none; } }

@media (prefers-reduced-motion: reduce) {
  .hero__wordmark, .hero__cta, .flavor-card, .section-title { transition: none !important; }
}
```

- [ ] **Step 3: Create empty `script.js`**

```js
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;
  gsap.registerPlugin(ScrollTrigger);
});
```

- [ ] **Step 4: Manual verification**

Open `index.html` directly in a browser (double-click or drag into a tab).
Expected: blank cream-colored (`#FBF3E7`) page, no visible content yet, zero errors in the browser console (check DevTools → Console), Network tab shows the three Google Fonts weights and both GSAP CDN scripts loading with status 200.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: scaffold PINGOU! landing page with design tokens"
```

---

### Task 2: Hero section

**Files:**
- Modify: `index.html` (insert `<section class="hero">` in the placeholder area)
- Modify: `style.css` (append hero rules)

**Interfaces:**
- Consumes: design tokens from Task 1 (`--cherry`, `--choc`, `--font-display`, etc.)
- Produces: `.hero__wordmark`, `.hero__tagline`, `.hero__cta`, `.hero__cone`, `.hero__eyebrow`, `.hero__drip` elements/classes that Task 7 (hero entrance animation) will animate by these exact class names.

- [ ] **Step 1: Insert hero markup into `index.html`** (replace the `<!-- sections get inserted here -->` comment)

```html
<section class="hero" id="hero">
  <div class="hero__drip" aria-hidden="true">
    <svg viewBox="0 0 200 240" preserveAspectRatio="none">
      <path d="M100 0 C160 60 190 110 150 170 C120 215 70 215 45 175 C10 120 40 55 100 0 Z"/>
    </svg>
  </div>

  <div class="hero__inner">
    <p class="hero__eyebrow">sorveteria artesanal desde nunca</p>
    <h1 class="hero__wordmark">PINGOU!</h1>
    <p class="hero__tagline">Sorvete de verdade, feito por gente que não sabe segurar casquinha direito.</p>
    <a href="#sabores" class="btn btn--cta hero__cta">Ver sabores</a>
  </div>

  <svg class="hero__cone" viewBox="0 0 200 260" aria-hidden="true">
    <g class="cone__lines" stroke="#3A2318" stroke-width="2" opacity="0.35">
      <line x1="70" y1="140" x2="108" y2="232"/>
      <line x1="82" y1="140" x2="112" y2="222"/>
      <line x1="94" y1="140" x2="116" y2="212"/>
      <line x1="106" y1="140" x2="120" y2="202"/>
      <line x1="118" y1="140" x2="124" y2="192"/>
      <line x1="130" y1="140" x2="128" y2="180"/>
    </g>
    <path class="cone__body" d="M62 138 L138 138 L104 236 Q100 246 96 236 Z" fill="#E8B94A"/>
    <path class="scoop scoop--strawberry" d="M52 148 C52 104 148 104 148 148 C148 170 118 152 100 152 C82 152 52 170 52 148 Z" fill="#F4A6B7"/>
    <path class="scoop scoop--mint" d="M64 112 C64 74 136 74 136 112 C136 132 112 118 100 118 C88 118 64 132 64 112 Z" fill="#B8DFC9"/>
    <circle class="cherry" cx="100" cy="62" r="15" fill="#E8342A"/>
    <path class="cherry__stem" d="M100 47 Q108 28 122 24" stroke="#3A2318" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>
</section>
```

- [ ] **Step 2: Append hero styles to `style.css`**

```css
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 2rem;
  text-align: center;
}
.hero__drip {
  position: absolute;
  top: -60px;
  right: -40px;
  width: 260px;
  color: var(--cherry);
  opacity: 0.9;
  z-index: 0;
}
.hero__drip svg path { fill: currentColor; }

.hero__inner {
  position: relative;
  z-index: 2;
  max-width: 640px;
}
.hero__eyebrow {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.8rem;
  color: var(--cherry-dark);
  margin-bottom: 0.5rem;
}
.hero__wordmark {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(3.5rem, 12vw, 7rem);
  color: var(--cherry);
  margin: 0;
  transform: rotate(-3deg);
  line-height: 1;
}
.hero__tagline {
  font-size: clamp(1rem, 2vw, 1.25rem);
  max-width: 480px;
  margin: 1.5rem auto;
}
.hero__cta { transform: rotate(-2deg); }

.hero__cone {
  position: relative;
  z-index: 1;
  width: clamp(140px, 20vw, 200px);
  margin: 1rem auto 0;
}

@media (max-width: 600px) {
  .hero__cone { display: none; }
}
```

- [ ] **Step 3: Manual verification**

Open `index.html` in a browser.
Expected: hero fills the full viewport height, "PINGOU!" renders huge in cherry red and visibly tilted (~-3deg), a red drip blob bleeds from the top-right corner, the ice cream cone illustration (gold cone, pink+mint scoops, red cherry) renders below the tagline, the "Ver sabores" pill button is red with a darker red drop-shadow edge. Click "Ver sabores" — no crash (it's fine that `#sabores` doesn't exist yet, the browser just won't scroll). Resize to ~375px width in DevTools: cone illustration disappears, text stays readable and centered.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add PINGOU! hero section with wordmark and cone illustration"
```

---

### Task 3: Sabores (flavors) section

**Files:**
- Modify: `index.html` (insert `<section class="sabores">` after `.hero`)
- Modify: `style.css` (append sabores rules)

**Interfaces:**
- Consumes: `.section-title` class from Task 1, design tokens.
- Produces: `.flavor-card` elements (8 of them) that Task 8 (scroll reveal) and Task 9 (hover) will select via `document.querySelectorAll('.flavor-card')` / `gsap.utils.toArray('.flavor-card')`.

- [ ] **Step 1: Insert sabores markup into `index.html`** (immediately after `</section>` that closes `.hero`)

```html
<section class="sabores" id="sabores">
  <h2 class="section-title">Sabores de hoje (e de sempre, mas hoje também)</h2>
  <div class="sabores__grid">
    <article class="flavor-card">
      <span class="flavor-card__tag">clássico</span>
      <h3 class="flavor-card__name">Chocolate Trapalhão</h3>
      <p class="flavor-card__desc">Chocolate meio amargo com pedaços de brownie queimado de propósito.</p>
    </article>
    <article class="flavor-card">
      <span class="flavor-card__tag">premium</span>
      <h3 class="flavor-card__name">Morango Zoeira</h3>
      <p class="flavor-card__desc">Morango de verdade com calda que escorre pra fora sem pedir licença.</p>
    </article>
    <article class="flavor-card">
      <span class="flavor-card__tag">edição limitada</span>
      <h3 class="flavor-card__name">Pistache Categórico</h3>
      <p class="flavor-card__desc">Pistache torrado na hora, sem samba no pé mas com sabor de sobra.</p>
    </article>
    <article class="flavor-card">
      <span class="flavor-card__tag">clássico</span>
      <h3 class="flavor-card__name">Doce de Leite Cangaceiro</h3>
      <p class="flavor-card__desc">Doce de leite cremoso com raspas de rapadura por cima.</p>
    </article>
    <article class="flavor-card">
      <span class="flavor-card__tag">premium</span>
      <h3 class="flavor-card__name">Limão Bagunçado</h3>
      <p class="flavor-card__desc">Azedinho, gelado, com raspas de limão jogadas sem dó nenhuma.</p>
    </article>
    <article class="flavor-card">
      <span class="flavor-card__tag">clássico</span>
      <h3 class="flavor-card__name">Café com Rapadura</h3>
      <p class="flavor-card__desc">Café intenso pra sorveteria que não tira folga nem de madrugada.</p>
    </article>
    <article class="flavor-card">
      <span class="flavor-card__tag">edição limitada</span>
      <h3 class="flavor-card__name">Coco Queimado</h3>
      <p class="flavor-card__desc">Coco tostado direto na chama, com aquele sabor meio defumado.</p>
    </article>
    <article class="flavor-card">
      <span class="flavor-card__tag">premium</span>
      <h3 class="flavor-card__name">Uva Atrapalhada</h3>
      <p class="flavor-card__desc">Uva roxa com bolinhas de sorvete que erraram o formato de propósito.</p>
    </article>
  </div>
</section>
```

- [ ] **Step 2: Append sabores styles to `style.css`**

```css
.sabores {
  padding: 5rem 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}
.sabores__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 2.5rem 1.5rem;
  text-align: left;
  margin-top: 1rem;
}
.flavor-card {
  background: var(--white);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(58,35,24,0.08);
}
.flavor-card:nth-child(6n+1){ transform: rotate(-3deg); }
.flavor-card:nth-child(6n+2){ transform: rotate(2deg); }
.flavor-card:nth-child(6n+3){ transform: rotate(-1.5deg); }
.flavor-card:nth-child(6n+4){ transform: rotate(3deg); }
.flavor-card:nth-child(6n+5){ transform: rotate(-2deg); }
.flavor-card:nth-child(6n){ transform: rotate(1.5deg); }

.flavor-card__tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  background: var(--mint);
  color: var(--choc);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  display: inline-block;
  margin-bottom: 0.75rem;
}
.flavor-card__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0 0 0.5rem;
  color: var(--cherry-dark);
}
.flavor-card__desc { font-size: 0.95rem; margin: 0; }
```

- [ ] **Step 3: Manual verification**

Open `index.html`, scroll to the sabores section.
Expected: 8 white rounded cards in a grid, each visibly tilted at a slightly different angle (scattered look, not a perfect grid), each with a mint tag pill, a cherry-dark flavor name, and description text. Resize to mobile width (~375px): grid collapses to a single column, cards remain readable and don't overlap.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add sabores section with scattered flavor cards"
```

---

### Task 4: Sobre (about) section

**Files:**
- Modify: `index.html` (insert `<section class="sobre">` after `.sabores`)
- Modify: `style.css` (append sobre rules)

**Interfaces:**
- Produces: `.sobre__drip` element that Task 8 will give a gentle continuous float animation.

- [ ] **Step 1: Insert sobre markup into `index.html`**

```html
<section class="sobre" id="sobre">
  <div class="sobre__inner">
    <h2 class="section-title">Nossa história (meio torta, como tudo aqui)</h2>
    <p class="sobre__texto">A PINGOU! nasceu de um acidente: uma máquina de sorvete desregulada, duas pessoas sem noção nenhuma de proporção e uma vontade indecente de fazer sorvete bom. A gente ainda erra a mão todo santo dia — só que agora é de propósito, e sempre a seu favor.</p>
    <svg class="sobre__drip" viewBox="0 0 120 140" aria-hidden="true">
      <path d="M60 0 C95 35 110 65 88 100 C70 128 40 128 25 98 C5 60 25 30 60 0 Z" fill="#F4A6B7"/>
    </svg>
  </div>
</section>
```

- [ ] **Step 2: Append sobre styles to `style.css`**

```css
.sobre { background: var(--white); padding: 5rem 1.5rem; }
.sobre__inner {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}
.sobre__texto { font-size: 1.1rem; }
.sobre__drip { width: 70px; margin: 2rem auto 0; }
```

- [ ] **Step 3: Manual verification**

Open `index.html`, scroll to the sobre section.
Expected: white background section (contrasts with cream page background), centered story text, a small pink teardrop SVG below the text.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add sobre section"
```

---

### Task 5: Localização (location & hours) section

**Files:**
- Modify: `index.html` (insert `<section class="localizacao">` after `.sobre`)
- Modify: `style.css` (append localizacao rules)

**Interfaces:**
- Produces: `.localizacao__pin` decorative SVG (no animation dependency from later tasks).

- [ ] **Step 1: Insert localizacao markup into `index.html`**

```html
<section class="localizacao" id="localizacao">
  <div class="localizacao__inner">
    <h2 class="section-title">Onde a bagunça acontece</h2>
    <div class="localizacao__grid">
      <div class="localizacao__info">
        <p><strong>Endereço:</strong> Rua das Casquinhas, 123 — Bairro Sorvete Bom</p>
        <p><strong>Horário:</strong> Terça a domingo, 13h às 22h</p>
        <p class="localizacao__nota">(segunda a gente também erra a mão e esquece de abrir)</p>
      </div>
      <svg class="localizacao__pin" viewBox="0 0 100 130" aria-hidden="true">
        <path d="M50 0 C78 0 98 22 98 50 C98 85 50 130 50 130 C50 130 2 85 2 50 C2 22 22 0 50 0 Z" fill="#E8342A"/>
        <circle cx="50" cy="48" r="18" fill="#FBF3E7"/>
      </svg>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append localizacao styles to `style.css`**

```css
.localizacao { padding: 5rem 1.5rem; }
.localizacao__inner { max-width: 900px; margin: 0 auto; text-align: center; }
.localizacao__grid {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: left;
  margin-top: 1rem;
}
.localizacao__info { max-width: 360px; }
.localizacao__nota { font-style: italic; color: var(--cherry-dark); font-size: 0.9rem; }
.localizacao__pin { width: 90px; }

@media (max-width: 600px) {
  .localizacao__grid { flex-direction: column; text-align: center; }
  .localizacao__info { text-align: center; }
}
```

- [ ] **Step 3: Manual verification**

Open `index.html`, scroll to the localização section.
Expected: address and hours text next to (or, on mobile, stacked above/below) a red map-pin SVG with a cream circle cutout. Text is left-aligned on desktop, centered on mobile (<600px).

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add localizacao section"
```

---

### Task 6: Rodapé (footer) section

**Files:**
- Modify: `index.html` (insert `<footer class="rodape">` after `.localizacao`, before the script tags)
- Modify: `style.css` (append rodape rules)

- [ ] **Step 1: Insert rodape markup into `index.html`**

```html
<footer class="rodape" id="contato">
  <p class="rodape__cta">Vem pingar com a gente.</p>
  <div class="rodape__social">
    <a href="#" class="rodape__icon" aria-label="Instagram">
      <svg viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="2" width="20" height="20" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="1.4" fill="currentColor"/></svg>
    </a>
    <a href="#" class="rodape__icon" aria-label="TikTok">
      <svg viewBox="0 0 24 24" width="24" height="24"><path d="M14 2v12.5a3.5 3.5 0 1 1-3-3.46V8a6 6 0 1 0 6 6V8.5a6.5 6.5 0 0 0 4-1.5V4a4 4 0 0 1-4-2h-3z" fill="currentColor"/></svg>
    </a>
  </div>
  <p class="rodape__fine">PINGOU! Sorveteria — projeto de demonstração, sem sorvete de verdade (por enquanto).</p>
</footer>
```

- [ ] **Step 2: Append rodape styles to `style.css`**

```css
.rodape {
  background: var(--choc);
  color: var(--cream);
  text-align: center;
  padding: 4rem 1.5rem 2rem;
}
.rodape__cta {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  color: var(--strawberry);
  margin: 0;
}
.rodape__social { display: flex; justify-content: center; gap: 1.25rem; margin: 1.5rem 0; }
.rodape__icon { color: var(--cream); }
.rodape__fine { font-size: 0.75rem; opacity: 0.6; margin-top: 2rem; }
```

- [ ] **Step 3: Manual verification**

Open `index.html`, scroll to the bottom.
Expected: dark chocolate-brown footer, pink "Vem pingar com a gente." headline, two outline icon links (Instagram-style square, TikTok-style glyph) in cream, fine-print text below. No console errors from the `href="#"` links.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add rodape section"
```

---

### Task 7: GSAP hero entrance animation

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: `.hero__eyebrow`, `.hero__wordmark`, `.hero__tagline`, `.hero__cta`, `.hero__cone` classes from Task 2.
- Produces: nothing new consumed by later tasks (self-contained timeline).

- [ ] **Step 1: Replace `script.js` contents with the hero timeline added**

```js
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  const heroTl = gsap.timeline();
  heroTl
    .from('.hero__eyebrow', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out' })
    .from('.hero__wordmark', { opacity: 0, scale: 0.6, rotation: -18, duration: 1.1, ease: 'elastic.out(1, 0.5)' }, '-=0.2')
    .from('.hero__tagline', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .from('.hero__cta', { opacity: 0, scale: 0.5, rotation: -20, duration: 0.9, ease: 'elastic.out(1, 0.5)' }, '-=0.3')
    .from('.hero__cone', { opacity: 0, x: -60, rotation: -25, duration: 1.1, ease: 'elastic.out(1, 0.5)' }, '-=0.6');
});
```

- [ ] **Step 2: Manual verification**

Reload `index.html` (hard refresh to re-trigger the entrance). Expected: on load, the eyebrow text fades/slides down first, then "PINGOU!" pops in with a visible elastic overshoot (it rotates/scales past its final resting angle before settling), then the tagline, then the CTA button pops in similarly, then the cone slides in from the left. No layout shift/jump once the animation completes — final positions must match Task 2's static CSS (e.g. wordmark ends at -3deg).

Then open DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion" → set to "reduce", hard refresh again. Expected: all hero elements appear immediately in their final state with zero animation.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: add GSAP hero entrance animation with elastic overshoot"
```

---

### Task 8: GSAP scroll reveal (flavor cards) + section title wiggle

**Files:**
- Modify: `script.js` (append after the hero timeline block, still inside the `DOMContentLoaded` handler)

**Interfaces:**
- Consumes: `.flavor-card` (Task 3), `.section-title` (used in Tasks 3/4/5), `.sobre__drip` (Task 4).

- [ ] **Step 1: Append scroll reveal and wiggle code to `script.js`** (add before the final closing `});` of the `DOMContentLoaded` handler)

```js
  gsap.utils.toArray('.flavor-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      opacity: 0,
      y: 50,
      rotation: '+=20',
      duration: 0.8,
      delay: (i % 6) * 0.05,
      ease: 'elastic.out(1, 0.6)'
    });
  });

  gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.to(title, {
      rotation: 2,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });

  const sobreDrip = document.querySelector('.sobre__drip');
  if (sobreDrip) {
    gsap.to(sobreDrip, { y: 12, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }
```

- [ ] **Step 2: Manual verification**

Reload `index.html` and scroll down slowly to the sabores section. Expected: each flavor card animates in as it crosses ~85% up the viewport, rising up while its rotation overshoots by ~20deg past its resting tilt and settles with a visible elastic wobble; cards in the same row are staggered rather than appearing all at once. Continue scrolling: each `.section-title` (sabores, sobre, localização) gently rocks side to side (±2deg) continuously while on screen. The pink teardrop in the sobre section floats up and down continuously.

Re-test with `prefers-reduced-motion: reduce` emulated (DevTools → Rendering): scroll through the whole page — cards should already be in their final visible position with no animation triggering, and no wiggle/float loops running.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: add scroll-triggered flavor card reveals and section title wiggle"
```

---

### Task 9: GSAP hover interactions + custom cursor drip

**Files:**
- Modify: `script.js` (append)

**Interfaces:**
- Consumes: `.flavor-card` (Task 3), `.btn--cta` (Task 2), `.cursor-drip` element (Task 1), `.hero` (Task 2).

- [ ] **Step 1: Append hover interaction and cursor drip code to `script.js`** (before the final closing `});`)

```js
  document.querySelectorAll('.flavor-card').forEach((card) => {
    const restRotation = gsap.getProperty(card, 'rotation');
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { rotation: 0, scale: 1.05, duration: 0.3, ease: 'back.out(3)' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotation: restRotation, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });

  document.querySelectorAll('.btn--cta').forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scaleX: 1.08, scaleY: 0.94, duration: 0.2, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scaleX: 1, scaleY: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    });
  });

  const cursorDrip = document.querySelector('.cursor-drip');
  const hero = document.querySelector('.hero');
  if (cursorDrip && hero && window.matchMedia('(hover: hover)').matches) {
    const xTo = gsap.quickTo(cursorDrip, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(cursorDrip, 'y', { duration: 0.4, ease: 'power3' });

    hero.addEventListener('mousemove', (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      cursorDrip.classList.add('is-active');
    });
    hero.addEventListener('mouseleave', () => {
      cursorDrip.classList.remove('is-active');
    });
  }
```

- [ ] **Step 2: Manual verification**

Reload `index.html`. Move the mouse over the hero section: a small red teardrop should follow the cursor with a slight lag (not 1:1 instant), fading out when the mouse leaves the hero area. Hover a flavor card: it un-tilts to 0deg and grows slightly with a quick punchy motion; move away: it snaps back past its resting tilt and wobbles back to rest (elastic). Hover the "Ver sabores" CTA: it squashes slightly (wider/shorter) then springs back on mouseleave.

Test on a touch/no-hover emulated device (DevTools → toggle device toolbar, e.g. iPhone): confirm the cursor drip does not appear (guarded by `hover: hover` check) and tapping cards doesn't leave them stuck in a weird rotated state.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: add hover interactions and custom cursor drip"
```

---

### Task 10: Responsive pass & final verification

**Files:**
- Modify: `style.css` (only if issues are found during verification)

- [ ] **Step 1: Full-page manual verification checklist**

Open `index.html` and check, at three widths (375px, 768px, 1440px, via DevTools device toolbar):
- No horizontal scrollbar appears at any width.
- Hero text and CTA remain fully readable and don't overlap the cone/drip decorations.
- Flavor card grid reflows correctly (1 column mobile, 2-3 columns tablet/desktop) with no card overflowing its container.
- Localização section stacks correctly on mobile (pin below text, centered).
- Footer icons remain tappable size (visually at least 24x24px) on mobile.

- [ ] **Step 2: Console and accessibility spot-check**

Open DevTools Console: confirm zero errors/warnings on load and while scrolling/hovering through the whole page. Tab through the page with keyboard only: confirm the "Ver sabores" link and the two footer social links show a visible focus outline (default browser outline is acceptable — don't suppress it anywhere in the CSS).

- [ ] **Step 3: Fix any issues found**

If any check in Steps 1-2 fails, fix the specific CSS/HTML causing it (e.g. add a missing `max-width: 100%`, adjust a breakpoint) and re-run the failing check until it passes.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "fix: responsive and accessibility polish pass"
```

(If Step 3 found nothing to fix, skip this commit — no empty commits.)
