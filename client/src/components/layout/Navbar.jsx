import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const DARK_PATHS = ['/login', '/onboarding', '/register-business', '/recover-password', '/colaboradores'];

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLanding = location.pathname === '/';
  const isDark =
    isLanding ||
    DARK_PATHS.includes(location.pathname) ||
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/profile');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const dashboardLink =
    user?.role === 'business' ? '/dashboard/business' : '/dashboard/influencer';

  if (isLanding) return null;

  return (
    <nav
      className={`z-50 transition-all duration-300 ${
        isDark
          ? 'bg-landing-dark/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-white shadow-sm border-b border-neutral-200'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-14 sm:h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo_transparent.png" alt="NEXXO" className="h-7 sm:h-8 w-auto" />
            <span className={`font-bold text-base sm:text-lg tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              NEXXO
            </span>
          </Link>

          {user && (
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                to={dashboardLink}
                className={`text-sm font-medium transition-colors ${
                  isDark ? 'text-white/60 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Dashboard
              </Link>
              {user.role === 'influencer' && (
                <Link
                  to="/profile/influencer"
                  className={`text-sm font-medium transition-colors hidden sm:block ${
                    isDark ? 'text-white/60 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Mi Perfil
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={`text-sm transition-colors ${
                  isDark ? 'text-white/40 hover:text-white/70' : 'text-neutral-400 hover:text-red-500'
                }`}
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
