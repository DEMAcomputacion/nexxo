function ProfileInfluencer() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
        <div className="card">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre</label>
                <input type="text" className="input" defaultValue="Juan" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" className="input" defaultValue="juan@email.com" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ubicación</label>
                <input type="text" className="input" placeholder="Ciudad, País" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Teléfono</label>
                <input type="tel" className="input" placeholder="+1 234 567 890" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea className="input" rows={4} placeholder="Cuéntanos sobre ti..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Seguidores</label>
                <input type="number" className="input" placeholder="10000" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tasa de Engagement (%)</label>
                <input type="number" className="input" placeholder="3.5" step="0.1" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Precio Mínimo ($)</label>
                <input type="number" className="input" placeholder="100" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Precio Máximo ($)</label>
                <input type="number" className="input" placeholder="500" />
              </div>
            </div>
            <div className="mt-6">
              <button type="submit" className="btn btn-primary">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfluencer;
