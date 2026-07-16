import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, Category, Testimonial, FaqItem, SiteSetting, WhatsappClick } from '../types';
import { defaultProducts } from '../data/products';
import { defaultCategories } from '../data/categories';
import { defaultTestimonials } from '../data/testimonials';
import { defaultFaqs } from '../data/faqs';
import { defaultSettings } from '../data/settings';

interface StoreState {
  products: Product[];
  categories: Category[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  settings: SiteSetting;
  whatsappClicks: WhatsappClick[];
  isAdminAuthenticated: boolean;

  // Products
  setProducts: (p: Product[]) => void;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  incrementProductViews: (id: string) => void;
  recordWhatsappClick: (productId: string, productName: string) => void;

  // Categories
  setCategories: (c: Category[]) => void;
  addCategory: (c: Category) => void;
  updateCategory: (c: Category) => void;
  deleteCategory: (id: string) => void;

  // Testimonials
  setTestimonials: (t: Testimonial[]) => void;
  addTestimonial: (t: Testimonial) => void;
  updateTestimonial: (t: Testimonial) => void;
  deleteTestimonial: (id: string) => void;

  // FAQs
  setFaqs: (f: FaqItem[]) => void;
  addFaq: (f: FaqItem) => void;
  updateFaq: (f: FaqItem) => void;
  deleteFaq: (id: string) => void;

  // Settings
  updateSettings: (s: Partial<SiteSetting>) => void;

  // Auth
  login: (password: string) => boolean;
  logout: () => void;
}

const ADMIN_PASSWORD_KEY = 'autodesk_ci_admin_pwd';
const DEFAULT_PASSWORD = 'Admin@2024!';

function getStoredPassword(): string {
  return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      products: defaultProducts,
      categories: defaultCategories,
      testimonials: defaultTestimonials,
      faqs: defaultFaqs,
      settings: defaultSettings,
      whatsappClicks: [],
      isAdminAuthenticated: false,

      setProducts: (products) => set({ products }),
      addProduct: (product) => set((s) => ({ products: [...s.products, product] })),
      updateProduct: (product) =>
        set((s) => ({ products: s.products.map((p) => (p.id === product.id ? product : p)) })),
      deleteProduct: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      incrementProductViews: (id) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, views: (p.views || 0) + 1 } : p
          ),
        })),
      recordWhatsappClick: (productId, productName) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === productId ? { ...p, whatsappClicks: (p.whatsappClicks || 0) + 1 } : p
          ),
          whatsappClicks: [
            ...s.whatsappClicks,
            {
              id: `wc-${Date.now()}`,
              productId,
              productName,
              timestamp: new Date().toISOString(),
            },
          ],
        })),

      setCategories: (categories) => set({ categories }),
      addCategory: (category) => set((s) => ({ categories: [...s.categories, category] })),
      updateCategory: (category) =>
        set((s) => ({ categories: s.categories.map((c) => (c.id === category.id ? category : c)) })),
      deleteCategory: (id) => set((s) => ({ categories: s.categories.filter((c) => c.id !== id) })),

      setTestimonials: (testimonials) => set({ testimonials }),
      addTestimonial: (testimonial) =>
        set((s) => ({ testimonials: [...s.testimonials, testimonial] })),
      updateTestimonial: (testimonial) =>
        set((s) => ({
          testimonials: s.testimonials.map((t) => (t.id === testimonial.id ? testimonial : t)),
        })),
      deleteTestimonial: (id) =>
        set((s) => ({ testimonials: s.testimonials.filter((t) => t.id !== id) })),

      setFaqs: (faqs) => set({ faqs }),
      addFaq: (faq) => set((s) => ({ faqs: [...s.faqs, faq] })),
      updateFaq: (faq) =>
        set((s) => ({ faqs: s.faqs.map((f) => (f.id === faq.id ? faq : f)) })),
      deleteFaq: (id) => set((s) => ({ faqs: s.faqs.filter((f) => f.id !== id) })),

      updateSettings: (partial) =>
        set((s) => ({ settings: { ...s.settings, ...partial } })),

      login: (password) => {
        const stored = getStoredPassword();
        const ok = password === stored;
        if (ok) set({ isAdminAuthenticated: true });
        return ok;
      },
      logout: () => set({ isAdminAuthenticated: false }),
    }),
    {
      name: 'autodesk-ci-store',
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
        testimonials: state.testimonials,
        faqs: state.faqs,
        settings: state.settings,
        whatsappClicks: state.whatsappClicks,
      }),
    }
  )
);
