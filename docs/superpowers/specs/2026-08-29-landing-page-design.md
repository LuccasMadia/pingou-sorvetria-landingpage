# PINGOU! — Landing Page (Design)

## Contexto

Peça de demonstração/portfólio: landing page fictícia para uma sorveteria chamada **PINGOU!**, com identidade visual própria e animações GSAP propositalmente "trapalhadas" (bounce/elástico exagerado, mas controlado). Não é entrega para cliente real — foco em mostrar identidade visual + qualidade de animação.

## Conceito de marca

- **Nome:** PINGOU!
- **Tom:** brincalhão, caótico-controlado, "sorvete escorregando/pingando"
- **Paleta:** base creme/off-white, **vermelho cereja como cor de destaque** (CTAs, tags de sabor, "pingo" decorativo), tons de apoio (marrom chocolate, rosa morango) usados com moderação
- **Tipografia:** display bold arredondada para títulos (efeito "hand-wobble"), sans-serif limpa para corpo de texto
- **Motivo visual recorrente:** gotas/pingos (SVG), formas orgânicas levemente assimétricas em vez de retângulos perfeitos

## Estrutura da página (one-page, navegação por scroll)

1. **Hero** — logotipo/nome PINGOU! em destaque, chamada curta (tagline), ilustração de casquinha/sorvete em SVG, CTA principal ("Ver sabores")
2. **Sabores** — grid de cards (6-8 sabores fictícios), cada card com nome, selo redondo de tag (ex: "novo", "picante"? não — manter simples: "clássico", "premium"), cor de fundo variando entre tons pastel
3. **Sobre** — bloco curto (2-3 frases) contando a "história" bagunçada da marca + imagem/ilustração de apoio
4. **Localização & horário** — endereço fictício, horário de funcionamento, mapa estilizado (placeholder ilustrado, não precisa de mapa real/Google Maps)
5. **Rodapé / CTA final** — chamada final para "visitar", ícones de redes sociais fictícias (sem links reais funcionais)

## Animações GSAP (bounce/elastic exagerado)

- **Hero:** elementos (logo, tagline, CTA, ilustração) entram em sequência com `ease: elastic.out`, leve overshoot de rotação/escala — como se tivessem sido jogados na tela e balançassem até assentar
- **Scroll reveals (ScrollTrigger):** cards de sabores entram em stagger; cada card nasce com rotação aleatória pequena (±8deg) que se "endireita" ao assentar na posição final
- **Hover:**
  - Botões/CTAs: squash & stretch leve (escala não-uniforme rápida) ao passar o mouse
  - Cards de sabor: leve tilt 3D/rotação ao hover
  - Cursor customizado: uma "gotinha" vermelha substitui o cursor padrão na hero, com física simples (leve delay/lag ao seguir o mouse), sem interferir na usabilidade (cursor nativo continua ativo, a gota é decorativa por cima)
- **Título de cada seção:** wiggle contínuo sutil (rotação ±2deg em loop lento), pausado ao entrar em viewport para não cansar
- **Limite de bom senso:** animações não devem prejudicar legibilidade nem gerar scroll travado; usar `prefers-reduced-motion` para desativar/reduzir animações quando o usuário tiver essa preferência ativada no SO

## Stack técnica

- HTML + CSS + JS puro, sem build step
- GSAP via CDN (core + plugin `ScrollTrigger`)
- Estrutura de arquivos:
  ```
  pingou-sorveteria/
    index.html
    style.css
    script.js
    /assets (SVGs de ilustração)
  ```
- Responsivo (mobile-first ou pelo menos funcional em mobile), já que é uma peça de portfólio que pode ser compartilhada por link

## Fora de escopo

- Sem backend, sem formulário funcional de contato (pode ter um input decorativo, mas sem envio real)
- Sem mapa real (Google Maps embed) — ilustração estática é suficiente
- Sem CMS/dados dinâmicos — todo conteúdo é hardcoded no HTML
- Sem deploy automatizado (fica como projeto local; deploy é decisão posterior do usuário)

## Critério de sucesso

- Abre direto no navegador (duplo clique no `index.html` ou live server) sem erros de console
- Todas as seções visíveis e legíveis em desktop e mobile
- Animações GSAP disparam corretamente no load e no scroll, sem travar a página
- Identidade visual (cores, tipografia, motivo de gotas) é consistente em todas as seções
- `prefers-reduced-motion` respeitado
