import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useStore } from '../../store';
import { buildWhatsappUrl } from '../../utils/whatsapp';

export function Footer() {
  const { settings } = useStore();
  const whatsappUrl = buildWhatsappUrl(settings.whatsappNumber, settings.whatsappDefaultMessage);

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/brand/autodesk-ci-logo-white.svg"
                alt={settings.logoText}
                className="h-10 w-auto max-w-[210px]"
              />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Votre partenaire pour les logiciels professionnels en Afrique francophone. Autodesk, SolidWorks, Lumion et plus.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Nous contacter
            </a>
          </div>

          {/* Catalogue */}
          <div>
            <h4 className="text-white font-semibold mb-4">Catalogue</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/produit/autodesk" className="hover:text-white transition-colors">Autodesk (All Apps)</Link></li>
              <li><Link to="/produit/sketchup-pro" className="hover:text-white transition-colors">SketchUp Pro</Link></li>
              <li><Link to="/produit/lumion-pro" className="hover:text-white transition-colors">Lumion Pro</Link></li>
              <li><Link to="/produit/solidworks" className="hover:text-white transition-colors">SolidWorks</Link></li>
              <li><Link to="/produit/v-ray" className="hover:text-white transition-colors">V-Ray</Link></li>
              <li><Link to="/produit/archicad" className="hover:text-white transition-colors">ArchiCAD</Link></li>
              <li><Link to="/produit/enscape" className="hover:text-white transition-colors">Enscape</Link></li>
              <li><Link to="/catalogue" className="hover:text-white transition-colors font-medium text-gray-300">→ Voir tout le catalogue</Link></li>
            </ul>
          </div>

          {/* Métiers */}
          <div>
            <h4 className="text-white font-semibold mb-4">Par métier</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/metiers/architectes" className="hover:text-white transition-colors">Architectes</Link></li>
              <li><Link to="/metiers/bim" className="hover:text-white transition-colors">BIM et construction</Link></li>
              <li><Link to="/metiers/rendu" className="hover:text-white transition-colors">Rendu architectural</Link></li>
              <li><Link to="/metiers/ingenieurs" className="hover:text-white transition-colors">Ingénieurs</Link></li>
              <li><Link to="/metiers/mecanique" className="hover:text-white transition-colors">Conception mécanique</Link></li>
              <li><Link to="/metiers/bureautique" className="hover:text-white transition-colors">Bureautique</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/a-propos" className="hover:text-white transition-colors">À propos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 flex-shrink-0 text-gray-500" />
                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 flex-shrink-0 text-gray-500" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                <span>{settings.hours}</span>
              </li>
              <li className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] hover:text-[#20bd5a] transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp direct
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Autodesk CI. Tous droits réservés.</p>
          <p className="text-gray-600 text-center">
            Autodesk® est une marque déposée d'Autodesk, Inc. Autodesk CI est un distributeur indépendant.
          </p>
          <div className="flex gap-4">
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
