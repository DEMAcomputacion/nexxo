import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const inputClass = 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-base text-white placeholder-white/30 focus:outline-none focus:border-landing-orange transition-colors';
const labelClass = 'block text-sm font-medium mb-1.5 text-white/60';

const availabilityOptions = ['Por la mañana', 'Por la tarde', 'Full time'];

export default function DashboardCollaborator() {
  const { user, logout } = useAuth();
  const fileRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await api.get('/collaborators/me/profile');
      setProfile(data);
      setForm({
        name: data.name || '',
        phone: data.phone || '',
        availability: data.availability || '',
        hasOwnTransport: data.hasOwnTransport || false,
        equipment: data.equipment || '',
        portfolioUrl: data.portfolioUrl || '',
        previousWorkSamples: data.previousWorkSamples || '',
      });
      setAvatarPreview(data.avatar || null);
    } catch {
      setError('Error al cargar perfil');
    } finally {
      setLoading(false);
    }
  };

  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('La imagen no puede superar 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const payload = { ...form };
      // Only send avatar if it changed
      if (avatarPreview !== profile.avatar) {
        payload.avatar = avatarPreview;
      }

      const { data } = await api.put('/collaborators/me/profile', payload);
      setProfile(data);
      setAvatarPreview(data.avatar || null);
      setEditing(false);
      setSuccess('Perfil actualizado correctamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Error al guardar cambios');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: profile.name || '',
      phone: profile.phone || '',
      availability: profile.availability || '',
      hasOwnTransport: profile.hasOwnTransport || false,
      equipment: profile.equipment || '',
      portfolioUrl: profile.portfolioUrl || '',
      previousWorkSamples: profile.previousWorkSamples || '',
    });
    setAvatarPreview(profile.avatar || null);
    setEditing(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-landing-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-landing-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-landing-dark">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_-10%,rgba(102,126,234,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_90%_80%,rgba(255,107,53,0.05),transparent)]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 pt-6 pb-16 sm:pt-8 sm:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-white/35 text-sm mb-0.5">
              {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Hola, <span className="text-white/80">{user?.name ?? 'Colaborador'}</span>
            </h1>
          </div>
          <button
            onClick={logout}
            className="text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            Cerrar sesion
          </button>
        </div>

        {/* Construction banner */}
        <div className="bg-landing-orange/10 border border-landing-orange/20 rounded-xl p-4 mb-6">
          <p className="text-landing-orange text-sm">
            Esta pagina esta en construccion. Aqui podras administrar tus datos, subir material y llevar el control de tus trabajos y horas.
          </p>
        </div>

        {/* Feedback messages */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm"
          >
            {success}
          </motion.div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 sm:p-7"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Mi perfil</h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-sm text-landing-orange hover:text-landing-coral transition-colors"
              >
                Editar
              </button>
            )}
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white/10 border-2 border-white/10 flex items-center justify-center">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                )}
              </div>
              {editing && (
                <>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                    </svg>
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </>
              )}
            </div>
          </div>

          {/* Role badge */}
          {profile?.role?.name && (
            <div className="flex justify-center mb-6">
              <span className="px-3 py-1 bg-landing-orange/15 text-landing-orange text-xs font-medium rounded-full">
                {profile.role.name}
              </span>
            </div>
          )}

          {editing ? (
            /* ─── Edit mode ─── */
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Nombre completo</label>
                <input
                  type="text"
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  className={`${inputClass} opacity-50 cursor-not-allowed`}
                  value={profile.email || ''}
                  disabled
                />
                <p className="text-xs text-white/30 mt-1">El email no se puede modificar</p>
              </div>

              <div>
                <label className={labelClass}>Telefono</label>
                <input
                  type="tel"
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Disponibilidad horaria</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  {availabilityOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                      <input
                        type="radio"
                        name="availability"
                        className="w-4 h-4 accent-landing-orange"
                        checked={form.availability === opt}
                        onChange={() => update('availability', opt)}
                      />
                      <span className="text-sm text-white">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Equipamiento</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  value={form.equipment}
                  onChange={(e) => update('equipment', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Link de portfolio</label>
                <input
                  type="url"
                  className={inputClass}
                  placeholder="https://..."
                  value={form.portfolioUrl}
                  onChange={(e) => update('portfolioUrl', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Experiencia previa</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  value={form.previousWorkSamples}
                  onChange={(e) => update('previousWorkSamples', e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-landing-orange rounded"
                    checked={form.hasOwnTransport}
                    onChange={(e) => update('hasOwnTransport', e.target.checked)}
                  />
                  <span className="text-sm text-white">Cuento con movilidad propia</span>
                </label>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl font-medium text-sm text-white hover:bg-white/20 transition-all disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-sm text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] transition-all disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </div>
          ) : (
            /* ─── View mode ─── */
            <div className="space-y-4">
              <ProfileField label="Nombre" value={profile?.name} />
              <ProfileField label="Email" value={profile?.email} />
              <ProfileField label="Telefono" value={profile?.phone} />
              <ProfileField label="Disponibilidad" value={profile?.availability} />
              <ProfileField label="Equipamiento" value={profile?.equipment} />
              <ProfileField label="Portfolio" value={profile?.portfolioUrl} isLink />
              <ProfileField label="Experiencia previa" value={profile?.previousWorkSamples} />
              <ProfileField
                label="Movilidad propia"
                value={profile?.hasOwnTransport ? 'Si' : 'No'}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function ProfileField({ label, value, isLink }) {
  if (!value) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/40">{label}</span>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-landing-orange hover:underline break-all"
        >
          {value}
        </a>
      ) : (
        <span className="text-sm text-white/80 sm:text-right">{value}</span>
      )}
    </div>
  );
}
