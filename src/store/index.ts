import { create } from 'zustand';
import type {
  Product,
  Category,
  Testimonial,
  FaqItem,
  SiteSetting,
  WhatsappClick,
} from '../types';
import { defaultProducts } from '../data/products';
import { defaultCategories } from '../data/categories';
import { defaultTestimonials } from '../data/testimonials';
import { defaultFaqs } from '../data/faqs';
import { defaultSettings } from '../data/settings';
import { supabase } from '../lib/supabase';

type CatalogRow<T> = {
  id: string;
  status: string;
  sort_order: number;
  payload: T;
};

interface StoreState {
  products: Product[];
  categories: Category[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  settings: SiteSetting;
  whatsappClicks: WhatsappClick[];
  isAdminAuthenticated: boolean;
  isHydrating: boolean;

  initialize: () => Promise<void>;
  setProducts: (p: Product[]) => void;
  addProduct: (p: Product) => Promise<void>;
  updateProduct: (p: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  incrementProductViews: (id: string) => void;
  recordWhatsappClick: (productId: string, productName: string) => void;

  setCategories: (c: Category[]) => void;
  addCategory: (c: Category) => Promise<void>;
  updateCategory: (c: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  setTestimonials: (t: Testimonial[]) => void;
  addTestimonial: (t: Testimonial) => Promise<void>;
  updateTestimonial: (t: Testimonial) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  setFaqs: (f: FaqItem[]) => void;
  addFaq: (f: FaqItem) => Promise<void>;
  updateFaq: (f: FaqItem) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;

  updateSettings: (s: Partial<SiteSetting>) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const productRow = (product: Product) => ({
  id: product.id,
  slug: product.slug,
  category_id: product.categoryId || null,
  status: product.status,
  sort_order: product.sortOrder,
  payload: product,
  views: product.views || 0,
  whatsapp_clicks: product.whatsappClicks || 0,
  created_at: product.createdAt,
  updated_at: product.updatedAt,
  published_at: product.publishedAt || null,
});

const categoryRow = (category: Category) => ({
  id: category.id,
  slug: category.slug,
  status: category.status,
  sort_order: category.sortOrder,
  payload: category,
});

const testimonialRow = (testimonial: Testimonial) => ({
  id: testimonial.id,
  status: testimonial.status,
  sort_order: testimonial.sortOrder,
  payload: testimonial,
});

const faqRow = (faq: FaqItem) => ({
  id: faq.id,
  product_id: faq.productId || null,
  status: faq.status,
  sort_order: faq.sortOrder,
  payload: faq,
});

function mergeProduct(row: CatalogRow<Product> & {
  slug: string;
  category_id: string | null;
  views: number;
  whatsapp_clicks: number;
}): Product {
  return {
    ...row.payload,
    id: row.id,
    slug: row.slug,
    categoryId: row.category_id || row.payload.categoryId,
    status: row.status as Product['status'],
    sortOrder: row.sort_order,
    views: Number(row.views || 0),
    whatsappClicks: Number(row.whatsapp_clicks || 0),
  };
}

async function isCurrentUserAdmin() {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return false;
  const { data, error } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', userData.user.id)
    .maybeSingle();
  return !error && Boolean(data);
}

async function seedDefaults() {
  const { count } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true });
  if ((count || 0) > 0) return;

  const categories = await supabase
    .from('categories')
    .upsert(defaultCategories.map(categoryRow));
  if (categories.error) throw categories.error;

  const products = await supabase
    .from('products')
    .upsert(defaultProducts.map(productRow));
  if (products.error) throw products.error;

  const [testimonials, faqs, settings] = await Promise.all([
    supabase.from('testimonials').upsert(defaultTestimonials.map(testimonialRow)),
    supabase.from('faqs').upsert(defaultFaqs.map(faqRow)),
    supabase
      .from('site_settings')
      .upsert({ id: 'main', payload: defaultSettings }),
  ]);
  const failure = [testimonials.error, faqs.error, settings.error].find(Boolean);
  if (failure) throw failure;
}

async function loadRemoteState() {
  const [products, categories, testimonials, faqs, settings, clicks] =
    await Promise.all([
      supabase.from('products').select('*').order('sort_order'),
      supabase.from('categories').select('*').order('sort_order'),
      supabase.from('testimonials').select('*').order('sort_order'),
      supabase.from('faqs').select('*').order('sort_order'),
      supabase.from('site_settings').select('*').eq('id', 'main').maybeSingle(),
      supabase
        .from('whatsapp_clicks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100),
    ]);

  const firstError = [
    products.error,
    categories.error,
    testimonials.error,
    faqs.error,
    settings.error,
  ].find(Boolean);
  if (firstError) throw firstError;

  return {
    products:
      products.data?.map((row) => mergeProduct(row as never)) || [],
    categories:
      categories.data?.map((row) => ({
        ...(row.payload as Category),
        id: row.id,
        slug: row.slug,
        status: row.status,
        sortOrder: row.sort_order,
      })) || [],
    testimonials:
      testimonials.data?.map((row) => ({
        ...(row.payload as Testimonial),
        id: row.id,
        status: row.status,
        sortOrder: row.sort_order,
      })) || [],
    faqs:
      faqs.data?.map((row) => ({
        ...(row.payload as FaqItem),
        id: row.id,
        status: row.status,
        sortOrder: row.sort_order,
        productId: row.product_id || undefined,
      })) || [],
    settings: settings.data?.payload as SiteSetting | undefined,
    whatsappClicks:
      clicks.data?.map((row) => ({
        id: String(row.id),
        productId: row.product_id || '',
        productName: row.product_name,
        timestamp: row.created_at,
      })) || [],
  };
}

export const useStore = create<StoreState>((set, get) => ({
  products: defaultProducts,
  categories: defaultCategories,
  testimonials: defaultTestimonials,
  faqs: defaultFaqs,
  settings: defaultSettings,
  whatsappClicks: [],
  isAdminAuthenticated: false,
  isHydrating: true,

  initialize: async () => {
    set({ isHydrating: true });
    try {
      const admin = await isCurrentUserAdmin();
      if (admin) await seedDefaults();
      const remote = await loadRemoteState();
      set({
        products: remote.products.length ? remote.products : defaultProducts,
        categories: remote.categories.length
          ? remote.categories
          : defaultCategories,
        testimonials: remote.testimonials.length
          ? remote.testimonials
          : defaultTestimonials,
        faqs: remote.faqs.length ? remote.faqs : defaultFaqs,
        settings: remote.settings || defaultSettings,
        whatsappClicks: remote.whatsappClicks,
        isAdminAuthenticated: admin,
      });
    } catch (error) {
      console.error('Impossible de charger les données Supabase', error);
    } finally {
      set({ isHydrating: false });
    }
  },

  setProducts: (products) => set({ products }),
  addProduct: async (product) => {
    const previous = get().products;
    set({ products: [...previous, product] });
    const { error } = await supabase.from('products').insert(productRow(product));
    if (error) {
      set({ products: previous });
      throw error;
    }
  },
  updateProduct: async (product) => {
    const previous = get().products;
    set({
      products: previous.map((item) =>
        item.id === product.id ? product : item
      ),
    });
    const { error } = await supabase
      .from('products')
      .update(productRow(product))
      .eq('id', product.id);
    if (error) {
      set({ products: previous });
      throw error;
    }
  },
  deleteProduct: async (id) => {
    const previous = get().products;
    set({ products: previous.filter((item) => item.id !== id) });
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      set({ products: previous });
      throw error;
    }
  },
  incrementProductViews: (id) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? { ...product, views: (product.views || 0) + 1 }
          : product
      ),
    })),
  recordWhatsappClick: (productId, productName) =>
    set((state) => ({
      whatsappClicks: [
        ...state.whatsappClicks,
        {
          id: `wc-${Date.now()}`,
          productId,
          productName,
          timestamp: new Date().toISOString(),
        },
      ],
    })),

