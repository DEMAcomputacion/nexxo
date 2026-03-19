import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { api } from '../services/api';

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al enviar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-landing-dark flex items-center justify-center px-4 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="bg-landing-card border border-white/10 rounded-2xl p-8 sm:p-12">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Revisa tu email</h2>
            <p className="text-white/70 text-sm sm:text-base">
              Si el email esta registrado, recibiras instrucciones para recuperar tu contraseña.
            </p>
          </div>
          <p className="text-center text-white/60 mt-6 text-sm">
            <Link to="/login" className="text-landing-orange hover:underline">
              Volver a Iniciar Sesion
            </Link>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-landing-dark flex items-center justify-center px-4 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-7 sm:mb-8">
          <img src="/logo_transparent.png" alt="NEXXO" className="h-12 sm:h-16 mx-auto mb-3 sm:mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Recuperar Contraseña</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-landing-card border border-white/10 rounded-2xl p-5 sm:p-8 space-y-5 sm:space-y-6">
          <p className="text-white/70 text-center text-sm sm:text-base">
            Ingresa tu email y te enviaremos instrucciones para recuperar tu contraseña.
          </p>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-base text-white placeholder-white/30 focus:outline-none focus:border-landing-orange transition-colors"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] active:opacity-90 transition-all hover:-translate-y-1 disabled:opacity-50 min-h-[52px]"
          >
            {loading ? 'Enviando...' : 'Enviar Instrucciones'}
          </button>
        </form>

        <p className="text-center text-white/60 mt-6 sm:mt-8 text-sm">
          ¿Recordaste tu contraseña?{' '}
          <Link to="/login" className="text-landing-orange hover:underline">
            Iniciar Sesion
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default RecoverPassword;
