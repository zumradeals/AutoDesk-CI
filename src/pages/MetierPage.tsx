import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../store';
import { ProductCard } from '../components/product/ProductCard';
import { WhatsAppButton } from '../components/ui/WhatsAppButton';

interface MetierConfig {
  slug: string;
  title: string;
  headline: string;
  intro: string;
  productSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  whatsappMessage: string;
}

const METIERS: MetierConfig[] = [
  {
    slug: 'architectes',
    title: 'Logiciels pour Architectes',
    headline: 'Les outils qu\'utilisent les meilleurs architectes africains',
    intro: `La conception architecturale moderne exige des logiciels performants, fiables et accessibles. Autodesk CI vous propose les solutions les plus utilisées par les cabinets d\'architecture en Afrique : de la modélisation 2D et 3D au BIM, en passant par le rendu photoréaliste et la documentation de projet.

Que vous soyez architecte indépendant, associé ou directeur d\'un bureau d\'études, nous vous aidons à choisir la combinaison de logiciels adaptée à votre flux de travail et à votre budget.`,
    productSlugs: ['autodesk', 'archicad', 'sketchup-pro', 'lumion-pro', 'enscape', 'v-ray'],
    seoTitle: 'Logiciels pour Architectes en Côte d\'Ivoire | Autodesk CI',
    seoDescription: 'AutoCAD, Revit, ArchiCAD, SketchUp Pro, Lumion, Enscape pour architectes. Activation rapide, support en français. Autodesk CI.',
    whatsappMessage: 'Bonjour, je suis architecte et je cherche les logiciels adaptés à mon activité. Pouvez-vous m\'orienter ?',
  },
  {
    slug: 'bim',
    title: 'Logiciels BIM et Construction',
    headline: 'Maîtrisez le BIM et transformez vos projets de construction',
    intro: `Le BIM (Building Information Modeling) est devenu la norme pour les projets de construction professionnels. Il permet à toutes les parties prenantes d\'un projet (architectes, ingénieurs structure, ingénieurs MEP, maîtres d\'ouvrage) de travailler sur un modèle numérique unique et partagé.

Autodesk CI vous propose les logiciels BIM les plus reconnus du marché, avec un accompagnement adapté pour les professionnels en Afrique qui souhaitent adopter cette méthode de travail.`,
    productSlugs: ['autodesk', 'archicad', 'enscape'],
    seoTitle: 'Logiciels BIM en Côte d\'Ivoire | Revit, ArchiCAD — Autodesk CI',
    seoDescription: 'Revit, ArchiCAD, Enscape : les meilleurs logiciels BIM pour la construction en Afrique francophone. Autodesk CI.',
    whatsappMessage: 'Bonjour, je travaille dans le secteur de la construction et je souhaite adopter le BIM. Quels logiciels recommandez-vous ?',
  },
  {
    slug: 'rendu',
    title: 'Logiciels de Rendu Architectural',
    headline: 'Impressionnez vos clients avec des rendus photoréalistes',
    intro: `La qualité des rendus 3D est devenue un argument commercial décisif pour les architectes et designers. Des images photoréalistes convaincantes permettent de remporter des appels d\'offres, de vendre des projets immobiliers sur plan et de rassurer les clients sur le résultat final.

Autodesk CI vous propose une sélection des meilleurs moteurs de rendu du marché, compatibles avec les logiciels de modélisation les plus utilisés.`,
    productSlugs: ['lumion-pro', 'enscape', 'v-ray'],
    seoTitle: 'Logiciels de Rendu 3D Architectural en Côte d\'Ivoire | Autodesk CI',
    seoDescription: 'Lumion Pro, Enscape, V-Ray : les meilleurs logiciels de rendu architectural pour les professionnels en Afrique francophone.',
    whatsappMessage: 'Bonjour, je cherche un logiciel de rendu 3D pour mes projets architecturaux. Pouvez-vous m\'aider à choisir ?',
  },
  {
    slug: 'bureaux-etudes',
    title: 'Logiciels pour Bureaux d\'Études',
    headline: 'Équipez votre bureau d\'études avec les outils de référence',
    intro: `Un bureau d\'études performant s\'appuie sur des logiciels professionnels reconnus. Que vous soyez spécialisé en structure, en génie civil, en mécanique ou en architecture, Autodesk CI dispose des solutions adaptées à votre domaine d\'activité.

Nous proposons également des tarifs adaptés aux structures comptant plusieurs postes de travail, avec une gestion centralisée des licences.`,
    productSlugs: ['autodesk', 'archicad', 'solidworks', 'acrobat-pro', 'microsoft-office'],
    seoTitle: 'Logiciels pour Bureaux d\'Études | Autodesk CI',
    seoDescription: 'Autodesk, SolidWorks, ArchiCAD pour bureaux d\'études. Tarifs entreprises, gestion centralisée. Autodesk CI.',
    whatsappMessage: 'Bonjour, je dirige un bureau d\'études et cherche à équiper mon équipe. Pouvez-vous nous proposer un devis ?',
  },
  {
    slug: 'ingenieurs',
    title: 'Logiciels pour Ingénieurs',
    headline: 'Les solutions logicielles pour ingénieurs exigeants',
    intro: `Les ingénieurs travaillent sur des projets complexes qui exigent des outils de précision. En génie civil, mécanique, électrique ou BTP, les logiciels professionnels permettent de simuler, analyser et documenter vos travaux avec rigueur.

Autodesk CI référence les solutions les plus utilisées par les ingénieurs dans le monde entier, avec un support en français adapté au marché africain.`,
    productSlugs: ['autodesk', 'solidworks', 'archicad', 'acrobat-pro'],
    seoTitle: 'Logiciels pour Ingénieurs en Côte d\'Ivoire | Autodesk CI',
    seoDescription: 'AutoCAD, Civil 3D, SolidWorks pour ingénieurs en Afrique francophone. Activation rapide, support en français. Autodesk CI.',
    whatsappMessage: 'Bonjour, je suis ingénieur et cherche les logiciels adaptés à mon domaine. Pouvez-vous m\'orienter ?',
  },
  {
    slug: 'mecanique',
    title: 'Logiciels de Conception Mécanique',
    headline: 'Concevez, simulez et industrialisez avec les meilleurs outils CAO',
    intro: `La conception mécanique professionnelle requiert des outils de CAO (Conception Assistée par Ordinateur) performants. SolidWorks et les outils Autodesk Inventor et Fusion 360 permettent de créer des pièces, des assemblages et de réaliser des simulations mécaniques avec une précision maximale.

Ces logiciels sont utilisés dans l\'industrie manufacturière, la mécanique de précision, l\'automobile, et bien d\'autres secteurs en plein développement en Afrique.`,
    productSlugs: ['solidworks', 'autodesk'],
    seoTitle: 'Logiciels CAO Mécanique en Côte d\'Ivoire | SolidWorks — Autodesk CI',
    seoDescription: 'SolidWorks, Fusion 360, Inventor : logiciels de conception mécanique 3D pour ingénieurs en Afrique. Autodesk CI.',
    whatsappMessage: 'Bonjour, je travaille en conception mécanique et cherche un logiciel CAO adapté. Pouvez-vous m\'aider ?',
  },
  {
    slug: 'bureautique',
    title: 'Logiciels de Bureautique Professionnelle',
    headline: 'Productivité et gestion documentaire au quotidien',
    intro: `La bureautique professionnelle est le socle de toute activité. Microsoft 365 et Adobe Acrobat Pro sont les deux solutions incontournables pour la rédaction, l\'analyse de données, la présentation, la communication et la gestion documentaire.

Autodesk CI vous propose ces solutions à des tarifs accessibles, avec un accompagnement en français pour l\'installation et la configuration.`,
    productSlugs: ['microsoft-office', 'acrobat-pro'],
    seoTitle: 'Logiciels Bureautique Professionnelle en Côte d\'Ivoire | Autodesk CI',
    seoDescription: 'Microsoft 365 et Adobe Acrobat Pro pour professionnels en Côte d\'Ivoire. Autodesk CI, votre partenaire bureautique.',
    whatsappMessage: 'Bonjour, je cherche des logiciels de bureautique professionnelle. Quelles solutions proposez-vous ?',
  },
];

