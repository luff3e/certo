import {
  HomeIcon,
  RowsIcon,
  LayersIcon,
  PersonIcon,
  MagnifyingGlassIcon,
  GearIcon,
  ExitIcon
} from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

const menu = [
  { name: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
  { name: 'Imobiliárias', icon: <RowsIcon />, path: '/imobiliarias' },
  { name: 'Imóveis', icon: <LayersIcon />, path: '/imoveis' },
  { name: 'Clientes', icon: <PersonIcon />, path: '/clientes' },
  { name: 'Scraping', icon: <MagnifyingGlassIcon />, path: '/scraping' },
  { name: 'Configurações', icon: <GearIcon />, path: '/configuracoes' },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('imobiliaria');
    navigate('/');
  };

  return (
    <div className="h-screen w-64 bg-white shadow-lg fixed flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold p-6 border-b">BotCraft</div>
        <ul className="mt-4">
          {menu.map((item) => (
            <li
              key={item.name}
              className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={handleLogout}
        className="flex items-center gap-3 p-4 cursor-pointer hover:bg-red-100 text-red-600 border-t"
      >
        <ExitIcon />
        Sair
      </div>
    </div>
  );
}

export default Sidebar;
