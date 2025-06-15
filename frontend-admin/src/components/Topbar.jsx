function Topbar({ imobiliaria }) {
  return (
    <div className="ml-64 h-16 bg-white shadow flex items-center px-6">
      <h1 className="text-xl font-semibold">
        Bem-vindo, {imobiliaria?.nome || '...'}
      </h1>
    </div>
  );
}

export default Topbar;
