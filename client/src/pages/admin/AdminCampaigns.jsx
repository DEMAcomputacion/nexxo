import { useEffect, useState } from 'react';
import adminApi from '../../services/adminApi';

const STATUS_LABELS = { draft: 'Borrador', active: 'Activa', paused: 'Pausada', completed: 'Completada', cancelled: 'Cancelada' };
const STATUS_COLORS = {
  draft: 'bg-white/10 text-white/50',
  active: 'bg-green-500/20 text-green-400',
  paused: 'bg-yellow-500/20 text-yellow-400',
  completed: 'bg-blue-500/20 text-blue-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

const EMPTY_FORM = { name: '', description: '', budget: '', status: 'draft', startDate: '', endDate: '', businessId: '', influencerId: '' };

function CampaignModal({ campaign, businesses, influencers, onClose, onSaved }) {
  const [form, setForm] = useState(campaign
    ? {
        name: campaign.name,
        description: campaign.description || '',
        budget: campaign.budget ?? '',
        status: campaign.status,
        startDate: campaign.startDate ? campaign.startDate.slice(0, 10) : '',
        endDate: campaign.endDate ? campaign.endDate.slice(0, 10) : '',
        businessId: campaign.businessId,
        influencerId: campaign.influencerId || '',
      }
    : EMPTY_FORM
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      if (campaign) {
        await adminApi.put(`/admin/campaigns/${campaign.id}`, form);
      } else {
        await adminApi.post('/admin/campaigns', form);
      }
      onSaved();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-white font-semibold text-lg mb-5">{campaign ? 'Editar campaña' : 'Nueva campaña'}</h2>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-white/50 text-xs mb-1">Nombre *</label>
            <input value={form.name} onChange={set('name')} className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30" />
          </div>

          <div>
            <label className="block text-white/50 text-xs mb-1">Descripción</label>
            <textarea value={form.description} onChange={set('description')} rows={3} className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30 resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/50 text-xs mb-1">Presupuesto ($)</label>
              <input type="number" value={form.budget} onChange={set('budget')} className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-white/50 text-xs mb-1">Estado</label>
              <select value={form.status} onChange={set('status')} className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30">
                {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/50 text-xs mb-1">Fecha inicio</label>
              <input type="date" value={form.startDate} onChange={set('startDate')} className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-white/50 text-xs mb-1">Fecha fin</label>
              <input type="date" value={form.endDate} onChange={set('endDate')} className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30" />
            </div>
          </div>

          <div>
            <label className="block text-white/50 text-xs mb-1">Negocio *</label>
            <select value={form.businessId} onChange={set('businessId')} className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30">
              <option value="">Seleccionar negocio...</option>
              {businesses.map((b) => <option key={b.id} value={b.id}>{b.businessProfile?.companyName || b.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-white/50 text-xs mb-1">Influencer (opcional)</label>
            <select value={form.influencerId} onChange={set('influencerId')} className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30">
              <option value="">Sin asignar</option>
              {influencers.map((inf) => <option key={inf.influencerProfile?.id} value={inf.influencerProfile?.id}>{inf.name}</option>)}
            </select>
          </div>
        </div>

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

export default function AdminCampaigns() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [modal, setModal] = useState(null);

  const load = () => {
    setLoading(true);
    Promise.all([
      adminApi.get('/admin/campaigns'),
      adminApi.get('/admin/businesses?limit=100'),
      adminApi.get('/admin/influencers?limit=100'),
    ]).then(([c, b, inf]) => {
      setItems(c.data.items);
      setTotal(c.data.total);
      setBusinesses(b.data.items);
      setInfluencers(inf.data.items);
    }).finally(() => setLoading(false));
  };

  useEffect(load, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-bold">Campañas <span className="text-white/40 text-base font-normal">({total})</span></h1>
        <button
          onClick={() => setModal('new')}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 transition"
        >
          + Nueva campaña
        </button>
      </div>

      {loading ? (
        <p className="text-white/40">Cargando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-left border-b border-white/10">
                <th className="pb-3 pr-4 font-medium">Nombre</th>
                <th className="pb-3 pr-4 font-medium">Negocio</th>
                <th className="pb-3 pr-4 font-medium">Influencer</th>
                <th className="pb-3 pr-4 font-medium">Presupuesto</th>
                <th className="pb-3 pr-4 font-medium">Estado</th>
                <th className="pb-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.id} className="border-b border-white/[0.05] hover:bg-white/[0.03] transition">
                  <td className="py-3 pr-4 text-white">{c.name}</td>
                  <td className="py-3 pr-4 text-white/60">{c.business?.companyName || '—'}</td>
                  <td className="py-3 pr-4 text-white/60">{c.influencer?.user?.name || '—'}</td>
                  <td className="py-3 pr-4 text-white/60">{c.budget ? `$${c.budget.toLocaleString()}` : '—'}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[c.status]}`}>
                      {STATUS_LABELS[c.status]}
                    </span>
                  </td>
                  <td className="py-3">
                    <button onClick={() => setModal(c)} className="text-xs px-2.5 py-1 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.05] transition">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {items.length === 0 && (
            <p className="text-white/40 text-center py-12">No hay campañas creadas</p>
          )}
        </div>
      )}

      {modal && (
        <CampaignModal
          campaign={modal === 'new' ? null : modal}
          businesses={businesses}
          influencers={influencers}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); load(); }}
        />
      )}
    </div>
  );
}
