/**
 * meta-campaigns.js
 * Lista todas as campanhas ativas da conta Meta Ads
 *
 * Uso: node scripts/meta-campaigns.js
 */

const bizSdk = require('facebook-nodejs-business-sdk');
require('dotenv').config();

// --- Configuracao ---
const accessToken = process.env.META_ACCESS_TOKEN;
const adAccountId = process.env.META_AD_ACCOUNT_ID;

if (!accessToken || !adAccountId) {
  console.error('\n❌ Erro: Credenciais nao configuradas!');
  console.error('   Copie o .env.example para .env e preencha seus dados:');
  console.error('   cp .env.example .env\n');
  process.exit(1);
}

// --- Inicializar SDK ---
const api = bizSdk.FacebookAdsApi.init(accessToken);
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;

async function listarCampanhas() {
  try {
    const account = new AdAccount(adAccountId);

    console.log('\n==============================================');
    console.log('  📊 CAMPANHAS META ADS — Empurrao Digital');
    console.log('==============================================');
    console.log(`  Conta: ${adAccountId}`);
    console.log(`  Data: ${new Date().toLocaleDateString('pt-BR')}`);
    console.log('==============================================\n');

    // Buscar campanhas
    const campaigns = await account.getCampaigns(
      [
        Campaign.Fields.name,
        Campaign.Fields.status,
        Campaign.Fields.objective,
        Campaign.Fields.daily_budget,
        Campaign.Fields.lifetime_budget,
        Campaign.Fields.created_time,
      ],
      {
        limit: 50,
      }
    );

    if (campaigns.length === 0) {
      console.log('  Nenhuma campanha encontrada nesta conta.\n');
      return;
    }

    // Separar por status
    const ativas = campaigns.filter(c => c.status === 'ACTIVE');
    const pausadas = campaigns.filter(c => c.status === 'PAUSED');
    const outras = campaigns.filter(c => !['ACTIVE', 'PAUSED'].includes(c.status));

    // Mostrar campanhas ativas
    if (ativas.length > 0) {
      console.log(`  🟢 ATIVAS (${ativas.length})`);
      console.log('  ─────────────────────────────────────');
      ativas.forEach((c, i) => {
        const orcamento = c.daily_budget
          ? `R$ ${(c.daily_budget / 100).toFixed(2)}/dia`
          : c.lifetime_budget
            ? `R$ ${(c.lifetime_budget / 100).toFixed(2)} total`
            : 'Sem orcamento definido';

        console.log(`  ${i + 1}. ${c.name}`);
        console.log(`     Objetivo: ${formatarObjetivo(c.objective)}`);
        console.log(`     Orcamento: ${orcamento}`);
        console.log(`     Criada em: ${new Date(c.created_time).toLocaleDateString('pt-BR')}`);
        console.log('');
      });
    }

    // Mostrar campanhas pausadas
    if (pausadas.length > 0) {
      console.log(`  ⏸️  PAUSADAS (${pausadas.length})`);
      console.log('  ─────────────────────────────────────');
      pausadas.forEach((c, i) => {
        console.log(`  ${i + 1}. ${c.name}`);
        console.log(`     Objetivo: ${formatarObjetivo(c.objective)}`);
        console.log('');
      });
    }

    // Resumo
    console.log('  ══════════════════════════════════════');
    console.log(`  Total: ${campaigns.length} campanhas`);
    console.log(`  🟢 ${ativas.length} ativas | ⏸️  ${pausadas.length} pausadas | ⚪ ${outras.length} outras`);
    console.log('  ══════════════════════════════════════\n');

  } catch (error) {
    if (error.response && error.response.error) {
      const err = error.response.error;
      console.error('\n❌ Erro da Meta API:');
      console.error(`   Codigo: ${err.code}`);
      console.error(`   Mensagem: ${err.message}`);

      if (err.code === 190) {
        console.error('\n   💡 Token expirado ou invalido.');
        console.error('   Gere um novo em: https://developers.facebook.com/tools/explorer/');
      }
      if (err.code === 100) {
        console.error('\n   💡 Verifique se o AD_ACCOUNT_ID esta correto (formato: act_XXXXXXXXX)');
      }
    } else {
      console.error('\n❌ Erro inesperado:', error.message);
    }
    process.exit(1);
  }
}

function formatarObjetivo(objetivo) {
  const mapa = {
    'OUTCOME_AWARENESS': 'Reconhecimento',
    'OUTCOME_ENGAGEMENT': 'Engajamento',
    'OUTCOME_LEADS': 'Geracao de Leads',
    'OUTCOME_SALES': 'Vendas',
    'OUTCOME_TRAFFIC': 'Trafego',
    'OUTCOME_APP_PROMOTION': 'Promocao de App',
    'LINK_CLICKS': 'Cliques no Link',
    'CONVERSIONS': 'Conversoes',
    'LEAD_GENERATION': 'Geracao de Leads',
    'MESSAGES': 'Mensagens',
    'REACH': 'Alcance',
    'BRAND_AWARENESS': 'Reconhecimento de Marca',
    'VIDEO_VIEWS': 'Visualizacoes de Video',
    'POST_ENGAGEMENT': 'Engajamento no Post',
  };
  return mapa[objetivo] || objetivo || 'Nao definido';
}

listarCampanhas();
