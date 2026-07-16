import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { useStore } from '../../store';
import { buildWhatsappUrl } from '../../utils/whatsapp';
import { cn } from '../../utils/cn';

const navItems = [
  { label: 'Accueil', to: '/' },
  { label: 'Catalogue', to: '/catalogue' },
  {
    label: 'Métiers',
    children: [
      { label: 'Logiciels pour Architectes', to: '/metiers/architectes' },
      { label: 'Logiciels BIM', to: '/metiers/bim' },
      { label: 'Rendu Architectural', to: '/metiers/rendu' },
      { label: 'Bureaux d\'Études', to: '/metiers/bureaux-etudes' },
      { label: 'Ingénieurs', to: '/metiers/ingenieurs' },
      { label: 'Conception Mécanique', to: '/metiers/mecanique' },
      { label: 'Bureautique Pro', to: '/metiers/bureautique' },
    ],
  },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { settings } = useStore();
  const navigate = useNavigate();

  const whatsappUrl = buildWhatsappUrl(
    settings.whatsappNumber,
    settings.whatsappDefaultMessage
  );

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-base leading-none">A</span>
          </div>
          <span className="text-lg font-bold text-navy">Autodesk CI</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="relative" onMouseLeave={() => setDropdownOpen(false)}>
                <button
                  onMouseEnter={() => setDropdownOpen(true)}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-navy transition-colors font-medium"
                >
                  {item.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-navy transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to!}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors',
                    isActive ? 'text-navy' : 'text-gray-600 hover:text-navy'
                  )
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <button
            onClick={() => navigate('/catalogue')}
            className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-navy-dark transition-colors"
          >
            Voir le catalogue
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-gray-600 hover:text-navy transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-1">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {item.label}
                </div>
                {item.children.map((child) => (
                  <Link
                    key={child.to}
                    to={child.to}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to!}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                {item.label}
              </Link>
            )
          )}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-lg text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              Contacter sur WhatsApp
            </a>
            <Link
              to="/catalogue"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center bg-navy text-white px-4 py-3 rounded-lg text-sm font-semibold"
            >
              Voir le catalogue
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
