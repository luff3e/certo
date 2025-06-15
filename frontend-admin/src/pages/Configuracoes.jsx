import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function Configuracoes() {
  const [imobiliaria, setImobiliaria] = useState(null);
  const [form, setForm] = useState({
    apiUrl: '',
    apiKey: '',
    tema: 'claro',
  });

  useEffect(() => {
    const data = localStorage.getItem('imobiliaria');
    const config = localStorage.getItem('config-geral');

    if (data) {
      setImobiliaria(JSON.parse(data));
    } else {
      window.location.href = '/';
    }

    if (config) {
      setForm(JSON.parse(config));
    }
  }, []);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('config-geral', JSON.stringify(form));
    alert('✅ Configurações salvas!');
  };

  const handleReset = () => {
    localStorage.removeItem('config-geral');
    setForm({
      apiUrl: '',
      apiKey: '',
      tema: 'claro',
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />
      <Topbar imobiliaria={imobiliaria} />
      <div className="ml-64 mt-16 p-8">
        <h2 className="text-2xl font-bold mb-6">Configurações Gerais</h2>

        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Configurações da API</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="apiUrl"
              placeholder="URL do Supabase"
              value={form.apiUrl}
              onChange={handleInput}
              className="border p-3 rounded"
            />
            <input
              type="text"
              name="apiKey"
              placeholder="Chave da API"
              value={form.apiKey}
              onChange={handleInput}
              className="border p-3 rounded"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Tema</h3>
          <select
            name="tema"
            value={form.tema}
            onChange={handleInput}
            className="border p-3 rounded"
          >
            <option value="claro">Claro</option>
            <option value="escuro">Escuro</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Salvar
          </button>
          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Resetar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Configuracoes;
