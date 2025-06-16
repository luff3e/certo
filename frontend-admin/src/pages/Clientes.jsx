import { useEffect, useState } from "react";
import API_URL from "../api";
import axios from "axios";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
  });

  useEffect(() => {
    buscarClientes();
  }, []);

  const buscarClientes = async () => {
    try {
      const res = await axios.get(`${API_URL}/clientes`);
      setClientes(res.data);
    } catch (err) {
      console.error("Erro ao buscar clientes", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/clientes`, form);
      setClientes([res.data, ...clientes]);
      setForm({ nome: "", telefone: "", email: "" });
    } catch (err) {
      console.error("Erro ao cadastrar cliente", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/clientes/${id}`);
      setClientes(clientes.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Erro ao excluir", err);
    }
  };

  return (
    <div className="p-8 mt-16">
      <h2 className="text-2xl font-bold mb-6">Clientes</h2>

      {/* Form */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Cadastrar Cliente</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded p-2 md:col-span-2"
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
        <h3 className="text-xl font-semibold mb-4">Clientes Cadastrados</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Telefone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">{item.nome}</td>
                <td className="px-4 py-2">{item.telefone}</td>
                <td className="px-4 py-2">{item.email}</td>
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
            {clientes.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center">
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;
