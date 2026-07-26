import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Headphones,
  Image,
  MessageCircle,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from 'lucide-react';
import { useStore } from '../store';
import { ProductCard } from '../components/product/ProductCard';
import { WhatsAppButton } from '../components/ui/WhatsAppButton';
import { buildWhatsappUrl } from '../utils/whatsapp';

const categoryIcons: Record<string, LucideIcon> = {
  building: Building2,
  image: Image,
  settings: Settings2,
  'file-text': FileText,
};

const homeFaqs = [
  {
    q: 'Comment se déroule la commande ?',
    a: 'Choisissez votre logiciel puis écrivez-nous sur WhatsApp. Un conseiller confirme la bonne offre, le mode de paiement et vous accompagne jusqu’à l’installation.',
  },
  {
    q: 'Quel est le délai d’activation ?',
    a: 'L’activation Autodesk est généralement réalisée en moins de 15 minutes après confirmation. Le délai exact des autres solutions est indiqué avant le paiement.',
  },
  {
    q: 'Puis-je payer avec Mobile Money ?',
    a: 'Oui. Nous acceptons notamment Orange Money, MTN MoMo, Wave et le virement. Les options disponibles sont confirmées au moment de la commande.',
  },
  {
    q: 'Proposez-vous une assistance après l’achat ?',
    a: 'Oui. Notre équipe vous accompagne en français pour l’installation et reste disponible sur WhatsApp en cas de difficulté.',
  },
];

const guarantees = [
  { icon: Clock3, title: 'Activation rapide', text: 'Autodesk en moins de 15 min' },
  { icon: Headphones, title: 'Support humain', text: 'Accompagnement en français' },
  { icon: ShieldCheck, title: 'Paiement flexible', text: 'Mobile Money ou virement' },
];

const steps = [
  {
    number: '01',
    title: 'Choisissez',
    text: 'Trouvez le logiciel et l’offre adaptés à votre activité.',
  },
  {
    number: '02',
    title: 'Confirmez',
    text: 'Échangez avec un conseiller sur WhatsApp avant de payer.',
  },
  {
    number: '03',
    title: 'Recevez',
    text: 'Nous préparons vos accès et vous guidons pour l’installation.',
  },
];

