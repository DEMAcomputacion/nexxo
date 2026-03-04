import { useEffect, useState, useCallback } from 'react';
import adminApi from '../../services/adminApi';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n) => (n != null ? `$${Number(n).toLocaleString()}` : '—');
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('es-MX') : '—');

const ORDER_STATUS = {
  pending:   { label: 'Pendiente',  cls: 'bg-yellow-500/20 text-yellow-400' },
  partial:   { label: 'Parcial',    cls: 'bg-blue-500/20 text-blue-400' },
  paid:      { label: 'Pagado',     cls: 'bg-green-500/20 text-green-400' },
  cancelled: { label: 'Cancelado',  cls: 'bg-red-500/20 text-red-400' },
};

const METHODS = ['Efectivo', 'Transferencia', 'Tarjeta', 'Cheque', 'Otro'];
const SOCIAL_PLATFORMS = ['instagram', 'tiktok', 'facebook', 'twitter', 'linkedin'];

// ─── Shared UI ────────────────────────────────────────────────────────────────

const inputCls = 'w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30';

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold text-lg">{title}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-white/50 text-xs mb-1">{label}</label>
      {children}
    </div>
  );
}

function SaveCancel({ onClose, loading, label = 'Guardar' }) {
  return (
    <div className="flex gap-3 mt-6">
      <button type="button" onClick={onClose} className="flex-1 py-2 rounded-lg text-white/60 border border-white/10 hover:bg-white/[0.05] text-sm transition">
        Cancelar
      </button>
      <button type="submit" disabled={loading} className="flex-1 py-2 rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 disabled:opacity-50 text-sm transition">
        {loading ? 'Guardando...' : label}
      </button>
    </div>
  );
}

function StatusBadge({ isActive }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
      {isActive ? 'Activo' : 'Inactivo'}
    </span>
  );
}

// ─── TAB: Roles ───────────────────────────────────────────────────────────────

function RolesTab() {
  const [roles, setRoles] = useState([]);
  const [newName, setNewName] = useState('');
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const { data } = await adminApi.get('/admin/collab/roles');
    setRoles(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await adminApi.post('/admin/collab/roles', { name: newName.trim() });
      setNewName('');
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear rol');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await adminApi.put(`/admin/collab/roles/${editing.id}`, { name: editing.name });
      setEditing(null);
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar');
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      await adminApi.delete(`/admin/collab/roles/${id}`);
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'No se puede eliminar');
    }
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-white font-semibold mb-4">Gestión de roles</h2>

      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nombre del nuevo rol..."
          className={inputCls + ' flex-1'}
          required
        />
        <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 transition whitespace-nowrap">
          + Agregar
        </button>
      </form>

      <div className="space-y-2">
        {roles.map((r) => (
          <div key={r.id} className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3">
            {editing?.id === r.id ? (
              <form onSubmit={handleUpdate} className="flex gap-2 flex-1 mr-3">
                <input
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className={inputCls + ' flex-1'}
                  required
                  autoFocus
                />
                <button type="submit" className="px-3 py-1.5 rounded-lg text-xs text-white bg-gradient-to-r from-orange-500 to-orange-400">Guardar</button>
                <button type="button" onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg text-xs text-white/60 border border-white/10">Cancelar</button>
              </form>
            ) : (
              <>
                <div>
                  <p className="text-white text-sm font-medium">{r.name}</p>
                  <p className="text-white/40 text-xs">{r._count?.collaborators ?? 0} colaborador{r._count?.collaborators !== 1 ? 'es' : ''}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing({ id: r.id, name: r.name })} className="text-xs px-2.5 py-1 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.05] transition">
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    disabled={r._count?.collaborators > 0}
                    className="text-xs px-2.5 py-1 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {roles.length === 0 && (
          <p className="text-white/40 text-sm text-center py-8">No hay roles creados</p>
        )}
      </div>
    </div>
  );
}

// ─── TAB: Colaboradores ───────────────────────────────────────────────────────

