import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Check } from 'lucide-react';

// ─── Constantes (igual que Onboarding) ───────────────────────────────────────

const niches = [
  'Moda y Estilo', 'Belleza y Cuidado Personal', 'Fitness y Salud',
  'Viajes y Lifestyle', 'Food y Cocina', 'Tecnología', 'Gaming',
  'Finanzas y Negocios', 'Educación', 'Sexualidad y Erotismo',
  'Entretenimiento', 'Mascotas', 'Hogar y Decoración', 'Otro',
];

const contentFormats = ['Video', 'Imagen', 'Carrusel', 'Reels/Shorts', 'Live', 'Stories'];

const ageRanges = ['13-17 años', '18-24 años', '25-34 años', '35-44 años', '45-54 años', '55+ años'];

const genderOptions = ['Femenino', 'Masculino', 'Mixto'];

const frequencyOptions = ['Diario', 'Cada 2-3 días', 'Cada 4-5 días', 'Una vez a la semana', 'Variable'];

const paymentModels = ['Pago Fijo', 'CPM (Costo por mil impresiones)', 'Performance (Resultados)', 'Mixto'];

const collaborationTypes = ['Posts Patrocinados', 'Embajador de Marca', 'Unboxing', 'Eventos', 'Canjes'];

const socialPlatforms = ['Instagram', 'TikTok', 'YouTube', 'X (Twitter)', 'LinkedIn', 'Facebook', 'Otro'];

// ─── Estilos compartidos ──────────────────────────────────────────────────────

const inputCls = 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-landing-orange transition';
const selectCls = `${inputCls} [&>option]:bg-neutral-900 [&>option]:text-white`;
const labelCls = 'block text-sm font-medium mb-2 text-white/80';

// ─── Sección con título ───────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 sm:p-7">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">{title}</h2>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

