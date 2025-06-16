const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const {
    getEmpresaConfig,
    cadastrarCliente,
    buscarImoveis,
    registrarHistorico,
} = require('./api');

const empresa_id = 1;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: false }, // abre o navegador pra debug
});

let config = {};

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('⚠️ ESCANEIA O QR CODE');
});

client.on('ready', async () => {
    console.log('✅ BOT CONECTADO');
    config = await getEmpresaConfig(empresa_id);
    console.log('⚙️ CONFIG CARREGADA:', config);
});

client.on('message', async (message) => {
    const numero = message.from.split('@')[0];
    const texto = message.body.toLowerCase();

    // ⏰ Verifica horário de atendimento
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour12: false }).substring(0, 5);
    if (
        config.status_bot &&
        (horaAtual < config.horario_abertura || horaAtual > config.horario_fechamento)
    ) {
        await message.reply(config.mensagem_fora_horario);
        await registrarHistorico(empresa_id, 'Mensagem fora do horário', texto);
        return;
    }

    // 🔥 Cadastrar cliente automaticamente
    await cadastrarCliente(empresa_id, {
        nome: `Cliente ${numero}`,
        telefone: numero,
        email: '',
    });

    await registrarHistorico(empresa_id, 'Mensagem recebida', texto);

    // 🤖 Resposta de saudação
    if (texto.includes('oi') || texto.includes('olá')) {
        await message.reply(
            `${config.saudacao} 👋 Bem-vindo à ${config.nome_empresa}!\n\nMe diga:\n👉 Local desejado\n👉 Tipo (Casa, Apto...)\n👉 Faixa de preço`
        );
        return;
    }

    // 🔍 Buscar imóvel
    if (
        texto.includes('casa') ||
        texto.includes('apartamento') ||
        texto.includes('apto') ||
        texto.includes('terreno')
    ) {
        const imoveis = await buscarImoveis(empresa_id, { tipo: texto });

        if (imoveis.length === 0) {
            await message.reply('❌ Nenhum imóvel encontrado com essas características.');
        } else {
            let resposta = '🏡 Imóveis encontrados:\n\n';
            imoveis.forEach((item, i) => {
                resposta += `🔹 ${i + 1}. ${item.titulo}\n📍 ${item.endereco}\n💰 ${item.preco}\n\n`;
            });
            await message.reply(resposta);
        }

        await registrarHistorico(empresa_id, 'Busca realizada', texto);
    }
});

client.initialize();
