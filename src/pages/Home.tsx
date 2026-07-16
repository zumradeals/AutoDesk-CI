import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, CheckCircle, Shield, Headphones,
  Building2, Image, Settings2, FileText, MessageCircle,
  ChevronDown, Star, Users, Zap
} from 'lucide-react';
import { useStore } from '../store';
import { ProductCard } from '../components/product/ProductCard';
import { WhatsAppButton } from '../components/ui/WhatsAppButton';
import { buildWhatsappUrl } from '../utils/whatsapp';
import { useState } from 'react';
import { YouTubeEmbed } from '../components/YouTubeEmbed';

const categoryIcons: Record<string, React.FC<any>> = {
  building: Building2,
  image: Image,
  settings: Settings2,
  'file-text': FileText,
};

const faqHome = [
  { q: 'Les logiciels sont-ils authentiques ?', a: 'Oui, nous activons chaque logiciel via les systèmes officiels des éditeurs (Autodesk, Microsoft, Adobe, etc.). Vous recevez un accès officiel avec mises à jour et support.' },
  { q: 'Combien de temps prend l\'activation ?', a: 'Pour Autodesk, l\'activation est faite en moins de 15 minutes. Pour les autres logiciels, comptez 24 à 48 heures ouvrées selon la solution.' },
  { q: 'Vous livrez dans toute l\'Afrique francophone ?', a: 'Oui, nos logiciels sont livrés en ligne dans toute la sous-région : Côte d\'Ivoire, Sénégal, Mali, Burkina Faso, Cameroun, et tous les pays francophones.' },
  { q: 'Proposez-vous un support après installation ?', a: 'Oui, notre équipe est disponible du lundi au samedi via WhatsApp pour vous accompagner à l\'installation et répondre à vos questions.' },
];

