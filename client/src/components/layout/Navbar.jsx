import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLanding = location.pathname === '/';
  const isAuthPage = location.pathname === '/onboarding' || location.pathname === '/login' || location.pathname === '/register-business';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navBgClass = isLanding 
    ? 'bg-transparent absolute' 
    : 'bg-white shadow-sm border-b border-neutral-200';
    
  const textClass = isLanding ? 'text-white' : 'text-neutral-900';
  const hoverClass = isLanding ? 'hover:text-white' : 'hover:text-primary';

  return (
    <nav className={`${navBgClass} z-50 transition-all`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo_transparent.png" alt="NEXXO" className="h-10 w-auto" />
            <span className={`text-2xl font-bold ${textClass}`}>NEXXO</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {!user ? (
              !isAuthPage && (
                <>
                  <Link to="/login" className={`${textClass} ${hoverClass} font-medium`}>
                    Iniciar Sesión
                  </Link>
                  {isLanding ? (
                    <Link to="/register-business" className="px-6 py-2.5 bg-gradient-to-r from-landing-orange via-landing-coral to-landing-pink rounded-full font-semibold text-white text-sm hover:shadow-[0_10px_30px_rgba(255,107,53,0.4)] transition-all">
                      Empezar Ahora
                    </Link>
                  ) : (
                    <Link to="/onboarding" className="btn btn-primary text-sm">
                      Registrarme como Influencer
                    </Link>
                  )}
                </>
              )
            ) : (
              <>
                <Link to="/dashboard/influencer" className={`${textClass} ${hoverClass}`}>
                  Dashboard
                </Link>
                <Link to="/profile/influencer" className={`${textClass} ${hoverClass}`}>
                  Mi Perfil
                </Link>
                <button onClick={handleLogout} className={isLanding ? 'text-white/70 hover:text-white' : 'text-neutral-600 hover:text-error'}>
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
