const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://SEU-PROJETO.supabase.co';
const supabaseKey = 'SUA-CHAVE-ANON';
const supabase = createClient(supabaseUrl, supabaseKey);

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

const sessions = {};

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('⚠️ Escaneia o QR Code');
});

client.on('ready', () => {
    console.log('✅ Bot conectado!');
});

client.on('message', async (message) => {
    const numero = message.from;
    const texto = message.body.toLowerCase();

    const numeroFormatado = numero.split('@')[0];

    // 🔥 Cadastra cliente automaticamente se não existir
    const { data: existente } = await supabase
        .from('clientes_interessados')
        .select('*')
        .eq('numero_whatsapp', numeroFormatado)
        .maybeSingle();

    if (!existente) {
        await supabase.from('clientes_interessados').insert([
            {
                nome: `Cliente ${numeroFormatado}`,
                numero_whatsapp: numeroFormatado,
                imobiliaria_id: 1
            }
        ]);
        console.log(`✅ Cliente ${numeroFormatado} cadastrado.`);
    }

    // 🔥 Começa sessão de busca
    if (!sessions[numero]) {
        sessions[numero] = {};
        return await message.reply(
            '*🏠 Escolha o tipo de imóvel:*\n\n' +
            '1️⃣ Casa\n' +
            '2️⃣ Apartamento\n' +
            '3️⃣ Terreno\n\n' +
            '➡️ *Responda com o número da opção.*'
        );
    }

    const session = sessions[numero];

    // 👉 Escolher tipo
    if (!session.tipo) {
        if (texto === '1') session.tipo = 'casa';
        else if (texto === '2') session.tipo = 'apartamento';
        else if (texto === '3') session.tipo = 'terreno';
        else {
            return await message.reply('❌ Opção inválida. Envie:\n1️⃣ Casa\n2️⃣ Apartamento\n3️⃣ Terreno');
        }

        return await message.reply(
            '*🏙️ Escolha a cidade:*\n\n' +
            '1️⃣ Belo Horizonte\n' +
            '2️⃣ Nova Lima\n' +
            '3️⃣ Contagem\n\n' +
            '➡️ *Responda com o número da opção.*'
        );
    }

    // 👉 Escolher cidade
    if (!session.cidade) {
        if (texto === '1') session.cidade = 'Belo Horizonte';
        else if (texto === '2') session.cidade = 'Nova Lima';
        else if (texto === '3') session.cidade = 'Contagem';
        else {
            return await message.reply('❌ Opção inválida. Envie:\n1️⃣ BH\n2️⃣ Nova Lima\n3️⃣ Contagem');
        }

        let bairros = [];

        if (session.cidade === 'Belo Horizonte') bairros = ['Centro', 'Savassi', 'Lourdes'];
        if (session.cidade === 'Nova Lima') bairros = ['Alphaville', 'Vila da Serra', 'Centro'];
        if (session.cidade === 'Contagem') bairros = ['Eldorado', 'Centro', 'Industrial'];

        session.bairrosDisponiveis = bairros;

        return await message.reply(
            `*🏘️ Escolha o bairro:*\n\n` +
            bairros.map((b, i) => `${i + 1}️⃣ ${b}`).join('\n') +
            '\n\n➡️ *Responda com o número da opção.*'
        );
    }

    // 👉 Escolher bairro
    if (!session.bairro) {
        const index = parseInt(texto) - 1;
        if (index >= 0 && index < session.bairrosDisponiveis.length) {
            session.bairro = session.bairrosDisponiveis[index];
        } else {
            return await message.reply('❌ Opção inválida. Envie o número do bairro corretamente.');
        }

        return await message.reply(
            '*💰 Escolha a faixa de preço:*\n\n' +
            '1️⃣ Até 200 mil\n' +
            '2️⃣ Até 300 mil\n' +
            '3️⃣ Até 500 mil\n' +
            '4️⃣ Sem limite\n\n' +
            '➡️ *Responda com o número da opção.*'
        );
    }

    // 👉 Escolher preço
    if (!session.preco) {
        if (texto === '1') session.preco = 200000;
        else if (texto === '2') session.preco = 300000;
        else if (texto === '3') session.preco = 500000;
        else if (texto === '4') session.preco = null;
        else {
            return await message.reply('❌ Opção inválida. Envie:\n1️⃣ 200mil\n2️⃣ 300mil\n3️⃣ 500mil\n4️⃣ Sem limite');
        }

        await buscarImoveis(message, session, numeroFormatado);
        delete sessions[numero];
        return;
    }
});

// 🔍 Buscar imóveis no Supabase + salvar histórico
async function buscarImoveis(message, session, numeroFormatado) {
    let query = supabase.from('imoveis').select('*').eq('imobiliaria_id', 1);

    if (session.tipo) query = query.ilike('tipo', `%${session.tipo}%`);
    if (session.cidade) query = query.ilike('cidade', `%${session.cidade}%`);
    if (session.bairro) query = query.ilike('endereco', `%${session.bairro}%`);
    if (session.preco) query = query.lte('preco', session.preco);

    const { data: imoveis, error } = await query;

    // 🔥 Salvar histórico da pesquisa
    await supabase.from('historico_pesquisas').insert([
        {
            numero_whatsapp: numeroFormatado,
            nome: `Cliente ${numeroFormatado}`,
            tipo_imovel: session.tipo,
            cidade: session.cidade,
            bairro: session.bairro,
            faixa_preco: session.preco ? `Até ${session.preco}` : 'Sem limite',
            imobiliaria_id: 1
        }
    ]);

    if (error || !imoveis) {
        await message.reply('❌ Erro ao buscar imóveis.');
        return;
    }

    if (imoveis.length === 0) {
        await message.reply('⚠️ Nenhum imóvel encontrado.');
        return;
    }

    let resposta = '🏡 *Imóveis encontrados:*\n\n';

    imoveis.forEach((item, index) => {
        resposta += `*${index + 1}.* ${item.tipo.toUpperCase()} - ${item.titulo}\n📍 ${item.endereco}, ${item.cidade}\n💰 R$ ${item.preco}\n📝 ${item.descricao}\n\n`;
    });

    await message.reply(resposta);
}

client.initialize();
