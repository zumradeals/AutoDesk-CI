import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Catalogue } from './pages/Catalogue';
import { ProductPage } from './pages/ProductPage';
import { MetierPage } from './pages/MetierPage';
import { About } from './pages/About';
import { Faq } from './pages/Faq';
import { Contact } from './pages/Contact';

import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminProducts } from './admin/AdminProducts';
import { AdminProductForm } from './admin/AdminProductForm';
import { AdminCategories } from './admin/AdminCategories';
import { AdminTestimonials } from './admin/AdminTestimonials';
import { AdminFaqs } from './admin/AdminFaqs';
import { AdminSettings } from './admin/AdminSettings';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/produit/:slug" element={<ProductPage />} />
            <Route path="/metiers/:slug" element={<MetierPage />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin/connexion" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="produits" element={<AdminProducts />} />
            <Route path="produits/:id" element={<AdminProductForm />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="temoignages" element={<AdminTestimonials />} />
            <Route path="faqs" element={<AdminFaqs />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