  setCategories: (categories) => set({ categories }),
  addCategory: async (category) => {
    const previous = get().categories;
    set({ categories: [...previous, category] });
    const { error } = await supabase
      .from('categories')
      .insert(categoryRow(category));
    if (error) {
      set({ categories: previous });
      throw error;
    }
  },
  updateCategory: async (category) => {
    const previous = get().categories;
    set({
      categories: previous.map((item) =>
        item.id === category.id ? category : item
      ),
    });
    const { error } = await supabase
      .from('categories')
      .update(categoryRow(category))
      .eq('id', category.id);
    if (error) {
      set({ categories: previous });
      throw error;
    }
  },
  deleteCategory: async (id) => {
    const previous = get().categories;
    set({ categories: previous.filter((item) => item.id !== id) });
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      set({ categories: previous });
      throw error;
    }
  },

  setTestimonials: (testimonials) => set({ testimonials }),
  addTestimonial: async (testimonial) => {
    const previous = get().testimonials;
    set({ testimonials: [...previous, testimonial] });
    const { error } = await supabase
      .from('testimonials')
      .insert(testimonialRow(testimonial));
    if (error) {
      set({ testimonials: previous });
      throw error;
    }
  },
  updateTestimonial: async (testimonial) => {
    const previous = get().testimonials;
    set({
      testimonials: previous.map((item) =>
        item.id === testimonial.id ? testimonial : item
      ),
    });
    const { error } = await supabase
      .from('testimonials')
      .update(testimonialRow(testimonial))
      .eq('id', testimonial.id);
    if (error) {
      set({ testimonials: previous });
      throw error;
    }
  },
  deleteTestimonial: async (id) => {
    const previous = get().testimonials;
    set({ testimonials: previous.filter((item) => item.id !== id) });
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    if (error) {
      set({ testimonials: previous });
      throw error;
    }
  },

  setFaqs: (faqs) => set({ faqs }),
  addFaq: async (faq) => {
    const previous = get().faqs;
    set({ faqs: [...previous, faq] });
    const { error } = await supabase.from('faqs').insert(faqRow(faq));
    if (error) {
      set({ faqs: previous });
      throw error;
    }
  },
  updateFaq: async (faq) => {
    const previous = get().faqs;
    set({ faqs: previous.map((item) => (item.id === faq.id ? faq : item)) });
    const { error } = await supabase
      .from('faqs')
      .update(faqRow(faq))
      .eq('id', faq.id);
    if (error) {
      set({ faqs: previous });
      throw error;
    }
  },
  deleteFaq: async (id) => {
    const previous = get().faqs;
    set({ faqs: previous.filter((item) => item.id !== id) });
    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (error) {
      set({ faqs: previous });
      throw error;
    }
  },

  updateSettings: async (partial) => {
    const previous = get().settings;
    const settings = { ...previous, ...partial };
    set({ settings });
    const { error } = await supabase
      .from('site_settings')
      .upsert({ id: 'main', payload: settings });
    if (error) {
      set({ settings: previous });
      throw error;
    }
  },

  login: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return false;
    const admin = await isCurrentUserAdmin();
    if (!admin) {
      await supabase.auth.signOut();
      return false;
    }
    await seedDefaults();
    const remote = await loadRemoteState();
    set({
      ...remote,
      settings: remote.settings || defaultSettings,
      isAdminAuthenticated: true,
    });
    return true;
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ isAdminAuthenticated: false });
  },
}));
