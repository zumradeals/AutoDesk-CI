import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloating } from './WhatsAppFloating';

export function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
