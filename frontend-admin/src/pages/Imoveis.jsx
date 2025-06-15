import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import supabase from '../supabase';

function Imoveis() {
  const [imobiliaria, setImobiliaria] = useState(null);
  const [imoveis, setImoveis] = useState([]);
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    preco: '',
    tipo: '',
    endereco: '',
  });

  const getImoveis = async () => {
    const { data, error } = await supabase
      .from('imoveis')
      .select('*')
      .eq('imobiliaria_id', imobiliaria.id);
    if (!error) setImoveis(data);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('imoveis').insert([
      {
        titulo: form.titulo,
        descricao: form.descricao,
        preco: parseFloat(form.preco),
        tipo: form.tipo,
        endereco: form.endereco,
        imobiliaria_id: imobiliaria.id,
      },
    ]);
    if (!error) {
      setForm({
        titulo: '',
        descricao: '',
        preco: '',
        tipo: '',
        endereco: '',
      });
      getImoveis();
    }
  };

  const handleDelete = async (id) => {
    await supabase.from('imoveis').delete().eq('id', id);
    getImoveis();
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
      getImoveis();
    }
  }, [imobiliaria]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />
      <Topbar imobiliaria={imobiliaria} />
      <div className="ml-64 mt-16 p-8">
        <h2 className="text-2xl font-bold mb-6">Imóveis</h2>

        {/* Formulário */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Cadastrar Imóvel</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="titulo"
              placeholder="Título"
              value={form.titulo}
              onChange={handleInput}
              className="border p-3 rounded"
              required
            />
            <input
              type="text"
              name="descricao"
              placeholder="Descrição"
              value={form.descricao}
              onChange={handleInput}
              className="border p-3 rounded"
              required
            />
            <input
              type="number"
              name="preco"
              placeholder="Preço"
              value={form.preco}
              onChange={handleInput}
              className="border p-3 rounded"
              required
            />
            <input
              type="text"
              name="tipo"
              placeholder="Tipo (Casa, Apto, Terreno...)"
              value={form.tipo}
              onChange={handleInput}
              className="border p-3 rounded"
              required
            />
            <input
              type="text"
              name="endereco"
              placeholder="Endereço"
              value={form.endereco}
              onChange={handleInput}
              className="border p-3 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-2"
            >
              Cadastrar
            </button>
          </form>
        </div>

        {/* Tabela */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Imóveis Cadastrados</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Título</th>
                <th className="text-left p-2">Tipo</th>
                <th className="text-left p-2">Endereço</th>
                <th className="text-left p-2">Preço</th>
                <th className="text-left p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {imoveis.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.titulo}</td>
                  <td className="p-2">{item.tipo}</td>
                  <td className="p-2">{item.endereco}</td>
                  <td className="p-2">R$ {item.preco}</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Imoveis;
