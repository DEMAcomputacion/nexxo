import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      className="text-5xl font-extrabold bg-gradient-to-r from-landing-orange via-landing-coral via-landing-pink via-landing-purple to-landing-blue bg-clip-text text-transparent"
    >
      {target}+
    </motion.span>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-landing-dark px-5 py-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,107,53,0.15),transparent),radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(233,30,99,0.1),transparent),radial-gradient(ellipse_50%_30%_at_20%_80%,rgba(102,126,234,0.1),transparent)]" />
      </div>

      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-landing-orange to-landing-coral blur-[80px] opacity-50 -top-52 -right-52"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 0.95, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', reverse: true }}
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-landing-pink to-landing-purple blur-[80px] opacity-50 -bottom-40 -left-40"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-landing-blue to-landing-purple blur-[80px] opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>

      <div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 mb-10"
        >
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Agencia de Curaduría Estratégica
        </motion.div>

        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          src="/logo_transparent.png"
          alt="NEXXO"
          className="w-20 mx-auto mb-8"
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight"
        >
          <span className="block">Conexiones que</span>
          <span className="block bg-gradient-to-r from-landing-orange via-landing-coral via-landing-pink via-landing-purple to-landing-blue bg-clip-text text-transparent">
            Transforman Marcas
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10"
        >
          No representamos volumen. Representamos talento alineado, métricas sólidas y colaboraciones estratégicas que generan impacto real.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-16 mt-20"
        >
          <div className="text-center">
            <Counter target={500} />
            <p className="text-white/60 text-sm mt-2">Creadores Curados</p>
          </div>
          <div className="text-center">
            <Counter target={98} />
            <p className="text-white/60 text-sm mt-2">% Satisfacción</p>
          </div>
          <div className="text-center">
            <Counter target={3} />
            <p className="text-white/60 text-sm mt-2">Años de Experiencia</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-landing-coral to-transparent" />
      </motion.div>
    </section>
  );
}

