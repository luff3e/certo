import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Imoveis from "./pages/Imoveis";
import Clientes from "./pages/Clientes";
import Scraping from "./pages/Scraping";
import Historico from "./pages/Historico";
import Configuracoes from "./pages/Configuracoes";
import ConfiguracoesBot from "./pages/ConfiguracoesBot";
import QrcodeBot from "./pages/QrcodeBot";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [logado, setLogado] = useState(true); // Se quiser testar sem login, deixa true

  const handleLogout = () => {
    setLogado(false);
  };

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
  }

  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar onLogout={handleLogout} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/imoveis" element={<Imoveis />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/scraping" element={<Scraping />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/configuracoes-bot" element={<ConfiguracoesBot />} />
            <Route path="/qrcode-bot" element={<QrcodeBot />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
