export type ProductStatus = 'published' | 'draft';

export interface ProductOffer {
  id: string;
  label: string;
  price: string | null;
  oldPrice?: string;
  isPromo?: boolean;
  duration?: string;
  description?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isMain: boolean;
}

export interface ProductFeature {
  id: string;
  text: string;
}

export interface ProductFaq {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  profiles: string[];
  usages: string[];
  advantages: string[];
  offers: ProductOffer[];
  compatibility: string;
  os: string[];
  deliveryTime: string;
  support: string;
  images: ProductImage[];
  features: ProductFeature[];
  faqs: ProductFaq[];
  relatedProductIds: string[];
  isPopular: boolean;
  isFeatured: boolean;
  status: ProductStatus;
  whatsappMessage: string;
  seoTitle: string;
  seoDescription: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  views: number;
  whatsappClicks: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
  status: 'active' | 'inactive';
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  text: string;
  rating: number;
  status: 'published' | 'draft';
  sortOrder: number;
  initials: string;
  color: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  categoryLabel?: string;
  sortOrder: number;
  status: 'published' | 'draft';
  productId?: string;
}

export interface SiteSetting {
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  logoText: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  seoSiteTitle: string;
  seoSiteDescription: string;
  facebookPixelId?: string;
}

export interface AdminUser {
  username: string;
  passwordHash: string;
}

export interface WhatsappClick {
  id: string;
  productId: string;
  productName: string;
  timestamp: string;
}

export interface PageView {
  id: string;
  path: string;
  timestamp: string;
}