function Problem() {
  return (
    <section id="problema" className="py-32 px-5 bg-landing-dark relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <AnimatedSection>
            <div className="relative h-[500px]">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 left-0 w-72 p-6 bg-landing-card border border-white/10 rounded-2xl backdrop-blur-xl"
              >
                <div className="w-12 h-12 bg-landing-orange/20 rounded-xl flex items-center justify-center text-2xl mb-4">📉</div>
                <h4 className="text-white/50 text-lg mb-2">Engagement Falso</h4>
                <p className="text-white/30 text-sm">Miles de seguidores, cero conversión real</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-28 right-0 w-64 p-6 bg-landing-card border border-white/10 rounded-2xl backdrop-blur-xl"
              >
                <div className="w-12 h-12 bg-landing-pink/20 rounded-xl flex items-center justify-center text-2xl mb-4">🎯</div>
                <h4 className="text-white/50 text-lg mb-2">Desalineación</h4>
                <p className="text-white/30 text-sm">Creadores que no conectan con tu marca</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-12 left-8 w-72 p-6 bg-landing-card border border-white/10 rounded-2xl backdrop-blur-xl"
              >
                <div className="w-12 h-12 bg-landing-purple/20 rounded-xl flex items-center justify-center text-2xl mb-4">💸</div>
                <h4 className="text-white/50 text-lg mb-2">Inversión Perdida</h4>
                <p className="text-white/30 text-sm">Campañas masivas sin retorno</p>
              </motion.div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight">
              El marketing de influencia está <span className="text-white/30 line-through decoration-4 decoration-landing-pink">roto</span>
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Por cada 10 influencers que contactas, 9 no generan resultados. El mercado está saturado de perfiles sin credibilidad real, métricas infladas y desconexión total con tu audiencia objetivo.
            </p>
            <div className="space-y-4">
              {['Horas perdidas filtrando perfiles irrelevantes', 'Campañas que no reflejan los valores de tu marca', 'Presupuesto invertido sin ROI medible'].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-landing-pink/10 border-l-4 border-landing-pink rounded-r-lg"
                >
                  <span className="text-landing-pink font-bold">✕</span>
                  <span className="text-white/80">{point}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const features = [
    {
      number: '01',
      title: 'Selección Estratégica',
      description: 'Cada perfil pasa por un riguroso proceso de evaluación. No representamos volumen, representamos talento alineado con tu marca.',
    },
    {
      number: '02',
      title: 'Métricas que Importan',
      description: 'Más allá de los números. Analizamos engagement real, credibilidad auténtica y capacidad de conversión genuina.',
    },
    {
      number: '03',
      title: 'Alianzas Cuidadas',
      description: 'Diseñamos colaboraciones donde cada detalle protege tu reputación y potencia el posicionamiento del creador.',
    },
  ];

  const process = [
    {
      title: 'Evaluación Profunda',
      description: 'Analizamos métricas auténticas, historial de colaboraciones, coherencia de marca y engagement real. Solo el 15% pasa este filtro.',
      icon: '🔍',
    },
    {
      title: 'Match Estratégico',
      description: 'Conectamos marcas con creadores cuya audiencia coincide perfectamente con tu objetivo demográfico y valores.',
      icon: '🎯',
    },
    {
      title: 'Ejecución Perfecta',
      description: 'Coordinamos cada detalle, desde el brief hasta la entrega, asegurando que ambas partes cumplan y superen expectativas.',
      icon: '✨',
    },
  ];

  return (
    <section id="solucion" className="py-32 px-5 bg-gradient-to-b from-transparent via-landing-purple/5 to-transparent bg-landing-dark">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-500 text-sm mb-6">
            La Diferencia NEXXO
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-white">Curadura que garantiza resultados</h2>
          <p className="text-lg text-white/70">
            Seleccionamos cuidadosamente cada creador basándonos en credibilidad, afinidad auténtica y capacidad probada de generar conversión.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, i) => (
            <AnimatedSection key={i} className="relative">
              <motion.div
                whileHover={{ y: -10, borderColor: 'rgba(255,255,255,0.2)' }}
                className="bg-landing-card border border-white/8 rounded-3xl p-8 h-full transition-all hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
              >
                <span className="absolute top-5 right-5 text-7xl font-black text-white/5">{feature.number}</span>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-landing-orange via-landing-purple to-transparent -translate-x-1/2 hidden md:block" />
          
          {process.map((item, i) => (
            <AnimatedSection key={i} className={`relative grid md:grid-cols-2 gap-12 mb-20 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
              <div className={i % 2 === 1 ? 'md:col-start-2' : ''}>
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-r from-landing-orange to-landing-pink rounded-full -top-1 border-4 border-landing-dark shadow-[0_0_20px_rgba(255,107,53,0.5)]" />
                <h3 className="text-3xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.description}</p>
              </div>
              <div className={`flex items-center justify-center bg-landing-card border border-white/10 rounded-2xl p-8 min-h-[200px] ${i % 2 === 1 ? 'md:row-start-1' : ''}`}>
                <span className="text-6xl">{item.icon}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      text: 'NEXXO transformó completamente nuestra estrategia de influencer marketing. Pasamos de campañas dispersas a alianzas estratégicas que generan ventas.',
      name: 'María Castillo',
      role: 'CMO, BrandTech',
      initials: 'MC',
    },
    {
      text: 'Finalmente encontré una agencia que entiende que no se trata de números, sino de conexiones auténticas. La calidad de los creadores es excepcional.',
      name: 'Andrés Rodríguez',
      role: 'Director de Marketing, StartupX',
      initials: 'AR',
    },
    {
      text: 'El proceso de curaduría de NEXXO nos ahorró meses de búsqueda. Cada creador que nos presentaron estaba perfectamente alineado con nuestra visión.',
      name: 'Laura Pérez',
      role: 'Brand Manager, EcoLife',
      initials: 'LP',
    },
  ];

  return (
    <section id="testimonios" className="py-32 px-5 bg-gradient-to-b from-transparent via-landing-pink/3 to-transparent bg-landing-dark">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Lo que dicen quienes ya confían</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={i}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-landing-card border border-white/8 rounded-2xl p-8 h-full relative"
              >
                <span className="absolute top-4 left-6 text-8xl text-landing-orange/20 font-serif leading-none">"</span>
                <p className="text-white/80 leading-relaxed mb-6 relative z-10">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-landing-orange to-landing-pink rounded-full flex items-center justify-center font-bold text-white">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-white/50 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="contacto" className="py-32 px-5 bg-landing-dark">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-landing-card border border-white/10 rounded-2xl p-12"
          >
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">¡Mensaje enviado!</h3>
            <p className="text-white/70">Gracias por contactarnos. Te responderemos en breve.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-32 px-5 bg-landing-dark">
      <div className="max-w-xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Hablemos</h2>
          <p className="text-white/70">Cuéntanos sobre tu proyecto y te contactaremos.</p>
        </AnimatedSection>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-landing-card border border-white/10 rounded-2xl p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">¿Te comunicas como?</label>
            <select
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="" className="bg-landing-dark">Selecciona una opción</option>
              <option value="influencer" className="bg-landing-dark">Influencer</option>
              <option value="negocio" className="bg-landing-dark">Negocio / Marca</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Nombre</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Empresa (opcional)</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
              placeholder="Nombre de tu empresa"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Mensaje</label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange resize-none"
              placeholder="Cuéntanos sobre tu proyecto o需求..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-1"
          >
            Enviar Mensaje
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Landing() {
  return (
    <div className="bg-landing-dark min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <Testimonials />
      <ContactForm />
    </div>
  );
}

export default Landing;
