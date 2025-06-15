import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import supabase from '../supabase';

function Clientes() {
  const [imobiliaria, setImobiliaria] = useState(null);
  const [clientes, setClientes] = useState([]);

  const getClientes = async () => {
    const { data, error } = await supabase
      .from('clientes_interessados')
      .select('*')
      .eq('imobiliaria_id', imobiliaria.id);
    if (!error) setClientes(data);
  };

  const handleDelete = async (id) => {
    await supabase.from('clientes_interessados').delete().eq('id', id);
    getClientes();
  };

  useEffect(() => {
    const data = localStorage.getItem('imobiliaria');
    if (data) {
      const info = JSON.parse(data);
      setImobiliaria(info);
    } else {
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    if (imobiliaria) {
      getClientes();
    }
  }, [imobiliaria]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />
      <Topbar imobiliaria={imobiliaria} />
      <div className="ml-64 mt-16 p-8">
        <h2 className="text-2xl font-bold mb-6">Clientes Interessados</h2>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Lista de Clientes</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Nome</th>
                <th className="text-left p-2">WhatsApp</th>
                <th className="text-left p-2">Data</th>
                <th className="text-left p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.nome}</td>
                  <td className="p-2">{item.numero_whatsapp}</td>
                  <td className="p-2">
                    {new Date(item.data_cadastro).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {clientes.length === 0 && (
                <tr>
                  <td className="p-2" colSpan="4">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Clientes;
