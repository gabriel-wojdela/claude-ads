/**
 * meta-metrics.js
 * Puxa metricas dos ultimos 7 dias de todas as campanhas ativas
 *
 * Uso: node scripts/meta-metrics.js
 * Uso com periodo: node scripts/meta-metrics.js 30  (ultimos 30 dias)
 */

const bizSdk = require('facebook-nodejs-business-sdk');
require('dotenv').config();

const accessToken = process.env.META_ACCESS_TOKEN;
const adAccountId = process.env.META_AD_ACCOUNT_ID;

if (!accessToken || !adAccountId) {
  console.error('\n❌ Erro: Credenciais nao configuradas!');
  console.error('   Copie o .env.example para .env e preencha seus dados.\n');
  process.exit(1);
}

const api = bizSdk.FacebookAdsApi.init(accessToken);
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;

// Periodo: argumento da CLI ou 7 dias padrao
const dias = parseInt(process.argv[2]) || 7;

async function buscarMetricas() {
  try {
    const account = new AdAccount(adAccountId);

    // Calcular datas
    const hoje = new Date();
    const inicio = new Date(hoje);
    inicio.setDate(inicio.getDate() - dias);

    const dataInicio = inicio.toISOString().split('T')[0];
    const dataFim = hoje.toISOString().split('T')[0];

    console.log('\n══════════════════════════════════════════════');
    console.log('  📈 METRICAS META ADS — Empurrao Digital');
    console.log('══════════════════════════════════════════════');
    console.log(`  Conta: ${adAccountId}`);
    console.log(`  Periodo: ${dataInicio} a ${dataFim} (${dias} dias)`);
    console.log('══════════════════════════════════════════════\n');

    // Buscar campanhas ativas
    const campaigns = await account.getCampaigns(
      [Campaign.Fields.name, Campaign.Fields.status],
      { filtering: [{ field: 'status', operator: 'EQUAL', value: 'ACTIVE' }] }
    );

    if (campaigns.length === 0) {
      console.log('  Nenhuma campanha ativa encontrada.\n');
      return;
    }

    let totalSpend = 0;
    let totalImpressions = 0;
    let totalClicks = 0;

    for (const campaign of campaigns) {
      const insights = await campaign.getInsights(
        [
          'campaign_name',
          'impressions',
          'clicks',
          'spend',
          'cpc',
          'ctr',
          'cpp',
          'reach',
          'actions',
        ],
        {
          time_range: { since: dataInicio, until: dataFim },
        }
      );

      if (insights.length === 0) {
        console.log(`  📋 ${campaign.name}`);
        console.log('     Sem dados no periodo\n');
        continue;
      }

      const data = insights[0];
      const spend = parseFloat(data.spend || 0);
      const impressions = parseInt(data.impressions || 0);
      const clicks = parseInt(data.clicks || 0);
      const cpc = parseFloat(data.cpc || 0);
      const ctr = parseFloat(data.ctr || 0);
      const reach = parseInt(data.reach || 0);

      totalSpend += spend;
      totalImpressions += impressions;
      totalClicks += clicks;

      // Buscar conversoes/leads nas actions
      let conversoes = 0;
      if (data.actions) {
        const leadAction = data.actions.find(
          a => a.action_type === 'lead' || a.action_type === 'offsite_conversion.fb_pixel_lead'
        );
        if (leadAction) conversoes = parseInt(leadAction.value);
      }

      console.log(`  📋 ${campaign.name}`);
      console.log('  ─────────────────────────────────────');
      console.log(`     💰 Investido:   R$ ${spend.toFixed(2)}`);
      console.log(`     👁️  Impressoes:  ${impressions.toLocaleString('pt-BR')}`);
      console.log(`     👥 Alcance:     ${reach.toLocaleString('pt-BR')}`);
      console.log(`     🖱️  Cliques:     ${clicks.toLocaleString('pt-BR')}`);
      console.log(`     💲 CPC:         R$ ${cpc.toFixed(2)}`);
      console.log(`     📊 CTR:         ${ctr.toFixed(2)}%`);
      if (conversoes > 0) {
        const cpl = spend / conversoes;
        console.log(`     🎯 Conversoes:  ${conversoes}`);
        console.log(`     💎 CPL:         R$ ${cpl.toFixed(2)}`);
      }
      console.log('');
    }

    // Resumo geral
    const cpcGeral = totalClicks > 0 ? totalSpend / totalClicks : 0;
    const ctrGeral = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

    console.log('  ══════════════════════════════════════');
    console.log('  RESUMO GERAL');
    console.log('  ──────────────────────────────────────');
    console.log(`     💰 Total investido:  R$ ${totalSpend.toFixed(2)}`);
    console.log(`     👁️  Total impressoes: ${totalImpressions.toLocaleString('pt-BR')}`);
    console.log(`     🖱️  Total cliques:    ${totalClicks.toLocaleString('pt-BR')}`);
    console.log(`     💲 CPC medio:        R$ ${cpcGeral.toFixed(2)}`);
    console.log(`     📊 CTR medio:        ${ctrGeral.toFixed(2)}%`);
    console.log('  ══════════════════════════════════════\n');

  } catch (error) {
    if (error.response && error.response.error) {
      const err = error.response.error;
      console.error('\n❌ Erro da Meta API:');
      console.error(`   Codigo: ${err.code} — ${err.message}`);
      if (err.code === 190) {
        console.error('   💡 Token expirado. Gere novo em: https://developers.facebook.com/tools/explorer/');
      }
    } else {
      console.error('\n❌ Erro:', error.message);
    }
    process.exit(1);
  }
}

buscarMetricas();
