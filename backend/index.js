const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/db');

const imoveisRouter = require('./routes/imoveis');
const clientesRouter = require('./routes/clientes');
const historicoRouter = require('./routes/historico');
const authRouter = require('./routes/auth');
const empresasRouter = require('./routes/empresas');
const botRouter = require('./routes/bot');

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 Rotas da API
app.use('/api/imoveis', imoveisRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/historico', historicoRouter);
app.use('/api/auth', authRouter);
app.use('/api/empresas', empresasRouter);
app.use('/api/bot', botRouter);

// 🗄️ Conexão com banco e inicialização
sequelize.sync().then(() => {
    console.log('🗄️ Banco sincronizado');
    app.listen(3000, () => console.log('🚀 Servidor rodando na porta 3000'));
});
