# 💼 SaaS Gerador de Bots - BotCraft

Sistema completo para geração de bots personalizados para empresas. Crie, configure e entregue bots profissionais de atendimento via WhatsApp com painel de gestão.

## 🚀 Funcionalidades

- 🤖 Geração de bots WhatsApp personalizados
- 📅 Agendamento automático com horário, serviços e disponibilidade
- 🏪 Cadastro de empresas, serviços e clientes
- 🔥 Painel admin para gerenciar bots ativos
- 📊 Histórico, relatórios e controle dos bots
- 🧠 Pré-visualização do bot funcionando (simulador de WhatsApp)

---

## 🏗️ Estrutura do Projeto

/ (raiz)
├── bot-whatsapp/ --> Backend (bot em Node.js)
├── frontend-admin/ --> Painel admin (React + Supabase)
├── .gitignore --> Arquivos ignorados

yaml
Copiar
Editar

---

## ⚙️ Tecnologias Usadas

- **Backend:**
  - Node.js
  - WhatsApp Web.js
  - SQLite

- **Frontend Admin:**
  - React
  - Vite
  - Supabase (Banco e autenticação)

- **Outros:**
  - Electron (para gerar o executável .exe)
  - Git e GitHub (versionamento)

---

## 🔧 Como Rodar

### 🔥 Backend (bot-whatsapp)
```bash
cd bot-whatsapp
npm install
node index.js
🖥️ Frontend (Painel Admin)
bash
Copiar
Editar
cd frontend-admin
npm install
npm run dev
Acesse no navegador:

arduino
Copiar
Editar
http://localhost:5173
📦 Instalação no Cliente (Executável)
Gera um arquivo .exe para Windows com o bot pronto.

O cliente executa sem precisar entender de código.
(Funcionalidade em desenvolvimento nesta versão.)

🤝 Contribuição
Projeto em desenvolvimento. Sinta-se à vontade para sugerir melhorias, ideias ou reportar bugs.

📝 Licença
Este projeto é privado, criado por @luff3e - Todos os direitos reservados.

🔥 BOTCRAFT - Revolucione o atendimento via WhatsApp.
yaml
Copiar
Editar

---

### 💾 **Agora faz assim:**
1️⃣ Cria o arquivo `README.md` na raiz da pasta.  
2️⃣ Cola tudo isso que te mandei.  
3️⃣ Salva.  

### Depois sobe pro GitHub:
```bash
git add README.md
git commit -m "Adiciona README.md"
git push