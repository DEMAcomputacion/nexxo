function DashboardInfluencer() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard Influencer</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Solicitudes</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-neutral-500">Pendientes</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Matches</h3>
            <p className="text-3xl font-bold text-secondary">0</p>
            <p className="text-sm text-neutral-500">Aceptados</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Ingresos</h3>
            <p className="text-3xl font-bold text-success">$0</p>
            <p className="text-sm text-neutral-500">Este mes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardInfluencer;
