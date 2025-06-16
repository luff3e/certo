import { useEffect, useState } from "react";
import API_URL from "../api";
import axios from "axios";

function Imoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    preco: "",
    endereco: "",
    tipo: "",
  });

  // Carregar imóveis
  useEffect(() => {
    buscarImoveis();
  }, []);

  const buscarImoveis = async () => {
    try {
      const res = await axios.get(`${API_URL}/imoveis`);
      setImoveis(res.data);
    } catch (err) {
      console.error("Erro ao buscar imóveis", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/imoveis`, form);
      setImoveis([res.data, ...imoveis]);
      setForm({
        titulo: "",
        descricao: "",
        preco: "",
        endereco: "",
        tipo: "",
      });
    } catch (err) {
      console.error("Erro ao cadastrar", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/imoveis/${id}`);
      setImoveis(imoveis.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Erro ao excluir", err);
    }
  };

  return (
    <div className="p-8 mt-16">
      <h2 className="text-2xl font-bold mb-6">Imóveis</h2>

      {/* Formulário */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Cadastrar Imóvel</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            className="border rounded p-2"
          />
          <input
            type="text"
            name="preco"
            placeholder="Preço"
            value={form.preco}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="tipo"
            placeholder="Tipo"
            value={form.tipo}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={form.endereco}
            onChange={handleChange}
            className="border rounded p-2 md:col-span-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded md:col-span-2"
          >
            Cadastrar
          </button>
        </form>
      </div>

      {/* Tabela */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Imóveis Cadastrados</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Endereço</th>
              <th className="px-4 py-2 text-left">Preço</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {imoveis.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">{item.titulo}</td>
                <td className="px-4 py-2">{item.tipo}</td>
                <td className="px-4 py-2">{item.endereco}</td>
                <td className="px-4 py-2">{item.preco}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {imoveis.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center">
                  Nenhum imóvel cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Imoveis;
