import { Outlet, useLocation } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen flex flex-col">
      {!isLanding && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isLanding && !isDashboard && <Footer />}
    </div>
  );
}

export default Layout;
