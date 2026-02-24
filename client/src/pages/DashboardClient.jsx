function DashboardClient() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard Cliente</h1>
        
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Buscar Influencers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" className="input" placeholder="Nombre o nicho..." />
            <select className="input">
              <option value="">Todas las ubicaciones</option>
              <option value="mx">México</option>
              <option value="co">Colombia</option>
              <option value="ar">Argentina</option>
            </select>
            <select className="input">
              <option value="">Cualquier nicho</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="beauty">Belleza</option>
              <option value="tech">Tecnología</option>
            </select>
            <button className="btn btn-primary">Buscar</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="font-semibold mb-2">Mi Solicitudes</h3>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Matches Activos</h3>
            <p className="text-3xl font-bold text-success">0</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Presupuesto</h3>
            <p className="text-3xl font-bold text-secondary">$0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardClient;
