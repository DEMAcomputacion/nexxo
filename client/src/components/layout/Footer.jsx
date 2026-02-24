import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo_transparent.png" alt="NEXXO" className="h-8 w-auto" />
              <span className="text-white text-lg font-bold">NEXXO</span>
            </div>
            <p className="text-sm">
              Agencia boutique de marketing enfocada en matching entre influencers locales y negocios.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Para Influencers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/onboarding" className="hover:text-white">Regístrate</Link></li>
              <li><Link to="/login" className="hover:text-white">Iniciar Sesión</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>hola@nexxo.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} NEXXO. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
