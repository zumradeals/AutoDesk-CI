import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useStore } from '../store';
import {
  LayoutDashboard, Package, Tag, Star,
  Settings, LogOut, ExternalLink, FileQuestion
} from 'lucide-react';
import { cn } from '../utils/cn';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Tableau de bord', exact: true },
  { to: '/admin/produits', icon: Package, label: 'Produits' },
  { to: '/admin/categories', icon: Tag, label: 'Catégories' },
  { to: '/admin/faqs', icon: FileQuestion, label: 'FAQ' },
  { to: '/admin/temoignages', icon: Star, label: 'Témoignages' },
  { to: '/admin/settings', icon: Settings, label: 'Paramètres' },
];

export function AdminLayout() {
  const { isAdminAuthenticated, logout } = useStore();
  const { pathname } = useLocation();

  if (!isAdminAuthenticated) return <Navigate to="/admin/connexion" replace />;

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-navy font-black text-base leading-none">A</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">Autodesk CI</div>
              <div className="text-xs text-gray-500">Administration</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ to, icon: Icon, label, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gray-800 space-y-0.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Voir le site
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-red-900/30 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto bg-gray-950">
        <Outlet />
      </main>
    </div>
  );
}
