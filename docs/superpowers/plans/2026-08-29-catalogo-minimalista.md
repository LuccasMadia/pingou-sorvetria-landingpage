# PINGOU! Catálogo Minimalista (v2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a second, more minimalist "catalog" landing page for PINGOU! at `v2/index.html`, with two full-bleed photos that pin in place via GSAP ScrollTrigger while the following content panel scrolls up over them.

**Architecture:** Static HTML/CSS/JS (no build step, no framework), mirroring how `index.html`/`style.css`/`script.js` work at the repo root today. GSAP 3.12.5 + ScrollTrigger (same CDN versions already used by the v1 page) drive two pinned-background "chapters": Hero (photo A) pinned behind itself while `#catalogo` rises over it, and a dedicated `#chapterB` (photo B) pinned while `#sobre` rises over it. `ScrollTrigger.matchMedia` disables both pins under 701px width; `prefers-reduced-motion: reduce` disables all GSAP animation and pins entirely, leaving a normal static stacked layout.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox), vanilla JS, GSAP 3.12.5 + ScrollTrigger via `cdnjs.cloudflare.com` (same CDN as v1).

## Global Constraints

- v1 files (`index.html`, `style.css`, `script.js` at repo root) are never modified — this is a fully separate, additive build.
- New files live under `v2/`: `v2/index.html`, `v2/style.css`, `v2/script.js`.
- Reuse the brand tokens from v1's `style.css`: `--cream:#FBF3E7`, `--white:#FFFDF9`, `--cherry:#E8342A`, `--cherry-dark:#C21F1F`, `--choc:#3A2318`, `--strawberry:#F4A6B7`, fonts `Baloo 2` / `Nunito` / `Space Mono`.
- No rotations, no blob SVGs, no cursor-drip effect, no elastic/bounce easing — per the approved design (`docs/superpowers/specs/2026-08-29-catalogo-minimalista-design.md`), this version is sober/minimal.
- All 8 flavors and both text blocks (Sobre, Localização) from v1 are reused verbatim (content unchanged, only layout differs).
- Below 700px width: background pins are disabled (`ScrollTrigger.matchMedia('(min-width: 701px)')`), photos render as normal ~100vh banners in flow.
- `prefers-reduced-motion: reduce`: skip all GSAP calls (pins and entrance animations) — page must still be fully readable and navigable with sections in normal stacked order.
- Verification throughout is visual (this is a static frontend with no test framework, matching v1) — verify by opening `v2/index.html` in a browser and inspecting the rendered page and scroll behavior at each step, per CLAUDE.md's UI verification requirement.

---

### Task 1: Scaffold file structure, full markup, and base styles

**Files:**
- Create: `v2/index.html`
- Create: `v2/style.css`
- Create: `v2/script.js`

**Interfaces:**
- Produces: the full DOM structure and element classes/IDs that Tasks 2–5 style and animate: `#hero` (`.hero`, `.hero__bg`, `.hero__overlay`, `.hero__inner`, `.hero__eyebrow`, `.hero__wordmark`, `.hero__tagline`), `#catalogo` (`.catalogo`, `.catalogo__inner`, `.catalogo__list`, `.catalogo__item`, `.catalogo__num`, `.catalogo__photo`, `.catalogo__text`, `.catalogo__name`, `.catalogo__desc`, `.catalogo__tag`), `#chapterB` (`.chapter-bg`, `.chapter-bg__bg`, `.chapter-bg__overlay`, `.chapter-bg__caption`), `#sobre` (`.sobre`, `.sobre__inner`, `.sobre__col`, `.sobre__col--divider`, `.sobre__texto`, `.sobre__nota`), `#contato` (`.rodape`, `.rodape__cta`, `.rodape__social`, `.rodape__icon`, `.rodape__fine`), plus shared `.section-eyebrow`, `.section-title`, `.btn`, `.btn--cta`.
- Produces: CSS custom properties on `:root` (tokens listed in Global Constraints) that all later tasks reference.

