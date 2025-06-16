const { Empresa } = require('./models/empresa');
const { sequelize } = require('./models/db');

async function criarEmpresa() {
    try {
        await sequelize.sync();

        const empresa = await Empresa.create({
            nome_empresa: 'Imobiliária Teste',
            saudacao: 'Olá!',
            mensagem_boas_vindas: 'Seja bem-vindo à Imobiliária Teste!',
            horario_abertura: '08:00',
            horario_fechamento: '18:00',
            mensagem_fora_horario: 'Estamos fora do horário, responderemos em breve!',
            status_bot: true,
        });

        console.log('🚀 Empresa cadastrada com sucesso:');
        console.log(empresa.toJSON());

        process.exit();
    } catch (error) {
        console.error('❌ Erro ao cadastrar empresa:', error);
        process.exit(1);
    }
}

criarEmpresa();
