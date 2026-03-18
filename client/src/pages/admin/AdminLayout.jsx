import { NavLink, Outlet, useNavigate } from 'react-router';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/influencers', label: 'Influencers' },
  { to: '/admin/businesses', label: 'Negocios' },
  { to: '/admin/campaigns', label: 'Campañas' },
  { to: '/admin/collaborators', label: 'Colaboradores' },
  { to: '/admin/users', label: 'Usuarios' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-landing-dark flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-white/[0.02] border-r border-white/10 flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <span className="text-white font-bold text-lg">NEXXO</span>
          <span className="ml-2 text-[10px] font-semibold uppercase tracking-widest text-white/40 border border-white/20 rounded px-1.5 py-0.5">Admin</span>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-white hover:bg-white/[0.05] transition"
          >
            Salir
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