export function MetierPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useStore();

  const metier = METIERS.find((m) => m.slug === slug);
  if (!metier) return <Navigate to="/" replace />;

  const metierProducts = metier.productSlugs
    .map((s) => products.find((p) => p.slug === s && p.status === 'published'))
    .filter(Boolean) as typeof products;

  return (
    <>
      <Helmet>
        <title>{metier.seoTitle}</title>
        <meta name="description" content={metier.seoDescription} />
        <link rel="canonical" href={`https://autodesk-ci.com/metiers/${metier.slug}`} />
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-br from-navy to-blue-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{metier.title}</h1>
          <p className="text-xl text-blue-100">{metier.headline}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Intro */}
        <div className="max-w-3xl mb-14">
          {metier.intro.split('\n\n').map((para, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
          ))}
          <div className="mt-6">
            <WhatsAppButton
              message={metier.whatsappMessage}
              label="Nous consulter gratuitement"
              size="lg"
            />
          </div>
        </div>

        {/* Products */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Solutions recommandées</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {metierProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gray-50 rounded-2xl p-8 sm:p-10 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Vous ne savez pas quel logiciel choisir ?</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Décrivez votre activité et vos besoins sur WhatsApp. Notre équipe vous oriente vers la solution la plus adaptée.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <WhatsAppButton
              message={metier.whatsappMessage}
              label="Être conseillé gratuitement"
              size="lg"
            />
            <Link
              to="/catalogue"
              className="inline-flex items-center justify-center gap-2 bg-navy text-white px-8 py-4 rounded-xl font-semibold hover:bg-navy-dark transition-colors"
            >
              Voir tout le catalogue
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