function CollaboratorModal({ collaborator, roles, onClose, onSaved }) {
  const c = collaborator;
  const [form, setForm] = useState({
    name: c?.name || '',
    email: c?.email || '',
    phone: c?.phone || '',
    city: c?.city || '',
    roleId: c?.roleId || roles[0]?.id || '',
    notes: c?.notes || '',
    instagram: c?.socials?.instagram || '',
    tiktok: c?.socials?.tiktok || '',
    facebook: c?.socials?.facebook || '',
    twitter: c?.socials?.twitter || '',
    linkedin: c?.socials?.linkedin || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const socials = {};
    for (const p of SOCIAL_PLATFORMS) if (form[p]) socials[p] = form[p];
    const body = {
      name: form.name, email: form.email || null, phone: form.phone || null,
      city: form.city || null, roleId: form.roleId, notes: form.notes || null,
      socials: Object.keys(socials).length ? socials : null,
    };
    try {
      if (c) await adminApi.put(`/admin/collab/${c.id}`, body);
      else await adminApi.post('/admin/collab', body);
      onSaved();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={c ? 'Editar colaborador' : 'Nuevo colaborador'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="grid grid-cols-2 gap-4">
          <Field label="Nombre *">
            <input value={form.name} onChange={set('name')} className={inputCls} required />
          </Field>
          <Field label="Rol *">
            <select value={form.roleId} onChange={set('roleId')} className={inputCls} required>
              <option value="">Seleccionar...</option>
              {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Email">
            <input type="email" value={form.email} onChange={set('email')} className={inputCls} />
          </Field>
          <Field label="Teléfono">
            <input value={form.phone} onChange={set('phone')} className={inputCls} />
          </Field>
        </div>

        <Field label="Ciudad">
          <input value={form.city} onChange={set('city')} className={inputCls} />
        </Field>

        <div>
          <p className="text-white/50 text-xs mb-2">Redes sociales</p>
          <div className="grid grid-cols-2 gap-2">
            {SOCIAL_PLATFORMS.map((p) => (
              <div key={p} className="flex items-center gap-2">
                <span className="text-white/40 text-xs w-16 capitalize shrink-0">{p}</span>
                <input value={form[p]} onChange={set(p)} placeholder="@usuario" className="flex-1 bg-white/[0.06] border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none focus:border-white/30" />
              </div>
            ))}
          </div>
        </div>

        <Field label="Notas">
          <textarea value={form.notes} onChange={set('notes')} rows={2} className={inputCls + ' resize-none'} />
        </Field>

        <SaveCancel onClose={onClose} loading={loading} />
      </form>
    </Modal>
  );
}

function CollaboratorsTab() {
  const [items, setItems] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [c, r] = await Promise.all([
      adminApi.get('/admin/collab'),
      adminApi.get('/admin/collab/roles'),
    ]);
    setItems(c.data);
    setRoles(r.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleActive = async (item) => {
    await adminApi.put(`/admin/collab/${item.id}`, { isActive: !item.isActive });
    setItems((prev) => prev.map((x) => x.id === item.id ? { ...x, isActive: !x.isActive } : x));
  };

  if (loading) return <p className="text-white/40">Cargando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">
          Colaboradores <span className="text-white/40 font-normal text-sm">({items.length})</span>
        </h2>
        <button onClick={() => setModal('new')} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 transition">
          + Nuevo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/40 text-left border-b border-white/10">
              <th className="pb-3 pr-4 font-medium">Nombre</th>
              <th className="pb-3 pr-4 font-medium">Rol</th>
              <th className="pb-3 pr-4 font-medium">Contacto</th>
              <th className="pb-3 pr-4 font-medium">Ciudad</th>
              <th className="pb-3 pr-4 font-medium">Redes</th>
              <th className="pb-3 pr-4 font-medium">Estado</th>
              <th className="pb-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-white/[0.05] hover:bg-white/[0.03] transition">
                <td className="py-3 pr-4 text-white font-medium">{item.name}</td>
                <td className="py-3 pr-4 text-white/60">{item.role?.name || '—'}</td>
                <td className="py-3 pr-4">
                  <p className="text-white/60">{item.email || '—'}</p>
                  <p className="text-white/40 text-xs">{item.phone || ''}</p>
                </td>
                <td className="py-3 pr-4 text-white/60">{item.city || '—'}</td>
                <td className="py-3 pr-4">
                  <div className="flex gap-1 flex-wrap">
                    {item.socials && Object.entries(item.socials).map(([k, v]) => (
                      <span key={k} className="text-xs text-white/50 bg-white/[0.05] px-2 py-0.5 rounded-full capitalize">
                        {k.slice(0, 2)} {v}
                      </span>
                    ))}
                    {!item.socials && <span className="text-white/30 text-xs">—</span>}
                  </div>
                </td>
                <td className="py-3 pr-4"><StatusBadge isActive={item.isActive} /></td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setModal(item)} className="text-xs px-2.5 py-1 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.05] transition">
                      Editar
                    </button>
                    <button onClick={() => toggleActive(item)} className={`text-xs px-2.5 py-1 rounded-lg border transition ${item.isActive ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' : 'border-green-500/30 text-green-400 hover:bg-green-500/10'}`}>
                      {item.isActive ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <p className="text-white/40 text-center py-12">No hay colaboradores registrados</p>
        )}
      </div>

      {modal && (
        <CollaboratorModal
          collaborator={modal === 'new' ? null : modal}
          roles={roles}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); load(); }}
        />
      )}
    </div>
  );
}

