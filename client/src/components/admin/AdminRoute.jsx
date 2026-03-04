import { Navigate } from 'react-router';

function decodeJwtPayload(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

function isAdminTokenValid() {
  const token = sessionStorage.getItem('admin_token');
  if (!token) return false;
  const payload = decodeJwtPayload(token);
  if (!payload || !payload.adminAccess) return false;
  if (payload.exp && payload.exp * 1000 < Date.now()) return false;
  return true;
}

export default function AdminRoute({ children }) {
  if (!isAdminTokenValid()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
