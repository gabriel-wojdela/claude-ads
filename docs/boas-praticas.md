# Boas Praticas — Claude Ads

Regras essenciais para trabalhar com seguranca e eficiencia.

---

## Seguranca

### Nunca compartilhe o .env
O arquivo `.env` contem seus tokens de acesso. E como a senha do seu Business Manager.
- Nunca mande por WhatsApp, email, ou qualquer lugar
- Nunca faca commit no git (o `.gitignore` ja protege)
- Se vazar, gere um novo token imediatamente

### Tokens expiram
- Token temporario: 1 hora
- Token longa duracao: ~60 dias
- Se o script der erro 190, gere um novo token

### Revise antes de executar
Quando o Claude Code sugerir rodar um comando, leia o que ele vai fazer.
Especialmente comandos que:
- Deletam arquivos
- Instalam pacotes novos
- Modificam configuracoes

---

## Claude Code

### CLAUDE.md e seu briefing
O arquivo `CLAUDE.md` na raiz do projeto e lido pelo Claude toda vez que voce inicia uma conversa.
Quanto melhor o briefing, melhor o Claude trabalha.

Inclua no CLAUDE.md:
- O que o projeto faz
- Quem esta operando
- Regras especificas (idioma, formato, padroes)
- Estrutura de pastas

### Prompts eficientes
Bons prompts para Claude Code:

```
✅ "Crie um script que puxa o CPC medio das campanhas ativas dos ultimos 7 dias"
✅ "Adicione ao meta-campaigns.js um filtro por objetivo LEAD_GENERATION"
✅ "Me explica o que esse trecho do codigo faz: [colar codigo]"
✅ "Tem algum erro nesse script? Revisa pra mim"

❌ "Faz algo legal com meus dados"  (vago demais)
❌ "Arruma tudo"  (Claude nao sabe o que esta errado)
```

### Peca explicacoes
"Me explica o que esse codigo faz" e um prompt valido e poderoso.
Nao tenha vergonha de pedir explicacao — e assim que voce aprende.

---

## Organizacao

### Estrutura de pastas
```
claude-ads/
├── scripts/     → Codigos que rodam no terminal
├── docs/        → Documentacao e guias
├── dashboard/   → Interface visual (futuro)
└── .env         → Suas credenciais (nunca compartilhar)
```

### Nomeacao de arquivos
- Scripts: `meta-[funcao].js` (ex: `meta-campaigns.js`, `meta-metrics.js`)
- Relatorios: `relatorio-YYYY-MM-DD.md`
- Docs: nomes descritivos em portugues

### Salve seu trabalho
Depois de cada sessao ou mudanca importante:
```bash
git add .
git commit -m "descricao do que mudou"
```

---

## Workflow diario sugerido

1. Abrir VS Code na pasta `claude-ads`
2. Abrir terminal (`Ctrl+` `)
3. Rodar `node scripts/meta-campaigns.js` para ver campanhas
4. Rodar `node scripts/meta-metrics.js` para ver metricas
5. Se precisar algo novo, pedir ao Claude Code
6. Salvar: `git add . && git commit -m "descricao"`
