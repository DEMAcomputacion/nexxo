import { useEffect, useState } from 'react';
import adminApi from '../../services/adminApi';

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
      <p className="text-white/50 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value ?? '—'}</p>
      {sub && <p className="text-white/40 text-xs mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi.get('/admin/stats')
      .then(({ data }) => setStats(data))
      .catch(() => setError('Error al cargar estadísticas'));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-white text-2xl font-bold mb-8">Dashboard</h1>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Usuarios totales" value={stats.totalUsers} />
          <StatCard label="Influencers" value={stats.totalInfluencers} />
          <StatCard label="Negocios" value={stats.totalBusinesses} />
          <StatCard
            label="Campañas activas"
            value={stats.campaigns?.active ?? 0}
            sub={`${stats.campaigns?.draft ?? 0} en borrador · ${stats.campaigns?.completed ?? 0} completadas`}
          />
        </div>
      ) : (
        !error && <p className="text-white/40">Cargando...</p>
      )}
    </div>
  );
}
