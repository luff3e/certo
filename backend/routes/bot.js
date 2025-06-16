const express = require('express');
const router = express.Router();
const { startBot, getQrCode } = require('../controllers/botController');

router.post('/start/:empresa_id', startBot);
router.get('/qrcode', getQrCode);

module.exports = router;
