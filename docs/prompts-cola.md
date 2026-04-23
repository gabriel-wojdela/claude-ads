# Cola de Prompts — Treinamento Claude Ads

Prompts prontos para usar durante e apos o treinamento.
Copie e cole no Claude Code quando precisar.

---

## Bloco 3 — Primeiro Contato

### Criar o CLAUDE.md
```
Crie um arquivo CLAUDE.md neste projeto com o seguinte briefing:
- Este projeto gerencia campanhas de Meta Ads via API
- O operador e [SEU NOME], gestor de trafego da Empurrao Digital
- Sempre responder em portugues brasileiro
- Formatar saidas de forma legivel no terminal
```

### Editar um arquivo
```
Adicione ao CLAUDE.md uma secao chamada "Contas" com o nome
da minha conta do Business Manager: [NOME DA CONTA]
```

### Criar arquivo simples
```
Crie um arquivo chamado anotacoes.txt com o texto:
"Minha primeira criacao via Claude Code - [DATA DE HOJE]"
```

---

## Bloco 4 — Meta API

### Configurar .env
```
Crie um arquivo .env com as seguintes variaveis:
META_ACCESS_TOKEN=[COLAR TOKEN AQUI]
META_AD_ACCOUNT_ID=[COLAR ACT_ID AQUI]
META_APP_ID=[COLAR APP ID AQUI]
META_APP_SECRET=[COLAR SECRET AQUI]

E garanta que o .gitignore protege esse arquivo.
```

---

## Bloco 5 — Wow Moment

### Listar campanhas
```
Rode o script meta-campaigns.js para ver minhas campanhas ativas
```

### Ver metricas
```
Rode o script meta-metrics.js para ver as metricas dos ultimos 7 dias
```

### Gerar relatorio
```
Rode o script meta-report.js para gerar um relatorio em Markdown
```

---

## Prompts do Dia a Dia

### Analise rapida
```
Analise as metricas das minhas campanhas dos ultimos 7 dias.
Quais estao com CPC acima de R$ 2,00? Sugira otimizacoes.
```

### Comparar periodos
```
Compare as metricas dos ultimos 7 dias com os 7 dias anteriores.
Quais campanhas melhoraram e quais pioraram?
```

### Filtrar por objetivo
```
Modifique o meta-campaigns.js para mostrar apenas campanhas
com objetivo de LEAD_GENERATION
```

### Criar novo script
```
Crie um script que mostre os 5 conjuntos de anuncios com maior
gasto nos ultimos 30 dias, incluindo CPC e CTR de cada um
```

### Entender o codigo
```
Me explica o que o arquivo meta-campaigns.js faz, linha por linha,
como se eu nunca tivesse visto codigo antes
```

### Debugar erro
```
Rodei o script e deu esse erro: [COLAR ERRO AQUI]
Me ajuda a entender e resolver
```

### Relatorio semanal
```
Gere um relatorio completo dos ultimos 7 dias com:
- Resumo geral de investimento e resultados
- Top 3 campanhas por CTR
- Campanhas com CPC acima da media
- Sugestoes de otimizacao
```

---

## Dicas

- **Seja especifico:** quanto mais detalhes no prompt, melhor o resultado
- **Inclua numeros:** "ultimos 7 dias", "CPC acima de R$ 2", "top 5"
- **Peca explicacao:** "me explica o que isso faz" e sempre valido
- **Itere:** se o resultado nao ficou bom, refine o prompt
- **Salve prompts bons:** quando um prompt funcionar bem, anote aqui
