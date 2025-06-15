import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import supabase from '../supabase';

function Imobiliarias() {
  const [imobiliaria, setImobiliaria] = useState(null);
  const [imobiliarias, setImobiliarias] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    senha: '',
  });

  const getImobiliarias = async () => {
    const { data, error } = await supabase.from('imobiliarias').select('*');
    if (!error) setImobiliarias(data);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('imobiliarias').insert([{
      nome: form.nome,
      email: form.email,
      numero_whatsapp: form.whatsapp,
      senha: form.senha
    }]);
    if (!error) {
      setForm({ nome: '', email: '', whatsapp: '', senha: '' });
      getImobiliarias();
    }
  };

  const handleDelete = async (id) => {
    await supabase.from('imobiliarias').delete().eq('id', id);
    getImobiliarias();
  };

  useEffect(() => {
    const data = localStorage.getItem('imobiliaria');
    if (data) {
      setImobiliaria(JSON.parse(data));
      getImobiliarias();
    } else {
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />
      <Topbar imobiliaria={imobiliaria} />
      <div className="ml-64 mt-16 p-8">
        <h2 className="text-2xl font-bold mb-6">Imobiliárias</h2>

        {/* Formulário */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Cadastrar Imobiliária</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleInput}
              className="border p-3 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInput}
              className="border p-3 rounded"
              required
            />
            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp"
              value={form.whatsapp}
              onChange={handleInput}
              className="border p-3 rounded"
              required
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={form.senha}
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
          <h3 className="text-xl font-semibold mb-4">Imobiliárias Cadastradas</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Nome</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">WhatsApp</th>
                <th className="text-left p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {imobiliarias.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.nome}</td>
                  <td className="p-2">{item.email}</td>
                  <td className="p-2">{item.numero_whatsapp}</td>
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

export default Imobiliarias;
