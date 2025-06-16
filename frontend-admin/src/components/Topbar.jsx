export default function Topbar() {
  return (
    <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6 fixed ml-64 z-10">
      <div className="text-xl font-semibold">Painel Imobiliária</div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Bem-vindo 👋</span>
      </div>
    </header>
  );
}
