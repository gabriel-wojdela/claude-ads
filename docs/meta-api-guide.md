# Guia Meta Ads API — Passo a Passo

Como configurar a Meta Ads API para usar com o Claude Ads.

---

## Passo 1: Criar conta no Facebook for Developers

1. Acesse: https://developers.facebook.com
2. Clique em "Comecar" ou "Get Started"
3. Faca login com sua conta do Facebook (a mesma do Business Manager)
4. Aceite os termos de uso
5. Confirme seu email se necessario

---

## Passo 2: Criar um App

1. No painel do developers.facebook.com, clique em **"Criar App"**
2. Selecione tipo: **"Business"** (ou "Outro" dependendo da versao)
3. Preencha:
   - Nome do app: `Empurrao Ads Manager` (ou nome que preferir)
   - Email de contato: seu email
   - Business Manager: selecione sua conta
4. Clique em Criar

---

## Passo 3: Adicionar a Marketing API

1. No painel do app recem-criado
2. Na secao "Adicionar Produtos", encontre **"Marketing API"**
3. Clique em "Configurar"

---

## Passo 4: Obter suas credenciais

### App ID e App Secret:
1. No menu lateral: **Configuracoes > Basico**
2. Anote o **ID do Aplicativo** (App ID)
3. Clique em "Mostrar" ao lado de **Chave Secreta** (App Secret)
4. Anote ambos

### Ad Account ID:
1. Acesse o **Business Manager** (business.facebook.com)
2. Va em: Configuracoes do Negocio > Contas > Contas de Anuncios
3. O ID aparece ao lado do nome da conta
4. Formato correto: `act_` + numeros (ex: `act_123456789`)

---

## Passo 5: Gerar Access Token

### Opcao A — Token temporario (1h, para teste):
1. Acesse: https://developers.facebook.com/tools/explorer/
2. No campo "Aplicativo do Facebook", selecione seu app
3. Clique em **"Gerar Token de Acesso"**
4. Permita o acesso quando solicitado
5. No campo de permissoes, adicione:
   - `ads_read`
   - `ads_management`
   - `business_management`
6. Clique em "Gerar Token de Acesso"
7. Copie o token gerado

### Opcao B — Token de longa duracao (~60 dias):
Depois de gerar o token temporario, converta:

1. No Graph API Explorer, com o token temporario ativo
2. Acesse esta URL no navegador (substitua os valores):
   ```
   https://graph.facebook.com/v21.0/oauth/access_token?
     grant_type=fb_exchange_token&
     client_id=SEU_APP_ID&
     client_secret=SEU_APP_SECRET&
     fb_exchange_token=SEU_TOKEN_TEMPORARIO
   ```
3. A resposta contera o token de longa duracao

---

## Passo 6: Configurar no projeto

1. Na pasta `claude-ads`, copie o template:
   ```
   cp .env.example .env
   ```

2. Edite o `.env` com seus dados:
   ```
   META_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxx
   META_AD_ACCOUNT_ID=act_123456789
   META_APP_ID=000000000000
   META_APP_SECRET=xxxxxxxxxxxxxxx
   ```

3. Teste:
   ```
   node scripts/meta-campaigns.js
   ```

---

## Permissoes necessarias

| Permissao | Pra que serve |
|-----------|---------------|
| `ads_read` | Ler campanhas, metricas, relatorios |
| `ads_management` | Gerenciar campanhas (futuro) |
| `business_management` | Acessar dados da conta do Business Manager |

---

## Limites da API

- **Rate limit:** ~200 chamadas por hora por token
- **Token temporario:** expira em 1 hora
- **Token longa duracao:** expira em ~60 dias
- **Dados historicos:** ate 37 meses atras

---

## Problemas Comuns

| Erro | Causa | Solucao |
|------|-------|---------|
| Codigo 190 | Token expirado | Gere novo token no Graph API Explorer |
| Codigo 100 | Parametro invalido | Verifique o Ad Account ID (formato act_XXX) |
| Codigo 10 | Permissao negada | Adicione as permissoes ads_read no token |
| Codigo 17 | Rate limit | Aguarde 1h ou reduza chamadas |
