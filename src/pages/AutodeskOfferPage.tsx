import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock3,
  Headphones,
  MessageCircle,
  Monitor,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { useStore } from '../store';
import { buildProductWhatsappMessage, buildWhatsappUrl, trackFbLead } from '../utils/whatsapp';

const includedApps = [
  'AutoCAD',
  'Revit',
  '3ds Max',
  'Civil 3D',
  'Fusion 360',
  'Inventor',
  'Maya',
  'Navisworks',
];

const campaignFaqs = [
  {
    question: 'Comment savoir si cette offre convient à mon activité ?',
    answer:
      'Écrivez-nous sur WhatsApp en précisant votre métier et les logiciels que vous utilisez. Un conseiller vérifie gratuitement l’offre avec vous avant la commande.',
  },
  {
    question: 'Combien de temps faut-il pour démarrer ?',
    answer:
      'L’activation est généralement réalisée en moins de 15 minutes après confirmation. Nous vous accompagnons ensuite pour l’installation.',
  },
  {
    question: 'Quels moyens de paiement sont disponibles ?',
    answer:
      'Le paiement peut être effectué par Mobile Money ou virement selon votre pays. Le moyen disponible est confirmé avec vous avant la commande.',
  },
];

export function AutodeskOfferPage() {
  const { products, testimonials, settings, recordWhatsappClick } = useStore();
  const [searchParams] = useSearchParams();
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(0);

  const product = products.find(
    (currentProduct) =>
      currentProduct.slug === 'autodesk' && currentProduct.status === 'published'
  );

  if (!product) return <Navigate to="/catalogue" replace />;

  const pricedOffers = product.offers.filter((offer) => offer.price);
  const offer = pricedOffers[selectedOfferIndex] || pricedOffers[0];
  const testimonial = testimonials.find(
    (currentTestimonial) => currentTestimonial.status === 'published'
  );
  const campaign = searchParams.get('utm_campaign');
  const adContent = searchParams.get('utm_content');
  const attribution = [
    campaign ? `Campagne : ${campaign}` : '',
    adContent ? `Annonce : ${adContent}` : '',
  ]
    .filter(Boolean)
    .join(' · ');
  const baseMessage = buildProductWhatsappMessage(
    product.name,
    offer?.label,
    offer?.price
  );
  const whatsappMessage = attribution
    ? `${baseMessage}\n\nRéférence : ${attribution}`
    : baseMessage;
  const whatsappUrl = buildWhatsappUrl(settings.whatsappNumber, whatsappMessage);

  const handleCampaignClick = () => {
    trackFbLead();
    recordWhatsappClick(product.id, `${product.name} — page offre`);
  };

  return (
    <>
      <Helmet>
        <title>Offre Autodesk All Apps dès 25 000 FCFA | Autodesk CI</title>
        <meta
          name="description"
          content="Plus de 100 logiciels Autodesk, dont AutoCAD, Revit et 3ds Max. Activation rapide et accompagnement en français dès 25 000 FCFA."
        />
        <link rel="canonical" href="https://autodesk-ci.com/offre/autodesk" />
        <meta property="og:title" content="Autodesk All Apps dès 25 000 FCFA" />
        <meta
          property="og:description"
          content="AutoCAD, Revit, 3ds Max et plus de 100 logiciels avec accompagnement en français."
        />
        <meta
          property="og:image"
          content="https://media.autodesk-ci.com/autodesk-ci.png?v=2"
        />
      </Helmet>

      <section className="relative overflow-hidden bg-[#061f35] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-20">
        <div className="absolute -right-28 -top-32 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_.9fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-xs font-bold text-sky-200">
              <Sparkles className="h-4 w-4" />
              Offre Autodesk la plus demandée
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-[-.035em] sm:text-5xl lg:text-[3.5rem]">
              Plus de 100 logiciels.{' '}
              <span className="text-sky-300">Une seule offre.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              AutoCAD, Revit, 3ds Max, Civil 3D, Fusion 360 et bien plus pour
              concevoir, construire et présenter vos projets.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Clock3, text: 'Activation rapide' },
                { icon: Headphones, text: 'Support en français' },
                { icon: ShieldCheck, text: 'Conseil avant paiement' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-slate-200">
                  <Icon className="h-4 w-4 text-emerald-400" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white p-5 text-slate-900 shadow-2xl sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-sky-700">
                  Choisissez votre formule
                </p>
                <h2 className="mt-2 text-xl font-extrabold">Autodesk All Apps</h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                Disponible
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {pricedOffers.map((currentOffer, index) => {
                const isSelected = selectedOfferIndex === index;
                return (
                  <button
                    key={currentOffer.id}
                    type="button"
                    onClick={() => setSelectedOfferIndex(index)}
                    aria-pressed={isSelected}
                    className={`relative rounded-2xl border-2 p-4 text-left transition ${
                      isSelected
                        ? 'border-[#0a3d62] bg-blue-50/70'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    {currentOffer.isPromo && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-black uppercase text-amber-950">
                        Économisez 40%
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-500">
                      {currentOffer.duration}
                    </span>
                    <span className="mt-2 block text-xl font-extrabold text-[#0a3d62]">
                      {currentOffer.price}
                    </span>
                    {currentOffer.oldPrice && (
                      <span className="mt-1 block text-xs text-slate-400 line-through">
                        {currentOffer.oldPrice}
                      </span>
                    )}
                    <span
                      className={`absolute bottom-4 right-4 flex h-5 w-5 items-center justify-center rounded-full ${
                        isSelected
                          ? 'bg-[#0a3d62] text-white'
                          : 'border-2 border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </span>
                  </button>
                );
              })}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCampaignClick}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 font-bold text-white shadow-[0_14px_30px_rgba(37,211,102,.2)] transition hover:bg-[#20bd5a]"
            >
              <MessageCircle className="h-5 w-5" />
              Commander sur WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-slate-500">
              Un conseiller confirme tous les détails avec vous avant le paiement.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ['100+', 'logiciels inclus'],
            ['15 min', 'délai Autodesk habituel'],
            ['7j/7', 'assistance WhatsApp'],
          ].map(([value, label]) => (
            <div key={label} className="px-6 py-6 text-center">
              <p className="text-2xl font-extrabold text-[#0a3d62]">{value}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
            <img
              src="https://media.autodesk-ci.com/autodesk-ci.png?v=2"
              alt="Logiciels inclus dans Autodesk All Apps"
              className="h-72 w-full object-contain sm:h-96"
              decoding="async"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[.14em] text-sky-700">
              Tout ce qu’il vous faut
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              De l’idée au projet livré
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Une collection complète pour le dessin technique, le BIM, la modélisation,
              le rendu, la conception mécanique et l’ingénierie civile.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {includedApps.map((app) => (
                <div
                  key={app}
                  className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-sm font-bold text-slate-700"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  {app}
                </div>
              ))}
            </div>
            <Link
              to="/produit/autodesk"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0a3d62] hover:underline"
            >
              Voir tous les détails de l’offre
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f8fb] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[.14em] text-sky-700">
              Une commande sans complication
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">
              Vous êtes accompagné à chaque étape
            </h2>
          </div>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ['01', 'Écrivez-nous', 'Précisez votre métier et la formule qui vous intéresse.'],
              ['02', 'Confirmez', 'Nous vérifions l’offre et le moyen de paiement avec vous.'],
              ['03', 'Commencez', 'Recevez votre accès et notre aide pour l’installation.'],
            ].map(([number, title, text]) => (
              <li key={number} className="rounded-2xl border border-slate-200 bg-white p-6">
                <span className="text-sm font-black text-sky-700">{number}</span>
                <h3 className="mt-8 text-xl font-extrabold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {testimonial && (
        <section className="bg-[#061f35] px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[auto_1fr]">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-sky-200">
              <BadgeCheck className="h-8 w-8" />
            </span>
            <div>
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-lg leading-8 text-slate-200">
                “{testimonial.text}”
              </blockquote>
              <p className="mt-4 text-sm font-bold">
                {testimonial.name} · {testimonial.city}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.14em] text-sky-700">
              Questions fréquentes
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">
              Décidez en toute clarté
            </h2>
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <Monitor className="h-4 w-4" />
              Windows et macOS selon le logiciel
            </div>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {campaignFaqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">
                  {faq.question}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#0a3d62] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f8fb] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0a3d62] to-[#0f5486] px-6 py-12 text-center text-white sm:px-10">
          <ShieldCheck className="mx-auto h-8 w-8 text-sky-200" />
          <h2 className="mt-5 text-3xl font-extrabold">
            Votre prochain projet n’attend pas.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Choisissez votre formule ou demandez conseil. Notre équipe vous répond directement.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCampaignClick}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 font-bold text-white transition hover:bg-[#20bd5a]"
          >
            <MessageCircle className="h-5 w-5" />
            Commander maintenant
          </a>
        </div>
      </section>
    </>
  );
}
