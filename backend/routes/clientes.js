
const express = require('express');
const router = express.Router();
const { Cliente } = require('../models/cliente');

router.get('/', async (req, res) => {
  const dados = await Cliente.findAll();
  res.json(dados);
});

router.post('/', async (req, res) => {
  const item = await Cliente.create(req.body);
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  await Cliente.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Deletado' });
});

module.exports = router;
