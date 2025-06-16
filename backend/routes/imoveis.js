
const express = require('express');
const router = express.Router();
const { Imovel } = require('../models/imovel');

router.get('/', async (req, res) => {
  const dados = await Imovel.findAll();
  res.json(dados);
});

router.post('/', async (req, res) => {
  const item = await Imovel.create(req.body);
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  await Imovel.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Deletado' });
});

module.exports = router;
