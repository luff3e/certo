const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Cliente = sequelize.define('Cliente', {
  nome: DataTypes.STRING,
  telefone: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = { Cliente };
