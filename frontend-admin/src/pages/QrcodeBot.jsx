import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import axios from "axios";

function QrcodeBot() {
  const [qr, setQr] = useState("");

  const getQr = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/bot/qrcode");
      setQr(data.qr);
    } catch (err) {
      console.error(err);
      setQr("");
    }
  };

  const startBot = async () => {
    await axios.post("http://localhost:3000/api/bot/start/1");
    getQr();
  };

  useEffect(() => {
    getQr();
    const interval = setInterval(getQr, 5000);
    return () => clearInterval(interval);
  }, []);

return (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h2 className="text-3xl mb-6 font-bold text-gray-800">Bot WhatsApp</h2>

    <button
      onClick={startBot}
      className="bg-green-600 text-white px-6 py-3 rounded-lg mb-6 hover:bg-green-700 transition"
    >
      Iniciar Bot
    </button>

    {qr ? (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <QRCode value={qr} size={256} />
        <p className="mt-4 text-center text-gray-700">
          📲 Escaneie o QR Code para conectar seu WhatsApp
        </p>
      </div>
    ) : (
      <p className="text-red-600">
        ❌ Nenhum QR disponível ou bot já está conectado.
      </p>
    )}
  </div>
);
}

export default QrcodeBot;
