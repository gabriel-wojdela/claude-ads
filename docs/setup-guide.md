# Guia de Instalacao — Claude Ads

Passo a passo para instalar tudo do zero em um computador Windows.

---

## 1. Node.js

O Node.js e o motor que roda nossos scripts JavaScript.

1. Acesse: https://nodejs.org
2. Baixe a versao **LTS** (botao verde)
3. Instale com todas as opcoes padrao (Next, Next, Next...)
4. Verificar: abra o terminal e digite:
   ```
   node --version
   ```
   Deve aparecer algo como `v20.x.x` ou `v24.x.x`

---

## 2. Git

O Git salva o historico do seu trabalho (como um backup inteligente).

1. Acesse: https://git-scm.com
2. Baixe e instale com opcoes padrao
3. Verificar:
   ```
   git --version
   ```
4. Configurar seu nome e email:
   ```
   git config --global user.name "Seu Nome"
   git config --global user.email "seu@email.com"
   ```

---

## 3. VS Code

O VS Code e onde voce trabalha — e o seu "escritorio digital".

1. Acesse: https://code.visualstudio.com
2. Baixe e instale
3. Abra o VS Code
4. Instale a extensao **Claude Code**:
   - Ctrl+Shift+X (abre extensoes)
   - Pesquise "Claude Code"
   - Clique em Install

---

## 4. Claude Code (CLI)

O Claude Code e o Claude que mexe no seu computador.

1. Abra o terminal no VS Code: `Ctrl+` ` (tecla crase, abaixo do Esc)
2. Instale:
   ```
   npm install -g @anthropic-ai/claude-code
   ```
3. Inicie:
   ```
   claude
   ```
4. Faca login com as credenciais do Claude Pro Max
5. Teste: digite qualquer pergunta e veja a resposta

---

## 5. Abrir o Projeto Claude Ads

1. No VS Code: File > Open Folder
2. Navegue ate a pasta `claude-ads`
3. Clique em "Selecionar Pasta"
4. Abra o terminal: `Ctrl+` `
5. Instale as dependencias:
   ```
   npm install
   ```
6. Configure suas credenciais:
   ```
   cp .env.example .env
   ```
7. Edite o `.env` com seus dados reais da Meta API

---

## 6. Verificacao Final

Rode esses comandos no terminal para confirmar que tudo funciona:

```bash
node --version          # Node.js instalado
npm --version           # npm instalado
git --version           # Git instalado
claude --version        # Claude Code instalado
node scripts/meta-campaigns.js  # Script funcionando
```

Se todos rodarem sem erro, esta tudo pronto!

---

## Problemas Comuns

| Problema | Solucao |
|----------|---------|
| "npm nao reconhecido" | Reinstale o Node.js e reinicie o VS Code |
| "permissao negada" | Abra o VS Code como Administrador (botao direito) |
| "token expirado" | Gere novo token em developers.facebook.com/tools/explorer |
| "account id invalido" | Verifique o formato: deve ser `act_` seguido de numeros |
| "modulo nao encontrado" | Rode `npm install` na pasta do projeto |
