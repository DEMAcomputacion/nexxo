import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import {
  Smartphone,
  Globe,
  XCircle,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Wallet,
  MessageCircle
} from 'lucide-react';

/* ─── Shared animation wrapper ─── */
function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Top Bar ─── */
function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#nosotros', label: 'Sobre nosotros' },
    { href: '#creadores', label: 'Creadores' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'bg-landing-dark/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <img src="/logo_transparent.png" alt="NEXXO" className="h-9 w-auto" />
          <span className="font-black text-xl tracking-tight bg-gradient-to-r from-landing-orange to-landing-pink bg-clip-text text-transparent">NEXXO</span>
        </a>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-5">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">{link.label}</a>
            ))}
          </div>
          <a
            href="/login"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            Iniciar sesión
          </a>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden flex flex-col gap-1.5 p-1"
            aria-label="Menú"
          >
            <span className={`block w-5 h-0.5 bg-white/60 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white/60 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white/60 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:hidden bg-landing-dark/95 backdrop-blur-xl border-b border-white/5 px-5 pb-5 pt-2"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-white/60 hover:text-white transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-landing-dark px-5 pt-24 pb-16"
    >
      {/* Background: simplified, less noisy */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(249,115,22,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,rgba(139,108,246,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_15%_80%,rgba(139,108,246,0.06),transparent)]" />
      </motion.div>

      {/* Single subtle accent orb */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-landing-orange/20 to-landing-pink/10 blur-[120px] -top-40 right-[-10%]"
      />

      <motion.div style={{ opacity }} className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-full text-[13px] text-white/50 mb-6 sm:mb-10 tracking-wide"
        >
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Marketing digital · Valle de Uco
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="text-[clamp(1.75rem,5.5vw,3.75rem)] font-black text-white leading-[1.1] tracking-tight mb-5 sm:mb-7"
        >
          La gente del Valle compra
          <br />
          donde confía.{' '}
          <span className="bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink bg-clip-text text-transparent">
            Nosotros te ponemos ahí.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-[clamp(0.9rem,2vw,1.2rem)] text-white/55 max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed"
        >
          Conectamos negocios locales con creadores de contenido que tienen audiencia real
          en Tunuyán, Tupungato y San Carlos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#contacto"
            className="group px-7 py-4 sm:py-3.5 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-full font-semibold text-white text-[15px] text-center hover:shadow-[0_20px_50px_rgba(249,115,22,0.25)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Quiero más clientes
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#creadores"
            className="px-7 py-4 sm:py-3.5 bg-white/[0.06] border border-white/[0.12] rounded-full font-semibold text-white/80 text-[15px] text-center hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300"
          >
            Soy creador de contenido
          </a>
        </motion.div>

        {/* Social proof avatars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center gap-3 mt-12 sm:mt-20"
        >
          <div className="flex items-center -space-x-2.5">
            {['ML', 'JR', 'SC', 'AP', 'VG'].map((initials, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-landing-dark flex items-center justify-center text-[11px] font-bold text-white/80"
                style={{
                  background: [
                    'linear-gradient(135deg, #F97316, #E85D10)',
                    'linear-gradient(135deg, #8B6CF6, #F97316)',
                    'linear-gradient(135deg, #F97316, #8B6CF6)',
                    'linear-gradient(135deg, #8B6CF6, #E85D10)',
                    'linear-gradient(135deg, #F97316, #8B6CF6)',
                  ][i],
                }}
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-white/40 text-sm text-center">
            Creadores y negocios del Valle ya trabajan con nosotros
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── PROBLEM ─── */
function Problem() {
  const problems = [
    {
      icon: Smartphone,
      title: 'Sin estrategia',
      text: 'Subís contenido todos los días, pero las ventas no se mueven. Sin un plan detrás, cada publicación es ruido.',
      accent: 'from-landing-orange to-landing-coral',
      accentBg: 'bg-landing-orange/10',
    },
    {
      icon: Globe,
      title: 'Audiencia equivocada',
      text: 'Pagás por difusión y los likes llegan desde Buenos Aires, Córdoba o España. Ninguno de esos seguidores va a cruzar tu puerta.',
      accent: 'from-landing-pink to-landing-purple',
      accentBg: 'bg-landing-pink/10',
    },
    {
      icon: XCircle,
      title: 'Visitas sin conversión',
      text: 'Tenés visitas en el perfil, pero nadie pregunta, nadie compra, nadie aparece. El tráfico sin intención no es negocio.',
      accent: 'from-landing-purple to-landing-blue',
      accentBg: 'bg-landing-purple/10',
    },
  ];

  return (
    <section className="relative py-24 md:py-36 px-5 bg-landing-dark overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section header — left aligned for editorial feel */}
        <AnimatedSection className="max-w-2xl mb-16 md:mb-20">
          <p className="text-landing-orange text-sm font-semibold uppercase tracking-widest mb-4">
            El problema
          </p>
          <h2 className="text-3xl md:text-[3.2rem] font-black text-white leading-[1.1] mb-6">
            Publicar no es vender
          </h2>
          <p className="text-base md:text-lg text-white/50 leading-relaxed">
            Sabés que tenés que estar en redes. Contratar a alguien con miles de seguidores no
            alcanza si esos seguidores no son de acá. En el Valle de Uco la gente compra donde
            confía, y la confianza se construye con caras conocidas.
          </p>
        </AnimatedSection>

        {/* Problem cards — staggered grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.12)' }}
                transition={{ duration: 0.3 }}
                className={`relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 md:p-8 h-full ${
                  i === 1 ? 'md:mt-8' : ''
                }`}
              >
                {/* Accent line top */}
                <div
                  className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${item.accent} rounded-full opacity-40`}
                />
                <div
                  className={`w-12 h-12 ${item.accentBg} rounded-xl flex items-center justify-center text-2xl mb-5`}
                >
                  <item.icon className="w-6 h-6 text-white/70" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/45 text-[15px] leading-relaxed">{item.text}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Creator problem block */}
        <AnimatedSection delay={0.5} className="mt-16 md:mt-24">
          <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 md:p-10 max-w-3xl mx-auto">
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-landing-blue to-landing-purple rounded-full opacity-40" />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-landing-blue/10 border border-landing-blue/20 rounded-full text-xs text-landing-blue mb-5 font-medium">
              <span className="w-1.5 h-1.5 bg-landing-blue rounded-full" />
              Si sos creador
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
              Creás contenido increíble, pero nadie te paga por eso
            </h3>
            <p className="text-white/45 text-[15px] leading-relaxed">
              Dedicás horas a crear reels, fotos y stories. Tenés una comunidad que te sigue
              y confía en vos, pero no sabés cómo convertir eso en ingresos. Los negocios de tu zona
              necesitan exactamente lo que vos hacés — solo que todavía no se conocen.
            </p>
          </div>
        </AnimatedSection>

        {/* Closing statement */}
        <AnimatedSection delay={0.6} className="mt-14 md:mt-20 max-w-2xl">
          <p className="text-base md:text-lg text-white/60 leading-relaxed border-l-2 border-landing-orange/40 pl-6">
            NEXXO conecta a negocios que necesitan clientes locales con creadores que tienen
            la audiencia correcta. Resolvemos el problema de los dos lados.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── PROCESS ─── */
