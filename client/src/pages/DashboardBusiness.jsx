import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import {
  Eye,
  Heart,
  MessageCircle,
  User,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Calendar,
} from 'lucide-react';

/* ─── Mock data — reemplazar con API calls ─── */
const mockCampaign = {
  active: true,
  title: 'Campaña Primavera 2025',
  startDate: new Date('2025-02-10'),
  endDate: new Date('2025-03-12'),
  reach: 12430,
  interactions: 847,
  inquiries: 23,
  creator: {
    name: 'María González',
    handle: '@mariag_uco',
    avatar: null,
  },
};

const mockHistory = [
  {
    id: 1,
    month: 'Enero 2025',
    creator: { name: 'Lucía Fernández', handle: '@luciaf_uco', avatar: null },
    reach: 8200,
    interactions: 510,
    inquiries: 14,
    title: 'Campaña Verano 2025',
  },
  {
    id: 2,
    month: 'Diciembre 2024',
    creator: { name: 'Juan Morales', handle: '@juanm_valle', avatar: null },
    reach: 5100,
    interactions: 390,
    inquiries: 9,
    title: 'Campaña Fin de Año',
  },
  {
    id: 3,
    month: 'Octubre 2024',
    creator: { name: 'Valentina Cruz', handle: '@vale_uco', avatar: null },
    reach: 6800,
    interactions: 430,
    inquiries: 11,
    title: 'Campaña Vendimia',
  },
];

/* ─── Helpers ─── */
function getDayProgress(start, end) {
  const now = new Date();
  const total = Math.round((end - start) / (1000 * 60 * 60 * 24));
  const elapsed = Math.min(Math.round((now - start) / (1000 * 60 * 60 * 24)), total);
  const remaining = Math.max(total - elapsed, 0);
  return { total, elapsed, remaining, pct: Math.round((elapsed / total) * 100) };
}