// ─── TAB: Órdenes de pago ─────────────────────────────────────────────────────

function NewOrderModal({ collaborators, onClose, onSaved }) {
  const [form, setForm] = useState({ collaboratorId: collaborators[0]?.id || '', description: '', amount: '', dueDate: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminApi.post('/admin/collab/orders', form);
      onSaved();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear orden');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Nueva orden de pago" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Field label="Colaborador *">
          <select value={form.collaboratorId} onChange={set('collaboratorId')} className={inputCls} required>
            <option value="">Seleccionar...</option>
            {collaborators.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.role?.name}</option>)}
          </select>
        </Field>
        <Field label="Concepto / Descripción *">
          <input value={form.description} onChange={set('description')} className={inputCls} required />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Monto *">
            <input type="number" min="1" value={form.amount} onChange={set('amount')} className={inputCls} required />
          </Field>
          <Field label="Fecha límite">
            <input type="date" value={form.dueDate} onChange={set('dueDate')} className={inputCls} />
          </Field>
        </div>
        <SaveCancel onClose={onClose} loading={loading} label="Crear orden" />
      </form>
    </Modal>
  );
}

function RegisterPaymentModal({ order, onClose, onSaved }) {
  const totalPaid = order.payments.reduce((s, p) => s + p.amount, 0);
  const remaining = order.amount - totalPaid;
  const [form, setForm] = useState({
    amount: remaining > 0 ? String(remaining) : '',
    method: 'Transferencia',
    reference: '',
    notes: '',
    paidAt: new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminApi.post('/admin/collab/payments', { paymentOrderId: order.id, ...form });
      onSaved();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Registrar pago" onClose={onClose}>
      <div className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 mb-5">
        <p className="text-white text-sm font-medium">{order.collaborator.name}</p>
        <p className="text-white/50 text-xs mt-0.5">{order.description}</p>
        <div className="flex gap-5 mt-2 text-xs">
          <span className="text-white/40">Total: <span className="text-white">{fmt(order.amount)}</span></span>
          <span className="text-white/40">Pagado: <span className="text-green-400">{fmt(totalPaid)}</span></span>
          <span className="text-white/40">Pendiente: <span className="text-yellow-400">{fmt(remaining)}</span></span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Monto *">
            <input type="number" min="1" value={form.amount} onChange={set('amount')} className={inputCls} required />
          </Field>
          <Field label="Fecha">
            <input type="date" value={form.paidAt} onChange={set('paidAt')} className={inputCls} />
          </Field>
        </div>
        <Field label="Método de pago">
          <select value={form.method} onChange={set('method')} className={inputCls}>
            {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </Field>
        <Field label="Referencia / N° de transferencia">
          <input value={form.reference} onChange={set('reference')} className={inputCls} />
        </Field>
        <Field label="Notas">
          <textarea value={form.notes} onChange={set('notes')} rows={2} className={inputCls + ' resize-none'} />
        </Field>
        <SaveCancel onClose={onClose} loading={loading} label="Registrar pago" />
      </form>
    </Modal>
  );
}

function OrderPaymentsModal({ order, onClose }) {
  const payments = order.payments;
  const totalPaid = payments.reduce((s, p) => s + p.amount, 0);

  return (
    <Modal title={`Pagos registrados`} onClose={onClose}>
      <div className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 mb-4">
        <p className="text-white text-sm font-medium">{order.collaborator.name}</p>
        <p className="text-white/50 text-xs mt-0.5">{order.description}</p>
        <div className="flex gap-5 mt-2 text-xs">
          <span className="text-white/40">Total orden: <span className="text-white font-medium">{fmt(order.amount)}</span></span>
          <span className="text-white/40">Pagado: <span className="text-green-400 font-medium">{fmt(totalPaid)}</span></span>
        </div>
      </div>

      {payments.length === 0 ? (
        <p className="text-white/40 text-sm text-center py-6">Sin pagos registrados</p>
      ) : (
        <div className="space-y-2">
          {payments.map((p) => (
            <div key={p.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">{fmt(p.amount)}</p>
                <p className="text-white/40 text-xs">{p.method || '—'} · {p.reference || 'Sin ref.'}</p>
                {p.notes && <p className="text-white/30 text-xs mt-0.5">{p.notes}</p>}
              </div>
              <p className="text-white/40 text-xs">{fmtDate(p.paidAt)}</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

function PaymentOrdersTab() {
  const [orders, setOrders] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [modal, setModal] = useState(null); // null | 'new' | { type, order }

  const load = useCallback(async () => {
    setLoading(true);
    const [o, c] = await Promise.all([
      adminApi.get('/admin/collab/orders'),
      adminApi.get('/admin/collab'),
    ]);
    setOrders(o.data);
    setCollaborators(c.data.filter((x) => x.isActive));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const cancelOrder = async (id) => {
    await adminApi.put(`/admin/collab/orders/${id}`, { status: 'cancelled' });
    load();
  };

  const filtered = filter ? orders.filter((o) => o.collaborator.id === filter) : orders;

  if (loading) return <p className="text-white/40">Cargando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">
          Órdenes de pago <span className="text-white/40 font-normal text-sm">({filtered.length})</span>
        </h2>
        <div className="flex gap-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-white/[0.06] border border-white/10 rounded-lg px-3 py-1.5 text-white/60 text-sm focus:outline-none">
            <option value="">Todos los colaboradores</option>
            {collaborators.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button onClick={() => setModal('new')} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 transition">
            + Nueva orden
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/40 text-left border-b border-white/10">
              <th className="pb-3 pr-4 font-medium">Colaborador</th>
              <th className="pb-3 pr-4 font-medium">Concepto</th>
              <th className="pb-3 pr-4 font-medium">Monto</th>
              <th className="pb-3 pr-4 font-medium">Pagado</th>
              <th className="pb-3 pr-4 font-medium">Estado</th>
              <th className="pb-3 pr-4 font-medium">Vence</th>
              <th className="pb-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => {
              const paid = o.payments.reduce((s, p) => s + p.amount, 0);
              const st = ORDER_STATUS[o.status];
              return (
                <tr key={o.id} className="border-b border-white/[0.05] hover:bg-white/[0.03] transition">
                  <td className="py-3 pr-4 text-white">{o.collaborator.name}</td>
                  <td className="py-3 pr-4 text-white/60 max-w-[160px] truncate">{o.description}</td>
                  <td className="py-3 pr-4 text-white">{fmt(o.amount)}</td>
                  <td className="py-3 pr-4 text-green-400">{fmt(paid)}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${st.cls}`}>
                      {st.label}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-white/40">{fmtDate(o.dueDate)}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setModal({ type: 'list', order: o })} className="text-xs px-2.5 py-1 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.05] transition">
                        Ver
                      </button>
                      {o.status !== 'paid' && o.status !== 'cancelled' && (
                        <button onClick={() => setModal({ type: 'pay', order: o })} className="text-xs px-2.5 py-1 rounded-lg border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 transition">
                          Pagar
                        </button>
                      )}
                      {o.status !== 'cancelled' && o.status !== 'paid' && (
                        <button onClick={() => cancelOrder(o.id)} className="text-xs px-2.5 py-1 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition">
                          Cancelar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-white/40 text-center py-12">No hay órdenes de pago</p>
        )}
      </div>

      {modal === 'new' && (
        <NewOrderModal
          collaborators={collaborators}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); load(); }}
        />
      )}
      {modal?.type === 'pay' && (
        <RegisterPaymentModal
          order={modal.order}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); load(); }}
        />
      )}
      {modal?.type === 'list' && (
        <OrderPaymentsModal order={modal.order} onClose={() => setModal(null)} />
      )}
    </div>
  );
}

// ─── TAB: Historial ───────────────────────────────────────────────────────────

function TransactionsTab() {
  const [transactions, setTransactions] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const [t, c] = await Promise.all([
      adminApi.get('/admin/collab/transactions'),
      adminApi.get('/admin/collab'),
    ]);
    setTransactions(t.data);
    setCollaborators(c.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = filter
    ? transactions.filter((t) => t.paymentOrder.collaborator.id === filter)
    : transactions;

  const total = filtered.reduce((s, t) => s + t.amount, 0);

  if (loading) return <p className="text-white/40">Cargando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-white font-semibold">Historial de transacciones</h2>
          {filtered.length > 0 && (
            <p className="text-white/40 text-xs mt-0.5">
              {filtered.length} transacciones · Total pagado: <span className="text-white font-medium">{fmt(total)}</span>
            </p>
          )}
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-white/[0.06] border border-white/10 rounded-lg px-3 py-1.5 text-white/60 text-sm focus:outline-none">
          <option value="">Todos los colaboradores</option>
          {collaborators.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/40 text-left border-b border-white/10">
              <th className="pb-3 pr-4 font-medium">Fecha</th>
              <th className="pb-3 pr-4 font-medium">Colaborador</th>
              <th className="pb-3 pr-4 font-medium">Rol</th>
              <th className="pb-3 pr-4 font-medium">Concepto</th>
              <th className="pb-3 pr-4 font-medium">Método</th>
              <th className="pb-3 pr-4 font-medium">Referencia</th>
              <th className="pb-3 font-medium">Monto</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-white/[0.05] hover:bg-white/[0.03] transition">
                <td className="py-3 pr-4 text-white/60">{fmtDate(t.paidAt)}</td>
                <td className="py-3 pr-4 text-white">{t.paymentOrder.collaborator.name}</td>
                <td className="py-3 pr-4 text-white/50">{t.paymentOrder.collaborator.role?.name || '—'}</td>
                <td className="py-3 pr-4 text-white/60 max-w-[160px] truncate">{t.paymentOrder.description}</td>
                <td className="py-3 pr-4 text-white/60">{t.method || '—'}</td>
                <td className="py-3 pr-4 text-white/40 font-mono text-xs">{t.reference || '—'}</td>
                <td className="py-3 text-white font-medium">{fmt(t.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-white/40 text-center py-12">No hay transacciones registradas</p>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'collaborators', label: 'Colaboradores' },
  { id: 'roles', label: 'Roles' },
  { id: 'orders', label: 'Órdenes de pago' },
  { id: 'transactions', label: 'Historial' },
];

export default function AdminCollaborators() {
  const [tab, setTab] = useState('collaborators');

  return (
    <div className="p-8">
      <h1 className="text-white text-2xl font-bold mb-6">Colaboradores</h1>

      <div className="flex gap-1 mb-8 bg-white/[0.04] border border-white/10 rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === t.id ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'collaborators' && <CollaboratorsTab />}
      {tab === 'roles' && <RolesTab />}
      {tab === 'orders' && <PaymentOrdersTab />}
      {tab === 'transactions' && <TransactionsTab />}
    </div>
  );
}