function Solution() {
  const steps = [
    {
      number: '01',
      title: 'Escuchamos antes de proponer',
      description:
        'Nos sentamos con vos (presencial o virtual) para entender qué vendés, a quién y qué resultado necesitás. No arrancamos hasta tener eso claro.',
    },
    {
      number: '02',
      title: 'Seleccionamos al creador correcto',
      description:
        'Cruzamos tu rubro, tu zona y tu cliente ideal con nuestra base de creadores verificados. No elegimos al que tiene más seguidores: elegimos al que tiene los seguidores correctos.',
    },
    {
      number: '03',
      title: 'Ejecutamos la campaña completa',
      description:
        'Definimos el formato, el mensaje y el calendario. El creador publica, nosotros supervisamos. Vos no coordinás nada.',
    },
    {
      number: '04',
      title: 'Medimos y te lo mostramos',
      description:
        'Al cierre recibís un informe con datos concretos: alcance, interacciones, consultas generadas. Sabés exactamente qué pasó y qué ajustar.',
    },
  ];

  return (
    <section className="relative py-24 md:py-36 px-5 bg-landing-dark overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(139,108,246,0.04),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16 md:mb-24">
          <p className="text-landing-pink text-sm font-semibold uppercase tracking-widest mb-4">
            Proceso
          </p>
          <h2 className="text-3xl md:text-[3.2rem] font-black text-white leading-[1.1]">
            Cómo funciona
          </h2>
        </AnimatedSection>

        {/* Steps — alternating layout */}
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-20 md:gap-y-16">
          {steps.map((step, i) => (
            <AnimatedSection
              key={i}
              delay={i * 0.12}
              className={i % 2 !== 0 ? 'md:mt-20' : ''}
            >
              <div className="group relative">
                {/* Big number */}
                <span className="block text-[4rem] md:text-[5rem] font-black leading-none bg-gradient-to-b from-white/[0.08] to-transparent bg-clip-text text-transparent select-none mb-2">
                  {step.number}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-white/50 text-[15px] leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES / WHY NEXXO ─── */
function Features() {
  const primary = [
    {
      title: 'Operamos desde el Valle',
      description:
        'No somos una agencia remota que busca tu localidad en Google Maps. Conocemos los comercios, las dinámicas y los tiempos de acá.',
      icon: MapPin,
    },
    {
      title: 'Audiencias verificadas',
      description:
        'Antes de recomendar un creador, analizamos su audiencia. Confirmamos que sus seguidores sean personas reales de la zona, no cuentas fantasma ni números comprados.',
      icon: CheckCircle2,
    },
  ];

  const secondary = [
    {
      title: 'Cada campaña tiene su informe',
      description:
        'Te entregamos datos: qué se publicó, cuánta gente lo vio, cuántas consultas llegaron. Con eso decidís si repetir, ajustar o escalar.',
      icon: TrendingUp,
    },
    {
      title: 'Presupuesto cerrado',
      description:
        'Te decimos el costo total antes de arrancar. Sin cargos adicionales, sin letra chica, sin sorpresas a mitad de campaña.',
      icon: Wallet,
    },
  ];

  return (
    <section className="relative py-24 md:py-36 px-5 bg-landing-dark overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <p className="text-landing-blue text-sm font-semibold uppercase tracking-widest mb-4">
            Diferenciales
          </p>
          <h2 className="text-3xl md:text-[3.2rem] font-black text-white leading-[1.1]">
            Por qué NEXXO
          </h2>
        </AnimatedSection>

        {/* Primary features — large cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {primary.map((feat, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 md:p-10 overflow-hidden group"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-landing-orange/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-landing-orange/20 to-landing-coral/10 rounded-2xl flex items-center justify-center mb-6">
                    <feat.icon className="w-7 h-7 text-white/80" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{feat.title}</h3>
                  <p className="text-white/50 text-[15px] md:text-base leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Secondary features — smaller, compact */}
        <div className="grid md:grid-cols-2 gap-5">
          {secondary.map((feat, i) => (
            <AnimatedSection key={i} delay={0.2 + i * 0.1}>
              <motion.div
                whileHover={{ y: -2 }}
                className="flex items-start gap-5 bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 group"
              >
                <div className="w-10 h-10 bg-white/[0.05] rounded-lg flex items-center justify-center shrink-0">
                  <feat.icon className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white/90 mb-1.5">{feat.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{feat.description}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FOR WHO ─── */
function ForWho() {
  const segments = [
    'Restaurantes',
    'Agronomías',
    'Gimnasios',
    'Tiendas',
    'Estéticas',
    'Bodegas',
    'Emprendimientos',
    'Servicios profesionales',
    'Alojamientos',
    'Comercios',
  ];

  return (
    <section className="relative py-24 md:py-36 px-5 bg-landing-dark overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      {/* Subtle warm gradient bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_80%,rgba(249,115,22,0.03),transparent)]" />

      <div className="relative max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <p className="text-landing-coral text-sm font-semibold uppercase tracking-widest mb-4">
            Para quién
          </p>
          <h2 className="text-3xl md:text-[3.2rem] font-black text-white leading-[1.1] mb-6">
            ¿Es NEXXO para vos?
          </h2>
          <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
            NEXXO trabaja con negocios del Valle de Uco que necesitan clientes locales.
            Si tus clientes están en Instagram y vos todavía no sabés cómo llegar a ellos,
            estamos para resolver eso.
          </p>
        </AnimatedSection>

        {/* Business type pills */}
        <AnimatedSection delay={0.2} className="flex flex-wrap justify-center gap-3 mb-14">
          {segments.map((seg, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-sm text-white/60 hover:text-white/90 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 cursor-default"
            >
              {seg}
            </motion.span>
          ))}
        </AnimatedSection>

        {/* Bottom quote */}
        <AnimatedSection delay={0.4} className="text-center">
          <p className="text-white/35 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Si alguna vez pagaste publicidad y no pudiste medir qué pasó, o si nunca invertiste
            porque no encontraste a alguien de confianza — NEXXO existe para ese problema.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── CREATORS ─── */
function Creators() {
  const benefits = [
    'Registrate gratis, sin compromiso',
    'No hay mínimo de seguidores',
    'Vos ponés tus tarifas',
    'Te conectamos con comercios que pagan',
    'Sin perseguir marcas, sin propuestas que no llegan',
  ];

  return (
    <section
      id="creadores"
      className="relative py-24 md:py-36 px-5 bg-landing-dark overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      {/* Distinct purple/blue accent to differentiate from business sections */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,rgba(139,108,246,0.05),transparent)]" />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — copy */}
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-landing-blue/10 border border-landing-blue/20 rounded-full text-xs text-landing-blue mb-6 font-medium">
              <span className="w-1.5 h-1.5 bg-landing-blue rounded-full" />
              Para creadores
            </div>
            <h2 className="text-3xl md:text-[2.8rem] font-black text-white leading-[1.1] mb-6">
              Tu audiencia local vale
              <br />
              <span className="text-white/40">más de lo que pensás</span>
            </h2>
            <p className="text-base text-white/50 leading-relaxed mb-6">
              Si generás contenido en la zona y querés trabajar con marcas locales,
              registrate en NEXXO. Cuando un comercio necesite lo que vos hacés,
              te contactamos directamente.
            </p>
            <div className="bg-landing-blue/[0.08] border border-landing-blue/20 rounded-xl px-5 py-4 mb-8">
              <p className="text-white/70 text-sm leading-relaxed">
                <span className="font-semibold text-landing-blue">¿Tenés pocos seguidores?</span>{' '}
                No importa. Lo que vale es que tu audiencia sea real y local. 800 seguidores
                de Tunuyán tienen más impacto que 50.000 de cualquier otro lado.
              </p>
            </div>
            <a
              href="#contacto"
              className="group flex sm:inline-flex items-center justify-center gap-2 px-7 py-4 sm:py-3.5 bg-gradient-to-r from-landing-blue to-landing-purple rounded-full font-semibold text-white text-[15px] hover:shadow-[0_20px_50px_rgba(139,108,246,0.2)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Registrarme como creador
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </AnimatedSection>

          {/* Right — benefits list */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl"
                >
                  <div className="w-6 h-6 rounded-full bg-landing-blue/15 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3.5 h-3.5 text-landing-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white/60 text-[15px]">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT US ─── */
function AboutUs() {
  const team = [
    {
      name: 'David Morales',
      role: 'Líder técnico · Desarrollo & IA',
      bio: 'Nacido en el Valle de Uco. Más de 5 años desarrollando aplicaciones multiplataforma y ayudando a empresas a implementar inteligencia artificial para optimizar sus procesos.',
      image: '/david.jpg',
      initials: 'DM',
      gradient: 'from-landing-orange to-landing-coral',
    },
    {
      name: 'Romina Cabrera',
      role: 'Líder de equipo · Coordinación',
      bio: 'Nacida en el Valle de Uco. Gran experiencia en manejo de equipos, organización y planeación de eventos. Conecta a creadores y negocios con el plan perfecto.',
      image: '/romina.jpg',
      initials: 'RC',
      gradient: 'from-landing-blue to-landing-purple',
    },
  ];

  return (
    <section
      id="nosotros"
      className="relative py-24 md:py-36 px-5 bg-landing-dark overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(249,115,22,0.03),transparent)]" />

      <div className="relative max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-14 md:mb-20">
          <p className="text-landing-orange text-sm font-semibold uppercase tracking-widest mb-4">
            Equipo
          </p>
          <h2 className="text-3xl md:text-[3.2rem] font-black text-white leading-[1.1] mb-6">
            Somos del Valle, como vos
          </h2>
          <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
            NEXXO nació porque vimos el mismo problema de los dos lados: negocios que no sabían
            cómo llegar a su gente en redes, y creadores con audiencia real que nadie aprovechaba.
            Decidimos conectarlos.
          </p>
        </AnimatedSection>

        {/* Team cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {team.map((member, i) => (
            <AnimatedSection key={i} delay={i * 0.15} className="h-full">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 h-full flex flex-col items-center text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 rounded-full object-cover border-2 border-white/10 mb-6"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className={`w-40 h-40 rounded-full bg-gradient-to-br ${member.gradient} items-center justify-center text-4xl font-bold text-white mb-6 hidden`}
                >
                  {member.initials}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-landing-orange/80 mb-3">{member.role}</p>
                <p className="text-white/45 text-[15px] leading-relaxed">{member.bio}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Location pill */}
        <AnimatedSection delay={0.3} className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-sm text-white/50">
            <MapPin className="w-4 h-4 text-landing-orange/70" />
            Basados en San Carlos, Mendoza
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
function ContactForm() {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      });
      setSubmitted(true);
    } catch {
      setError('Error al enviar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="contacto" className="relative py-24 md:py-36 px-5 bg-landing-dark">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-10 md:p-14"
          >
            <div className="w-14 h-14 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-7 h-7 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">¡Consulta enviada!</h3>
            <p className="text-white/50">Te respondemos en menos de 24 horas.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="relative py-24 md:py-36 px-5 bg-landing-dark">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      {/* Warm glow behind form */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_60%,rgba(249,115,22,0.04),transparent)]" />

      <div className="relative max-w-xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <p className="text-landing-orange text-sm font-semibold uppercase tracking-widest mb-4">
            Contacto
          </p>
          <h2 className="text-3xl md:text-[3.2rem] font-black text-white leading-[1.1] mb-4">
            Hablemos
          </h2>
          <p className="text-white/45 text-[15px]">
            Contanos qué hacés y qué necesitás. Te respondemos en menos de 24 horas.
          </p>
          <a
            href="https://wa.me/5492622359006"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full text-sm text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            O escribinos directo por WhatsApp
          </a>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 sm:p-7 md:p-9 space-y-5"
          >
            {/* Type selector */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                ¿Te comunicas como?
              </label>
              <select
                required
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-base focus:outline-none focus:border-landing-orange/50 transition-colors appearance-none cursor-pointer [&>option]:bg-neutral-900 [&>option]:text-white"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="" className="bg-[#111]">
                  Selecciona una opción
                </option>
                <option value="negocio" className="bg-[#111]">
                  Negocio / Comercio
                </option>
                <option value="creador" className="bg-[#111]">
                  Creador de contenido
                </option>
              </select>
            </div>

            {/* Name + Email row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Nombre</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-base placeholder-white/25 focus:outline-none focus:border-landing-orange/50 transition-colors"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-base placeholder-white/25 focus:outline-none focus:border-landing-orange/50 transition-colors"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Business */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Negocio (opcional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-base placeholder-white/25 focus:outline-none focus:border-landing-orange/50 transition-colors"
                placeholder="Nombre de tu negocio"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Mensaje</label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-base placeholder-white/25 focus:outline-none focus:border-landing-orange/50 resize-none transition-colors"
                placeholder="Contanos sobre tu proyecto..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-white text-[15px] hover:shadow-[0_20px_50px_rgba(249,115,22,0.2)] transition-all duration-300 hover:-translate-y-0.5 mt-2 disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Enviar consulta'}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── WHATSAPP FLOATING BUTTON ─── */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5492622359006"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactanos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300"
    >
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/* ─── MAIN LANDING ─── */
function Landing() {
  return (
    <div className="bg-landing-dark min-h-screen">
      <TopBar />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <ForWho />
      <Creators />
      <AboutUs />
      <ContactForm />
      <WhatsAppButton />
    </div>
  );
}

export default Landing;
