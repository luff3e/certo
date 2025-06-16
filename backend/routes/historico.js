
const express = require('express');
const router = express.Router();
const { Historico } = require('../models/historico');

router.get('/', async (req, res) => {
  const dados = await Historico.findAll();
  res.json(dados);
});

router.post('/', async (req, res) => {
  const item = await Historico.create(req.body);
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  await Historico.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Deletado' });
});

module.exports = router;
