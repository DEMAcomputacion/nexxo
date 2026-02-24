import { Routes, Route, Navigate } from 'react-router';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterInfluencer from './pages/RegisterInfluencer';
import RecoverPassword from './pages/RecoverPassword';
import DashboardInfluencer from './pages/DashboardInfluencer';
import ProfileInfluencer from './pages/ProfileInfluencer';
import DashboardClient from './pages/DashboardClient';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/influencer" element={<RegisterInfluencer />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        
        <Route path="/dashboard/influencer" element={
          <PrivateRoute allowedRoles={['influencer']}>
            <DashboardInfluencer />
          </PrivateRoute>
        } />
        
        <Route path="/profile/influencer" element={
          <PrivateRoute allowedRoles={['influencer']}>
            <ProfileInfluencer />
          </PrivateRoute>
        } />
        
        <Route path="/dashboard/client" element={
          <PrivateRoute allowedRoles={['client']}>
            <DashboardClient />
          </PrivateRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
