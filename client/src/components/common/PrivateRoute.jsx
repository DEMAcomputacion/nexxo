import { Navigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'influencer') {
      return <Navigate to="/dashboard/influencer" replace />;
    }
    if (user.role === 'client') {
      return <Navigate to="/dashboard/client" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
