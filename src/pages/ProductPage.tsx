import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import {
  CheckCircle, ChevronDown, ArrowRight, Monitor, Clock,
  Headphones, ArrowLeft, Star
} from 'lucide-react';
import { useStore } from '../store';
import { WhatsAppButton } from '../components/ui/WhatsAppButton';
import { Badge } from '../components/ui/Badge';
import { ProductCard } from '../components/product/ProductCard';
import { buildProductWhatsappMessage } from '../utils/whatsapp';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, categories } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedOffer, setSelectedOffer] = useState(0);

  const product = products.find((p) => p.slug === slug && p.status === 'published');
  if (!product) return <Navigate to="/catalogue" replace />;

  const category = categories.find((c) => c.id === product.categoryId);
  const related = products.filter(
    (p) => product.relatedProductIds.includes(p.id) && p.status === 'published'
  );
  const offer = product.offers[selectedOffer];
  const mainImage = product.images.find((i) => i.isMain) || product.images[0];

  const whatsappMsg = offer
    ? buildProductWhatsappMessage(product.name, offer.label, offer.price)
    : product.whatsappMessage;

  return (
    <>
      <Helmet>
        <title>{product.seoTitle}</title>
        <meta name="description" content={product.seoDescription} />
        <link rel="canonical" href={`https://autodesk-ci.com/produit/${product.slug}`} />
        <meta property="og:title" content={product.seoTitle} />
        <meta property="og:description" content={product.seoDescription} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.shortDescription,
          image: mainImage?.url,
          offers: product.offers.filter(o => o.price).map(o => ({
            '@type': 'Offer',
            name: o.label,
            price: o.price,
            priceCurrency: 'XOF',
            availability: 'https://schema.org/InStock',
          })),
        })}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-navy transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/catalogue" className="hover:text-navy transition-colors">Catalogue</Link>
          {category && (
            <>
              <span>/</span>
              <Link to={`/catalogue?categorie=${category.slug}`} className="hover:text-navy transition-colors">
                {category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top grid */}
        <div className="grid lg:grid-cols-5 gap-10 mb-16">
          {/* Left: Image + info */}
          <div className="lg:col-span-3 space-y-6">
            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              {product.isPopular && <Badge variant="popular">Populaire</Badge>}
              {product.offers.some((o) => o.isPromo) && <Badge variant="promo">Promotion</Badge>}
              {category && <Badge variant="neutral">{category.name}</Badge>}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.shortDescription}</p>

            {/* Main image */}
            {mainImage && (
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <img
                  src={mainImage.url}
                  alt={mainImage.alt}
                  className="w-full h-72 object-cover"
                />
              </div>
            )}

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              {product.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
              ))}
            </div>

            {/* Profils */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Pour qui ?</h3>
              <div className="flex flex-wrap gap-2">
                {product.profiles.map((p) => (
                  <span key={p} className="px-3 py-1.5 bg-blue-50 text-navy text-sm rounded-full font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Usages */}
            {product.usages.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Usages principaux</h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {product.usages.map((u) => (
                    <li key={u} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Avantages */}
            {product.advantages.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Points forts</h3>
                <ul className="space-y-2">
                  {product.advantages.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-gray-700">
                      <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Pricing card */}
          <div className="lg:col-span-2">
            <div className="sticky top-20 bg-white rounded-2xl border border-gray-100 shadow-lg p-6 space-y-5">
              <h2 className="text-lg font-bold text-gray-900">Choisir une offre</h2>

              {/* Offer selector */}
              <div className="space-y-2">
                {product.offers.map((o, i) => (
                  <button
                    key={o.id}
                    onClick={() => setSelectedOffer(i)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedOffer === i
                        ? 'border-navy bg-navy/5'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-gray-900 text-sm">{o.label}</span>
                      {o.isPromo && <Badge variant="promo">Promo</Badge>}
                    </div>
                    {o.duration && <div className="text-xs text-gray-500">{o.duration}</div>}
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className={`text-xl font-bold ${selectedOffer === i ? 'text-navy' : 'text-gray-800'}`}>
                        {o.price || 'Sur devis'}
                      </span>
                      {o.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">{o.oldPrice}</span>
                      )}
                    </div>
                    {o.description && (
                      <p className="text-xs text-gray-500 mt-1">{o.description}</p>
                    )}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <WhatsAppButton
                message={whatsappMsg}
                productId={product.id}
                productName={product.name}
                label="Obtenir ce logiciel"
                size="lg"
                fullWidth
              />

              {/* Meta info */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {product.deliveryTime}
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <Monitor className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  {product.compatibility}
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <Headphones className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  {product.support}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ produit */}
        {product.faqs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
            <div className="space-y-3 max-w-3xl">
              {product.faqs
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((faq, i) => (
                  <div key={faq.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 text-sm pr-4">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-navy flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5">
                        <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Produits associés */}
        {related.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Logiciels associés</h2>
              <Link to="/catalogue" className="text-sm font-semibold text-navy hover:underline flex items-center gap-1">
                Voir tout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.slice(0, 3).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-10">
          <Link to="/catalogue" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au catalogue
          </Link>
        </div>
      </div>
    </>
  );
}
