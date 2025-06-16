README - Projeto SaaS Imobiliária com Bot WhatsApp
Sumário
Descrição do Projeto

Arquitetura e Estrutura

Funcionalidades Implementadas

Tecnologias Utilizadas

Como Rodar o Projeto

Detalhes do Backend

Detalhes do Frontend

Detalhes do Bot WhatsApp

Fluxo de Integração

Próximos Passos

Descrição do Projeto
Este projeto é um SaaS completo para imobiliárias que inclui:

Painel web para controle de imóveis, clientes e histórico.

Bot WhatsApp integrado para atendimento automatizado via WhatsApp.

Banco de dados local usando SQLite para armazenamento dos dados das empresas, clientes e imóveis.

Integração backend-frontend-bot com APIs REST.

Arquitetura e Estrutura
graphql
Copiar
/saas (pasta raiz)
│
├── backend/            # API REST com Node.js, Express, Sequelize e SQLite
├── frontend-admin/     # Painel web em React para administrar o SaaS
├── bot-whatsapp/       # Bot WhatsApp usando whatsapp-web.js integrado ao backend
└── README.md           # Este arquivo
Funcionalidades Implementadas
Backend:

CRUD completo para empresas, imóveis e clientes.

Endpoint para iniciar o bot WhatsApp por empresa.

Endpoint para fornecer QR Code do WhatsApp para autenticação.

Sincronização e armazenamento via Sequelize e SQLite.

Frontend:

Dashboard, páginas para imóveis, clientes, histórico e configurações.

Tela para iniciar o bot e escanear o QR Code.

Sidebar para navegação entre as páginas.

Bot WhatsApp:

Inicialização do bot via API.

Exibição do QR Code para autenticação no painel.

Escuta e respostas automáticas a mensagens.

Cadastro automático de clientes ao receber mensagem.

Uso das configurações personalizadas de cada empresa (saudação, horário, mensagem fora do horário).

Tecnologias Utilizadas
Backend: Node.js, Express, Sequelize, SQLite, whatsapp-web.js, Axios

Frontend: React, React Router, axios, react-qrcode-logo, Tailwind CSS (opcional para estilização)

Banco de dados: SQLite

Controle de versão: Git/GitHub

Como Rodar o Projeto
Backend
bash
Copiar
cd backend
npm install
npm start
Servidor vai rodar em http://localhost:3000

Frontend
bash
Copiar
cd frontend-admin
npm install
npm run dev
Frontend disponível em http://localhost:5173

Bot WhatsApp
O bot é inicializado pelo backend via API. Use o frontend para iniciar o bot e escanear o QR Code.

Detalhes do Backend
API REST com rotas para:

/api/empresas → Gerenciamento de empresas e configs.

/api/imoveis → Gerenciamento de imóveis.

/api/clientes → Gerenciamento de clientes.

/api/bot/start/:empresa_id → Inicia o bot WhatsApp da empresa.

/api/bot/qrcode → Retorna QR Code para autenticação do bot.

Usa Sequelize para modelar tabelas e fazer queries.

Guarda sessões do WhatsApp com whatsapp-web.js usando LocalAuth.

Detalhes do Frontend
Páginas React para cada funcionalidade: imóveis, clientes, histórico, configurações, bot.

Tela do bot com botão para iniciar e QR Code para escanear.

Navegação via Sidebar.

Conecta-se ao backend via axios para CRUD e para interagir com o bot.

Detalhes do Bot WhatsApp
Rodando via whatsapp-web.js com autenticação local.

Ao iniciar, gera QR Code disponibilizado pelo backend.

Escuta mensagens e responde com base nas configurações da empresa.

Cadastra clientes automaticamente no banco.

Controla mensagens fora do horário comercial.

Fluxo de Integração
Empresa cadastra suas informações no painel (frontend → backend).

Empresa inicia o bot pelo painel → backend inicializa bot WhatsApp para a empresa.

Bot gera QR Code → frontend busca via API e exibe para escanear.

Cliente envia mensagem para o número do WhatsApp.

Bot recebe mensagem, cadastra cliente se necessário, responde com mensagens configuradas.

Dados ficam salvos no banco e podem ser vistos no painel.

Próximos Passos
Implementar cadastro de clientes detalhado via bot.

Criar busca e filtro real de imóveis no bot e painel.

Criar histórico completo de atendimento e interações.

Gerar relatórios Excel e PDF para empresa.

Adicionar dashboard com status dos bots (online/offline).

Preparar gerador de executável do bot para deploy cliente.
