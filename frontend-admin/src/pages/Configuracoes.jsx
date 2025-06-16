function Configuracoes() {
  return (
    <div className="p-8 mt-16">
      <h2 className="text-2xl font-bold mb-6">Configurações</h2>

      <div className="bg-white p-6 rounded shadow max-w-md">
        <h3 className="text-lg font-semibold mb-4">Configurações da API</h3>
        <input
          type="text"
          placeholder="URL do Supabase"
          className="w-full border p-2 rounded mb-4"
        />
        <input
          type="text"
          placeholder="Chave da API"
          className="w-full border p-2 rounded mb-4"
        />

        <h3 className="text-lg font-semibold mb-4 mt-6">Tema</h3>
        <select className="w-full border p-2 rounded mb-4">
          <option>Escuro</option>
          <option>Claro</option>
        </select>

        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Salvar
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            Resetar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Configuracoes;
