import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Headphones, Menu, MessageCircle, X } from 'lucide-react';
import { useStore } from '../../store';
import { buildWhatsappUrl } from '../../utils/whatsapp';
import { cn } from '../../utils/cn';

const navItems = [
  { label: 'Accueil', to: '/' },
  { label: 'Catalogue', to: '/catalogue' },
  {
    label: 'Solutions par métier',
    children: [
      { label: 'Architectes', to: '/metiers/architectes' },
      { label: 'BIM et construction', to: '/metiers/bim' },
      { label: 'Rendu architectural', to: '/metiers/rendu' },
      { label: 'Bureaux d’études', to: '/metiers/bureaux-etudes' },
      { label: 'Ingénieurs', to: '/metiers/ingenieurs' },
      { label: 'Conception mécanique', to: '/metiers/mecanique' },
    ],
  },
  { label: 'Notre engagement', to: '/a-propos' },
  { label: 'Aide', to: '/faq' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { settings } = useStore();

  const whatsappUrl = buildWhatsappUrl(
    settings.whatsappNumber,
    settings.whatsappDefaultMessage
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden bg-[#061f35] text-white sm:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 text-[11px] sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Headphones className="h-3.5 w-3.5 text-sky-300" />
            Assistance en français avant et après votre commande
          </span>
          <span className="font-semibold text-slate-200">
            Paiement Mobile Money · Service en ligne
          </span>
        </div>
      </div>

      <nav className="border-b border-slate-200/80 bg-white/95 shadow-sm shadow-slate-900/[.03] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <Link to="/" className="shrink-0" aria-label="Autodesk CI — Accueil">
            <img
              src="/brand/autodesk-ci-logo.svg"
              alt="Autodesk CI"
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((value) => !value)}
                    className="flex items-center gap-1 text-sm font-semibold text-slate-600 transition hover:text-[#0a3d62]"
                    aria-expanded={dropdownOpen}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4">
                      <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-slate-900/10">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={() => setDropdownOpen(false)}
                            className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#0a3d62]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to!}
                  className={({ isActive }) =>
                    cn(
                      'text-sm font-semibold transition',
                      isActive ? 'text-[#0a3d62]' : 'text-slate-600 hover:text-[#0a3d62]'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#20bd5a]"
            >
              <MessageCircle className="h-4 w-4" />
              Commander
            </a>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
            <div className="mx-auto max-w-7xl space-y-1">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="py-2">
                    <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[.14em] text-slate-400">
                      {item.label}
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to!}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="border-t border-slate-100 pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 text-sm font-bold text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Commander sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
