import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../services/api';
import { useNavigate } from 'react-router';

const steps = [
  { id: 1, title: 'Información Personal', description: 'Datos básicos' },
  { id: 2, title: 'Redes Sociales', description: 'Tus plataformas' },
  { id: 3, title: 'Métricas', description: 'Tu audiencia' },
  { id: 4, title: 'Tarifas', description: ' tus precios' },
  { id: 5, title: 'Resumen', description: 'Confirma tus datos' },
];

const niches = [
  'Moda y Estilo',
  'Belleza y Cuidado Personal',
  'Fitness y Salud',
  'Viajes y Lifestyle',
  'Food y Cocina',
  'Tecnología',
  'Gaming',
  'Finanzas y Negocios',
  'Educación',
  'Sexualidad y Erotismo',
  'Entretenimiento',
  'Mascotas',
  'Hogar y Decoración',
  'Otro',
];

const contentFormats = ['Video', 'Imagen', 'Carrusel', 'Reels/Shorts', 'Live', 'Stories'];

const ageRanges = [
  '13-17 años',
  '18-24 años',
  '25-34 años',
  '35-44 años',
  '45-54 años',
  '55+ años',
];

const genderOptions = ['Femenino', 'Masculino', 'Mixto'];

const frequencyOptions = ['Diario', 'Cada 2-3 días', 'Cada 4-5 días', 'Una vez a la semana', 'Variable'];

const paymentModels = ['Pago Fijo', 'CPM (Costo por mil impresiones)', 'Performance (Resultados)', 'Mixto'];

const collaborationTypes = [
  'Posts Patrocinados',
  'Embajador de Marca',
  'Unboxing',
  'Eventos',
  'Canjes',
];

const socialPlatforms = ['Instagram', 'TikTok', 'YouTube', 'X (Twitter)', 'LinkedIn', 'Facebook', 'Otro'];

