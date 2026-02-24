import { Routes, Route, Navigate } from 'react-router';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import RecoverPassword from './pages/RecoverPassword';
import DashboardInfluencer from './pages/DashboardInfluencer';
import ProfileInfluencer from './pages/ProfileInfluencer';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
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
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
