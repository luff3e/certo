const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios');

// 🔗 URL do backend (ajusta se for diferente)
const API_URL = 'http://localhost:3000/api';


let qrCodeAtual = null;
let client = null;
let empresa = null;

// 🔗 API do backend (ajusta se for diferente)
const API_URL = 'http://localhost:3000/api';

const getEmpresaConfig = async (empresa_id) => {
    const { data } = await axios.get(`${API_URL}/empresas/${empresa_id}`);
    return data;
};

const startBot = async (req, res) => {
    const { empresa_id } = req.params;

    if (client) {
        return res.json({ message: 'Bot já está rodando.' });
    }

    empresa = await getEmpresaConfig(empresa_id);

    client = new Client({
        authStrategy: new LocalAuth({ clientId: `empresa-${empresa_id}` }),
        puppeteer: { headless: true },
    });

    client.on('qr', (qr) => {
        qrCodeAtual = qr;
        console.log('⚠️ Novo QR gerado.');
    });

    client.on('ready', () => {
        console.log('✅ Bot conectado!');
        qrCodeAtual = null;
    });

    client.on('message', async (message) => {
        const texto = message.body.toLowerCase();
        const numero = message.from.split('@')[0];

        console.log(`💬 Mensagem de ${numero}: ${texto}`);

        // ⏰ Verifica horário de funcionamento
        const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour12: false }).substring(0, 5);
        if (
            empresa.status_bot &&
            (horaAtual < empresa.horario_abertura || horaAtual > empresa.horario_fechamento)
        ) {
            await message.reply(empresa.mensagem_fora_horario);
            return;
        }

        // 🔥 Resposta de saudação
        if (texto.includes('oi') || texto.includes('olá') || texto.includes('bom dia')) {
            await message.reply(`${empresa.saudacao} 👋 ${empresa.mensagem_boas_vindas}`);
        } 

        // 🔥 Pergunta sobre imóveis
        else if (texto.includes('casa') || texto.includes('apartamento') || texto.includes('apto')) {
            await message.reply(`🏠 Temos várias opções na ${empresa.nome_empresa}! Me envie a faixa de preço ou o bairro desejado.`);
        } 

        // 🔥 Agradecimento
        else if (texto.includes('obrigado') || texto.includes('valeu')) {
            await message.reply('😎 Disponha! Qualquer coisa é só chamar!');
        } 

        // 🔥 Mensagem padrão
        else {
            await message.reply('🤖 Não entendi... Envie "oi" para começarmos!');
        }
    });

    client.initialize();

    return res.json({ message: 'Bot iniciado.' });
};

const getQrCode = async (req, res) => {
    if (qrCodeAtual) {
        return res.json({ qr: qrCodeAtual });
    } else {
        return res.status(404).json({ error: 'QR não disponível ou bot já conectado.' });
    }
};

module.exports = { startBot, getQrCode };
