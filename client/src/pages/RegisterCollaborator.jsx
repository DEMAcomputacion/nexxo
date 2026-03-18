import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../services/api';

const collaborationTypes = [
  'Diseñador',
  'Creador de contenido',
  'Administrador de redes',
  'Fotografía',
];

const availabilityOptions = [
  'Por la mañana',
  'Por la tarde',
  'Full time',
];

const inputClass = 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-base text-white placeholder-white/30 focus:outline-none focus:border-landing-orange transition-colors';
const selectClass = `${inputClass} [&>option]:bg-neutral-900 [&>option]:text-white`;
const labelClass = 'block text-sm font-medium mb-2 text-white/80';

export default function RegisterCollaborator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collaborationType: '',
    availability: '',
    hasOwnTransport: false,
    // Photography
    equipment: '',
    // Designer
    designerSubtype: '',
    portfolioUrl: '',
    sampleFiles: [],
    // Content creator
    videoLinks: '',
    // Social media manager
    experienceYears: '',
    previousWorkSamples: '',
    // Account
    password: '',
    confirmPassword: '',
  });

  const update = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isPhotography = formData.collaborationType === 'Fotografía';
  const isDesigner = formData.collaborationType === 'Diseñador';
  const isContentCreator = formData.collaborationType === 'Creador de contenido';
  const isSocialAdmin = formData.collaborationType === 'Administrador de redes';

  const validateStep1 = () => {
    if (!formData.name.trim()) return 'El nombre es requerido';
    if (!formData.email.trim()) return 'El email es requerido';
    if (!formData.phone.trim()) return 'El teléfono es requerido';
    if (!formData.availability) return 'La disponibilidad horaria es requerida';
    if (!formData.collaborationType) return 'El tipo de colaboración es requerido';
    return null;
  };

  const handleNext = () => {
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!formData.password) {
      setError('La contraseña es requerida');
      return;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await api.post('/collaborators/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        collaborationType: formData.collaborationType,
        availability: formData.availability,
        password: formData.password,
        hasOwnTransport: formData.hasOwnTransport,
        equipment: isPhotography ? formData.equipment : null,
        portfolioUrl: isDesigner ? formData.portfolioUrl : null,
        experienceYears: isSocialAdmin ? formData.experienceYears : null,
        previousWorkSamples: (isDesigner || isSocialAdmin) ? formData.previousWorkSamples : null,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-landing-dark flex items-center justify-center px-4 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-landing-card border border-white/10 rounded-2xl p-8 sm:p-12 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">¡Registro exitoso!</h2>
          <p className="text-white/60 text-sm sm:text-base mb-6">
            Tu solicitud como colaborador ha sido recibida. Nos pondremos en contacto contigo pronto.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] transition-all"
          >
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-landing-dark flex items-center justify-center px-4 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-7 sm:mb-8">
          <img src="/logo_transparent.png" alt="NEXXO" className="h-12 sm:h-16 mx-auto mb-3 sm:mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Registro de Colaborador</h1>
          <p className="text-white/60 mt-2 text-sm sm:text-base">Unite al equipo de NEXXO</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center mb-6 gap-2">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                step >= s
                  ? 'bg-gradient-to-r from-landing-orange to-landing-pink text-white'
                  : 'bg-white/10 text-white/50'
              }`}>
                {step > s ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : s}
              </div>
              {s < 2 && (
                <div className={`w-12 h-0.5 ${step > 1 ? 'bg-gradient-to-r from-landing-orange to-landing-pink' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-landing-card border border-white/10 rounded-2xl p-5 sm:p-8">
          {error && (
            <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
                <div>
                  <label className={labelClass}>Nombre completo *</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={(e) => update('name', e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => update('email', e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Teléfono *</label>
                  <input
                    type="tel"
                    className={inputClass}
                    placeholder="+54 9 11 2345 6789"
                    value={formData.phone}
                    onChange={(e) => update('phone', e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Disponibilidad horaria *</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {availabilityOptions.map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                        <input
                          type="radio"
                          name="availability"
                          className="w-4 h-4 accent-landing-orange"
                          checked={formData.availability === opt}
                          onChange={() => update('availability', opt)}
                        />
                        <span className="text-sm text-white">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Tipo de colaboración *</label>
                  <select
                    required
                    className={selectClass}
                    value={formData.collaborationType}
                    onChange={(e) => {
                      const type = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        collaborationType: type,
                        equipment: '',
                        designerSubtype: '',
                        portfolioUrl: '',
                        sampleFiles: [],
                        videoLinks: '',
                        experienceYears: '',
                        previousWorkSamples: '',
                      }));
                    }}
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    {collaborationTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>

                  {isDesigner && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className={labelClass}>Equipamiento con el que contás *</label>
                        <textarea
                          className={`${inputClass} resize-none`}
                          rows={3}
                          placeholder="Ej: MacBook Pro, tablet Wacom, Adobe Creative Suite, Figma..."
                          value={formData.equipment}
                          onChange={(e) => update('equipment', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Link de portfolio</label>
                        <p className="text-xs text-white/50 mb-2">Ingresá un link a tu portafolio, Drive, Behance, etc.</p>
                        <input
                          type="url"
                          className={inputClass}
                          placeholder="https://behance.net/tu-portafolio"
                          value={formData.portfolioUrl}
                          onChange={(e) => update('portfolioUrl', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Muestras de trabajos previos (PDF)</label>
                        <p className="text-xs text-white/50 mb-2">Subí archivos PDF con muestras de tu trabajo.</p>
                        <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-landing-orange/50 hover:bg-white/5 transition-colors">
                          <svg className="w-8 h-8 text-white/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                          </svg>
                          <span className="text-sm text-white/50">Click para seleccionar archivos PDF</span>
                          <input
                            type="file"
                            accept=".pdf"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              update('sampleFiles', [...formData.sampleFiles, ...files]);
                              e.target.value = '';
                            }}
                          />
                        </label>
                        {formData.sampleFiles.length > 0 && (
                          <ul className="mt-3 space-y-2">
                            {formData.sampleFiles.map((file, i) => (
                              <li key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                                <span className="text-sm text-white/70 truncate mr-2">{file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => update('sampleFiles', formData.sampleFiles.filter((_, j) => j !== i))}
                                  className="text-white/40 hover:text-red-400 transition-colors shrink-0"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}

                  {isSocialAdmin && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className={labelClass}>Equipamiento con el que contás *</label>
                        <textarea
                          className={`${inputClass} resize-none`}
                          rows={3}
                          placeholder="Ej: Computadora, smartphone, herramientas de gestión (Hootsuite, Meta Business Suite)..."
                          value={formData.equipment}
                          onChange={(e) => update('equipment', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Experiencia previa</label>
                        <textarea
                          className={`${inputClass} resize-none`}
                          rows={4}
                          placeholder="Ej: Administré redes de @negocio_local durante 6 meses, creación de contenido y pauta publicitaria..."
                          value={formData.previousWorkSamples}
                          onChange={(e) => update('previousWorkSamples', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {isContentCreator && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className={labelClass}>Equipamiento con el que contás *</label>
                        <textarea
                          className={`${inputClass} resize-none`}
                          rows={3}
                          placeholder="Ej: Cámara, aro de luz, micrófono, smartphone, trípode..."
                          value={formData.equipment}
                          onChange={(e) => update('equipment', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Link de portfolio</label>
                        <p className="text-xs text-white/50 mb-2">Ingresá un link a tu portafolio, Drive, Behance, etc.</p>
                        <input
                          type="url"
                          className={inputClass}
                          placeholder="https://behance.net/tu-portafolio"
                          value={formData.portfolioUrl}
                          onChange={(e) => update('portfolioUrl', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Links a videos o experiencia previa</label>
                        <textarea
                          className={`${inputClass} resize-none`}
                          rows={4}
                          placeholder="Ej: https://youtube.com/tu-canal, https://tiktok.com/@tu-usuario, experiencia en campañas previas..."
                          value={formData.videoLinks}
                          onChange={(e) => update('videoLinks', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-landing-orange rounded"
                            checked={formData.hasOwnTransport}
                            onChange={(e) => update('hasOwnTransport', e.target.checked)}
                          />
                          <span className="text-sm text-white">Cuento con movilidad propia</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {isPhotography && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className={labelClass}>Equipamiento con el que contás *</label>
                        <textarea
                          className={`${inputClass} resize-none`}
                          rows={3}
                          placeholder="Ej: Cámara Canon EOS R5, lentes 24-70mm f/2.8, flash externo, trípode..."
                          value={formData.equipment}
                          onChange={(e) => update('equipment', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Experiencia previa</label>
                        <textarea
                          className={`${inputClass} resize-none`}
                          rows={4}
                          placeholder="Ej: 3 años como fotógrafo freelance, cobertura de eventos, sesiones de producto..."
                          value={formData.previousWorkSamples}
                          onChange={(e) => update('previousWorkSamples', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Link de portfolio</label>
                        <p className="text-xs text-white/50 mb-2">Ingresá un link a tu portafolio, Drive, Behance, etc.</p>
                        <input
                          type="url"
                          className={inputClass}
                          placeholder="https://behance.net/tu-portafolio"
                          value={formData.portfolioUrl}
                          onChange={(e) => update('portfolioUrl', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-landing-orange rounded"
                            checked={formData.hasOwnTransport}
                            onChange={(e) => update('hasOwnTransport', e.target.checked)}
                          />
                          <span className="text-sm text-white">Cuento con movilidad propia</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

              {/* Next button */}
              <div className="flex mt-8 justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="min-h-[48px] px-6 sm:px-8 py-3 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-sm sm:text-base text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] active:opacity-90 transition-all hover:-translate-y-1"
                >
                  Siguiente
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold text-white">Resumen de tu registro</h2>

              <div className="space-y-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex justify-between">
                  <span className="text-sm text-white/50">Nombre</span>
                  <span className="text-sm text-white">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/50">Email</span>
                  <span className="text-sm text-white">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/50">Teléfono</span>
                  <span className="text-sm text-white">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/50">Tipo de colaboración</span>
                  <span className="text-sm text-white">{formData.collaborationType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/50">Disponibilidad</span>
                  <span className="text-sm text-white">{formData.availability}</span>
                </div>
                {formData.equipment && (
                  <div className="flex justify-between">
                    <span className="text-sm text-white/50">Equipamiento</span>
                    <span className="text-sm text-white text-right max-w-[60%]">{formData.equipment}</span>
                  </div>
                )}
                {formData.portfolioUrl && (
                  <div className="flex justify-between">
                    <span className="text-sm text-white/50">Portfolio</span>
                    <span className="text-sm text-white truncate max-w-[60%]">{formData.portfolioUrl}</span>
                  </div>
                )}
                {formData.hasOwnTransport && (
                  <div className="flex justify-between">
                    <span className="text-sm text-white/50">Movilidad propia</span>
                    <span className="text-sm text-white">Sí</span>
                  </div>
                )}
                {formData.sampleFiles.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-white/50">Archivos adjuntos</span>
                    <span className="text-sm text-white">{formData.sampleFiles.length} PDF(s)</span>
                  </div>
                )}
                {formData.videoLinks && (
                  <div className="flex justify-between">
                    <span className="text-sm text-white/50">Videos / experiencia</span>
                    <span className="text-sm text-white text-right max-w-[60%]">{formData.videoLinks}</span>
                  </div>
                )}
                {formData.previousWorkSamples && (
                  <div className="flex justify-between">
                    <span className="text-sm text-white/50">Experiencia previa</span>
                    <span className="text-sm text-white text-right max-w-[60%]">{formData.previousWorkSamples}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-semibold text-white">Creá tu contraseña</h3>
                <p className="text-xs text-white/50">Con tu email y contraseña podrás acceder a tu cuenta de colaborador.</p>

                <div>
                  <label className={labelClass}>Contraseña *</label>
                  <input
                    type="password"
                    className={inputClass}
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => update('password', e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Confirmar contraseña *</label>
                  <input
                    type="password"
                    className={inputClass}
                    placeholder="Repetí tu contraseña"
                    value={formData.confirmPassword}
                    onChange={(e) => update('confirmPassword', e.target.value)}
                  />
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex mt-8 justify-between">
                <button
                  type="button"
                  onClick={() => { setStep(1); setError(''); }}
                  className="min-h-[48px] px-5 sm:px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-medium text-sm sm:text-base text-white hover:bg-white/20 active:bg-white/25 transition-all"
                  disabled={loading}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="min-h-[48px] px-6 sm:px-8 py-3 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-sm sm:text-base text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] active:opacity-90 transition-all hover:-translate-y-1 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Crear cuenta y enviar'}
                </button>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
