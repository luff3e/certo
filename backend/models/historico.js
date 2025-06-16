const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Historico = sequelize.define('Historico', {
  acao: DataTypes.STRING,
  descricao: DataTypes.STRING,
});

module.exports = { Historico };