export function Home() {
  const { products, categories, testimonials, settings } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const publishedProducts = products.filter((p) => p.status === 'published');
  const popularProducts = publishedProducts.filter((p) => p.isPopular).slice(0, 4);
  const featuredAutodesk = publishedProducts.find((p) => p.slug === 'autodesk');
  const activeCategories = categories.filter((c) => c.status === 'active');

  const whatsappUrl = buildWhatsappUrl(settings.whatsappNumber, settings.whatsappDefaultMessage);

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

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-navy px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Logiciels professionnels pour l'Afrique
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
                Logiciels professionnels,{' '}
                <span className="text-navy">accessibles en Afrique</span>
              </h1>
              <p className="text-lg text-gray-600 mb-3 leading-relaxed">
                AutoCAD · Revit · 3ds Max · SolidWorks · Lumion · SketchUp et plus
              </p>
              <p className="text-base text-gray-500 mb-10">
                Activation rapide • Support en français • Paiement Mobile Money
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/catalogue"
                  className="inline-flex items-center justify-center gap-2 bg-navy text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-navy-dark transition-colors shadow-md"
                >
                  Voir le catalogue
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap gap-6">
                {[
                  { icon: Zap, label: 'Activation rapide' },
                  { icon: Shield, label: 'Accès officiels' },
                  { icon: Headphones, label: 'Support français 7j/7' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon className="w-4 h-4 text-navy" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              {featuredAutodesk && (
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                  <img
                    src={featuredAutodesk.images[0]?.url || ''}
                    alt="Suite Autodesk — AutoCAD, Revit, 3ds Max"
                    className="w-full h-80 object-cover"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute top-4 right-4 bg-[#25D366] text-white px-3 py-1.5 rounded-full text-xs font-bold">
                    Activation en 15 min
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATÉGORIES MÉTIERS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Trouvez le logiciel adapté à votre métier</h2>
            <p className="text-gray-600 text-lg">Chaque catégorie regroupe les solutions les plus pertinentes pour votre activité.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeCategories.map((cat) => {
              const Icon = categoryIcons[cat.icon] || Building2;
              const catProducts = publishedProducts.filter((p) => p.categoryId === cat.id);
              return (
                <Link
                  key={cat.id}
                  to={`/catalogue?categorie=${cat.slug}`}
                  className="group p-6 rounded-2xl border border-gray-100 hover:border-navy/20 hover:bg-blue-50/30 transition-all duration-200 flex flex-col gap-3"
                >
                  <div className="w-12 h-12 bg-navy/8 rounded-xl flex items-center justify-center group-hover:bg-navy/12 transition-colors">
                    <Icon className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-navy transition-colors">{cat.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{cat.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-navy mt-auto">
                    {catProducts.length} logiciel{catProducts.length > 1 ? 's' : ''}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AUTODESK SPOTLIGHT ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy to-blue-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                ⭐ Produit phare
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Autodesk — La suite complète pour les professionnels
              </h2>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                AutoCAD, Revit, 3ds Max, Fusion 360, Civil 3D et plus de 100 logiciels inclus dans un seul abonnement. La solution la plus utilisée par les architectes, ingénieurs et designers du monde entier.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'AutoCAD 2026 inclus',
                  'Revit pour le BIM et la construction',
                  '3ds Max pour le rendu et l\'animation',
                  'Fusion 360 pour la conception mécanique',
                  'Activation en moins de 15 minutes',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-blue-50">
                    <CheckCircle className="w-5 h-5 text-[#25D366] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/produit/autodesk"
                  className="inline-flex items-center gap-2 bg-white text-navy px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Voir les offres
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {featuredAutodesk && (
                  <WhatsAppButton
                    message={featuredAutodesk.whatsappMessage}
                    productId={featuredAutodesk.id}
                    productName={featuredAutodesk.name}
                    label="Commander sur WhatsApp"
                  />
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                <div className="grid grid-cols-3 gap-4 text-center text-white">
                  <div>
                    <div className="text-2xl font-bold">100+</div>
                    <div className="text-xs text-blue-200 mt-1">Logiciels inclus</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">15 min</div>
                    <div className="text-xs text-blue-200 mt-1">Activation</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">7j/7</div>
                    <div className="text-xs text-blue-200 mt-1">Support</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white">
                <p className="text-sm text-blue-200 mb-2">À partir de</p>
                <div className="text-4xl font-bold mb-1">25 000 FCFA</div>
                <p className="text-blue-100 text-sm">Licence 1 an · All Apps</p>
              </div>
              {/* YouTube proof */}
              <div className="rounded-2xl overflow-hidden border border-white/20">
                <YouTubeEmbed
                  videoId="HR1IJPxuwJs"
                  title="Démonstration panneau administrateur Autodesk"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUITS POPULAIRES ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Logiciels populaires</h2>
              <p className="text-gray-600">Les solutions les plus demandées par nos clients.</p>
            </div>
            <Link
              to="/catalogue"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-navy hover:underline"
            >
              Tout voir <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:underline"
            >
              Voir tout le catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AVANTAGES ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Pourquoi choisir Autodesk CI ?</h2>
            <p className="text-gray-600 text-lg">Nous simplifions l'accès aux logiciels professionnels pour les créateurs africains.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Accès officiels',
                desc: 'Chaque logiciel est activé via les systèmes officiels des éditeurs. Vous bénéficiez des mises à jour et du support de l\'éditeur.',
                color: 'text-blue-600 bg-blue-50',
              },
              {
                icon: Zap,
                title: 'Activation rapide',
                desc: 'Autodesk en moins de 15 minutes. Les autres solutions en 24 à 48 heures ouvrées. Accompagnement à l\'installation inclus.',
                color: 'text-amber-600 bg-amber-50',
              },
              {
                icon: Headphones,
                title: 'Support en français',
                desc: 'Notre équipe est disponible du lundi au samedi pour vous aider par WhatsApp, en français, depuis votre pays.',
                color: 'text-green-600 bg-green-50',
              },
              {
                icon: Users,
                title: 'Prix accessibles',
                desc: 'Des tarifs adaptés au marché africain. Paiement par Mobile Money, carte bancaire ou virement. Devis pour les entreprises.',
                color: 'text-violet-600 bg-violet-50',
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSUS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Comment ça se passe ?</h2>
            <p className="text-gray-600 text-lg">4 étapes simples pour obtenir votre logiciel.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Identifiez votre besoin', desc: 'Parcourez le catalogue ou contactez-nous pour être orienté selon votre métier.' },
              { num: '02', title: 'Choisissez votre offre', desc: 'Sélectionnez le logiciel et la durée qui vous conviennent. Plusieurs offres disponibles.' },
              { num: '03', title: 'Confirmez via WhatsApp', desc: 'Envoyez-nous un message pour valider votre commande. Paiement Mobile Money ou virement.' },
              { num: '04', title: 'Commencez à travailler', desc: 'Recevez vos accès et instructions. Notre équipe vous accompagne à l\'installation.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="text-center">
                <div className="w-14 h-14 bg-navy text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Ils nous font confiance</h2>
            <p className="text-gray-600 text-lg">Des professionnels satisfaits dans toute l'Afrique francophone.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials
              .filter((t) => t.status === 'published')
              .slice(0, 6)
              .map((t) => (
                <div key={t.id} className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${t.color}`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.role} · {t.city}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">"{t.text}"</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Questions fréquentes</h2>
            <p className="text-gray-600">Retrouvez les réponses aux questions les plus courantes.</p>
          </div>
          <div className="space-y-3">
            {faqHome.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4 text-sm">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-navy flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/faq" className="text-sm font-semibold text-navy hover:underline inline-flex items-center gap-1">
              Voir toutes les questions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Prêt à équiper votre activité ?
          </h2>
          <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
            Contactez-nous sur WhatsApp pour être orienté vers la solution adaptée à votre métier et obtenir un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-[#20bd5a] transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Démarrer sur WhatsApp
            </a>
            <Link
              to="/catalogue"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors"
            >
              Voir le catalogue
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
