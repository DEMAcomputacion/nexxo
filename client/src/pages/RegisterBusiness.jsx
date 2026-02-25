import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { api } from '../services/api';

function RegisterBusiness() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }
    
    setLoading(true);
    
    try {
      await api.post('/auth/register-business', {
        companyName: formData.companyName,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { state: { registered: true } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-landing-dark flex items-center justify-center px-5 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-landing-card border border-white/10 rounded-2xl p-12 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">¡Registro exitoso!</h2>
          <p className="text-white/60">Tu negocio ha sido registrado. Serás redirigido al login...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-landing-dark flex items-center justify-center px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img src="/logo_transparent.png" alt="NEXXO" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white">Registro de Negocio</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-landing-card border border-white/10 rounded-2xl p-8 space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Nombre del Negocio *</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
              placeholder="Mi Negocio S.A.S"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Email *</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
              placeholder="contacto@minegocio.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Contraseña *</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Confirmar Contraseña *</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
              placeholder="Repite tu contraseña"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
          
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 mt-1 text-landing-orange rounded border-white/20 focus:ring-landing-orange bg-white/5"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
              />
              <span className="text-sm text-white/70">
                Acepto los términos y condiciones y la política de privacidad.
              </span>
            </label>
          </div>
          
          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-1 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>
        
        <p className="text-center text-white/60 mt-8 text-sm">
          ¿Ya tenés una cuenta?{' '}
          <Link to="/login" className="text-landing-orange hover:underline">
            Iniciar Sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default RegisterBusiness;
