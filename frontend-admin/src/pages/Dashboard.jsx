import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function Dashboard() {
  const [imobiliaria, setImobiliaria] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('imobiliaria');
    if (data) {
      setImobiliaria(JSON.parse(data));
    } else {
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />
      <Topbar imobiliaria={imobiliaria} />
      <div className="ml-64 mt-16 p-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Total de Imóveis</h3>
            <p className="text-3xl font-bold">23</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Clientes Interessados</h3>
            <p className="text-3xl font-bold">8</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Buscas</h3>
            <p className="text-3xl font-bold">14</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
