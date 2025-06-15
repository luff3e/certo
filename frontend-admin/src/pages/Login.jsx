export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">🔐 Login</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-700"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 rounded bg-gray-700"
          />
          <button className="w-full bg-yellow-400 text-black font-semibold p-2 rounded hover:bg-yellow-300">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
