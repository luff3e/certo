const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Imovel = sequelize.define('Imovel', {
  titulo: DataTypes.STRING,
  descricao: DataTypes.STRING,
  preco: DataTypes.STRING,
  endereco: DataTypes.STRING,
  tipo: DataTypes.STRING,
});

module.exports = { Imovel };
