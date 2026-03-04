import { Routes, Route, Navigate } from 'react-router';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import RegisterBusiness from './pages/RegisterBusiness';
import RecoverPassword from './pages/RecoverPassword';
import DashboardInfluencer from './pages/DashboardInfluencer';
import DashboardBusiness from './pages/DashboardBusiness';
import ProfileInfluencer from './pages/ProfileInfluencer';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/admin/AdminRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminInfluencers from './pages/admin/AdminInfluencers';
import AdminBusinesses from './pages/admin/AdminBusinesses';
import AdminCampaigns from './pages/admin/AdminCampaigns';
import AdminCollaborators from './pages/admin/AdminCollaborators';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/register-business" element={<RegisterBusiness />} />
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

        <Route path="/dashboard/business" element={
          <PrivateRoute allowedRoles={['business']}>
            <DashboardBusiness />
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Admin panel — fuera del Layout principal */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/*" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="influencers" element={<AdminInfluencers />} />
        <Route path="businesses" element={<AdminBusinesses />} />
        <Route path="campaigns" element={<AdminCampaigns />} />
        <Route path="collaborators" element={<AdminCollaborators />} />
      </Route>
    </Routes>
  );
}

export default App;
