import { useEffect, useState } from 'react';
import adminApi from '../../services/adminApi';

function EditModal({ user, onClose, onSaved }) {
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone || '', city: user.city || '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      await adminApi.put(`/admin/users/${user.id}`, form);
      onSaved();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-white font-semibold text-lg mb-5">Editar influencer</h2>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        {['name', 'email', 'phone', 'city'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-white/50 text-xs mb-1 capitalize">{field}</label>
            <input
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30"
            />
          </div>
        ))}

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg text-white/60 border border-white/10 hover:bg-white/[0.05] text-sm transition">Cancelar</button>
          <button onClick={handleSave} disabled={loading} className="flex-1 py-2 rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 disabled:opacity-50 text-sm transition">
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminInfluencers() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    adminApi.get('/admin/influencers')
      .then(({ data }) => { setItems(data.items); setTotal(data.total); })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleActive = async (user) => {
    await adminApi.put(`/admin/users/${user.id}`, { isActive: !user.isActive });
    setItems((prev) => prev.map((u) => u.id === user.id ? { ...u, isActive: !u.isActive } : u));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-bold">Influencers <span className="text-white/40 text-base font-normal">({total})</span></h1>
      </div>

      {loading ? (
        <p className="text-white/40">Cargando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-left border-b border-white/10">
                <th className="pb-3 pr-4 font-medium">Nombre</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium">Nicho</th>
                <th className="pb-3 pr-4 font-medium">Seguidores</th>
                <th className="pb-3 pr-4 font-medium">Ciudad</th>
                <th className="pb-3 pr-4 font-medium">Estado</th>
                <th className="pb-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id} className="border-b border-white/[0.05] hover:bg-white/[0.03] transition">
                  <td className="py-3 pr-4 text-white">{u.name}</td>
                  <td className="py-3 pr-4 text-white/60">{u.email}</td>
                  <td className="py-3 pr-4 text-white/60">{u.influencerProfile?.niche?.join(', ') || '—'}</td>
                  <td className="py-3 pr-4 text-white/60">{u.influencerProfile?.followersCount?.toLocaleString() || '—'}</td>
                  <td className="py-3 pr-4 text-white/60">{u.city || u.influencerProfile?.location || '—'}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${u.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {u.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditing(u)} className="text-xs px-2.5 py-1 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.05] transition">
                        Editar
                      </button>
                      <button onClick={() => toggleActive(u)} className={`text-xs px-2.5 py-1 rounded-lg border transition ${u.isActive ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' : 'border-green-500/30 text-green-400 hover:bg-green-500/10'}`}>
                        {u.isActive ? 'Desactivar' : 'Activar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {items.length === 0 && (
            <p className="text-white/40 text-center py-12">No hay influencers registrados</p>
          )}
        </div>
      )}

      {editing && (
        <EditModal
          user={editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
        />
      )}
    </div>
  );
}
