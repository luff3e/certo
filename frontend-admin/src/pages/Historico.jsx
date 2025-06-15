import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://SEU-PROJETO.supabase.co',
  'SUA-CHAVE-ANON'
);

export default function Historico() {
  const [pesquisas, setPesquisas] = useState([]);

  useEffect(() => {
    buscarHistorico();
  }, []);

  const buscarHistorico = async () => {
    const { data, error } = await supabase
      .from('historico_pesquisas')
      .select('*')
      .order('data', { ascending: false });

    if (error) {
      console.error('Erro ao buscar histórico:', error);
    } else {
      setPesquisas(data);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📊 Histórico de Pesquisas</h1>
      <div className="overflow-x-auto">
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Cliente</th>
              <th className="p-2 border">Número</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Cidade</th>
              <th className="p-2 border">Bairro</th>
              <th className="p-2 border">Preço</th>
              <th className="p-2 border">Data</th>
            </tr>
          </thead>
          <tbody>
            {pesquisas.length > 0 ? (
              pesquisas.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.nome}</td>
                  <td className="p-2 border">{item.numero_whatsapp}</td>
                  <td className="p-2 border">{item.tipo_imovel}</td>
                  <td className="p-2 border">{item.cidade}</td>
                  <td className="p-2 border">{item.bairro}</td>
                  <td className="p-2 border">{item.faixa_preco}</td>
                  <td className="p-2 border">
                    {new Date(item.data).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  Nenhuma pesquisa encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
