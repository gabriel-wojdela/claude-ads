/**
 * meta-report.js
 * Gera um relatorio completo em Markdown das campanhas ativas
 * Salva em: docs/relatorios/relatorio-YYYY-MM-DD.md
 *
 * Uso: node scripts/meta-report.js
 * Uso com periodo: node scripts/meta-report.js 30
 */

const bizSdk = require('facebook-nodejs-business-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const accessToken = process.env.META_ACCESS_TOKEN;
const adAccountId = process.env.META_AD_ACCOUNT_ID;

if (!accessToken || !adAccountId) {
  console.error('\n❌ Credenciais nao configuradas. Preencha o .env\n');
  process.exit(1);
}

const api = bizSdk.FacebookAdsApi.init(accessToken);
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;

const dias = parseInt(process.argv[2]) || 7;

async function gerarRelatorio() {
  try {
    const account = new AdAccount(adAccountId);

    const hoje = new Date();
    const inicio = new Date(hoje);
    inicio.setDate(inicio.getDate() - dias);

    const dataInicio = inicio.toISOString().split('T')[0];
    const dataFim = hoje.toISOString().split('T')[0];
    const dataHoje = hoje.toLocaleDateString('pt-BR');

    let md = '';
    md += `# Relatorio Meta Ads — Empurrao Digital\n\n`;
    md += `**Data de geracao:** ${dataHoje}\n`;
    md += `**Periodo:** ${dataInicio} a ${dataFim} (${dias} dias)\n`;
    md += `**Conta:** ${adAccountId}\n\n`;
    md += `---\n\n`;

    // Buscar campanhas ativas
    const campaigns = await account.getCampaigns(
      [Campaign.Fields.name, Campaign.Fields.status, Campaign.Fields.objective],
      { filtering: [{ field: 'status', operator: 'EQUAL', value: 'ACTIVE' }] }
    );

    if (campaigns.length === 0) {
      md += `> Nenhuma campanha ativa no periodo.\n`;
      salvarRelatorio(md, dataFim);
      return;
    }

    md += `## Campanhas Ativas (${campaigns.length})\n\n`;
    md += `| Campanha | Investido | Impressoes | Cliques | CPC | CTR |\n`;
    md += `|----------|-----------|------------|---------|-----|-----|\n`;

    let totalSpend = 0;
    let totalImpressions = 0;
    let totalClicks = 0;
    const detalhes = [];

    for (const campaign of campaigns) {
      const insights = await campaign.getInsights(
        ['campaign_name', 'impressions', 'clicks', 'spend', 'cpc', 'ctr', 'reach', 'actions'],
        { time_range: { since: dataInicio, until: dataFim } }
      );

      if (insights.length === 0) {
        md += `| ${campaign.name} | — | — | — | — | — |\n`;
        continue;
      }

      const d = insights[0];
      const spend = parseFloat(d.spend || 0);
      const impressions = parseInt(d.impressions || 0);
      const clicks = parseInt(d.clicks || 0);
      const cpc = parseFloat(d.cpc || 0);
      const ctr = parseFloat(d.ctr || 0);
      const reach = parseInt(d.reach || 0);

      totalSpend += spend;
      totalImpressions += impressions;
      totalClicks += clicks;

      md += `| ${campaign.name} | R$ ${spend.toFixed(2)} | ${impressions.toLocaleString('pt-BR')} | ${clicks.toLocaleString('pt-BR')} | R$ ${cpc.toFixed(2)} | ${ctr.toFixed(2)}% |\n`;

      detalhes.push({ name: campaign.name, spend, impressions, clicks, cpc, ctr, reach });
    }

    // Resumo
    const cpcGeral = totalClicks > 0 ? totalSpend / totalClicks : 0;
    const ctrGeral = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

    md += `\n## Resumo Geral\n\n`;
    md += `- **Total investido:** R$ ${totalSpend.toFixed(2)}\n`;
    md += `- **Total impressoes:** ${totalImpressions.toLocaleString('pt-BR')}\n`;
    md += `- **Total cliques:** ${totalClicks.toLocaleString('pt-BR')}\n`;
    md += `- **CPC medio:** R$ ${cpcGeral.toFixed(2)}\n`;
    md += `- **CTR medio:** ${ctrGeral.toFixed(2)}%\n\n`;

    // Top campanhas
    if (detalhes.length > 1) {
      const topSpend = [...detalhes].sort((a, b) => b.spend - a.spend)[0];
      const topCTR = [...detalhes].sort((a, b) => b.ctr - a.ctr)[0];
      const topCPC = [...detalhes].sort((a, b) => a.cpc - b.cpc)[0];

      md += `## Destaques\n\n`;
      md += `- **Maior investimento:** ${topSpend.name} (R$ ${topSpend.spend.toFixed(2)})\n`;
      md += `- **Melhor CTR:** ${topCTR.name} (${topCTR.ctr.toFixed(2)}%)\n`;
      md += `- **Menor CPC:** ${topCPC.name} (R$ ${topCPC.cpc.toFixed(2)})\n\n`;
    }

    md += `---\n`;
    md += `*Relatorio gerado automaticamente via Claude Ads*\n`;

    salvarRelatorio(md, dataFim);

  } catch (error) {
    if (error.response && error.response.error) {
      console.error(`\n❌ Erro Meta API: ${error.response.error.message}`);
      if (error.response.error.code === 190) {
        console.error('💡 Token expirado. Gere novo em: https://developers.facebook.com/tools/explorer/');
      }
    } else {
      console.error('\n❌ Erro:', error.message);
    }
    process.exit(1);
  }
}

function salvarRelatorio(conteudo, data) {
  const dir = path.join(__dirname, '..', 'docs', 'relatorios');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const arquivo = path.join(dir, `relatorio-${data}.md`);
  fs.writeFileSync(arquivo, conteudo, 'utf-8');

  console.log(`\n✅ Relatorio gerado com sucesso!`);
  console.log(`   Arquivo: docs/relatorios/relatorio-${data}.md\n`);
}

gerarRelatorio();
