import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Imoveis from './pages/Imoveis';
import Clientes from './pages/Clientes';
import Scraping from './pages/Scraping';
import Configuracoes from './pages/Configuracoes';
import Historico from './pages/Historico';

export default function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
          <div className="p-4 text-2xl font-bold">🏡 Painel Imobiliária</div>
          <nav className="flex-1 px-4">
            <ul className="space-y-4">
              <li>
                <Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
              </li>
              <li>
                <Link to="/imoveis" className="hover:text-yellow-400">Imóveis</Link>
              </li>
              <li>
                <Link to="/clientes" className="hover:text-yellow-400">Clientes</Link>
              </li>
              <li>
                <Link to="/scraping" className="hover:text-yellow-400">Scraping</Link>
              </li>
              <li>
                <Link to="/historico" className="hover:text-yellow-400">Histórico de Pesquisas</Link>
              </li>
              <li>
                <Link to="/configuracoes" className="hover:text-yellow-400">Configurações</Link>
              </li>
            </ul>
          </nav>
          <div className="p-4 text-sm text-gray-400">© 2025 Lulu Company</div>
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 p-8 bg-gray-50 h-screen overflow-y-auto">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/imoveis" element={<Imoveis />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/scraping" element={<Scraping />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/historico" element={<Historico />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
