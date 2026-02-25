function Footer() {
  return (
    <footer className="bg-landing-dark border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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
        
        <div className="border-t border-white/10 mt-8 pt-8 text-sm text-center text-white/40">
          <p>&copy; {new Date().getFullYear()} NEXXO. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
