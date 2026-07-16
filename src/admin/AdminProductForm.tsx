import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import type { Product } from '../types';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const emptyProduct: Omit<Product, 'id' | 'createdAt'> = {
  slug: '',
  name: '',
  categoryId: '',
  shortDescription: '',
  description: '',
  profiles: [],
  usages: [],
  advantages: [],
  offers: [],
  compatibility: '',
  os: [],
  deliveryTime: '',
  support: '',
  images: [],
  features: [],
  faqs: [],
  relatedProductIds: [],
  isPopular: false,
  isFeatured: false,
  status: 'draft',
  whatsappMessage: '',
  seoTitle: '',
  seoDescription: '',
  sortOrder: 100,
  updatedAt: new Date().toISOString(),
  views: 0,
  whatsappClicks: 0,
};

export function AdminProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, categories, addProduct, updateProduct } = useStore();

  const existing = id && id !== 'nouveau' ? products.find((p) => p.id === id) : null;
  const [form, setForm] = useState<typeof emptyProduct>(
    existing ? { ...existing } : { ...emptyProduct }
  );
  const [saved, setSaved] = useState(false);

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existing) {
      updateProduct({ ...form, id: existing.id, updatedAt: new Date().toISOString() } as Product);
    } else {
      const newId = `prod-${generateId()}`;
      addProduct({ ...form, id: newId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as Product);
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); navigate('/admin/produits'); }, 1000);
  };

  const addOffer = () => {
    set('offers', [...form.offers, { id: generateId(), label: '', price: null, duration: '' }]);
  };

  const updateOffer = (index: number, key: string, value: any) => {
    const updated = [...form.offers];
    updated[index] = { ...updated[index], [key]: value };
    set('offers', updated);
  };

  const removeOffer = (index: number) => {
    set('offers', form.offers.filter((_, i) => i !== index));
  };

  const addFaq = () => {
    set('faqs', [...form.faqs, { id: generateId(), question: '', answer: '', sortOrder: form.faqs.length + 1 }]);
  };

  const updateFaq = (index: number, key: string, value: any) => {
    const updated = [...form.faqs];
    updated[index] = { ...updated[index], [key]: value };
    set('faqs', updated);
  };

  const removeFaq = (index: number) => {
    set('faqs', form.faqs.filter((_, i) => i !== index));
  };

  const inputCls = 'w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500';
  const labelCls = 'block text-xs font-medium text-gray-400 mb-1';

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/produits')} className="text-gray-500 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {existing ? 'Modifier le produit' : 'Nouveau produit'}
          </h1>
          <p className="text-gray-400 text-sm">{form.name || 'Sans titre'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations de base */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Informations de base</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nom du produit *</label>
              <input required value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} placeholder="ex: Autodesk All Apps" />
            </div>
            <div>
              <label className={labelCls}>Slug (URL) *</label>
              <input required value={form.slug} onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} className={inputCls} placeholder="ex: autodesk-all-apps" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Catégorie</label>
              <select value={form.categoryId} onChange={(e) => set('categoryId', e.target.value)} className={inputCls + ' bg-gray-800'}>
                <option value="">Sélectionner...</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Statut</label>
              <select value={form.status} onChange={(e) => set('status', e.target.value)} className={inputCls + ' bg-gray-800'}>
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls}>Description courte *</label>
            <textarea required value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} rows={2} className={inputCls + ' resize-none'} />
          </div>
          <div>
            <label className={labelCls}>Description complète</label>
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={6} className={inputCls + ' resize-y'} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="popular" checked={form.isPopular} onChange={(e) => set('isPopular', e.target.checked)} className="w-4 h-4 accent-blue-500" />
              <label htmlFor="popular" className="text-sm text-gray-300">Marquer comme populaire</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} className="w-4 h-4 accent-blue-500" />
              <label htmlFor="featured" className="text-sm text-gray-300">Produit phare</label>
            </div>
          </div>
        </section>

        {/* Image */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Image principale</h2>
          <div>
            <label className={labelCls}>URL de l'image</label>
            <input
              value={form.images[0]?.url || ''}
              onChange={(e) => set('images', [{ id: generateId(), url: e.target.value, alt: form.name, isMain: true }])}
              className={inputCls}
              placeholder="https://..."
            />
          </div>
          {form.images[0]?.url && (
            <img src={form.images[0].url} alt="Aperçu" className="h-40 w-full object-cover rounded-lg" />
          )}
        </section>

        {/* Offres */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold">Offres et tarifs</h2>
            <button type="button" onClick={addOffer} className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Ajouter une offre
            </button>
          </div>
          {form.offers.map((offer, i) => (
            <div key={offer.id} className="border border-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Offre {i + 1}</span>
                <button type="button" onClick={() => removeOffer(i)} className="text-red-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Libellé</label>
                  <input value={offer.label} onChange={(e) => updateOffer(i, 'label', e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Prix (ex: 25 000 FCFA ou vide = Sur devis)</label>
                  <input value={offer.price || ''} onChange={(e) => updateOffer(i, 'price', e.target.value || null)} className={inputCls} placeholder="Sur devis" />
                </div>
                <div>
                  <label className={labelCls}>Durée</label>
                  <input value={offer.duration || ''} onChange={(e) => updateOffer(i, 'duration', e.target.value)} className={inputCls} />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input type="checkbox" id={`promo-${i}`} checked={offer.isPromo || false} onChange={(e) => updateOffer(i, 'isPromo', e.target.checked)} className="w-4 h-4 accent-blue-500" />
                  <label htmlFor={`promo-${i}`} className="text-sm text-gray-300">Promotion</label>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Profils et usages */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Profils et usages</h2>
          <div>
            <label className={labelCls}>Profils cibles (séparés par des virgules)</label>
            <input
              value={form.profiles.join(', ')}
              onChange={(e) => set('profiles', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
              className={inputCls}
              placeholder="Architectes, Ingénieurs, ..."
            />
          </div>
          <div>
            <label className={labelCls}>Usages principaux (un par ligne)</label>
            <textarea
              value={form.usages.join('\n')}
              onChange={(e) => set('usages', e.target.value.split('\n').filter(Boolean))}
              rows={4}
              className={inputCls + ' resize-none'}
            />
          </div>
          <div>
            <label className={labelCls}>Avantages / Points forts (un par ligne)</label>
            <textarea
              value={form.advantages.join('\n')}
              onChange={(e) => set('advantages', e.target.value.split('\n').filter(Boolean))}
              rows={4}
              className={inputCls + ' resize-none'}
            />
          </div>
        </section>

        {/* Compatibilité */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Compatibilité et livraison</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Compatibilité</label>
              <input value={form.compatibility} onChange={(e) => set('compatibility', e.target.value)} className={inputCls} placeholder="Windows 10/11, macOS 12+" />
            </div>
            <div>
              <label className={labelCls}>Délai de livraison</label>
              <input value={form.deliveryTime} onChange={(e) => set('deliveryTime', e.target.value)} className={inputCls} placeholder="Sous 24 heures" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Accompagnement inclus</label>
            <input value={form.support} onChange={(e) => set('support', e.target.value)} className={inputCls} />
          </div>
        </section>

        {/* WhatsApp */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Message WhatsApp par défaut</h2>
          <textarea
            value={form.whatsappMessage}
            onChange={(e) => set('whatsappMessage', e.target.value)}
            rows={4}
            className={inputCls + ' resize-none'}
            placeholder="Bonjour, je souhaite des informations sur [NOM DU PRODUIT]..."
          />
        </section>

        {/* FAQ produit */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold">FAQ du produit</h2>
            <button type="button" onClick={addFaq} className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Ajouter une question
            </button>
          </div>
          {form.faqs.map((faq, i) => (
            <div key={faq.id} className="border border-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Question {i + 1}</span>
                <button type="button" onClick={() => removeFaq(i)} className="text-red-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <input value={faq.question} onChange={(e) => updateFaq(i, 'question', e.target.value)} placeholder="Question..." className={inputCls} />
              <textarea value={faq.answer} onChange={(e) => updateFaq(i, 'answer', e.target.value)} rows={2} placeholder="Réponse..." className={inputCls + ' resize-none'} />
            </div>
          ))}
        </section>

        {/* SEO */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-semibold">SEO</h2>
          <div>
            <label className={labelCls}>Titre SEO</label>
            <input value={form.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Description SEO</label>
            <textarea value={form.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} rows={2} className={inputCls + ' resize-none'} />
          </div>
        </section>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saved ? 'Enregistré !' : 'Enregistrer'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/produits')}
            className="px-6 py-3 border border-gray-700 text-gray-400 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