// ─── Toggle chip ──────────────────────────────────────────────────────────────

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm border transition ${
        selected
          ? 'bg-landing-orange/20 border-landing-orange/50 text-landing-orange'
          : 'bg-white/[0.03] border-white/10 text-white/50 hover:text-white hover:border-white/20'
      }`}
    >
      {label}
    </button>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function ProfileInfluencer() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    bio: '',
    socials: {},
    niche: '',
    contentFormats: [],
    audienceAge: '',
    audienceGender: '',
    postFrequency: '',
    priceRangeMin: '',
    priceRangeMax: '',
    paymentModel: '',
    collaborationTypes: [],
    mediaKitUrl: '',
    contentRestrictions: '',
  });

  // Cargar perfil al montar
  useEffect(() => {
    api.get('/influencers/me/profile')
      .then(({ data }) => {
        if (!data) return;
        setForm({
          name: data.user?.name || '',
          phone: data.user?.phone || '',
          city: data.user?.city || '',
          bio: data.bio || '',
          socials: data.socials || {},
          niche: data.niche?.[0] || '',
          contentFormats: data.contentFormats || [],
          audienceAge: data.audienceAge || '',
          audienceGender: data.audienceGender || '',
          postFrequency: data.postFrequency || '',
          priceRangeMin: data.priceRangeMin || '',
          priceRangeMax: data.priceRangeMax || '',
          paymentModel: data.paymentModel || '',
          collaborationTypes: data.collaborationTypes || [],
          mediaKitUrl: data.mediaKitUrl || '',
          contentRestrictions: data.contentRestrictions || '',
        });
      })
      .catch(() => setError('No se pudo cargar el perfil'))
      .finally(() => setLoading(false));
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleArray = (key, value) => {
    setForm((f) => {
      const arr = f[key] || [];
      return { ...f, [key]: arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value] };
    });
  };

  const setSocial = (platform, field, value) => {
    setForm((f) => ({
      ...f,
      socials: {
        ...f.socials,
        [platform]: { ...(f.socials[platform] || {}), [field]: value },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    const followersCount = Object.values(form.socials).reduce(
      (sum, s) => sum + (parseInt(s.followers) || 0),
      0
    );

    try {
      const { data } = await api.put('/influencers/profile', {
        name: form.name,
        phone: form.phone,
        city: form.city,
        bio: form.bio,
        socials: form.socials,
        niche: form.niche ? [form.niche] : [],
        contentFormats: form.contentFormats,
        audienceAge: form.audienceAge,
        audienceGender: form.audienceGender,
        postFrequency: form.postFrequency,
        priceRangeMin: form.priceRangeMin,
        priceRangeMax: form.priceRangeMax,
        paymentModel: form.paymentModel,
        collaborationTypes: form.collaborationTypes,
        mediaKitUrl: form.mediaKitUrl,
        contentRestrictions: form.contentRestrictions,
        followersCount,
      });

      // Actualizar nombre en AuthContext si cambió
      if (data.user?.name) updateUser({ name: data.user.name });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-landing-dark flex items-center justify-center">
        <p className="text-white/40">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-landing-dark">
      {/* Background accent */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_-10%,rgba(255,107,53,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_10%_80%,rgba(102,126,234,0.04),transparent)]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 pt-6 pb-20 sm:pt-8 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-xl sm:text-2xl font-bold text-white">Mi perfil</h1>
          <p className="text-white/40 text-sm mt-1">Actualizá tu información y configuración de colaboraciones</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ── Información personal ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Section title="Información personal">
              <div>
                <label className={labelCls}>Nombre completo</label>
                <input value={form.name} onChange={set('name')} className={inputCls} placeholder="Tu nombre" />
              </div>

              <div>
                <label className={labelCls}>Email</label>
                <input value={user?.email || ''} disabled className={inputCls + ' opacity-40 cursor-not-allowed'} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Teléfono</label>
                  <input value={form.phone} onChange={set('phone')} className={inputCls} placeholder="+54 9 11 2345 6789" />
                </div>
                <div>
                  <label className={labelCls}>Ciudad</label>
                  <input value={form.city} onChange={set('city')} className={inputCls} placeholder="Buenos Aires, Argentina" />
                </div>
              </div>

              <div>
                <label className={labelCls}>Biografía</label>
                <textarea
                  value={form.bio}
                  onChange={set('bio')}
                  rows={4}
                  className={inputCls + ' resize-none'}
                  placeholder="Contá brevemente quién sos, qué contenido hacés y qué te diferencia..."
                />
              </div>
            </Section>
          </motion.div>

          {/* ── Redes sociales ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Section title="Redes sociales">
              <p className="text-white/40 text-xs -mt-2">Completá las redes que usarás para publicitar. Podés dejar vacías las que no uses.</p>
              <div className="space-y-3">
                {socialPlatforms.map((platform) => (
                  <div key={platform} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <p className="text-white/70 text-sm font-medium mb-3">{platform}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-white/40 mb-1">Usuario / Handle</label>
                        <input
                          value={form.socials[platform]?.handle || ''}
                          onChange={(e) => setSocial(platform, 'handle', e.target.value)}
                          className={inputCls + ' py-2 text-sm'}
                          placeholder="@tu_usuario"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 mb-1">Seguidores</label>
                        <input
                          type="number"
                          min="0"
                          value={form.socials[platform]?.followers || ''}
                          onChange={(e) => setSocial(platform, 'followers', parseInt(e.target.value) || 0)}
                          className={inputCls + ' py-2 text-sm'}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </motion.div>

          {/* ── Métricas y audiencia ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Section title="Métricas y audiencia">
              <div>
                <label className={labelCls}>Nicho principal</label>
                <select value={form.niche} onChange={set('niche')} className={selectCls}>
                  <option value="">Seleccioná un nicho...</option>
                  {niches.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div>
                <label className={labelCls}>Formatos de contenido</label>
                <div className="flex flex-wrap gap-2">
                  {contentFormats.map((f) => (
                    <Chip
                      key={f}
                      label={f}
                      selected={form.contentFormats.includes(f)}
                      onClick={() => toggleArray('contentFormats', f)}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Edad de audiencia</label>
                  <select value={form.audienceAge} onChange={set('audienceAge')} className={selectCls}>
                    <option value="">Seleccioná...</option>
                    {ageRanges.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Género predominante</label>
                  <select value={form.audienceGender} onChange={set('audienceGender')} className={selectCls}>
                    <option value="">Seleccioná...</option>
                    {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Frecuencia de posteo</label>
                  <select value={form.postFrequency} onChange={set('postFrequency')} className={selectCls}>
                    <option value="">Seleccioná...</option>
                    {frequencyOptions.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
            </Section>
          </motion.div>

          {/* ── Tarifas y colaboraciones ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Section title="Tarifas y colaboraciones">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Tarifa mínima por publicación ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.priceRangeMin}
                    onChange={set('priceRangeMin')}
                    className={inputCls}
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className={labelCls}>Tarifa máxima por publicación ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.priceRangeMax}
                    onChange={set('priceRangeMax')}
                    className={inputCls}
                    placeholder="500"
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Modelo de pago preferido</label>
                <select value={form.paymentModel} onChange={set('paymentModel')} className={selectCls}>
                  <option value="">Seleccioná...</option>
                  {paymentModels.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className={labelCls}>Tipos de colaboraciones aceptadas</label>
                <div className="flex flex-wrap gap-2">
                  {collaborationTypes.map((c) => (
                    <Chip
                      key={c}
                      label={c}
                      selected={form.collaborationTypes.includes(c)}
                      onClick={() => toggleArray('collaborationTypes', c)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className={labelCls}>URL del Media Kit / Portafolio</label>
                <input
                  type="url"
                  value={form.mediaKitUrl}
                  onChange={set('mediaKitUrl')}
                  className={inputCls}
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div>
                <label className={labelCls}>Restricciones de contenido</label>
                <textarea
                  value={form.contentRestrictions}
                  onChange={set('contentRestrictions')}
                  rows={3}
                  className={inputCls + ' resize-none'}
                  placeholder="Ej: No acepto contenido para menores de edad, no hago publicidad de..."
                />
              </div>
            </Section>
          </motion.div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Botón guardar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <button
              type="submit"
              disabled={saving}
              className="w-full min-h-[52px] flex items-center justify-center gap-2 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.25)] active:opacity-90 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5" />
                  Cambios guardados
                </>
              ) : saving ? (
                'Guardando...'
              ) : (
                'Guardar cambios'
              )}
            </button>
          </motion.div>

        </form>
      </div>
    </div>
  );
}