- [ ] **Step 1: Create `v2/index.html` with the complete page markup**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PINGOU! — Catálogo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<section class="hero" id="hero">
  <img class="hero__bg" src="https://images.unsplash.com/photo-1746283209293-73a04e08b3ff?w=1600&q=70&auto=format&fit=crop" alt="Casquinha de sorvete de verdade" loading="eager">
  <div class="hero__overlay" aria-hidden="true"></div>
  <div class="hero__inner">
    <p class="hero__eyebrow">sorveteria artesanal desde nunca</p>
    <h1 class="hero__wordmark">PINGOU!</h1>
    <p class="hero__tagline">Sorvete de verdade, feito por gente que não sabe segurar casquinha direito.</p>
    <a href="#catalogo" class="btn btn--cta">Ver catálogo</a>
  </div>
</section>

<section class="catalogo" id="catalogo">
  <div class="catalogo__inner">
    <p class="section-eyebrow">cardápio de hoje</p>
    <h2 class="section-title">Sabores</h2>
    <ul class="catalogo__list">
      <li class="catalogo__item">
        <span class="catalogo__num">01</span>
        <div class="catalogo__photo"><img src="https://images.unsplash.com/photo-1569429378981-f4c5ba689a9a?w=200&q=65&auto=format&fit=crop" alt="Chocolate Trapalhão" loading="lazy"></div>
        <div class="catalogo__text">
          <h3 class="catalogo__name">Chocolate Trapalhão</h3>
          <p class="catalogo__desc">Chocolate meio amargo com pedaços de brownie queimado de propósito.</p>
        </div>
        <span class="catalogo__tag">clássico</span>
      </li>
      <li class="catalogo__item">
        <span class="catalogo__num">02</span>
        <div class="catalogo__photo"><img src="https://images.unsplash.com/photo-1532678465554-94846274c297?w=200&q=65&auto=format&fit=crop" alt="Morango Zoeira" loading="lazy"></div>
        <div class="catalogo__text">
          <h3 class="catalogo__name">Morango Zoeira</h3>
          <p class="catalogo__desc">Morango de verdade com calda que escorre pra fora sem pedir licença.</p>
        </div>
        <span class="catalogo__tag">premium</span>
      </li>
      <li class="catalogo__item">
        <span class="catalogo__num">03</span>
        <div class="catalogo__photo"><img src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=200&q=65&auto=format&fit=crop" alt="Pistache Categórico" loading="lazy"></div>
        <div class="catalogo__text">
          <h3 class="catalogo__name">Pistache Categórico</h3>
          <p class="catalogo__desc">Pistache torrado na hora, sem samba no pé mas com sabor de sobra.</p>
        </div>
        <span class="catalogo__tag">edição limitada</span>
      </li>
      <li class="catalogo__item">
        <span class="catalogo__num">04</span>
        <div class="catalogo__photo"><img src="https://images.unsplash.com/photo-1627373717516-0f4bb24c487d?w=200&q=65&auto=format&fit=crop" alt="Doce de Leite Cangaceiro" loading="lazy"></div>
        <div class="catalogo__text">
          <h3 class="catalogo__name">Doce de Leite Cangaceiro</h3>
          <p class="catalogo__desc">Doce de leite cremoso com raspas de rapadura por cima.</p>
        </div>
        <span class="catalogo__tag">clássico</span>
      </li>
      <li class="catalogo__item">
        <span class="catalogo__num">05</span>
        <div class="catalogo__photo"><img src="https://images.unsplash.com/photo-1744303858617-3c8b736af835?w=200&q=65&auto=format&fit=crop" alt="Limão Bagunçado" loading="lazy"></div>
        <div class="catalogo__text">
          <h3 class="catalogo__name">Limão Bagunçado</h3>
          <p class="catalogo__desc">Azedinho, gelado, com raspas de limão jogadas sem dó nenhuma.</p>
        </div>
        <span class="catalogo__tag">premium</span>
      </li>
      <li class="catalogo__item">
        <span class="catalogo__num">06</span>
        <div class="catalogo__photo"><img src="https://images.unsplash.com/photo-1569429378981-f4c5ba689a9a?w=200&q=65&auto=format&fit=crop" alt="Café com Rapadura" loading="lazy"></div>
        <div class="catalogo__text">
          <h3 class="catalogo__name">Café com Rapadura</h3>
          <p class="catalogo__desc">Café intenso pra sorveteria que não tira folga nem de madrugada.</p>
        </div>
        <span class="catalogo__tag">clássico</span>
      </li>
      <li class="catalogo__item">
        <span class="catalogo__num">07</span>
        <div class="catalogo__photo"><img src="https://images.unsplash.com/photo-1627373717516-0f4bb24c487d?w=200&q=65&auto=format&fit=crop" alt="Coco Queimado" loading="lazy"></div>
        <div class="catalogo__text">
          <h3 class="catalogo__name">Coco Queimado</h3>
          <p class="catalogo__desc">Coco tostado direto na chama, com aquele sabor meio defumado.</p>
        </div>
        <span class="catalogo__tag">edição limitada</span>
      </li>
      <li class="catalogo__item">
        <span class="catalogo__num">08</span>
        <div class="catalogo__photo"><img src="https://images.unsplash.com/photo-1532678465554-94846274c297?w=200&q=65&auto=format&fit=crop" alt="Uva Atrapalhada" loading="lazy"></div>
        <div class="catalogo__text">
          <h3 class="catalogo__name">Uva Atrapalhada</h3>
          <p class="catalogo__desc">Uva roxa com bolinhas de sorvete que erraram o formato de propósito.</p>
        </div>
        <span class="catalogo__tag">premium</span>
      </li>
    </ul>
  </div>
