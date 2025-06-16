const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Empresa = sequelize.define('Empresa', {
    nome_empresa: DataTypes.STRING,
    saudacao: DataTypes.STRING,
    mensagem_boas_vindas: DataTypes.STRING,
    horario_abertura: DataTypes.STRING,
    horario_fechamento: DataTypes.STRING,
    mensagem_fora_horario: DataTypes.STRING,
    status_bot: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = { Empresa };
