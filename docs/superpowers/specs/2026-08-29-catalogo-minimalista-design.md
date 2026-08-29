# PINGOU! — Versão Catálogo Minimalista (v2)

## Contexto

A v1 (`index.html`) tem um visual lúdico/scrapbook: blobs, cards inclinados, gota de sorvete seguindo o cursor, animações elásticas. Esta v2 é uma segunda direção de design pro mesmo cliente fictício (portfólio) — mais sóbria, formato de catálogo/cardápio editorial, com um efeito de scroll onde fotos de fundo ficam fixas ("pinadas") enquanto os painéis de conteúdo sobem por cima delas.

A v1 permanece intocada. A v2 vive em pasta própria e não compartilha HTML/CSS/JS com a v1 (pode reaproveitar as mesmas URLs de imagem do Unsplash já usadas).

## Estrutura de arquivos

```
v2/
  index.html
  style.css
  script.js
```

`v2/index.html` referencia `style.css` e `script.js` relativos à própria pasta, e carrega GSAP + ScrollTrigger via CDN (mesmas versões da v1: gsap 3.12.5).

## Paleta e tipografia

Mesmas variáveis de marca da v1 (cereja `#E8342A`, chocolate `#3A2318`, creme `#FBF3E7`, branco `#FFFDF9`, fontes Baloo 2 / Nunito / Space Mono), mas aplicadas de forma mais sóbria:
- Sem rotações de elementos, sem blobs SVG decorativos, sem gota de cursor.
- Mais espaço em branco, hierarquia tipográfica mais enxuta.
- Cereja usada com moderação (CTA, eyebrow, números do catálogo, tag ativa) em vez de espalhada.

## Fluxo de seções (2 capítulos de foto fixa)

### Capítulo A — fundo: foto da casquinha

**Hero (`#hero`)**
- Foto full-bleed (`https://images.unsplash.com/photo-1746283209293-...`, mesma da v1) ocupando 100vh, pinada via `ScrollTrigger` (`pin: true, pinSpacing: false`) do topo da Hero até o fim da seção Catálogo.
- Gradiente escuro (`linear-gradient` de transparente pra `rgba(58,35,24,0.75)`) na metade inferior da foto, garantindo contraste de texto.
- Texto centralizado sobreposto: eyebrow (mono, uppercase), "PINGOU!" (Baloo 2, peso 800, sem rotação), tagline, botão CTA "Ver catálogo" (`href="#catalogo"`).
- Sem `.hero__photo` circular como na v1 — a foto É o fundo da seção inteira.

**Catálogo (`#catalogo`)**
- Painel `background: var(--cream)`, `border-radius: 32px 32px 0 0`, `position: relative; z-index: 1;`, sobe por cima da foto pinada (documento flui normalmente logo após a Hero — o pin com `pinSpacing:false` faz esse efeito de "sobe por cima" sem precisar de margin negativa).
- Título da seção pequeno + eyebrow "cardápio de hoje".
- Lista horizontal (estilo cardápio), um item por sabor, todos os 8 sabores da v1:
  - Número sequencial `01`–`08` (Space Mono, cor cereja).
  - Foto quadrada pequena (~72px, `border-radius: 12px`).
  - Nome (Baloo 2, peso 700) + descrição (Nunito, 1 linha, `text-overflow: ellipsis` se necessário) + tag (caixa alta, Space Mono, cor chocolate translúcido).
  - Linha divisória fina (`border-bottom: 1px solid rgba(58,35,24,0.1)`) entre itens; sem borda no último.
- Hover num item: leve `background: rgba(232,52,42,0.04)` + a foto do item escala 1.05 (transição simples, sem GSAP necessário — pode ser CSS transition).

### Capítulo B — fundo: foto da vitrine

**Trigger de troca de fundo**
- Uma segunda `ScrollTrigger` pina a foto da vitrine (`https://images.unsplash.com/photo-1744303858617-...`, mesma da v1 "sobre") do ponto onde o Catálogo termina até o fim da seção Sobre+Localização. Mesmo tratamento de gradiente escuro pra eventual texto que fique sobre a foto nas bordas do painel.

**Sobre + Localização (`#sobre`)**
- Painel `background: var(--white)`, `border-radius: 32px 32px 0 0`, sobe por cima da segunda foto pinada.
- Bloco "Sobre": título curto + parágrafo único condensado (reaproveita o texto da v1, pode encurtar).
- Linha divisória fina.
- Bloco "Localização": endereço, horário, nota irônica ("segunda a gente também erra a mão..."), com um ícone de pin simples (pode ser o mesmo SVG da v1, mas sem cor de destaque forte — usar chocolate).
- Layout: colunas lado a lado em desktop (Sobre à esquerda, Localização à direita) empilhando em mobile.

### Rodapé (`#contato`)

- `background: var(--choc)` sólido (sem foto de fundo — as duas fotos já foram usadas nos capítulos A e B).
- Mesma estrutura da v1: CTA "Vem pingar com a gente.", ícones de redes sociais, texto fino de rodapé.

## Animações (`script.js`)

- Duas `ScrollTrigger.create()` para pinar as fotos de fundo (capítulo A behind Hero+Catálogo, capítulo B behind Sobre+Localização), `pinSpacing: false`.
- Entradas de texto (Hero, títulos de seção) e itens da lista do catálogo: `gsap.from(..., { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out' })`, com leve stagger nos itens da lista via `scrollTrigger` individual (`start: 'top 90%'`).
- Nenhuma easing elástica/bounce, nenhuma rotação — consistente com o tom mais sóbrio.

## Responsividade

- Abaixo de 700px: `ScrollTrigger` de pin é desativado (checar `window.matchMedia('(max-width: 700px)')` antes de criar os pins, ou usar `ScrollTrigger.matchMedia()`), fotos viram banners normais (altura fixa ~50vh) no topo de cada capítulo, sem sticky — evita bugs conhecidos de `position: sticky`/pin com a barra de endereço do Safari iOS.
- Grid de Sobre+Localização empilha em coluna única.
- Itens do catálogo mantêm layout de linha, mas a foto pode reduzir ou a descrição pode quebrar em 2 linhas.

## Acessibilidade

- `prefers-reduced-motion: reduce`: pula a criação dos ScrollTriggers de pin e das animações de entrada — todas as seções renderizam no layout final estático (painéis já nas posições normais, sem sobreposição via pin).
- Contraste de texto sobre foto garantido pelo gradiente escuro nas duas fotos de capítulo.
- Mesma semântica de `alt` nas imagens, mesma estrutura de `<section>`/`<h2>` da v1.

## Fora de escopo

- Sem carrinho, sem link real de pedido — mesmo caráter estático/demonstrativo da v1.
- Sem novo conteúdo/sabores — reaproveita os 8 sabores e os dois blocos de texto (sobre/localização) já existentes na v1.
