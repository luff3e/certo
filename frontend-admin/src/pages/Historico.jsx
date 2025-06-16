import { useEffect, useState } from "react";
import API_URL from "../api";
import axios from "axios";

function Historico() {
  const [historico, setHistorico] = useState([]);
  const [form, setForm] = useState({
    acao: "",
    descricao: "",
  });

  useEffect(() => {
    buscarHistorico();
  }, []);

  const buscarHistorico = async () => {
    try {
      const res = await axios.get(`${API_URL}/historico`);
      setHistorico(res.data);
    } catch (err) {
      console.error("Erro ao buscar histórico", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/historico`, form);
      setHistorico([res.data, ...historico]);
      setForm({ acao: "", descricao: "" });
    } catch (err) {
      console.error("Erro ao cadastrar histórico", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/historico/${id}`);
      setHistorico(historico.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Erro ao excluir", err);
    }
  };

  return (
    <div className="p-8 mt-16">
      <h2 className="text-2xl font-bold mb-6">Histórico de Pesquisas</h2>

      {/* Form */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Adicionar ao Histórico</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="acao"
            placeholder="Ação"
            value={form.acao}
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
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded md:col-span-2"
          >
            Adicionar
          </button>
        </form>
      </div>

      {/* Tabela */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Histórico</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Ação</th>
              <th className="px-4 py-2 text-left">Descrição</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">{item.acao}</td>
                <td className="px-4 py-2">{item.descricao}</td>
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
            {historico.length === 0 && (
              <tr>
                <td colSpan="3" className="px-4 py-4 text-center">
                  Nenhum histórico cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Historico;
