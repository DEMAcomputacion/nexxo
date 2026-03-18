import { useEffect, useState } from 'react';
import adminApi from '../../services/adminApi';

const TABS = [
  { key: 'users', label: 'Usuarios' },
  { key: 'collaborators', label: 'Colaboradores' },
];

export default function AdminUsers() {
  const [tab, setTab] = useState('users');

  // Users state
  const [users, setUsers] = useState([]);
  const [usersTotal, setUsersTotal] = useState(0);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersSearch, setUsersSearch] = useState('');

  // Collaborators state
  const [collabs, setCollabs] = useState([]);
  const [collabsLoading, setCollabsLoading] = useState(true);
  const [collabsSearch, setCollabsSearch] = useState('');

  // Shared state
  const [copied, setCopied] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const copyPassword = (item) => {
    const text = item.passwordPlain || 'No disponible';
    navigator.clipboard.writeText(text);
    setCopied(item.id);
    setTimeout(() => setCopied(null), 2000);
  };

  // ─── Users ──────────────────────────────────────────────
  const loadUsers = (q = usersSearch) => {
    setUsersLoading(true);
    adminApi.get('/admin/users', { params: { limit: 100, search: q } })
      .then(({ data }) => { setUsers(data.items); setUsersTotal(data.total); })
      .finally(() => setUsersLoading(false));
  };

  const toggleUserActive = async (user) => {
    await adminApi.put(`/admin/users/${user.id}`, { isActive: !user.isActive });
    setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, isActive: !u.isActive } : u));
  };

  const deleteUser = async (user) => {
    try {
      await adminApi.delete(`/admin/users/${user.id}`);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setUsersTotal((t) => t - 1);
    } catch {
      alert('Error al eliminar usuario');
    }
    setConfirmDelete(null);
  };

  // ─── Collaborators ─────────────────────────────────────
  const loadCollabs = () => {
    setCollabsLoading(true);
    adminApi.get('/admin/collab')
      .then(({ data }) => setCollabs(data))
      .finally(() => setCollabsLoading(false));
  };

  const toggleCollabActive = async (collab) => {
    await adminApi.put(`/admin/collab/${collab.id}`, { isActive: !collab.isActive });
    setCollabs((prev) => prev.map((c) => c.id === collab.id ? { ...c, isActive: !c.isActive } : c));
  };

  useEffect(() => {
    loadUsers();
    loadCollabs();
  }, []);

  const roleLabel = (role) => {
    const map = { influencer: 'Influencer', business: 'Negocio', admin: 'Admin' };
    return map[role] || role;
  };

  const roleColor = (role) => {
    const map = {
      influencer: 'bg-purple-500/20 text-purple-400',
      business: 'bg-blue-500/20 text-blue-400',
      admin: 'bg-orange-500/20 text-orange-400',
    };
    return map[role] || 'bg-white/10 text-white/60';
  };

  const filteredCollabs = collabsSearch
    ? collabs.filter((c) =>
        c.name.toLowerCase().includes(collabsSearch.toLowerCase()) ||
        (c.email || '').toLowerCase().includes(collabsSearch.toLowerCase())
      )
    : collabs;

  return (
    <div className="p-8">
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white/[0.04] rounded-lg p-1 w-fit">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              tab === key
                ? 'bg-orange-500/20 text-orange-400'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ─── Users Tab ─── */}
      {tab === 'users' && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-white text-2xl font-bold">
              Usuarios <span className="text-white/40 text-base font-normal">({usersTotal})</span>
            </h1>
            <form onSubmit={(e) => { e.preventDefault(); loadUsers(usersSearch); }} className="flex gap-2">
              <input
                value={usersSearch}
                onChange={(e) => setUsersSearch(e.target.value)}
                placeholder="Buscar por nombre o email..."
                className="bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30 w-64"
              />
              <button type="submit" className="px-4 py-2 rounded-lg text-sm text-white bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition">
                Buscar
              </button>
            </form>
          </div>

          {usersLoading ? (
            <p className="text-white/40">Cargando...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/40 text-left border-b border-white/10">
                    <th className="pb-3 pr-4 font-medium">Nombre</th>
                    <th className="pb-3 pr-4 font-medium">Rol</th>
                    <th className="pb-3 pr-4 font-medium">Email</th>
                    <th className="pb-3 pr-4 font-medium">Hash</th>
                    <th className="pb-3 pr-4 font-medium">Estado</th>
                    <th className="pb-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-white/[0.05] hover:bg-white/[0.03] transition">
                      <td className="py-3 pr-4 text-white">{u.name}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${roleColor(u.role)}`}>
                          {roleLabel(u.role)}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-white/60">{u.email}</td>
                      <td className="py-3 pr-4">
                        <button
                          onClick={() => copyPassword(u)}
                          className="text-white/40 font-mono text-xs max-w-[200px] truncate block hover:text-white/70 transition cursor-pointer"
                          title="Click para copiar contraseña"
                        >
                          {copied === u.id ? (
                            <span className="text-green-400">Copiado!</span>
                          ) : (
                            u.passwordHash
                          )}
                        </button>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${u.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {u.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleUserActive(u)}
                            className={`text-xs px-2.5 py-1 rounded-lg border transition ${u.isActive ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' : 'border-green-500/30 text-green-400 hover:bg-green-500/10'}`}
                          >
                            {u.isActive ? 'Desactivar' : 'Activar'}
                          </button>
                          <button
                            onClick={() => setConfirmDelete({ ...u, type: 'user' })}
                            className="text-xs px-2.5 py-1 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && (
                <p className="text-white/40 text-center py-12">No se encontraron usuarios</p>
              )}
            </div>
          )}
        </>
      )}

      {/* ─── Collaborators Tab ─── */}
      {tab === 'collaborators' && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-white text-2xl font-bold">
              Colaboradores <span className="text-white/40 text-base font-normal">({collabs.length})</span>
            </h1>
            <div className="flex gap-2">
              <input
                value={collabsSearch}
                onChange={(e) => setCollabsSearch(e.target.value)}
                placeholder="Filtrar por nombre o email..."
                className="bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30 w-64"
              />
            </div>
          </div>

          {collabsLoading ? (
            <p className="text-white/40">Cargando...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/40 text-left border-b border-white/10">
                    <th className="pb-3 pr-4 font-medium">Nombre</th>
                    <th className="pb-3 pr-4 font-medium">Rol</th>
                    <th className="pb-3 pr-4 font-medium">Email</th>
                    <th className="pb-3 pr-4 font-medium">Hash</th>
                    <th className="pb-3 pr-4 font-medium">Estado</th>
                    <th className="pb-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCollabs.map((c) => (
                    <tr key={c.id} className="border-b border-white/[0.05] hover:bg-white/[0.03] transition">
                      <td className="py-3 pr-4 text-white">{c.name}</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-500/20 text-teal-400">
                          {c.role?.name || '—'}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-white/60">{c.email || '—'}</td>
                      <td className="py-3 pr-4">
                        {c.passwordHash ? (
                          <button
                            onClick={() => copyPassword(c)}
                            className="text-white/40 font-mono text-xs max-w-[200px] truncate block hover:text-white/70 transition cursor-pointer"
                            title="Click para copiar contraseña"
                          >
                            {copied === c.id ? (
                              <span className="text-green-400">Copiado!</span>
                            ) : (
                              c.passwordHash
                            )}
                          </button>
                        ) : (
                          <span className="text-white/20 text-xs">Sin password</span>
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {c.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleCollabActive(c)}
                            className={`text-xs px-2.5 py-1 rounded-lg border transition ${c.isActive ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' : 'border-green-500/30 text-green-400 hover:bg-green-500/10'}`}
                          >
                            {c.isActive ? 'Desactivar' : 'Activar'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredCollabs.length === 0 && (
                <p className="text-white/40 text-center py-12">No se encontraron colaboradores</p>
              )}
            </div>
          )}
        </>
      )}

      {/* Confirm delete modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-white font-semibold text-lg mb-3">Eliminar usuario</h2>
            <p className="text-white/60 text-sm mb-1">
              Esta acción es irreversible. Se eliminará el usuario:
            </p>
            <p className="text-white font-medium mb-5">
              {confirmDelete.name} ({confirmDelete.email})
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2 rounded-lg text-white/60 border border-white/10 hover:bg-white/[0.05] text-sm transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => deleteUser(confirmDelete)}
                className="flex-1 py-2 rounded-lg text-white bg-red-600 hover:bg-red-500 text-sm transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
