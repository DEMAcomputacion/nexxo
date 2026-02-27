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
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-landing-dark px-4 py-16">
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
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 mb-8"
        >
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Agencia de Marketing Digital · Valle de Uco
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 text-white leading-tight"
        >
          La gente del Valle compra donde confía. Nosotros te mettons ahí.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base md:text-xl text-white/70 max-w-xl mx-auto mb-8 md:mb-10"
        >
          Conectamos negocios locales con creadores de contenido que tienen audiencia real en Tunuyán, Tupungato y San Carlos. Diseñamos la campaña, coordinamos todo y te mostramos los números.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12 md:mt-20"
        >
          <a 
            href="#contacto" 
            className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-full font-semibold text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-1"
          >
            Quiero más clientes
          </a>
          <a 
            href="#contacto" 
            className="px-6 md:px-8 py-3 md:py-4 bg-white/10 border border-white/20 rounded-full font-semibold text-white hover:bg-white/20 transition-all"
          >
            Soy creador de contenido
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 md:mt-16"
        >
          <div className="text-center">
            <Counter target={50} />
            <p className="text-white/60 text-sm mt-2">Creadores verificados en el Valle</p>
          </div>
          <div className="text-center">
            <Counter target={100} />
            <p className="text-white/60 text-sm mt-2">Campañas ejecutadas con resultados</p>
          </div>
          <div className="text-center">
            <span className="text-5xl font-extrabold bg-gradient-to-r from-landing-orange via-landing-coral via-landing-pink via-landing-purple to-landing-blue bg-clip-text text-transparent">&lt;24</span>
            <p className="text-white/60 text-sm mt-2">Tiempo de respuesta</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section id="problema" className="py-16 md:py-32 px-4 md:px-5 bg-landing-dark relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">
          <AnimatedSection>
            <div className="relative">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 left-0 w-full sm:w-72 p-4 sm:p-6 bg-landing-card border border-white/10 rounded-2xl backdrop-blur-xl"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-landing-orange/20 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4">📱</div>
                <h4 className="text-white/50 text-base sm:text-lg mb-2">Sin estrategia</h4>
                <p className="text-white/30 text-sm">Subís contenido todos los días, pero las ventas no se mueven. Sin un plan detrás, cada publicación es ruido.</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-36 sm:top-28 right-0 w-full sm:w-64 p-4 sm:p-6 bg-landing-card border border-white/10 rounded-2xl backdrop-blur-xl"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-landing-pink/20 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4">🌍</div>
                <h4 className="text-white/50 text-base sm:text-lg mb-2">Audiencia equivocada</h4>
                <p className="text-white/30 text-sm">Pagás por difusión y los likes llegan desde Buenos Aires, Córdoba o España. Ninguno de esos seguidores va a cruzar tu puerta.</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-[280px] sm:bottom-12 left-0 sm:left-8 w-full sm:w-72 p-4 sm:p-6 bg-landing-card border border-white/10 rounded-2xl backdrop-blur-xl"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-landing-purple/20 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4">❌</div>
                <h4 className="text-white/50 text-base sm:text-lg mb-2">Visitas sin conversión</h4>
                <p className="text-white/30 text-sm">Tenés visitas en el perfil, pero nadie pregunta, nadie compra, nadie aparece. El tráfico sin intención no es negocio.</p>
              </motion.div>

              <div className="h-[380px] sm:h-[500px]" />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-white leading-tight">
              Publicar no es vender
            </h2>
            <p className="text-base md:text-lg text-white/70 mb-6 md:mb-8 leading-relaxed">
              Sabés que tenés que estar en redes. El problema es cómo.
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Contratar a alguien con miles de seguidores no alcanza si esos seguidores no son de acá. En el Valle de Uco la gente compra donde confía, y la confianza se construye con caras conocidas, no con métricas infladas.
            </p>
            <p className="text-base md:text-lg text-white/70 mt-4 leading-relaxed">
              NEXXO identifica quién tiene influencia real en tu zona y convierte esa influencia en clientes para tu negocio.
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
      title: 'Escuchamos antes de proponer',
      description: 'Nos sentamos con vos (presencial o virtual) para entender qué vendés, a quién y qué resultado necesitás. No arrancamos hasta tener eso claro.',
    },
    {
      number: '2',
      title: 'Seleccionamos al creador correcto',
      description: 'Cruzamos tu rubro, tu zona y tu cliente ideal con nuestra base de creadores verificados. No elegimos al que tiene más seguidores: elegimos al que tiene los seguidores correctos.',
    },
    {
      number: '3',
      title: 'Ejecutamos la campaña completa',
      description: 'Definimos el formato, el mensaje y el calendario. El creador publica, nosotros supervisamos. Vos no coordinás nada.',
    },
    {
      number: '4',
      title: 'Medimos y te lo mostramos',
      description: 'Al cierre recibís un informe con datos concretos: alcance, interacciones, consultas generadas. Sin jerga, sin ambigüedades. Sabés exactamente qué pasó y qué ajustar.',
    },
  ];

  return (
    <section id="proceso" className="py-16 md:py-32 px-4 md:px-5 bg-gradient-to-b from-transparent via-landing-purple/5 to-transparent bg-landing-dark">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
          <h2 className="text-2xl md:text-5xl font-extrabold mb-4 md:mb-5 text-white">Cómo funciona</h2>
        </AnimatedSection>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-landing-orange via-landing-purple to-transparent -translate-x-1/2" />
          
          {process.map((item, i) => (
            <AnimatedSection key={i} className="relative mb-8 md:mb-12 last:mb-0">
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-landing-orange to-landing-pink rounded-full flex items-center justify-center font-bold text-white border-4 border-landing-dark z-10 text-sm">
                {item.number}
              </div>
              <div className={`md:w-[42%] ${i % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}`}>
                <div className="md:hidden w-10 h-10 bg-gradient-to-r from-landing-orange to-landing-pink rounded-full flex items-center justify-center font-bold text-white border-4 border-landing-dark z-10 text-sm mb-3">
                  {item.number}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">{item.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm">{item.description}</p>
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
      title: 'Operamos desde el Valle',
      description: 'No somos una agencia remota que busca tu localidad en Google Maps. Conocemos los comercios, las dinámicas y los tiempos de acá.',
      icon: '📍',
    },
    {
      title: 'Audiencias verificadas',
      description: 'Antes de recomendar un creador, analizamos su audiencia. Confirmamos que sus seguidores sean personas reales de la zona, no cuentas fantasma ni números comprados.',
      icon: '✅',
    },
    {
      title: 'Cada campaña tiene su informe',
      description: 'No te pedimos que confíes a ciegas. Te entregamos datos: qué se publicó, cuánta gente lo vio, cuántas consultas llegaron. Con eso decidís si repetir, ajustar o escalar.',
      icon: '📈',
    },
    {
      title: 'Presupuesto cerrado desde el inicio',
      description: 'Te decimos el costo total antes de arrancar. Sin cargos adicionales, sin letra chica, sin sorpresas a mitad de campaña.',
      icon: '💵',
    },
  ];

  return (
    <section className="py-16 md:py-32 px-4 md:px-5 bg-landing-dark">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <h2 className="text-2xl md:text-5xl font-extrabold mb-4 md:mb-5 text-white">Por qué NEXXO y no otra agencia</h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={i}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-landing-card border border-white/10 rounded-2xl p-5 md:p-8 flex gap-4 md:gap-6 items-start"
              >
                <span className="text-3xl md:text-4xl">{feature.icon}</span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base">{feature.description}</p>
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
    <section className="py-16 md:py-32 px-4 md:px-5 bg-gradient-to-b from-landing-dark via-landing-pink/5 to-landing-dark">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-2xl md:text-5xl font-extrabold mb-6 md:mb-8 text-white">¿Es NEXXO para vos?</h2>
          <p className="text-base md:text-xl text-white/80 leading-relaxed mb-6 md:mb-8">
            NEXXO trabaja con negocios del Valle de Uco que necesitan clientes locales: restaurantes, gimnasios, tiendas, estéticas, bodegas, emprendimientos. Si tus clientes están en Instagram y vos todavía no sabés cómo llegar a ellos de forma efectiva, estamos para resolver eso.
          </p>
          <p className="text-sm md:text-lg text-white/60">
            Si alguna vez pagaste publicidad y no pudiste medir qué pasó, o si nunca invertiste porque no encontraste a alguien de confianza, NEXXO existe exactamente para ese problema.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Creators() {
  return (
    <section className="py-16 md:py-32 px-4 md:px-5 bg-landing-dark">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-2xl md:text-5xl font-extrabold mb-4 md:mb-6 text-white">Para creadores de contenido del Valle de Uco</h2>
          <p className="text-lg md:text-2xl text-white/80 mb-6 md:mb-8 leading-relaxed">
            Si generás contenido en la zona y querés trabajar con marcas locales, registrate en NEXXO. Es gratis.
          </p>
          <p className="text-sm md:text-lg text-white/60 mb-8 md:mb-10 leading-relaxed">
            Cargás tu perfil, tu nicho y tus tarifas. Cuando un comercio necesite lo que vos hacés, te contactamos directamente. Sin perseguir marcas. Sin propuestas que nunca llegan. Vos creás, nosotros te conectamos con quien paga.
          </p>
          <a 
            href="#contacto" 
            className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-full font-semibold text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-1"
          >
            Registrarme como creador
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-landing-dark border-t border-white/10 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2">
          <img src="/logo_transparent.png" alt="NEXXO" className="h-6 md:h-8 w-auto" />
          <span className="text-white text-base md:text-lg font-bold">NEXXO</span>
        </div>
        
        <p className="text-white/60 text-xs md:text-sm text-center">
          Marketing digital local para negocios del Valle de Uco, Mendoza.
        </p>
        
        <div className="flex gap-3 md:gap-4 text-white/60 text-xs md:text-sm">
          <span>Instagram</span>
          <span>·</span>
          <span>WhatsApp</span>
        </div>
      </div>
      <div className="text-center text-white/40 text-xs md:text-sm mt-6 md:mt-8">
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
      <section id="contacto" className="py-16 md:py-32 px-4 md:px-5 bg-landing-dark">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-landing-card border border-white/10 rounded-2xl p-8 md:p-12"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">¡Consulta enviada!</h3>
            <p className="text-white/70 text-sm md:text-base">Te respondemos en menos de 24 horas.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-16 md:py-32 px-4 md:px-5 bg-landing-dark">
      <div className="max-w-xl mx-auto">
        <AnimatedSection className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-black mb-3 md:mb-4 text-white">Hablemos de tu negocio</h2>
          <p className="text-white/70 text-sm md:text-base">Contanos qué hacés y qué necesitás. Te respondemos en menos de 24 horas con una propuesta concreta.</p>
        </AnimatedSection>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-landing-card border border-white/10 rounded-2xl p-6 md:p-8 space-y-4 md:space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">¿Te comunicas como?</label>
            <select
              required
              className="w-full px-3 md:px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="" className="bg-landing-dark">Selecciona una opción</option>
              <option value="negocio" className="bg-landing-dark">Negocio / Comercio</option>
              <option value="creador" className="bg-landing-dark">Creador de contenido</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Nombre</label>
              <input
                type="text"
                required
                className="w-full px-3 md:px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
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
                className="w-full px-3 md:px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
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
              className="w-full px-3 md:px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange"
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
              className="w-full px-3 md:px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-landing-orange resize-none"
              placeholder="Contanos sobre tu proyecto..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-xl font-semibold text-white hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-1"
          >
            Enviar consulta
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
