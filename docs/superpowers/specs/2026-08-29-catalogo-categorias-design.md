# PINGOU! v2 — Categorias no Catálogo (Sorvetes / Gelatos / Milkshakes / Outros)

## Contexto

A seção `#catalogo` da v2 (`v2/index.html`) hoje é uma lista única (`.catalogo__list`) com os 8 sabores de sorvete da v1, numerados `01`–`08`, sob o título "Sabores". O pedido é reservar espaço estrutural pro cardápio crescer em outras categorias de produto (gelatos, milkshakes, outros), não só sorvetes.

Escopo: **somente v2** (`v2/index.html`, `v2/style.css`). O `v2/script.js` não muda — a animação de entrada dos itens já seleciona por classe genérica (`.catalogo__item`), então novos itens são pegos automaticamente.

## Estrutura

Dentro de `.catalogo__inner`, a lista única é quebrada em 4 blocos `.catalogo__categoria`, cada um com:
- `h3.catalogo__categoria-title` com o nome da categoria.
- `ul.catalogo__list` própria, numeração reiniciando em `01`.

Ordem e conteúdo:

1. **Sorvetes** — os 8 itens já existentes, sem alteração de texto/foto/tag.
2. **Gelatos** (2 itens de exemplo):
   - `01` Avelã Convencida — "Avelã italiana, textura mais cremosa que convence antes da primeira colherada." — foto reaproveitada `1627373717516` — tag `novidade`.
   - `02` Limão Siciliano Trapalhão — "Siciliano raro, gelato mais denso, azedinho com atitude." — foto reaproveitada `1744303858617` — tag `importado`.
3. **Milkshakes** (2 itens de exemplo):
   - `01` Ovomaltine Zoado — "Ovomaltine batido até quase virar bagunça, com chantilly em cima." — foto reaproveitada `1569429378981` — tag `novidade`.
   - `02` Morango com Chantilly Torto — "Morango de verdade batido com leite, chantilly desalinhado de propósito." — foto reaproveitada `1532678465554` — tag `clássico`.
4. **Outros** (1 item de exemplo):
   - `01` Açaí na Tigela Bagunçado — "Açaí batido grosso, granola jogada sem medir, banana em fatias tortas." — foto reaproveitada `1567206563064` — tag `novidade`.

Todas as fotos reaproveitam URLs do Unsplash já usadas em outros itens do catálogo (mesmo padrão de reuso que já existe hoje entre os 8 sorvetes).

Duas tags novas entram no vocabulário de `.catalogo__tag`, que já tinha `clássico` / `premium` / `edição limitada`: `novidade` (item recém adicionado) e `importado` (ingrediente de fora).

O `h2.section-title` da seção continua "Sabores" (título geral do cardápio); os `h3` de categoria ficam abaixo dele.

## CSS

Novo bloco em `v2/style.css`, próximo às regras `.catalogo__*` existentes:

```css
.catalogo__categoria { margin-top: 3rem; }
.catalogo__categoria:first-child { margin-top: 0; }
.catalogo__categoria-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--cherry-dark);
  margin: 0 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(232,52,42,0.15);
}
```

Nenhuma outra regra existente muda. `.catalogo__item`, `.catalogo__num`, `.catalogo__photo`, `.catalogo__text`, `.catalogo__tag` continuam idênticas e se aplicam igualmente às 4 categorias.

## Animação

Sem mudança em `v2/script.js`. O seletor `gsap.utils.toArray('.catalogo__item')` já pega todos os itens de todas as categorias automaticamente, com o mesmo `scrollTrigger` individual por item.

## Responsividade / acessibilidade

Nenhuma regra nova é necessária além do que já existe: `.catalogo__desc` já quebra em 2 linhas abaixo de 700px, e a nova seção de categoria é só um wrapper de bloco sem impacto em layout responsivo.

## Fora de escopo

- v1 (`index.html` na raiz) não é alterada.
- Sem filtro/abas interativas — as 4 categorias aparecem sempre, empilhadas, na mesma rolagem.
- Sem sabores reais adicionais além dos 5 itens de exemplo (2 gelatos + 2 milkshakes + 1 outro) — conteúdo placeholder no tom de humor do site, a ser substituído quando o cliente fictício tiver o cardápio real dessas categorias.

