# Claude Ads — Empurrao Digital

## Sobre este projeto

Ecossistema de gestao de campanhas Meta Ads via Claude Code.
Conecta a API do Meta Ads para puxar campanhas, metricas, relatorios e gerar dashboards.

## Quem opera

- **Agencia:** Empurrao Digital
- **Gestor de trafego:** [NOME] — opera Meta Ads, Google Ads, analisa metricas
- **Supervisor:** Gabriel Borges — configura e mantem o ecossistema

## Regras

- Sempre responder em portugues brasileiro
- Nunca expor tokens ou credenciais em codigo — usar `.env`
- Ao criar scripts, usar JavaScript (Node.js) com ESM ou CommonJS
- Sempre usar a biblioteca `facebook-nodejs-business-sdk` para Meta API
- Sempre carregar credenciais via `dotenv`
- Formatar saidas no terminal de forma legivel (tabelas, emojis, separadores)
- Ao criar relatorios, incluir: data de geracao, periodo analisado, conta analisada

## Estrutura do projeto

```
claude-ads/
├── scripts/       → Scripts que conectam na Meta API
├── dashboard/     → Dashboard visual de metricas (futuro)
├── obsidian-vault/→ Base de conhecimento e gestao (futuro)
└── docs/          → Documentacao e guias de referencia
```

## Variaveis de ambiente (.env)

- `META_ACCESS_TOKEN` — Token de acesso da Meta API
- `META_AD_ACCOUNT_ID` — ID da conta de anuncios (formato: act_XXXXXXXXX)
- `META_APP_ID` — ID do app no Facebook for Developers
- `META_APP_SECRET` — Secret do app

## Comandos uteis

```bash
# Listar campanhas ativas
node scripts/meta-campaigns.js

# Ver metricas dos ultimos 7 dias
node scripts/meta-metrics.js

# Gerar relatorio
node scripts/meta-report.js
```