</section>

<section class="chapter-bg" id="chapterB">
  <img class="chapter-bg__bg" src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=1600&q=70&auto=format&fit=crop" alt="Vitrine de sorvetes coloridos" loading="lazy">
  <div class="chapter-bg__overlay" aria-hidden="true"></div>
  <p class="chapter-bg__caption">feito à mão, sem pressa</p>
</section>

<section class="sobre" id="sobre">
  <div class="sobre__inner">
    <div class="sobre__col">
      <p class="section-eyebrow">quem somos</p>
      <h2 class="section-title">Sobre</h2>
      <p class="sobre__texto">A PINGOU! nasceu de um acidente: uma máquina de sorvete desregulada, duas pessoas sem noção nenhuma de proporção e uma vontade indecente de fazer sorvete bom. A gente ainda erra a mão todo santo dia — só que agora é de propósito, e sempre a seu favor.</p>
    </div>
    <div class="sobre__col sobre__col--divider">
      <p class="section-eyebrow">onde estamos</p>
      <h2 class="section-title">Localização</h2>
      <p><strong>Endereço:</strong> Rua das Casquinhas, 123 — Bairro Sorvete Bom</p>
      <p><strong>Horário:</strong> Terça a domingo, 13h às 22h</p>
      <p class="sobre__nota">(segunda a gente também erra a mão e esquece de abrir)</p>
    </div>
  </div>
</section>

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
  <p class="rodape__fine">PINGOU! Sorveteria — projeto de demonstração, sem sorvete de verdade (por enquanto). Fotos: Unsplash.</p>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `v2/style.css` with reset, tokens, and shared typography/button styles**

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
  --choc-soft: rgba(58, 35, 24, 0.62);
  --strawberry: #F4A6B7;
  --font-display: 'Baloo 2', sans-serif;
  --font-body: 'Nunito', sans-serif;
  --font-mono: 'Space Mono', monospace;
}

.section-eyebrow {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  color: var(--cherry-dark);
  margin: 0 0 0.5rem;
}
.section-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(1.6rem, 3.4vw, 2.4rem);
  color: var(--choc);
  margin: 0 0 2rem;
}

