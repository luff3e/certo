import { useEffect, useState } from "react";
import API_URL from "../api";
import axios from "axios";

function ConfiguracoesBot() {
  const [config, setConfig] = useState({
    nome_empresa: "",
    saudacao: "",
    mensagem_boas_vindas: "",
    horario_abertura: "",
    horario_fechamento: "",
    mensagem_fora_horario: "",
    status_bot: false,
  });

  useEffect(() => {
    carregarConfig();
  }, []);

  const carregarConfig = async () => {
    const { data } = await axios.get(`${API_URL}/empresas/1`);
    setConfig(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig({
      ...config,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const salvar = async () => {
    await axios.put(`${API_URL}/empresas/1`, config);
    alert("Configurações salvas com sucesso!");
  };

  const toggleBot = async () => {
    const novoStatus = !config.status_bot;
    setConfig({ ...config, status_bot: novoStatus });
    await axios.put(`${API_URL}/empresas/1`, { ...config, status_bot: novoStatus });
    alert(`Bot ${novoStatus ? "ativado" : "desligado"}!`);
  };

  return (
    <div className="p-8 mt-16">
      <h2 className="text-2xl font-bold mb-6">Configurações do Bot</h2>

      <div className="bg-white p-6 rounded shadow max-w-2xl">
        <label className="block mb-2">Nome da empresa:</label>
        <input
          type="text"
          name="nome_empresa"
          value={config.nome_empresa}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block mb-2">Saudação inicial:</label>
        <input
          type="text"
          name="saudacao"
          value={config.saudacao}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block mb-2">Mensagem de boas-vindas:</label>
        <textarea
          name="mensagem_boas_vindas"
          value={config.mensagem_boas_vindas}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Horário de abertura:</label>
            <input
              type="time"
              name="horario_abertura"
              value={config.horario_abertura}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
            />
          </div>
          <div>
            <label className="block mb-2">Horário de fechamento:</label>
            <input
              type="time"
              name="horario_fechamento"
              value={config.horario_fechamento}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
            />
          </div>
        </div>

        <label className="block mb-2">Mensagem fora do horário:</label>
        <textarea
          name="mensagem_fora_horario"
          value={config.mensagem_fora_horario}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="status_bot"
            checked={config.status_bot}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Bot está ativo</label>
        </div>

        <div className="flex gap-4">
          <button
            onClick={salvar}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Salvar
          </button>
          <button
            onClick={toggleBot}
            className={`${
              config.status_bot ? "bg-red-600" : "bg-green-600"
            } hover:opacity-90 text-white px-4 py-2 rounded`}
          >
            {config.status_bot ? "Desligar Bot" : "Ativar Bot"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfiguracoesBot;
