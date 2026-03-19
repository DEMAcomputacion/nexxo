import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { api } from '../services/api';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen bg-landing-dark flex items-center justify-center px-4 py-12">
        <div className="bg-landing-card border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-white mb-3">Enlace invalido</h2>
          <p className="text-white/60 text-sm mb-6">Este enlace de recuperacion no es valido.</p>
          <Link
            to="/recover-password"
            className="inline-block px-6 py-3 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-white text-sm hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] transition-all"
          >
            Solicitar nuevo enlace
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/reset-password', { token, password });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al restablecer contraseña');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-landing-dark flex items-center justify-center px-4 py-12">
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
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Contraseña actualizada</h2>
            <p className="text-white/70 text-sm sm:text-base mb-6">
              Tu contraseña fue restablecida correctamente.
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-white text-sm hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] transition-all"
            >
              Iniciar Sesion
            </Link>
          </div>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Nueva contraseña</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-landing-card border border-white/10 rounded-2xl p-5 sm:p-8 space-y-5 sm:space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Nueva contraseña</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-base text-white placeholder-white/30 focus:outline-none focus:border-landing-orange transition-colors"
              placeholder="Minimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Confirmar contraseña</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-base text-white placeholder-white/30 focus:outline-none focus:border-landing-orange transition-colors"
              placeholder="Repeti tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] active:opacity-90 transition-all hover:-translate-y-1 disabled:opacity-50 min-h-[52px]"
          >
            {loading ? 'Guardando...' : 'Restablecer contraseña'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
