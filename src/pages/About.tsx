import { Helmet } from 'react-helmet-async';
import { CheckCircle, MapPin, Users, Headphones, Shield } from 'lucide-react';
import { WhatsAppButton } from '../components/ui/WhatsAppButton';
import { useStore } from '../store';

export function About() {
  const { settings } = useStore();
  return (
    <>
      <Helmet>
        <title>À propos | Autodesk CI — Logiciels Professionnels en Afrique</title>
        <meta name="description" content="Autodesk CI est votre partenaire pour les logiciels professionnels en Afrique francophone. Découvrez notre mission et nos engagements." />
        <link rel="canonical" href="https://autodesk-ci.com/a-propos" />
      </Helmet>

      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">À propos d'Autodesk CI</h1>
          <p className="text-xl text-gray-600">{settings.tagline}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Mission */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre mission</h2>
          <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
            <p>
              Autodesk CI est une plateforme spécialisée dans la présentation et la commercialisation assistée de logiciels professionnels destinés aux architectes, ingénieurs, designers et techniciens d'Afrique francophone.
            </p>
            <p>
              Nous croyons que les professionnels africains méritent d'accéder aux mêmes outils que leurs homologues du monde entier, à des conditions adaptées à leurs réalités économiques.
            </p>
            <p>
              Notre rôle est de simplifier l'accès à ces solutions : nous orientons chaque client vers le logiciel le plus adapté à son métier, facilitons le processus d'activation, et assurons un suivi en français adapté au contexte local.
            </p>
          </div>
        </section>

        {/* Zone géographique */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Zone géographique</h2>
          <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-2xl">
            <MapPin className="w-8 h-8 text-navy flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-700 leading-relaxed">
                Basés à <strong>Abidjan, Côte d'Ivoire</strong>, nous servons des clients dans toute l'Afrique francophone : Côte d'Ivoire, Sénégal, Mali, Burkina Faso, Cameroun, Congo, Gabon, Madagascar, et l'ensemble des pays francophones de la sous-région.
              </p>
              <p className="text-gray-600 mt-2 text-sm">
                Nos logiciels étant livrés en ligne, la zone de couverture ne connaît pas de frontières géographiques.
              </p>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Qui accompagnons-nous ?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Architectes et cabinets d\'architecture',
              'Ingénieurs BTP et génie civil',
              'Bureaux d\'études techniques',
              'Ingénieurs mécaniques',
              'Designers d\'intérieur et d\'extérieur',
              'Urbanistes et paysagistes',
              'Créateurs et visualisateurs 3D',
              'Entreprises de construction',
              'Étudiants et institutions académiques',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Engagements */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos engagements</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Shield,
                title: 'Transparence',
                desc: 'Nous présentons clairement les caractéristiques de chaque logiciel, ses limites et les conditions d\'utilisation sans informations trompeuses.',
              },
              {
                icon: Headphones,
                title: 'Accompagnement',
                desc: 'Notre équipe est disponible du lundi au samedi pour vous guider de la sélection à l\'installation, en français.',
              },
              {
                icon: Users,
                title: 'Accessibilité',
                desc: 'Nous travaillons à rendre les logiciels professionnels accessibles au plus grand nombre, avec des modalités de paiement adaptées.',
              },
              {
                icon: CheckCircle,
                title: 'Fiabilité',
                desc: 'Nous ne promettons que ce que nous pouvons tenir. Chaque activation est vérifiée avant livraison.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl">
                <div className="w-10 h-10 bg-navy/8 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Parlons de votre projet</h2>
          <p className="text-blue-200 mb-6">Contactez-nous sur WhatsApp pour un conseil personnalisé, sans engagement.</p>
          <WhatsAppButton
            message="Bonjour, je souhaite en savoir plus sur Autodesk CI et les solutions que vous proposez."
            label="Nous contacter sur WhatsApp"
            size="lg"
          />
        </section>
      </div>
    </>
  );
}
