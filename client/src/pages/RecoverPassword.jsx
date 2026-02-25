import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-landing-dark flex items-center justify-center px-5 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="bg-landing-card border border-white/10 rounded-2xl p-12">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">¡Revisa tu email!</h2>
            <p className="text-white/70">Te enviamos instrucciones para recuperar tu contraseña.</p>
          </div>
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
          <h1 className="text-3xl font-bold text-white">Recuperar Contraseña</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-landing-card border border-white/10 rounded-2xl p-8 space-y-6">
          <p className="text-white/70 text-center">
            Ingresá tu email y te enviaremos instrucciones para recuperar tu contraseña.
          </p>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-1"
          >
            Enviar Instrucciones
          </button>
        </form>

        <p className="text-center text-white/60 mt-8 text-sm">
          ¿Recordaste tu contraseña?{' '}
          <Link to="/login" className="text-landing-orange hover:underline">
            Iniciar Sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default RecoverPassword;
