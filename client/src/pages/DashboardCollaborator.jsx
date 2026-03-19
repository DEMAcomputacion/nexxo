import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function DashboardCollaborator() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-landing-dark flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full text-center"
      >
        <img src="/logo_transparent.png" alt="NEXXO" className="h-12 sm:h-16 mx-auto mb-6" />

        <div className="bg-landing-card border border-white/10 rounded-2xl p-8 sm:p-10">
          <div className="w-16 h-16 bg-landing-orange/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-landing-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.84-3.37a.75.75 0 01-.38-.65V7.2a.75.75 0 01.38-.65l5.84-3.37a.75.75 0 01.76 0l5.84 3.37a.75.75 0 01.38.65v3.95a.75.75 0 01-.38.65l-5.84 3.37a.75.75 0 01-.76 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22v-7" />
            </svg>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Hola, {user?.name}
          </h1>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Esta pagina esta en construccion. Aqui podras administrar tus datos, subir material y llevar el control de tus trabajos y horas.
          </p>
        </div>

        <button
          onClick={logout}
          className="mt-6 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          Cerrar sesion
        </button>
      </motion.div>
    </div>
  );
}