function AvatarPlaceholder({ name, size = 'md' }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-12 h-12 text-sm';
  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br from-landing-orange/30 to-landing-pink/30 border border-white/10 flex items-center justify-center font-bold text-white shrink-0`}>
      {initials}
    </div>
  );
}

/* ─── Sección: Sin campaña activa ─── */
function NoCampaign() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-10 px-4"
    >
      <div className="w-16 h-16 bg-white/[0.04] border border-white/[0.08] rounded-2xl flex items-center justify-center mx-auto mb-5">
        <TrendingUp className="w-8 h-8 text-white/20" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Sin campaña activa</h2>
      <p className="text-white/50 text-sm sm:text-base max-w-xs mx-auto leading-relaxed mb-7">
        Todavía no tenés una campaña en curso. Contactanos y arrancamos juntos.
      </p>
      <a
        href="mailto:hola@nexxo.com"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-full font-semibold text-white text-sm hover:shadow-[0_20px_40px_rgba(255,107,53,0.25)] transition-all hover:-translate-y-0.5"
      >
        Contactar a NEXXO →
      </a>
    </motion.div>
  );
}

/* ─── Sección: Hero (above fold) ─── */
function HeroSection({ campaign }) {
  if (!campaign.active) return <NoCampaign />;

  const { total, elapsed, remaining, pct } = getDayProgress(
    campaign.startDate,
    campaign.endDate
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Status badge */}
      <div className="flex items-center gap-2 mb-8 sm:mb-10">
        <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Campaña activa
        </span>
        <span className="text-white/30 text-xs">{campaign.title}</span>
      </div>

      {/* Big reach number */}
      <div className="mb-8 sm:mb-10">
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[clamp(3rem,12vw,6rem)] font-black text-white leading-none tracking-tight"
        >
          {campaign.reach.toLocaleString('es-AR')}
        </motion.p>
        <p className="text-white/40 text-sm sm:text-base mt-2 font-medium">
          personas vieron tu campaña
        </p>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-white/40">
            Día <span className="text-white/70 font-semibold">{elapsed}</span> de {total}
          </span>
          <span className="text-xs text-white/40">
            <span className="text-white/70 font-semibold">{remaining}</span>{' '}
            {remaining === 1 ? 'día restante' : 'días restantes'}
          </span>
        </div>
        <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-landing-orange to-landing-pink rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Sección: Tarjetas de detalle ─── */
function DetailCards({ campaign }) {
  if (!campaign.active) return null;

  const cards = [
    {
      icon: Eye,
      value: campaign.reach.toLocaleString('es-AR'),
      label: 'Personas que la vieron',
      color: 'from-landing-blue/20 to-landing-purple/10',
      iconColor: 'text-landing-blue',
    },
    {
      icon: Heart,
      value: campaign.interactions.toLocaleString('es-AR'),
      label: 'Interacciones generadas',
      color: 'from-landing-pink/20 to-landing-coral/10',
      iconColor: 'text-landing-pink',
    },
    {
      icon: MessageCircle,
      value: campaign.inquiries,
      label: 'Consultas recibidas',
      color: 'from-landing-orange/20 to-landing-coral/10',
      iconColor: 'text-landing-orange',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
    >
      <h2 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
        Detalle de campaña
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 flex items-center gap-4"
          >
            <div className={`w-11 h-11 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shrink-0`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-black text-white leading-none">{card.value}</p>
              <p className="text-white/45 text-xs mt-1 leading-snug">{card.label}</p>
            </div>
          </motion.div>
        ))}

        {/* Creator card — full width on mobile, 1 col on sm */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44 }}
          className="sm:col-span-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 flex items-center gap-4"
        >
          <AvatarPlaceholder name={campaign.creator.name} />
          <div className="min-w-0">
            <p className="text-white font-bold text-base leading-none truncate">{campaign.creator.name}</p>
            <p className="text-white/40 text-xs mt-1">{campaign.creator.handle}</p>
          </div>
          <div className="ml-auto shrink-0">
            <span className="text-xs text-white/30 font-medium bg-white/[0.04] border border-white/[0.07] px-3 py-1.5 rounded-full">
              Tu creador
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Sección: Historial ─── */
function HistoryItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.07 }}
      className="border border-white/[0.07] rounded-2xl overflow-hidden"
    >
      {/* Row */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4 sm:p-5 text-left hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors"
      >
        <AvatarPlaceholder name={item.creator.name} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-white/40 text-xs mb-0.5">{item.month}</p>
          <p className="text-white text-sm font-semibold truncate">{item.creator.name}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-white font-bold text-base leading-none">
            {item.reach.toLocaleString('es-AR')}
          </p>
          <p className="text-white/30 text-[10px] mt-0.5">personas</p>
        </div>
        <div className="ml-2 text-white/30">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded report */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-white/[0.06]">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-4 mt-3">
                Informe · {item.title}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Eye, value: item.reach.toLocaleString('es-AR'), label: 'Alcance' },
                  { icon: Heart, value: item.interactions.toLocaleString('es-AR'), label: 'Interacciones' },
                  { icon: MessageCircle, value: item.inquiries, label: 'Consultas' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/[0.03] rounded-xl p-3 text-center">
                    <stat.icon className="w-4 h-4 text-white/30 mx-auto mb-2" />
                    <p className="text-white font-bold text-lg leading-none">{stat.value}</p>
                    <p className="text-white/35 text-[11px] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/[0.05]">
                <AvatarPlaceholder name={item.creator.name} size="sm" />
                <div>
                  <p className="text-white/70 text-sm font-medium">{item.creator.name}</p>
                  <p className="text-white/30 text-xs">{item.creator.handle}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function HistorySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <h2 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
        Campañas anteriores
      </h2>
      <div className="space-y-2">
        {mockHistory.map((item, i) => (
          <HistoryItem key={item.id} item={item} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Dashboard principal ─── */
export default function DashboardBusiness() {
  const { user } = useAuth();
  const campaign = mockCampaign;

  return (
    <div className="min-h-screen bg-landing-dark">
      {/* Background accent */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_-10%,rgba(255,107,53,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_10%_80%,rgba(102,126,234,0.05),transparent)]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 pt-6 pb-16 sm:pt-8 sm:px-6 space-y-10 sm:space-y-12">

        {/* Greeting */}
        <div>
          <p className="text-white/35 text-sm mb-0.5">
            <Calendar className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />
            {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Hola, <span className="text-white/80">{user?.name ?? 'Negocio'}</span>
          </h1>
        </div>

        {/* Hero: status + big number + progress */}
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 sm:p-7">
          <HeroSection campaign={campaign} />
        </div>

        {/* 4 detail cards */}
        <DetailCards campaign={campaign} />

        {/* History */}
        <HistorySection />

      </div>
    </div>
  );
}
