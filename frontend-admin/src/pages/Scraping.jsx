import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import supabase from '../supabase';

function Scraping() {
  const [imobiliaria, setImobiliaria] = useState(null);
  const [configs, setConfigs] = useState([]);
  const [form, setForm] = useState({
    cidade: '',
    bairro: '',
    tipo: '',
    faixa_preco: '',
    frequencia: 'manual',
  });

  const getConfigs = async () => {
    const { data, error } = await supabase
      .from('config_scraping')
      .select('*')
      .eq('imobiliaria_id', imobiliaria.id);
    if (!error) setConfigs(data);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('config_scraping').insert([
      {
        cidade: form.cidade,
        bairro: form.bairro,
        tipo_imovel: form.tipo,
        faixa_preco: form.faixa_preco,
        frequencia: form.frequencia,
        imobiliaria_id: imobiliaria.id,
        ativo: true,
      },
    ]);
    if (!error) {
      setForm({
        cidade: '',
        bairro: '',
        tipo: '',
        faixa_preco: '',
        frequencia: 'manual',
      });
      getConfigs();
    }
  };

  const handleDelete = async (id) => {
    await supabase.from('config_scraping').delete().eq('id', id);
    getConfigs();
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
      getConfigs();
    }
  }, [imobiliaria]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />
      <Topbar imobiliaria={imobiliaria} />
      <div className="ml-64 mt-16 p-8">
        <h2 className="text-2xl font-bold mb-6">Configuração de Scraping</h2>

        {/* Formulário */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Nova Configuração</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="cidade"
              placeholder="Cidade"
              value={form.cidade}
              onChange={handleInput}
              className="border p-3 rounded"
              required
            />
            <input
              type="text"
              name="bairro"
              placeholder="Bairro"
              value={form.bairro}
              onChange={handleInput}
              className="border p-3 rounded"
            />
            <input
              type="text"
              name="tipo"
              placeholder="Tipo de imóvel"
              value={form.tipo}
              onChange={handleInput}
              className="border p-3 rounded"
              required
            />
            <input
              type="text"
              name="faixa_preco"
              placeholder="Faixa de preço (ex: até 300mil)"
              value={form.faixa_preco}
              onChange={handleInput}
              className="border p-3 rounded"
              required
            />
            <select
              name="frequencia"
              value={form.frequencia}
              onChange={handleInput}
              className="border p-3 rounded"
              required
            >
              <option value="manual">Manual</option>
              <option value="diario">Diário</option>
              <option value="semanal">Semanal</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-2"
            >
              Salvar Configuração
            </button>
          </form>
        </div>

        {/* Tabela */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Configurações Ativas</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Cidade</th>
                <th className="text-left p-2">Bairro</th>
                <th className="text-left p-2">Tipo</th>
                <th className="text-left p-2">Preço</th>
                <th className="text-left p-2">Frequência</th>
                <th className="text-left p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {configs.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.cidade}</td>
                  <td className="p-2">{item.bairro}</td>
                  <td className="p-2">{item.tipo_imovel}</td>
                  <td className="p-2">{item.faixa_preco}</td>
                  <td className="p-2">{item.frequencia}</td>
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
              {configs.length === 0 && (
                <tr>
                  <td className="p-2" colSpan="6">
                    Nenhuma configuração cadastrada.
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

export default Scraping;
