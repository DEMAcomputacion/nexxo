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
          Agencia de Marketing Digital · Valle de Uco
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
          className="text-4xl md:text-6xl font-black mb-6 text-white leading-tight"
        >
          Conectamos tu negocio con las voces que el Valle de Uco ya escucha
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10"
        >
          Somos una agencia de marketing digital local. Encontramos los creadores de contenido correctos, diseñamos tu campaña y te mostramos con números si funcionó.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-16 mt-20"
        >
          <div className="text-center relative">
            <Counter target={50} />
            <p className="text-white/60 text-sm mt-2">Creadores Locales</p>
          </div>
          <div className="text-center relative">
            <Counter target={100} />
            <p className="text-white/60 text-sm mt-2">Campañas Realizadas</p>
          </div>
          <div className="text-center relative">
            <Counter target={24} />
            <p className="text-white/60 text-sm mt-2">Hs Respuesta</p>
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
                <div className="w-12 h-12 bg-landing-orange/20 rounded-xl flex items-center justify-center text-2xl mb-4">⏱️</div>
                <h4 className="text-white/50 text-lg mb-2">Tiempo Perdido</h4>
                <p className="text-white/30 text-sm">Publicar sin estrategia no genera resultados</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-28 right-0 w-64 p-6 bg-landing-card border border-white/10 rounded-2xl backdrop-blur-xl"
              >
                <div className="w-12 h-12 bg-landing-pink/20 rounded-xl flex items-center justify-center text-2xl mb-4">📍</div>
                <h4 className="text-white/50 text-lg mb-2">Audiencia Incorrecta</h4>
                <p className="text-white/30 text-sm">Seguidores que no son de la zona</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-12 left-8 w-72 p-6 bg-landing-card border border-white/10 rounded-2xl backdrop-blur-xl"
              >
                <div className="w-12 h-12 bg-landing-purple/20 rounded-xl flex items-center justify-center text-2xl mb-4">💰</div>
                <h4 className="text-white/50 text-lg mb-2">Sin Conversión</h4>
                <p className="text-white/30 text-sm">Visitas que no se convierten en clientes</p>
              </motion.div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight">
              ¿Sabés que necesitás estar en redes pero no sabés por dónde empezar?
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Publicar sin estrategia es perder tiempo. Pagarle a alguien con muchos seguidores no garantiza que esos seguidores sean de acá, que consuman en tu zona, o que se conviertan en clientes reales.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              En el Valle de Uco, la confianza se construye cerca. Nosotros sabemos quién tiene influencia real en tu comunidad.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const process = [
    {
      number: '1',
      title: 'Entendemos tu objetivo',
      description: 'Antes de cualquier campaña, hablamos. Queremos saber qué vendés, a quién le hablás y qué resultado concreto esperás. Nada genérico.',
      icon: '💬',
    },
    {
      number: '2',
      title: 'Encontramos al creador ideal',
      description: 'Tenemos una base de creadores de contenido locales verificados, con audiencia real en Tunuyán, Tupungato y San Carlos. Elegimos al que mejor encaja con tu rubro y tu cliente.',
      icon: '🎯',
    },
    {
      number: '3',
      title: 'Lanzamos la campaña',
      description: 'El creador publica en sus perfiles durante el período acordado. Vos no tenés que hacer nada: nosotros coordinamos todo.',
      icon: '🚀',
    },
    {
      number: '4',
      title: 'Te mostramos los resultados',
      description: 'Al finalizar recibís un informe claro con números reales: cuánta gente vio tu campaña, cuántas interacciones generó y cómo impactó en tus consultas. Sin tecnicismos, sin letra chica.',
      icon: '📊',
    },
  ];

  return (
    <section id="proceso" className="py-32 px-5 bg-gradient-to-b from-transparent via-landing-purple/5 to-transparent bg-landing-dark">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-white">Cómo trabajamos</h2>
        </AnimatedSection>

        <div className="relative md:flex md:justify-between md:items-center">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-landing-orange via-landing-purple to-transparent -translate-x-1/2" />
          
          {process.map((item, i) => (
            <AnimatedSection key={i} className="relative md:w-[45%] mb-12 md:mb-0">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-landing-orange to-landing-pink rounded-full flex items-center justify-center font-bold text-white border-4 border-landing-dark z-10">
                  {item.number}
                </div>
                <div className={`${i % 2 === 1 ? 'md:order-first' : ''}`}>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">{item.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: 'Somos de acá',
      description: 'No somos una agencia de Buenos Aires que no sabe dónde queda Tunuyán. Conocemos el Valle, sus comercios y su gente.',
      icon: '📍',
    },
    {
      title: 'Creadores reales',
      description: 'Verificamos que los perfiles tengan seguidores genuinos en la zona antes de recomendarlos. Sin bots, sin audiencias infladas.',
      icon: '✅',
    },
    {
      title: 'Resultados medidos',
      description: 'Cada campaña termina con un informe que muestra exactamente qué pasó. Así sabés si valió la pena y qué mejorar la próxima vez.',
      icon: '📈',
    },
    {
      title: 'Precio claro',
      description: 'Sin sorpresas. Te decimos cuánto cuesta antes de empezar.',
      icon: '💵',
    },
  ];

  return (
    <section className="py-32 px-5 bg-landing-dark">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-white">Por qué NEXXO</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={i}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-landing-card border border-white/10 rounded-2xl p-8 flex gap-6 items-start"
              >
                <span className="text-4xl">{feature.icon}</span>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForWho() {
  return (
    <section className="py-32 px-5 bg-gradient-to-b from-landing-dark via-landing-pink/5 to-landing-dark">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-white">Para quién es NEXXO</h2>
          <p className="text-xl text-white/80 leading-relaxed mb-8">
            NEXXO es para el comercio local que quiere crecer sin perder plata en publicidad que no funciona. Para el restaurante, el gimnasio, la tienda, la estética o el emprendimiento que sabe que sus clientes están en Instagram pero no sabe cómo llegarles de verdad.
          </p>
          <p className="text-lg text-white/60">
            Si alguna vez pagaste publicidad y no viste resultados, o si nunca lo intentaste porque no sabías a quién confiarle esa tarea, NEXXO existe para vos.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Creators() {
  return (
    <section className="py-32 px-5 bg-landing-dark">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">Para creadores de contenido</h2>
          <p className="text-2xl text-white/80 mb-8 leading-relaxed">
            ¿Creás contenido en el Valle de Uco y querés monetizarlo?
          </p>
          <p className="text-lg text-white/60 mb-10 leading-relaxed">
            Sumarte a NEXXO es gratis. Cargás tu perfil, tu nicho y tus tarifas, y nosotros te conectamos con comercios locales que buscan exactamente lo que vos hacés. Sin perseguir marcas, sin propuestas que nunca llegan.
          </p>
          <a 
            href="#contacto" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-full font-semibold text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-1"
          >
            Quiero registrarme como creador
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-landing-dark border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <img src="/logo_transparent.png" alt="NEXXO" className="h-8 w-auto" />
          <span className="text-white text-lg font-bold">NEXXO</span>
        </div>
        
        <p className="text-white/60 text-sm">
          Valle de Uco, Mendoza · Marketing digital local para negocios reales.
        </p>
        
        <div className="flex gap-4 text-white/60 text-sm">
          <span>Instagram</span>
          <span>·</span>
          <span>WhatsApp</span>
        </div>
      </div>
      <div className="text-center text-white/40 text-sm mt-8">
        &copy; {new Date().getFullYear()} NEXXO. Todos los derechos reservados.
      </div>
    </footer>
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
            <p className="text-white/70">Te respondemos en menos de 24 horas.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-32 px-5 bg-landing-dark">
      <div className="max-w-xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">¿Hablamos?</h2>
          <p className="text-white/70">Contanos en qué negocio estás y qué querés lograr. Te respondemos en menos de 24 horas.</p>
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
              <option value="negocio" className="bg-landing-dark">Negocio / Comercio</option>
              <option value="creador" className="bg-landing-dark">Creador de contenido</option>
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
            <label className="block text-sm font-medium text-white/80 mb-2">Negocio (opcional)</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
              placeholder="Nombre de tu negocio"
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
              placeholder="Contanos sobre tu proyecto..."
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
      <Features />
      <ForWho />
      <Creators />
      <ContactForm />
      <LandingFooter />
    </div>
  );
}

export default Landing;