function Stepper({ currentStep }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                currentStep >= step.id
                  ? 'bg-primary text-white'
                  : 'bg-neutral-200 text-neutral-500'
              }`}
            >
              {currentStep > step.id ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.id
              )}
            </div>
            <span className={`text-xs mt-1 hidden sm:block ${currentStep >= step.id ? 'text-primary' : 'text-neutral-400'}`}>
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-12 sm:w-20 h-0.5 mx-2 ${currentStep > step.id ? 'bg-primary' : 'bg-neutral-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Step1Personal({ data, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-center mb-6">Información Personal</h2>
      <p className="text-neutral-500 text-center mb-6">Vamos a comenzar con tus datos básicos.</p>
      
      <div>
        <label className="block text-sm font-medium mb-2">Nombre completo *</label>
        <input
          type="text"
          className="input"
          placeholder="Juan Pérez"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Email *</label>
        <input
          type="email"
          className="input"
          placeholder="tu@email.com"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Teléfono</label>
        <input
          type="tel"
          className="input"
          placeholder="+54 9 11 2345 6789"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Ciudad *</label>
        <input
          type="text"
          className="input"
          placeholder="Buenos Aires, Argentina"
          value={data.city}
          onChange={(e) => onChange({ ...data, city: e.target.value })}
          required
        />
      </div>
    </motion.div>
  );
}

function Step2Social({ data, onChange }) {
  const handlePlatformChange = (platform, field, value) => {
    const current = data.socials || {};
    const platformData = current[platform] || { handle: '', followers: 0 };
    
    onChange({
      ...data,
      socials: {
        ...current,
        [platform]: { ...platformData, [field]: value },
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-center mb-6">Redes Sociales</h2>
      <p className="text-neutral-500 text-center mb-6">Completá la información sobre tus redes. Solo rellena las que usarás para publicitar.</p>
      
      {socialPlatforms.map((platform) => (
        <div key={platform} className="border border-neutral-200 rounded-lg p-4">
          <h3 className="font-medium mb-3">{platform}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Usuario / Handle</label>
              <input
                type="text"
                className="input text-sm"
                placeholder={`@tu_usuario`}
                value={data.socials?.[platform]?.handle || ''}
                onChange={(e) => handlePlatformChange(platform, 'handle', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Seguidores</label>
              <input
                type="number"
                className="input text-sm"
                placeholder="0"
                value={data.socials?.[platform]?.followers || ''}
                onChange={(e) => handlePlatformChange(platform, 'followers', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function Step3Metrics({ data, onChange }) {
  const toggleFormat = (format) => {
    const current = data.contentFormats || [];
    const updated = current.includes(format)
      ? current.filter((f) => f !== format)
      : [...current, format];
    onChange({ ...data, contentFormats: updated });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-center mb-6">Métricas y Sector de Acción</h2>
      <p className="text-neutral-500 text-center mb-6">Configura tus métricas luego podés modificarlas o actualizarlas.</p>
      
      <div>
        <label className="block text-sm font-medium mb-2">Nicho Principal *</label>
        <select
          className="input"
          value={data.niche || ''}
          onChange={(e) => onChange({ ...data, niche: e.target.value })}
          required
        >
          <option value="">Selecciona un nicho...</option>
          {niches.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Formatos de contenido que realizás</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {contentFormats.map((format) => (
            <label key={format} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary rounded border-neutral-300 focus:ring-primary"
                checked={data.contentFormats?.includes(format) || false}
                onChange={() => toggleFormat(format)}
              />
              <span className="text-sm">{format}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Edad Promedio de Audiencia</label>
        <select
          className="input"
          value={data.audienceAge || ''}
          onChange={(e) => onChange({ ...data, audienceAge: e.target.value })}
        >
          <option value="">Selecciona...</option>
          {ageRanges.map((age) => (
            <option key={age} value={age}>{age}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Género Predominante</label>
        <select
          className="input"
          value={data.audienceGender || ''}
          onChange={(e) => onChange({ ...data, audienceGender: e.target.value })}
        >
          <option value="">Selecciona...</option>
          {genderOptions.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Frecuencia de posteo</label>
        <select
          className="input"
          value={data.postFrequency || ''}
          onChange={(e) => onChange({ ...data, postFrequency: e.target.value })}
        >
          <option value="">Selecciona...</option>
          {frequencyOptions.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
    </motion.div>
  );
}

function Step4Rates({ data, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-center mb-6">Tarifas</h2>
      <p className="text-neutral-500 text-center mb-6">Configura tus pretensiones por publicación o por alcance.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Tarifa Mínima por Publicación ($)</label>
          <input
            type="number"
            className="input"
            placeholder="100"
            value={data.priceMin || ''}
            onChange={(e) => onChange({ ...data, priceMin: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tarifa Máxima por Publicación ($)</label>
          <input
            type="number"
            className="input"
            placeholder="500"
            value={data.priceMax || ''}
            onChange={(e) => onChange({ ...data, priceMax: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Modelo de Pago Preferido</label>
        <select
          className="input"
          value={data.paymentModel || ''}
          onChange={(e) => onChange({ ...data, paymentModel: e.target.value })}
        >
          <option value="">Selecciona...</option>
          {paymentModels.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Tipos de Colaboraciones Aceptadas</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {collaborationTypes.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary rounded border-neutral-300 focus:ring-primary"
                checked={data.collaborationTypes?.includes(c) || false}
                onChange={(e) => {
                  const current = data.collaborationTypes || [];
                  const updated = e.target.checked
                    ? [...current, c]
                    : current.filter((item) => item !== c);
                  onChange({ ...data, collaborationTypes: updated });
                }}
              />
              <span className="text-sm">{c}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">URL del Media Kit / Portafolio</label>
        <input
          type="url"
          className="input"
          placeholder="https://drive.google.com/..."
          value={data.mediaKitUrl || ''}
          onChange={(e) => onChange({ ...data, mediaKitUrl: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Restricciones de Contenido</label>
        <textarea
          className="input"
          rows={3}
          placeholder="Ej: No acepto contenido para menores de edad, no hago publicidad de..."
          value={data.contentRestrictions || ''}
          onChange={(e) => onChange({ ...data, contentRestrictions: e.target.value })}
        />
      </div>
    </motion.div>
  );
}

function Step5Summary({ data, onChange, errors }) {
  const totalFollowers = Object.values(data.socials || {}).reduce(
    (sum, s) => sum + (s.followers || 0),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-center mb-6">Resumen y Contraseña</h2>
      <p className="text-neutral-500 text-center mb-6">Revisa tus datos y crea una contraseña para tu cuenta.</p>
      
      <div className="bg-neutral-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-3">Resumen de tu perfil</h3>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Nombre:</span> {data.name}</p>
          <p><span className="font-medium">Email:</span> {data.email}</p>
          <p><span className="font-medium">Ciudad:</span> {data.city}</p>
          <p><span className="font-medium">Nicho:</span> {data.niche}</p>
          <p><span className="font-medium">Rango de tarifas:</span> ${data.priceMin} - ${data.priceMax}</p>
          <p><span className="font-medium">Total seguidores:</span> {totalFollowers.toLocaleString()}</p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Contraseña *</label>
        <input
          type="password"
          className={`input ${errors.password ? 'border-error' : ''}`}
          placeholder="Mínimo 8 caracteres"
          value={data.password || ''}
          onChange={(e) => onChange({ ...data, password: e.target.value })}
          required
        />
        {errors.password && <p className="text-error text-xs mt-1">{errors.password}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Repetir Contraseña *</label>
        <input
          type="password"
          className={`input ${errors.confirmPassword ? 'border-error' : ''}`}
          placeholder="••••••••"
          value={data.confirmPassword || ''}
          onChange={(e) => onChange({ ...data, confirmPassword: e.target.value })}
          required
        />
        {errors.confirmPassword && <p className="text-error text-xs mt-1">{errors.confirmPassword}</p>}
      </div>
      
      <div className="space-y-3 pt-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 mt-1 text-primary rounded border-neutral-300 focus:ring-primary"
            checked={data.acceptTerms || false}
            onChange={(e) => onChange({ ...data, acceptTerms: e.target.checked })}
          />
          <span className="text-sm text-neutral-600">
            Acepto los términos y condiciones y la política de privacidad. Entiendo que mis datos serán utilizados para conectar con marcas interesadas en colaborar conmigo. *
          </span>
        </label>
        
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 mt-1 text-primary rounded border-neutral-300 focus:ring-primary"
            checked={data.acceptCommunications || false}
            onChange={(e) => onChange({ ...data, acceptCommunications: e.target.checked })}
          />
          <span className="text-sm text-neutral-600">
            Doy mi consentimiento para recibir comunicaciones sobre oportunidades de colaboración, actualizaciones de la plataforma y contenido relevante para influencers.
          </span>
        </label>
        
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 mt-1 text-primary rounded border-neutral-300 focus:ring-primary"
            checked={data.acceptVerification || false}
            onChange={(e) => onChange({ ...data, acceptVerification: e.target.checked })}
          />
          <span className="text-sm text-neutral-600">
            Autorizo la verificación de mis perfiles de redes sociales para confirmar mis métricas y legitimidad.
          </span>
        </label>
      </div>
    </motion.div>
  );
}

export default function RegisterInfluencer() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    socials: {},
    niche: '',
    contentFormats: [],
    audienceAge: '',
    audienceGender: '',
    postFrequency: '',
    priceMin: 0,
    priceMax: 0,
    paymentModel: '',
    collaborationTypes: '',
    mediaKitUrl: '',
    contentRestrictions: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptCommunications: false,
    acceptVerification: false,
  });

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
      if (!formData.email.trim()) newErrors.email = 'El email es requerido';
      if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
    }
    
    if (currentStep === 3) {
      if (!formData.niche) newErrors.niche = 'El nicho es requerido';
    }
    
    if (currentStep === 5) {
      if (!formData.password) newErrors.password = 'La contraseña es requerida';
      if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    
    setLoading(true);
    setError('');
    
    try {
      const totalFollowers = Object.values(formData.socials).reduce(
        (sum, s) => sum + (s.followers || 0),
        0
      );
      
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'influencer',
        phone: formData.phone,
        city: formData.city,
        socials: formData.socials,
        niche: formData.niche,
        contentFormats: formData.contentFormats,
        audienceAge: formData.audienceAge,
        audienceGender: formData.audienceGender,
        postFrequency: formData.postFrequency,
        priceMin: formData.priceMin,
        priceMax: formData.priceMax,
        paymentModel: formData.paymentModel,
        collaborationTypes: formData.collaborationTypes,
        mediaKitUrl: formData.mediaKitUrl,
        contentRestrictions: formData.contentRestrictions,
        followersCount: totalFollowers,
      };
      
      await api.post('/auth/register', payload);
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Personal data={formData} onChange={setFormData} />;
      case 2:
        return <Step2Social data={formData} onChange={setFormData} />;
      case 3:
        return <Step3Metrics data={formData} onChange={setFormData} />;
      case 4:
        return <Step4Rates data={formData} onChange={setFormData} />;
      case 5:
        return <Step5Summary data={formData} onChange={setFormData} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">NEXXO</h1>
          <p className="text-neutral-500 mt-2">Registro de Influencer</p>
        </div>
        
        <Stepper currentStep={step} />
        
        <div className="card">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
          
          {error && (
            <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
              {error}
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-outline"
                disabled={loading}
              >
                Anterior
              </button>
            ) : (
              <div />
            )}
            
            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Completar Registro'}
              </button>
            )}
          </div>
        </div>
        
        <p className="text-center text-sm text-neutral-500 mt-6">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="text-primary hover:underline">
            Iniciar Sesión
          </a>
        </p>
      </div>
    </div>
  );
}
