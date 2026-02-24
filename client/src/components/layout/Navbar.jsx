import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo_transparent.png" alt="NEXXO" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-neutral-900">NEXXO</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login" className="text-neutral-600 hover:text-primary">
                  Iniciar Sesión
                </Link>
                <Link to="/onboarding" className="btn btn-primary">
                  Registrarme como Influencer
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard/influencer" className="text-neutral-600 hover:text-primary">
                  Dashboard
                </Link>
                <Link to="/profile/influencer" className="text-neutral-600 hover:text-primary">
                  Mi Perfil
                </Link>
                <button onClick={handleLogout} className="text-neutral-600 hover:text-error">
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
