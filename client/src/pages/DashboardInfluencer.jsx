import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Sparkles } from 'lucide-react';

export default function DashboardInfluencer() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-landing-dark">
      {/* Background accents */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_-10%,rgba(102,126,234,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_90%_80%,rgba(255,107,53,0.05),transparent)]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 pt-6 pb-16 sm:pt-8 sm:px-6">

        {/* Greeting */}
        <div className="mb-10 sm:mb-12">
          <p className="text-white/35 text-sm mb-0.5">
            <Calendar className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />
            {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Hola, <span className="text-white/80">{user?.name ?? 'Influencer'}</span>
          </h1>
        </div>

        {/* Hero card */}
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 sm:p-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-10 px-4"
          >
            <div className="w-16 h-16 bg-white/[0.04] border border-white/[0.08] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-8 h-8 text-white/20" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Sin campañas activas
            </h2>
            <p className="text-white/50 text-sm sm:text-base max-w-xs mx-auto leading-relaxed">
              Por ahora no tenés campañas en curso. Las oportunidades aparecerán aquí cuando una marca te elija.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
