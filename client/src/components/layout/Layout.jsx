import { Outlet, useLocation } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {!isLanding && <Footer />}
    </div>
  );
}

export default Layout;