export function Home() {
  const { products, categories, testimonials, settings } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const publishedProducts = products.filter((product) => product.status === 'published');
  const popularProducts = publishedProducts.filter((product) => product.isPopular).slice(0, 3);
  const featuredAutodesk = publishedProducts.find((product) => product.slug === 'autodesk');
  const activeCategories = categories.filter((category) => category.status === 'active').slice(0, 4);
  const visibleTestimonials = testimonials
    .filter((testimonial) => testimonial.status === 'published')
    .slice(0, 3);

  const whatsappUrl = buildWhatsappUrl(
    settings.whatsappNumber,
    settings.whatsappDefaultMessage
  );

  return (
    <>
      <Helmet>
        <title>{settings.seoSiteTitle}</title>
        <meta name="description" content={settings.seoSiteDescription} />
        <link rel="canonical" href="https://autodesk-ci.com/" />
        <meta property="og:title" content={settings.seoSiteTitle} />
        <meta property="og:description" content={settings.seoSiteDescription} />
        <meta property="og:url" content="https://autodesk-ci.com/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="relative overflow-hidden bg-[#061f35] px-4 pb-16 pt-12 text-white sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-blue-50 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,.14)]" />
              Service disponible en Côte d’Ivoire
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.7rem]">
              Les logiciels qui font avancer{' '}
              <span className="text-sky-300">vos projets.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Équipez votre activité avec Autodesk, SketchUp, Lumion et bien plus.
              Un conseiller vous accompagne en français, de la commande à l’installation.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {featuredAutodesk ? (
                <WhatsAppButton
                  message={featuredAutodesk.whatsappMessage}
                  productId={featuredAutodesk.id}
                  productName={featuredAutodesk.name}
                  label="Commander sur WhatsApp"
                  size="lg"
                  className="rounded-xl shadow-[0_16px_40px_rgba(37,211,102,.24)]"
                />
              ) : (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 font-bold text-white shadow-[0_16px_40px_rgba(37,211,102,.24)] transition hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Commander sur WhatsApp
                </a>
              )}
              <Link
                to="/catalogue"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/15"
              >
                Explorer le catalogue
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
              {['Conseil avant achat', 'Paiement Mobile Money', 'Support en français'].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky-400/20 to-transparent blur-xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white p-4 text-slate-900 shadow-2xl sm:p-5">
              <div className="flex items-center justify-between px-1 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">
                    Offre la plus demandée
                  </p>
                  <p className="mt-1 text-lg font-extrabold">Autodesk All Apps</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  Disponible
                </span>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-slate-50">
                <img
                  src="https://media.autodesk-ci.com/autodesk-ci.png?v=2"
                  alt="Collection de logiciels Autodesk"
                  className="h-56 w-full object-contain p-4 sm:h-64"
                  fetchPriority="high"
                  decoding="async"
                />
                <span className="absolute bottom-3 left-3 rounded-lg bg-slate-950/85 px-3 py-2 text-xs font-semibold text-white backdrop-blur">
                  Plus de 100 logiciels
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto] items-end gap-4 px-1 pt-5">
                <div>
                  <p className="text-sm text-slate-500">À partir de</p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#0a3d62]">
                    25 000 FCFA
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Offre annuelle · assistance incluse</p>
                </div>
                <Link
                  to="/produit/autodesk"
                  aria-label="Découvrir l’offre Autodesk"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a3d62] text-white transition hover:bg-[#083050]"
                >
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-slate-900 shadow-xl sm:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-slate-500">Commande accompagnée</p>
                <p className="text-sm font-bold">Un conseiller vous répond</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {guarantees.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4 px-4 py-6 sm:px-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0a3d62]">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">{title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-bold uppercase tracking-[.16em] text-sky-700">
                Trouver plus vite
              </span>
              <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Une solution pensée pour votre métier
              </h2>
            </div>
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0a3d62] hover:underline"
            >
              Voir tous les logiciels
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activeCategories.map((category) => {
              const Icon = categoryIcons[category.icon] || Building2;
              const productCount = publishedProducts.filter(
                (product) => product.categoryId === category.id
              ).length;
              return (
                <Link
                  key={category.id}
                  to={`/catalogue?categorie=${category.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-200/60"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-[#0a3d62] transition group-hover:bg-[#0a3d62] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-extrabold text-slate-900">{category.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {category.description}
                  </p>
                  <span className="mt-5 flex items-center gap-1.5 text-xs font-bold text-sky-700">
                    {productCount} solution{productCount > 1 ? 's' : ''}
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f8fb] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[.16em] text-sky-700">
              <Sparkles className="h-4 w-4" />
              Les plus demandés
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Commencez avec une valeur sûre
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Des outils choisis par les architectes, ingénieurs et créateurs que nous accompagnons.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-[.16em] text-sky-700">
              Simple et accompagné
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Pas de parcours compliqué. On vous guide.
            </h2>
            <p className="mt-5 max-w-lg leading-7 text-slate-600">
              Vous n’avez pas besoin de connaître la bonne version à l’avance. Expliquez-nous
              votre besoin et nous vérifions l’offre avec vous avant la commande.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0a3d62] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#083050]"
            >
              Parler à un conseiller
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>

          <ol className="grid gap-4 sm:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.number}
                className="relative min-h-[220px] overflow-hidden rounded-2xl border border-slate-200 p-6"
              >
                <span className="absolute -right-2 -top-6 text-8xl font-black text-slate-50">
                  {step.number}
                </span>
                <span className="relative text-sm font-extrabold text-sky-700">{step.number}</span>
                <h3 className="relative mt-10 text-xl font-extrabold text-slate-900">
                  {step.title}
                </h3>
                <p className="relative mt-3 text-sm leading-6 text-slate-500">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {visibleTestimonials.length > 0 && (
        <section className="bg-[#061f35] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="text-sm font-bold uppercase tracking-[.16em] text-sky-300">
                  La confiance se mérite
                </span>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Ils ont déjà fait le pas
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                Avis clients vérifiés par notre équipe
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {visibleTestimonials.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className="rounded-2xl border border-white/10 bg-white/[.07] p-6 backdrop-blur"
                >
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-5 text-sm leading-7 text-slate-200">
                    “{testimonial.text}”
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${testimonial.color}`}
                    >
                      {testimonial.initials}
                    </span>
                    <div>
                      <p className="text-sm font-bold">{testimonial.name}</p>
                      <p className="text-xs text-slate-400">
                        {testimonial.role} · {testimonial.city}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <span className="text-sm font-bold uppercase tracking-[.16em] text-sky-700">
              Avant de commander
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">
              Vos questions, nos réponses
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Besoin d’une précision supplémentaire ? Notre équipe vous répond directement.
            </p>
            <Link
              to="/faq"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0a3d62] hover:underline"
            >
              Consulter toute la FAQ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {homeFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-slate-900">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#0a3d62] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="max-w-2xl pb-5 text-sm leading-7 text-slate-600">{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f8fb] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0a3d62] to-[#0f5486] px-6 py-12 text-center text-white shadow-xl sm:px-12 lg:py-16">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Zap className="h-6 w-6 text-amber-300" />
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Un projet à équiper aujourd’hui ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Dites-nous ce que vous souhaitez réaliser. Nous vous orientons vers la solution
            adaptée avant toute commande.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 font-bold text-white transition hover:bg-[#20bd5a]"
            >
              <MessageCircle className="h-5 w-5" />
              Démarrer sur WhatsApp
            </a>
            <Link
              to="/catalogue"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-bold text-white transition hover:bg-white/15"
            >
              Voir les offres
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-blue-100">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Réponse rapide
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-emerald-300" />
              Conseil personnalisé
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
