import { useState, useEffect } from 'react';
import { CheckCircle, Shield, Clock, Headphones, Package, Monitor, Users, ArrowRight, MessageCircle, ChevronDown, TrendingUp, X, AlertCircle } from 'lucide-react';
import { YouTubeEmbed } from './components/YouTubeEmbed';

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [licensesSold, setLicensesSold] = useState(147);
  const whatsappNumber = '2250718713781';
  const whatsappMessage = encodeURIComponent('Bonjour 👋, je souhaite activer une licence Autodesk. Durée souhaitée : 1 an ou 3 ans. Merci !');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Compteur de ventes animé
  useEffect(() => {
    const interval = setInterval(() => {
      setLicensesSold(prev => prev + 1);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const trackLeadEvent = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-9 h-9 bg-[#0a3d62] rounded">
              <span className="text-white font-black text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-[#0a3d62]">Autodesk CI</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('hero')} className="text-gray-700 hover:text-[#0a3d62] transition">
              Accueil
            </button>
            <button onClick={() => scrollToSection('avantages')} className="text-gray-700 hover:text-[#0a3d62] transition">
              Avantages
            </button>
            <button onClick={() => scrollToSection('prix')} className="text-gray-700 hover:text-[#0a3d62] transition">
              Prix
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-[#0a3d62] transition">
              Contact
            </button>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackLeadEvent}
            className="bg-[#0a3d62] text-white px-6 py-2 rounded-lg hover:bg-[#083050] transition font-medium"
          >
            Commander
          </a>
        </nav>
      </header>

      {/* Bannière Urgence */}
      <div className="fixed top-16 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-3">
          <AlertCircle className="w-5 h-5 animate-pulse" />
          <p className="text-sm sm:text-base font-bold text-center">
            ⚡ OFFRE LIMITÉE : Plus que 35 licences disponibles cette semaine !
          </p>
          <AlertCircle className="w-5 h-5 animate-pulse" />
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="inline-flex items-center bg-blue-100 text-[#0a3d62] px-4 py-2 rounded-full text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  100% Licences Officielles
                </div>
                <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {licensesSold}+ licences vendues ce mois-ci
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Licences Autodesk Authentiques
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                AutoCAD • Revit • 3ds Max • Fusion 360
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Activation officielle | 1 an ou 3 ans | Prix accessibles pour la Côte d'Ivoire
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackLeadEvent}
                  className="inline-flex items-center justify-center bg-[#25D366] text-white px-8 py-4 rounded-lg hover:bg-[#20bd5a] transition font-semibold text-lg shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Commander via WhatsApp
                </a>
                <button
                  onClick={() => scrollToSection('prix')}
                  className="inline-flex items-center justify-center bg-white text-[#0a3d62] px-8 py-4 rounded-lg hover:bg-gray-50 transition font-semibold text-lg border-2 border-[#0a3d62]"
                >
                  Voir les prix
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://media.ikomagroup.net/xara/autodesk.PNG"
                  alt="Autodesk Products - AutoCAD, Revit, 3ds Max"
                  className="w-full h-full object-cover"
                  width="800"
                  height="600"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  Activation en 15 min
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-3 text-white">
          <Clock className="w-6 h-6 animate-pulse" />
          <p className="text-lg font-bold text-center">
            Activation en 15 minutes — Support immédiat
          </p>
          <Clock className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      {/* Preuves d'Authenticité */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              100% Licences Officielles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nous garantissons l'authenticité de chaque licence Autodesk
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-start mb-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ajout direct dans le panneau administrateur Autodesk
                  </h3>
                  <p className="text-gray-600">
                    Votre licence est ajoutée directement depuis notre compte officiel Autodesk
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#0a3d62]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Compte officiel avec mise à jour et support
                  </h3>
                  <p className="text-gray-600">
                    Accès aux mises à jour officielles et au support technique Autodesk
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Activation en quelques minutes
                  </h3>
                  <p className="text-gray-600">
                    Processus rapide et simple, commencez à utiliser vos logiciels immédiatement
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-600">Panneau Administrateur</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Actif</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500 mb-1">Licence</div>
                    <div className="font-medium text-gray-900">AutoCAD 2026</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500 mb-1">Statut</div>
                    <div className="font-medium text-green-600">Activée ✓</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500 mb-1">Durée</div>
                    <div className="font-medium text-gray-900">3 ans</div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Garantie Activation 100%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Preuve d'authenticité
                </h3>
                <p className="text-gray-600 text-sm">
                  Voici une démonstration réelle du panneau administrateur Autodesk où les licences sont ajoutées.
                </p>
              </div>
              <YouTubeEmbed
                videoId="HR1IJPxuwJs"
                title="Démonstration panneau administrateur Autodesk"
              />
              <p className="text-center text-sm text-gray-500 mt-4">
                Démonstration du processus d'activation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-xl text-gray-600">
              Des licences authentiques avec tous les avantages
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Original & Légal
              </h3>
              <p className="text-gray-600">
                Licences 100% authentiques directement depuis Autodesk, conformes à toutes les réglementations.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-[#0a3d62]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Mise à jour officielle
              </h3>
              <p className="text-gray-600">
                Accédez aux dernières versions et mises à jour de sécurité directement depuis Autodesk.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Monitor className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Installation facile
              </h3>
              <p className="text-gray-600">
                Processus simplifié avec instructions détaillées. Prêt à utiliser en moins de 30 minutes.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Headphones className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Support dédié CI
              </h3>
              <p className="text-gray-600">
                Assistance en français, disponible 7j/7, spécialement pour les utilisateurs ivoiriens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparateur de Prix */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi payer 25 fois plus cher ?
            </h2>
            <p className="text-xl text-gray-600">
              Comparaison avec les prix officiels Autodesk
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 divide-x divide-gray-200">
              {/* Prix Officiel */}
              <div className="p-8 bg-gray-50">
                <div className="text-center mb-6">
                  <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                    Prix Officiel Autodesk
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Licence 1 an
                  </h3>
                  <div className="text-5xl font-bold text-red-600 mb-2 line-through">
                    245 000
                  </div>
                  <p className="text-gray-600">FCFA / an</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                    Prix élevé
                  </li>
                  <li className="flex items-center text-gray-700">
                    <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                    Procédure complexe
                  </li>
                  <li className="flex items-center text-gray-700">
                    <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                    Paiement international
                  </li>
                  <li className="flex items-center text-gray-700">
                    <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                    Support en anglais
                  </li>
                </ul>
              </div>
              {/* Notre Prix */}
              <div className="p-8 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="text-center mb-6">
                  <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                    Notre Prix
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Licence 1 an
                  </h3>
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    25 000
                  </div>
                  <p className="text-gray-600 mb-3">FCFA / an</p>
                  <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                    Économisez 96% !
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Prix accessible
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Activation en 15 min
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Paiement local (Mobile Money)
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Support français 7j/7
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-center">
              <p className="text-white text-xl font-bold mb-3">
                Même licence officielle • Même qualité • 96% moins cher
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackLeadEvent}
                className="inline-flex items-center bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-bold shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Profiter de l'offre maintenant
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Prix & Packs */}
      <section id="prix" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choisissez votre licence
            </h2>
            <p className="text-xl text-gray-600">
              Tarifs transparents et accessibles pour la Côte d'Ivoire
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#0a3d62] hover:shadow-xl transition">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  AutoDesk All APPS 1 an
                </h3>
                <p className="text-gray-600 mb-4">Licence officielle</p>
                <div className="text-4xl font-bold text-[#0a3d62] mb-2">
                  25 000 FCFA
                </div>
                <p className="text-sm text-gray-500">Activation immédiate</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  Licence officielle 1 an
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  Mises à jour incluses
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  Support technique
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  Installation guidée
                </li>
              </ul>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackLeadEvent}
                className="block w-full bg-gray-100 text-gray-900 text-center px-6 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                Commander via WhatsApp
              </a>
            </div>
            <div className="bg-gradient-to-br from-[#0a3d62] to-[#1565a8] border-2 border-[#0a3d62] rounded-2xl p-8 relative overflow-hidden shadow-2xl transform scale-105">
              <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-4 py-1 text-sm font-bold rounded-bl-lg">
                POPULAIRE
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  AutoDesk All APPS 3 ans
                </h3>
                <p className="text-blue-100 mb-4">Meilleure offre</p>
                <div className="text-4xl font-bold text-white mb-2">
                  45 000 FCFA
                </div>
                <p className="text-sm text-blue-100">Économisez 40%</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" />
                  Licence officielle 3 ans
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" />
                  Mises à jour incluses
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" />
                  Support prioritaire
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" />
                  Installation guidée
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" />
                  Garantie satisfaction
                </li>
              </ul>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackLeadEvent}
                className="block w-full bg-white text-[#0a3d62] text-center px-6 py-3 rounded-lg hover:bg-blue-50 transition font-semibold"
              >
                Commander via WhatsApp
              </a>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#0a3d62] hover:shadow-xl transition">
              <div className="text-center mb-6">
                <Users className="w-12 h-12 text-[#0a3d62] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Packs Entreprises
                </h3>
                <p className="text-gray-600 mb-4">5 à 20+ licences</p>
                <div className="text-4xl font-bold text-[#0a3d62] mb-2">
                  Sur devis
                </div>
                <p className="text-sm text-gray-500">Tarifs dégressifs</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  Volume personnalisé
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  Gestion centralisée
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  Support dédié
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  Formation incluse
                </li>
              </ul>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackLeadEvent}
                className="block w-full bg-gray-100 text-gray-900 text-center px-6 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                Demander un devis
              </a>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-8">
            <Clock className="w-5 h-5 inline mr-2" />
            Activation en moins de 15 minutes après confirmation du paiement
          </p>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              3 étapes simples pour obtenir votre licence Autodesk
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-md text-center">
                <div className="w-16 h-16 bg-[#0a3d62] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <Package className="w-12 h-12 text-[#0a3d62] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Choisissez votre licence
                </h3>
                <p className="text-gray-600">
                  Sélectionnez le logiciel Autodesk et la durée (1 ou 3 ans) qui vous convient
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-[#0a3d62]" />
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-md text-center">
                <div className="w-16 h-16 bg-[#0a3d62] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <Shield className="w-12 h-12 text-[#0a3d62] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Ajout dans le panneau Autodesk
                </h3>
                <p className="text-gray-600">
                  Nous ajoutons votre email dans notre compte administrateur Autodesk officiel
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-[#0a3d62]" />
              </div>
            </div>
            <div>
              <div className="bg-white rounded-xl p-8 shadow-md text-center">
                <div className="w-16 h-16 bg-[#0a3d62] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Accès immédiat
                </h3>
                <p className="text-gray-600">
                  Recevez votre accès + instructions d'installation et commencez à travailler
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Des centaines de professionnels satisfaits en Côte d'Ivoire
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-6 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  KM
                </div>
                <div>
                  <div className="font-bold text-gray-900">Kouadio Michel</div>
                  <div className="text-sm text-gray-600">Architecte, Abidjan</div>
                </div>
              </div>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700">
                "Licence AutoCAD reçue en 10 minutes ! Tout fonctionne parfaitement, je peux enfin travailler avec une version officielle. Service impeccable."
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  AK
                </div>
                <div>
                  <div className="font-bold text-gray-900">Adjoua Koffi</div>
                  <div className="text-sm text-gray-600">Ingénieure BTP</div>
                </div>
              </div>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700">
                "J'ai commandé Revit pour mon entreprise. Activation rapide, support réactif en français. Je recommande à tous les professionnels."
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-6 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  YT
                </div>
                <div>
                  <div className="font-bold text-gray-900">Yao Thierry</div>
                  <div className="text-sm text-gray-600">Designer 3D</div>
                </div>
              </div>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700">
                "3ds Max 3 ans à ce prix, c'est incroyable ! Tout est légal, j'ai accès aux mises à jour. Merci pour ce service de qualité."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce que vous devez savoir
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "La licence est-elle vraiment authentique ?",
                a: "Oui, absolument. Nous ajoutons votre email directement dans notre panneau administrateur Autodesk officiel. Vous recevez une invitation Autodesk et avez accès à toutes les fonctionnalités, mises à jour et au support officiel."
              },
              {
                q: "Puis-je utiliser la licence sur plusieurs PC ?",
                a: "Oui, selon les conditions Autodesk, vous pouvez installer le logiciel sur jusqu'à 3 appareils, mais l'utiliser activement sur un seul à la fois. Parfait pour les professionnels avec plusieurs machines."
              },
              {
                q: "En combien de temps l'activation est faite ?",
                a: "L'activation est généralement complétée en moins de 15 minutes après confirmation de votre paiement. Vous recevez immédiatement les instructions d'installation et votre invitation Autodesk."
              },
              {
                q: "Que se passe-t-il si j'ai un problème ?",
                a: "Notre support dédié pour la Côte d'Ivoire est disponible 7j/7 via WhatsApp. Nous vous assistons pour l'installation, l'activation et toute question technique. Vous bénéficiez également du support officiel Autodesk."
              },
              {
                q: "Est-ce valable pour entreprises & écoles ?",
                a: "Absolument ! Nous proposons des packs entreprises et éducation avec tarifs dégressifs. Pour les écoles et les grandes structures, contactez-nous pour un devis personnalisé adapté à vos besoins."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0a3d62] flex-shrink-0 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / WhatsApp CTA */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0a3d62] to-[#1565a8]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Prêt à activer votre licence Autodesk ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des centaines de professionnels qui nous font confiance
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackLeadEvent}
            className="inline-flex items-center justify-center bg-[#25D366] text-white px-12 py-5 rounded-lg hover:bg-[#20bd5a] transition font-bold text-xl shadow-2xl mb-12"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Commander maintenant sur WhatsApp
          </a>
          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div className="flex flex-col items-center">
              <Headphones className="w-12 h-12 mb-3" />
              <h3 className="font-semibold mb-2">Support CI 7j/7</h3>
              <p className="text-blue-100 text-sm">Assistance en français disponible tous les jours</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 mb-3" />
              <h3 className="font-semibold mb-2">Activation immédiate</h3>
              <p className="text-blue-100 text-sm">Recevez votre licence en moins de 15 minutes</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-12 h-12 mb-3" />
              <h3 className="font-semibold mb-2">Paiement sécurisé</h3>
              <p className="text-blue-100 text-sm">Mobile Money, Carte bancaire acceptés</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bouton WhatsApp Flottant */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackLeadEvent}
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] transition z-50 animate-bounce"
        aria-label="Commander sur WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-7 h-7 bg-white rounded">
                  <span className="text-[#0a3d62] font-black text-base">A</span>
                </div>
                <span className="text-xl font-bold text-white">Autodesk CI</span>
              </div>
              <p className="text-sm">
                Votre partenaire de confiance pour les licences Autodesk authentiques en Côte d'Ivoire. Visitez autodesk-ci.com
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Produits</h4>
              <ul className="space-y-2 text-sm">
                <li>AutoCAD</li>
                <li>Revit</li>
                <li>3ds Max</li>
                <li>Fusion 360</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <p className="text-sm mb-2">Abidjan, Côte d'Ivoire</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackLeadEvent}
                className="inline-flex items-center text-[#25D366] hover:text-[#20bd5a] transition text-sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Support
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p className="mb-2">
              © 2024 Autodesk CI. Tous droits réservés.
            </p>
            <p className="text-gray-500">
              Autodesk® est une marque déposée d'Autodesk, Inc. Autodesk CI est un distributeur indépendant de licences authentiques Autodesk.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
