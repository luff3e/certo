
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = 'secreto';

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123456') {
    const token = jwt.sign({ username }, SECRET);
    return res.json({ token });
  }
  res.status(401).json({ error: 'Login inválido' });
});

module.exports = router;
