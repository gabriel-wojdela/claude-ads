# Rotina Operacional — Google Ads + SEO + Blogs

> O que checar, quando, com qual skill.
> Atualizado: 2026-05-03

---

## Rotina Diaria (seg-sex, ~15min)

### /morning-brief
Executar ao iniciar o dia. O skill gera automaticamente:
- Status de campanhas ativas (spend, impressoes, cliques)
- Alertas de SEO (paginas desindexadas, quedas de ranking)
- Status de blogs (novos publicados, pendentes de indexacao)
- Acoes prioritarias do dia

**Quando GSC MCP estiver ativo:** o morning-brief inclui dados reais de indexacao.
**Ate la:** verificar manualmente https://search.google.com/search-console

---

## Rotina 2x/Semana (terca + quinta)

### /google-ads-session
Sessao interativa de gestao. Checklist:

1. **Spend check** — verificar gastos vs orcamento
2. **Search terms** — novos termos que ativaram anuncios
3. **Negativos** — adicionar termos irrelevantes como negativos
4. **RSA performance** — quais headlines/descriptions estao performando
5. **Quality Score** — paginas com QS < 7 precisam de atencao
6. **Alertas** — campanhas pausadas, budget esgotado, reprovacoes

**Backend disponivel:**
- Markifact MCP (200 creditos gratis) — testar primeiro
- Google Ads API (quando dev token aprovado)
- Modo offline: exportar CSV do Google Ads UI → analisar com Claude

---

## Rotina Semanal (segunda)

### /seo-report + /blog-health-check
Executar em sequencia:

1. **/seo-report** — Performance organica da semana
   - GSC: impressoes, cliques, CTR, posicao media
   - Ubersuggest: keyword rankings, backlinks novos
   - GA4: trafego organico, bounce rate, conversoes
   - Cruzamento: keywords que subiram vs cairam

2. **/blog-health-check** — Saude dos blogs
   - H2s duplicados
   - Keyword density fora de 1-2%
   - Internal links < 3
   - Canonical ausente ou errado
   - Paginas nao indexadas

**Output:** Lista priorizada de acoes para a semana.

---

## Rotina Quinzenal (1o e 15o do mes)

### /seo-audit
Auditoria tecnica completa:
- robots.txt e sitemap.xml
- Canonical tags em todas as paginas
- Schema.org markup (FAQ, LocalBusiness)
- Core Web Vitals (LCP, CLS, INP)
- E-E-A-T signals
- Links quebrados
- Redirect chains

---

## Rotina Mensal (1o dia util)

### /content-seo-sync
Analise cruzada conteudo x SEO:
- **Gaps:** keywords com volume mas sem conteudo
- **Canibalizacao:** multiplas paginas competindo pela mesma keyword
- **Oportunidades:** conteudo na posicao 5-15 que pode subir com otimizacao
- **Decay:** conteudo que perdeu ranking nos ultimos 30 dias

---

## Acoes por Alerta

| Alerta | Acao | Skill |
|--------|------|-------|
| Pagina desindexada | Diagnosticar via GSC → corrigir → resubmeter | /index-checker → /blog-index-submit |
| Keyword caiu >5 posicoes | Analisar SERP → atualizar conteudo → internal links | /content-seo-sync |
| Blog publicado | Checklist pos-publicacao | /blog-post-publish |
| QS < 7 em Google Ads | Revisar LP + copy do anuncio + extensoes | /google-ads-session |
| Spend acima do budget | Pausar campanha + ajustar bidding | /google-ads-session |
| H2 duplicado em blog | Fix inline ou batch | /blog-fix-batch |
| Canonical errado | Fix direto no Odoo | /blog-fix-batch |

---

## Ferramentas por Disponibilidade

### Funcionam AGORA (sem setup)
- /ads-copy-generator — gera RSAs offline
- /google-ads-launch — plano de campanha offline
- /morning-brief — briefing contextual (sem dados live)
- Ubersuggest MCP (via claude.ai) — keyword research

### Funcionam apos GSC MCP setup
- /seo-audit — com dados reais de indexacao
- /index-checker — verificacao direta
- /blog-index-submit — submissao automatica
- /blog-health-check — diagnostico completo
- /seo-report — com dados GSC reais

### Funcionam apos Google Ads API
- /google-ads-session — gestao completa
- /ads-dashboard — dashboard real-time
- /google-ads-launch — lancamento automatico

---

*Rotina definida em 2026-05-03 — Sessao de operacionalizacao*