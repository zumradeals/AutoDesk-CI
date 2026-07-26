import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Headphones,
  MessageCircle,
  Monitor,
  ShieldCheck,
  Smartphone,
  Star,
} from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { Badge } from '../components/ui/Badge';
import { WhatsAppButton } from '../components/ui/WhatsAppButton';
import { useStore } from '../store';
import { buildProductWhatsappMessage, buildWhatsappUrl } from '../utils/whatsapp';

const orderSteps = [
  {
    icon: MessageCircle,
    title: 'Échangez avec nous',
    text: 'Nous vérifions votre besoin et la bonne offre sur WhatsApp.',
  },
  {
    icon: Smartphone,
    title: 'Confirmez la commande',
    text: 'Choisissez votre moyen de paiement disponible.',
  },
  {
    icon: BadgeCheck,
    title: 'Recevez votre solution',
    text: 'Nous vous accompagnons pour l’accès et l’installation.',
  },
];

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, categories, testimonials, settings } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedOffer, setSelectedOffer] = useState(0);

  const product = products.find(
    (currentProduct) => currentProduct.slug === slug && currentProduct.status === 'published'
  );

  if (!product) return <Navigate to="/catalogue" replace />;

  const category = categories.find((currentCategory) => currentCategory.id === product.categoryId);
  const related = products.filter(
    (currentProduct) =>
      product.relatedProductIds.includes(currentProduct.id) &&
      currentProduct.status === 'published'
  );
  const visibleTestimonials = testimonials
    .filter((testimonial) => testimonial.status === 'published')
    .slice(0, 3);
  const offer = product.offers[selectedOffer] || product.offers[0];
  const mainImage = product.images.find((image) => image.isMain) || product.images[0];

  const whatsappMessage = offer
    ? buildProductWhatsappMessage(product.name, offer.label, offer.price)
    : product.whatsappMessage;
  const whatsappUrl = buildWhatsappUrl(settings.whatsappNumber, whatsappMessage);

  return (
    <>
      <Helmet>
        <title>{product.seoTitle}</title>
        <meta name="description" content={product.seoDescription} />
        <link rel="canonical" href={`https://autodesk-ci.com/produit/${product.slug}`} />
        <meta property="og:title" content={product.seoTitle} />
        <meta property="og:description" content={product.seoDescription} />
        {mainImage && <meta property="og:image" content={mainImage.url} />}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.shortDescription,
            image: mainImage?.url,
            offers: product.offers
              .filter((currentOffer) => currentOffer.price)
              .map((currentOffer) => ({
                '@type': 'Offer',
                name: currentOffer.label,
                priceCurrency: 'XOF',
                availability: 'https://schema.org/InStock',
              })),
          })}
        </script>
      </Helmet>

      <div className="border-b border-slate-100 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-hidden text-xs text-slate-500">
          <Link to="/" className="shrink-0 transition hover:text-[#0a3d62]">
            Accueil
          </Link>
          <span>/</span>
          <Link to="/catalogue" className="shrink-0 transition hover:text-[#0a3d62]">
            Catalogue
          </Link>
          {category && (
            <>
              <span>/</span>
              <Link
                to={`/catalogue?categorie=${category.slug}`}
                className="hidden shrink-0 transition hover:text-[#0a3d62] sm:inline"
              >
                {category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="truncate font-semibold text-slate-700">{product.name}</span>
        </div>
      </div>

      <section className="bg-[#f5f8fb] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {product.isPopular && <Badge variant="popular">Très demandé</Badge>}
              {product.offers.some((currentOffer) => currentOffer.isPromo) && (
                <Badge variant="promo">Offre spéciale</Badge>
              )}
              {category && <Badge variant="neutral">{category.name}</Badge>}
            </div>

            <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-[-.025em] text-slate-950 sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              {product.shortDescription}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-emerald-600" />
                {product.deliveryTime}
              </span>
              <span className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-emerald-600" />
                Assistance en français
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Conseil avant paiement
              </span>
            </div>

            {mainImage && (
              <div className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
                <img
                  src={mainImage.url}
                  alt={mainImage.alt}
                  className="h-72 w-full object-contain p-5 sm:h-[420px]"
                  decoding="async"
                />
                <span className="absolute bottom-4 left-4 rounded-xl bg-slate-950/85 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                  Visuel du produit
                </span>
              </div>
            )}
          </div>

          <aside>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-7 lg:sticky lg:top-32">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-sky-700">
                    Choisissez votre offre
                  </p>
                  <h2 className="mt-2 text-xl font-extrabold text-slate-950">
                    Prêt à démarrer ?
                  </h2>
                </div>
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,.12)]" />
              </div>

              <div className="mt-6 space-y-3">
                {product.offers.map((currentOffer, index) => {
                  const isSelected = selectedOffer === index;
                  return (
                    <button
                      key={currentOffer.id}
                      type="button"
                      onClick={() => setSelectedOffer(index)}
                      className={`w-full rounded-2xl border-2 p-4 text-left transition ${
                        isSelected
                          ? 'border-[#0a3d62] bg-blue-50/60 shadow-sm'
                          : 'border-slate-100 hover:border-slate-200'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{currentOffer.label}</p>
                          {currentOffer.duration && (
                            <p className="mt-1 text-xs text-slate-500">{currentOffer.duration}</p>
                          )}
                        </div>
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            isSelected
                              ? 'border-[#0a3d62] bg-[#0a3d62] text-white'
                              : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                        </span>
                      </div>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold tracking-tight text-[#0a3d62]">
                          {currentOffer.price || 'Sur devis'}
                        </span>
                        {currentOffer.oldPrice && (
                          <span className="text-sm text-slate-400 line-through">
                            {currentOffer.oldPrice}
                          </span>
                        )}
                      </div>
                      {currentOffer.description && (
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {currentOffer.description}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>

              <WhatsAppButton
                message={whatsappMessage}
                productId={product.id}
                productName={product.name}
                label="Commander sur WhatsApp"
                size="lg"
                fullWidth
                className="mt-5 rounded-xl shadow-[0_14px_30px_rgba(37,211,102,.2)]"
              />
              <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                Vous échangez avec un conseiller avant de confirmer le paiement.
              </p>

              <div className="mt-6 grid gap-3 border-t border-slate-100 pt-6 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <Monitor className="mt-0.5 h-4 w-4 shrink-0 text-[#0a3d62]" />
                  <span>{product.compatibility}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Headphones className="mt-0.5 h-4 w-4 shrink-0 text-[#0a3d62]" />
                  <span>{product.support}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-[#0a3d62]" />
                  <span>Mobile Money et virement selon disponibilité</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.14em] text-sky-700">
              Ce que vous obtenez
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">
              Une solution utile, avec un accompagnement réel
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
              {product.description.split('\n\n').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {product.usages.length > 0 && (
              <div className="mt-9">
                <h3 className="text-lg font-extrabold text-slate-900">Usages principaux</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.usages.map((usage) => (
                    <li key={usage} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                      {usage}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="rounded-[1.75rem] bg-[#061f35] p-7 text-white sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[.14em] text-sky-300">
              Points forts
            </p>
            <ul className="mt-6 space-y-5">
              {product.advantages.map((advantage) => (
                <li key={advantage} className="flex items-start gap-3 text-sm leading-6 text-slate-200">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {advantage}
                </li>
              ))}
            </ul>
            {product.profiles.length > 0 && (
              <div className="mt-8 border-t border-white/10 pt-7">
                <p className="text-xs font-bold uppercase tracking-[.14em] text-slate-400">
                  Recommandé pour
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.profiles.map((profile) => (
                    <span
                      key={profile}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-100"
                    >
                      {profile}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f8fb] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[.14em] text-sky-700">
              De la demande à l’installation
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">
              Comment commander ?
            </h2>
          </div>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {orderSteps.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0a3d62]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-black text-slate-300">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {visibleTestimonials.length > 0 && (
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[.14em] text-sky-700">
                  Expériences clients
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">
                  Ils nous ont fait confiance
                </h2>
              </div>
            </div>
            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {visibleTestimonials.map((testimonial) => (
                <article key={testimonial.id} className="rounded-2xl border border-slate-200 p-6">
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-7 text-slate-600">
                    “{testimonial.text}”
                  </blockquote>
                  <p className="mt-5 text-sm font-extrabold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {testimonial.role} · {testimonial.city}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {product.faqs.length > 0 && (
        <section className="bg-[#f5f8fb] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.14em] text-sky-700">
                Questions fréquentes
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">
                Avant de vous décider
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Une autre question ? Écrivez-nous pour recevoir une réponse adaptée à votre situation.
              </p>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {[...product.faqs]
                .sort((first, second) => first.sortOrder - second.sortOrder)
                .map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={faq.id}>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-4 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="font-bold text-slate-900">{faq.question}</span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-[#0a3d62] transition ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="pb-5 text-sm leading-7 text-slate-600">{faq.answer}</p>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[.14em] text-sky-700">
                  Complétez votre équipement
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">
                  Logiciels associés
                </h2>
              </div>
              <Link
                to="/catalogue"
                className="hidden items-center gap-2 text-sm font-bold text-[#0a3d62] hover:underline sm:flex"
              >
                Tout le catalogue
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
            <Link
              to="/catalogue"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#0a3d62]"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au catalogue
            </Link>
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-500">{offer?.label}</p>
            <p className="truncate text-base font-extrabold text-[#0a3d62]">
              {offer?.price || 'Sur devis'}
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Commander
          </a>
        </div>
      </div>
    </>
  );
}
