const express = require('express');
const router = express.Router();
const { Empresa } = require('../models/empresa');

// 🟢 GET - Buscar config da empresa
router.get('/:id', async (req, res) => {
    const empresa = await Empresa.findByPk(req.params.id);
    if (!empresa) {
        return res.status(404).json({ error: 'Empresa não encontrada' });
    }
    res.json(empresa);
});

// 🟡 PUT - Atualizar config da empresa
router.put('/:id', async (req, res) => {
    const empresa = await Empresa.findByPk(req.params.id);
    if (!empresa) {
        return res.status(404).json({ error: 'Empresa não encontrada' });
    }
    await empresa.update(req.body);
    res.json(empresa);
});

module.exports = router;
