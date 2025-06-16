import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ onLogout }) {
  const location = useLocation();

  const menus = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Imóveis', path: '/imoveis' },
    { name: 'Clientes', path: '/clientes' },
    { name: 'Scraping', path: '/scraping' },
    { name: 'Histórico', path: '/historico' },
    { name: 'Configurações', path: '/configuracoes' },
    { name: 'Configurações do Bot', path: '/configuracoes-bot' },
    { name: 'Bot WhatsApp (QR)', path: '/qrcode-bot' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        🏡 Painel Imobiliária
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          {menus.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded ${
                  isActive(item.path)
                    ? 'bg-yellow-500 text-black'
                    : 'hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          🚪 Sair
        </button>
      </div>
    </aside>
  );
}