.btn {
  display: inline-block;
  font-family: var(--font-display);
  font-weight: 700;
  text-decoration: none;
  border-radius: 999px;
  padding: 0.85rem 2rem;
  cursor: pointer;
  border: none;
}
.btn--cta {
  background: var(--cherry);
  color: var(--white);
  box-shadow: 0 4px 0 var(--cherry-dark);
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

- [ ] **Step 3: Create `v2/script.js` with the reduced-motion guard shell**

```js
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  gsap.registerPlugin(ScrollTrigger);
});
```

- [ ] **Step 4: Verify the scaffold renders correctly**

Run (PowerShell): `Start-Process "v2\index.html"`

Expected: the page opens in the default browser showing, top to bottom: hero text over a photo, a "Sabores" list of 8 items with numbers 01–08, a photo section with the caption "feito à mão, sem pressa", a "Sobre"/"Localização" two-column block, and a dark footer with "Vem pingar com a gente." — all unstyled beyond base typography (no pin/overlap effects yet, that's expected). No layout should be visually broken (no overlapping unreadable text, no missing images). Open browser dev tools console — expect zero errors.

- [ ] **Step 5: Commit**

```bash
git add v2/index.html v2/style.css v2/script.js
git commit -m "feat: scaffold PINGOU! catalog v2 markup and base styles"
```

---

### Task 2: Style the Hero (full-bleed pinned photo) and Catálogo (list panel)

**Files:**
- Modify: `v2/style.css`

**Interfaces:**
- Consumes: `.hero`, `.hero__bg`, `.hero__overlay`, `.hero__inner`, `.hero__eyebrow`, `.hero__wordmark`, `.hero__tagline` and `.catalogo`, `.catalogo__inner`, `.catalogo__list`, `.catalogo__item`, `.catalogo__num`, `.catalogo__photo`, `.catalogo__text`, `.catalogo__name`, `.catalogo__desc`, `.catalogo__tag` from Task 1's HTML.
- Produces: visual layout for the "Capítulo A" pair (Hero + Catálogo), consumed visually by Task 3's pin/animation logic (no new classes needed by Task 3).

- [ ] **Step 1: Append Hero styles to `v2/style.css`**

```css
.hero {
  position: relative;
  height: 100vh;
  min-height: 560px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 0;
}
.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(58,35,24,0) 35%, rgba(58,35,24,0.78) 100%);
  z-index: 1;
}
.hero__inner {
  position: relative;
  z-index: 2;
  max-width: 600px;
  padding: 0 1.5rem;
  color: var(--white);
}
.hero__eyebrow {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.8rem;
  color: var(--strawberry);
  margin-bottom: 0.6rem;
}
.hero__wordmark {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(3rem, 10vw, 5.5rem);
  margin: 0;
  line-height: 1;
}
.hero__tagline {
  font-size: clamp(1rem, 2vw, 1.15rem);
  max-width: 440px;
  margin: 1.25rem auto;
  opacity: 0.92;
}
```

- [ ] **Step 2: Append Catálogo styles to `v2/style.css`**

```css
.catalogo {
  position: relative;
  z-index: 1;
  background: var(--cream);
  border-radius: 32px 32px 0 0;
  padding: 4.5rem 1.5rem 4rem;
  box-shadow: 0 -20px 40px rgba(0,0,0,0.15);
}
.catalogo__inner { max-width: 760px; margin: 0 auto; }
.catalogo__list { list-style: none; margin: 0; padding: 0; }
.catalogo__item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid rgba(58,35,24,0.1);
  transition: background 0.25s ease;
}
.catalogo__item:last-child { border-bottom: none; }
.catalogo__item:hover { background: rgba(232,52,42,0.045); }
.catalogo__num {
  font-family: var(--font-mono);
  color: var(--cherry);
  font-size: 0.85rem;
  width: 1.6rem;
  flex-shrink: 0;
}
.catalogo__photo {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}
.catalogo__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}
.catalogo__item:hover .catalogo__photo img { transform: scale(1.08); }
.catalogo__text { flex: 1 1 auto; min-width: 0; }
.catalogo__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
  margin: 0 0 0.2rem;
  color: var(--choc);
}
.catalogo__desc {
  font-size: 0.9rem;
  margin: 0;
  color: var(--choc-soft);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.catalogo__tag {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--cherry-dark);
  flex-shrink: 0;
}
```

- [ ] **Step 3: Verify Hero and Catálogo render correctly**

Run (PowerShell): `Start-Process "v2\index.html"`

Expected: Hero fills the full viewport height with the casquinha photo, a dark gradient at the bottom, and white/pink centered text legible over it. Scrolling down reveals the Catálogo section as a cream panel with rounded top corners, listing all 8 flavors as single-line rows (number, thumbnail, name+description, tag), separated by thin lines. No pin/overlap effect yet (that's Task 3) — this step only verifies static layout.

- [ ] **Step 4: Commit**

```bash
git add v2/style.css
git commit -m "feat: style hero and catalogo panel for PINGOU! v2"
```

---

### Task 3: Pin Chapter A (Hero) and add entrance animations

**Files:**
- Modify: `v2/script.js`

**Interfaces:**
- Consumes: `#hero`, `#catalogo`, `.hero__eyebrow`, `.hero__wordmark`, `.hero__tagline`, `.hero__inner .btn`, `.catalogo__item` (from Tasks 1–2).
- Produces: the `ScrollTrigger.matchMedia` block (kept in this file) that Task 5 extends with the Chapter B pin.

- [ ] **Step 1: Append the Hero entrance animation to `v2/script.js`**

Insert after the `gsap.registerPlugin(ScrollTrigger);` line:

```js
  gsap.from('.hero__eyebrow, .hero__wordmark, .hero__tagline, .hero__inner .btn', {
    opacity: 0,
    y: 24,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out'
  });

  gsap.utils.toArray('.catalogo__item').forEach((item) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 90%' },
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  ScrollTrigger.matchMedia({
    '(min-width: 701px)': function () {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        endTrigger: '#catalogo',
        end: 'top top',
        pin: true,
        pinSpacing: false
      });
    }
  });
```

- [ ] **Step 2: Verify the pin and animations in a browser**

Run (PowerShell): `Start-Process "v2\index.html"`

Expected: on load, the hero eyebrow/title/tagline/button fade and slide in with a slight stagger. Scroll down slowly — the hero photo stays fixed in place (does not move) while the Catálogo cream panel visibly slides up from the bottom, covering the photo, until the Catálogo panel fills the screen. Each flavor row fades in as it enters the viewport. Resize the browser below 700px width and reload — the hero photo should now scroll away normally with the page (no pin) instead of staying fixed. Check the browser console for zero errors in both cases.

- [ ] **Step 3: Commit**

```bash
git add v2/script.js
git commit -m "feat: pin hero photo and add entrance animations for PINGOU! v2 chapter A"
```

---

### Task 4: Style Chapter B background, Sobre+Localização, and Rodapé

**Files:**
- Modify: `v2/style.css`

**Interfaces:**
- Consumes: `.chapter-bg`, `.chapter-bg__bg`, `.chapter-bg__overlay`, `.chapter-bg__caption`, `.sobre`, `.sobre__inner`, `.sobre__col`, `.sobre__col--divider`, `.sobre__texto`, `.sobre__nota`, `.rodape`, `.rodape__cta`, `.rodape__social`, `.rodape__icon`, `.rodape__fine` from Task 1's HTML.
- Produces: visual layout for the "Capítulo B" pair (`#chapterB` + `#sobre`), consumed visually by Task 5's pin logic (no new classes needed by Task 5).

- [ ] **Step 1: Append Chapter B background styles to `v2/style.css`**

```css
.chapter-bg {
  position: relative;
  height: 100vh;
  min-height: 480px;
  overflow: hidden;
  z-index: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.chapter-bg__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.chapter-bg__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(58,35,24,0) 40%, rgba(58,35,24,0.7) 100%);
  z-index: 1;
}
.chapter-bg__caption {
  position: relative;
  z-index: 2;
  color: var(--white);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
  padding-bottom: 3rem;
  opacity: 0.9;
}
```

- [ ] **Step 2: Append Sobre+Localização styles to `v2/style.css`**

```css
.sobre {
  position: relative;
  z-index: 1;
  background: var(--white);
  border-radius: 32px 32px 0 0;
  padding: 4.5rem 1.5rem;
  box-shadow: 0 -20px 40px rgba(0,0,0,0.15);
}
.sobre__inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  text-align: left;
}
.sobre__col { flex: 1 1 0; }
.sobre__col--divider {
  border-left: 1px solid rgba(58,35,24,0.12);
  padding-left: 3rem;
}
.sobre__texto { font-size: 1.02rem; color: var(--choc-soft); }
.sobre__nota { font-style: italic; color: var(--cherry-dark); font-size: 0.88rem; }

@media (max-width: 700px) {
  .sobre__inner { flex-direction: column; }
  .sobre__col--divider {
    border-left: none;
    border-top: 1px solid rgba(58,35,24,0.12);
    padding-left: 0;
    padding-top: 2rem;
  }
  .catalogo__desc { white-space: normal; }
}
```

- [ ] **Step 3: Append Rodapé styles to `v2/style.css`**

```css
.rodape {
  position: relative;
  z-index: 1;
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

- [ ] **Step 4: Verify Chapter B and remaining sections render correctly**

Run (PowerShell): `Start-Process "v2\index.html"`

Expected: scrolling past the Catálogo, a full-height photo section with the caption "feito à mão, sem pressa" appears. Continuing to scroll reveals the "Sobre"/"Localização" two-column white panel, then the dark chocolate footer. On a narrow window (<700px), the Sobre/Localização columns stack vertically with a horizontal divider instead of a vertical one. No pin/overlap effect on Chapter B yet (that's Task 5).

- [ ] **Step 5: Commit**

```bash
git add v2/style.css
git commit -m "feat: style chapter B background, sobre, localizacao and rodape for PINGOU! v2"
```

---

### Task 5: Pin Chapter B, finish responsive/reduced-motion behavior, full verification

**Files:**
- Modify: `v2/script.js`

**Interfaces:**
- Consumes: `#chapterB`, `#sobre`, `.chapter-bg__caption`, `.sobre__col` (from Task 4).
- Produces: the complete, final `v2/script.js` behavior for the whole page.

- [ ] **Step 1: Add the Sobre entrance animation and Chapter B caption animation to `v2/script.js`**

Insert directly after the `.catalogo__item` forEach block (before `ScrollTrigger.matchMedia`):

```js
  gsap.from('.chapter-bg__caption', {
    scrollTrigger: { trigger: '.chapter-bg', start: 'top 60%' },
    opacity: 0,
    y: 16,
    duration: 0.6,
    ease: 'power2.out'
  });

  gsap.from('.sobre__col', {
    scrollTrigger: { trigger: '.sobre', start: 'top 80%' },
    opacity: 0,
    y: 24,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out'
  });
```

- [ ] **Step 2: Add the Chapter B pin inside the existing `matchMedia` block**

The `'(min-width: 701px)'` function in `v2/script.js` (added in Task 3) currently contains one `ScrollTrigger.create` call for `#hero`. Add a second call right after it, inside the same function:

```js
      ScrollTrigger.create({
        trigger: '#chapterB',
        start: 'top top',
        endTrigger: '#sobre',
        end: 'top top',
        pin: true,
        pinSpacing: false
      });
```

The full `matchMedia` block should now read:

```js
  ScrollTrigger.matchMedia({
    '(min-width: 701px)': function () {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        endTrigger: '#catalogo',
        end: 'top top',
        pin: true,
        pinSpacing: false
      });
      ScrollTrigger.create({
        trigger: '#chapterB',
        start: 'top top',
        endTrigger: '#sobre',
        end: 'top top',
        pin: true,
        pinSpacing: false
      });
    }
  });
```

- [ ] **Step 3: Full-page verification in a browser at desktop width**

Run (PowerShell): `Start-Process "v2\index.html"`

Expected, scrolling from top to bottom at a window width ≥ 701px:
1. Hero photo pinned, text animates in, Catálogo panel rises over the pinned hero photo.
2. Catálogo fully covers the screen; hero pin releases (no visible jump).
3. Chapter B photo becomes visible and pins in place; its caption fades in.
4. Sobre/Localização panel rises over the pinned Chapter B photo, columns fade in with stagger.
5. Chapter B pin releases; footer scrolls in normally beneath Sobre.
No layout jumps, no photo ever moves while pinned, no console errors.

- [ ] **Step 4: Verify responsive and reduced-motion fallbacks**

Resize the browser window to below 700px width and reload `v2/index.html`. Expected: both photos scroll normally with the page (no pinning), all sections stack in order, content remains fully readable.

In the browser DevTools, enable "Emulate CSS prefers-reduced-motion: reduce" (Chrome DevTools → Rendering tab) and reload. Expected: no animations play, no pins occur (page never calls `gsap.registerPlugin` or creates any ScrollTrigger — confirm via DevTools console that `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is `true` and no GSAP-related errors appear), all sections are visible and readable in their normal stacked position.

- [ ] **Step 5: Commit**

```bash
git add v2/script.js
git commit -m "feat: pin chapter B photo and finish responsive/reduced-motion behavior for PINGOU! v2"
```
