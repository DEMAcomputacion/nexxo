import { Instagram, Facebook } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-landing-dark border-t border-white/[0.06] py-10">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-5">
        <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <img src="/logo_transparent.png" alt="NEXXO" className="h-7 w-auto" />
          <span className="font-black text-lg tracking-tight bg-gradient-to-r from-landing-orange via-landing-pink to-landing-blue bg-clip-text text-transparent">NEXXO</span>
        </a>

        <p className="text-white/30 text-xs text-center">
          Marketing digital local para negocios del Valle de Uco, Mendoza.
        </p>

        <div className="flex gap-4 text-white/40">
          <a href="https://www.instagram.com/agencia.nexxo.digital/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61586422825233" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="text-center text-white/20 text-xs mt-8">
        &copy; {new Date().getFullYear()} NEXXO. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
