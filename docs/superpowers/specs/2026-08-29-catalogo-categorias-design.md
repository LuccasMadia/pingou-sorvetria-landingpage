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

## Addendum — faixa de foto entre categorias

Pedido de acompanhamento: usar a foto de fundo já pinada no Capítulo A (a mesma da casquinha, `1746283209293`) como elemento visual entre as categorias, pra ficar "mais bonito" — em vez de só um título de texto separando cada bloco.

Validado com 3 opções via companion visual (janela estreita / faixa-divisor com foto / painel translúcido). Opção escolhida: **faixa-divisor com foto** (B).

**Onde aparece:** a primeira categoria (Sorvetes) mantém o `h3.catalogo__categoria-title` de texto simples, já que vem logo abaixo do título "Sabores" e não é uma transição entre categorias. Antes de **Gelatos**, **Milkshakes** e **Outros** — ou seja, nas 3 transições — o `h3.catalogo__categoria-title` de texto é substituído por uma faixa de foto (`.catalogo__divider`).

**Markup da faixa** (substitui o `<h3 class="catalogo__categoria-title">` nas categorias 2, 3 e 4):
```html
<div class="catalogo__divider" role="img" aria-label="Categoria: Gelatos">
  <span class="catalogo__divider-label">Gelatos</span>
</div>
```
A foto entra via CSS `background-image` (elemento decorativo, por isso `aria-label` no wrapper em vez de `<img alt>`).

**CSS:**
```css
.catalogo__divider {
  height: 110px;
  border-radius: 16px;
  margin: 0 0 0.75rem;
  background-image: linear-gradient(180deg, rgba(58,35,24,0.15) 0%, rgba(58,35,24,0.6) 100%),
    url('https://images.unsplash.com/photo-1746283209293-73a04e08b3ff?w=900&q=65&auto=format&fit=crop');
  background-size: 260% auto;
  background-position: 52% 68%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.catalogo__divider-label {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
  color: var(--white);
  padding-bottom: 0.85rem;
  opacity: 0.95;
}
@media (max-width: 700px) {
  .catalogo__divider { height: 80px; }
}
```

Mesma foto reaproveitada nas 3 faixas (Gelatos, Milkshakes, Outros) — é a foto que já está pinada atrás do Capítulo A, então repetir reforça a ideia de "a imagem do fundo aparecendo entre os blocos", em vez de introduzir fotos novas ali.

`background-size`/`background-position` foram ajustados (verificados no navegador) porque a foto tem profundidade de campo rasa: um recorte simples (`cover`, posição perto do topo) caía na área desfocada do fundo. O zoom em `260% auto` + posição `52% 68%` centraliza a faixa na casquinha/cone, que é a parte nítida da foto.

Sem mudança em `v2/script.js` — a faixa é puramente decorativa (CSS), não precisa de animação de entrada própria (fica dentro do fluxo normal de scroll do painel).