## Addendum 1 (superado) — faixa de foto entre categorias

Primeira tentativa: uma faixa de ~110px com foto dentro do próprio painel `.catalogo`, no lugar do `h3.catalogo__categoria-title` de texto, antes de Gelatos/Milkshakes/Outros. Implementada, testada no navegador e commitada — mas o pedido seguinte pediu algo maior ("uma imagem que ocupe a tela inteira"), então essa faixa foi **removida** e substituída pelo Addendum 2 abaixo. Documentado aqui só como histórico da decisão.

## Addendum 2 — seções de foto em tela cheia entre categorias

Pedido de acompanhamento ao Addendum 1: a faixa pequena não bastava — o pedido era uma imagem ocupando a tela inteira entre as categorias, não só uma tarja dentro da lista.

**Decisão de fotos:** variadas (uma por transição), não a mesma foto repetida — confirmado com o usuário.

**Estrutura:** o antigo `<section class="catalogo" id="catalogo">` único (que continha as 4 categorias) foi quebrado em blocos alternados, no mesmo padrão que já existia entre Hero→Catálogo e entre a foto da vitrine→Sobre (painel com `border-radius` subindo por cima de uma foto full-bleed):

```
#catalogo (painel cream, título "Sabores" + categoria Sorvetes)
  → .catalogo-divider (foto cheia, 100vh) — legenda "Gelatos"
  → #gelatos (painel cream, .catalogo.catalogo--sub, só a lista)
  → .catalogo-divider (foto cheia, 100vh) — legenda "Milkshakes"
  → #milkshakes (painel cream, .catalogo.catalogo--sub, só a lista)
  → .catalogo-divider (foto cheia, 100vh) — legenda "Outros"
  → #outros (painel cream, .catalogo.catalogo--sub, só a lista)
  → #chapterB (já existia, sem mudança) → #sobre
```

Cada `.catalogo-divider` é uma seção independente (não pinada — segue o mesmo padrão simples do `#chapterB` já existente, sem `ScrollTrigger` novo), com foto full-bleed, gradiente escuro (`.catalogo-divider__overlay`) e um bloco central (`.catalogo-divider__inner`) com eyebrow "a seguir no cardápio" + `h3` grande (Baloo 2, 800) com o nome da próxima categoria.

Cada painel subsequente (`#gelatos`, `#milkshakes`, `#outros`) reaproveita a classe `.catalogo` (mesmo fundo cream, `border-radius: 32px 32px 0 0`, sombra) com um modificador `.catalogo--sub` que reduz o padding superior, já que não repete o título "Sabores" — só a lista de itens daquela categoria (numeração reiniciando em `01`, sem duplicar o nome da categoria como texto, pois a legenda já apareceu na foto anterior).

**Fotos escolhidas** (todas já usadas em algum lugar do site, pedidas em tamanho maior `w=1600` para a versão full-bleed):
- Antes de Gelatos: `1567206563064` (vitrine de sorvetes coloridos, mesma da seção `#chapterB`).
- Antes de Milkshakes: `1532678465554` (morango).
- Antes de Outros: `1627373717516` (cones variados / doce de leite).

**CSS novo** (`v2/style.css`): `.catalogo-divider`, `.catalogo-divider__bg`, `.catalogo-divider__overlay`, `.catalogo-divider__inner`, `.catalogo-divider__eyebrow`, `.catalogo-divider__title` — espelham a estrutura de `.chapter-bg` já existente, com classes próprias pra não colidir com o `ScrollTrigger` que já usa `#chapterB` e `.chapter-bg__caption` no `script.js`. `.catalogo--sub { padding-top: 3rem; }` como único ajuste no painel reaproveitado.

O Addendum 1 (faixa de 110px, `.catalogo__divider`/`.catalogo__divider-label`) foi removido do CSS e do HTML.

Sem mudança em `v2/script.js` — as novas seções de foto não são pinadas nem animadas (mesmo tratamento estático que `#chapterB` já tinha); os dois `ScrollTrigger.create()` existentes (`#hero`→`#catalogo` e `#chapterB`→`#sobre`) continuam apontando pros mesmos seletores, que não mudaram de posição na árvore relevante.

Verificado no navegador (desktop): as 3 fotos carregam nítidas e variadas, com bom contraste pro texto da legenda.
