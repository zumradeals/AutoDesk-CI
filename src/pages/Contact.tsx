import { Helmet } from 'react-helmet-async';
import { MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useStore } from '../store';
import { buildWhatsappUrl } from '../utils/whatsapp';

export function Contact() {
  const { settings } = useStore();
  const whatsappUrl = buildWhatsappUrl(settings.whatsappNumber, settings.whatsappDefaultMessage);

  return (
    <>
      <Helmet>
        <title>Contact | Autodesk CI — Logiciels Professionnels</title>
        <meta name="description" content={`Contactez Autodesk CI via WhatsApp ou email. ${settings.address}. ${settings.hours}.`} />
        <link rel="canonical" href="https://autodesk-ci.com/contact" />
      </Helmet>

      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Contactez-nous</h1>
        <p className="text-xl text-gray-600">Notre équipe est disponible pour vous conseiller</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
              <div className="space-y-5">
                {[
                  { icon: MessageCircle, label: 'WhatsApp', value: `+${settings.whatsappNumber}`, href: whatsappUrl, color: 'text-[#25D366]' },
                  { icon: Phone, label: 'Téléphone', value: settings.phone, href: `tel:${settings.phone}` },
                  { icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
                  { icon: MapPin, label: 'Adresse', value: settings.address },
                  { icon: Clock, label: 'Horaires', value: settings.hours },
                ].map(({ icon: Icon, label, value, href, color }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-5 h-5 ${color || 'text-gray-600'}`} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">{label}</div>
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                          className="text-gray-900 hover:text-navy transition-colors font-medium">
                          {value}
                        </a>
                      ) : (
                        <span className="text-gray-900 font-medium">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
                <h3 className="font-bold text-gray-900">La façon la plus rapide</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Envoyez-nous un message sur WhatsApp pour une réponse rapide. Décrivez votre besoin et votre métier, nous vous proposons la solution adaptée.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Écrire sur WhatsApp
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Formulaire de contact</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                const msg = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
                const fullMsg = `Bonjour, je m'appelle ${name}.\n\n${msg}`;
                window.open(buildWhatsappUrl(settings.whatsappNumber, fullMsg), '_blank', 'noopener,noreferrer');
              }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet *</label>
                <input
                  name="name"
                  required
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Votre métier</label>
                <select
                  name="role"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white"
                >
                  <option value="">Sélectionnez...</option>
                  <option>Architecte</option>
                  <option>Ingénieur BTP</option>
                  <option>Ingénieur mécanique</option>
                  <option>Designer 3D</option>
                  <option>Bureau d'études</option>
                  <option>Étudiant</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Votre message *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Décrivez votre besoin, le logiciel qui vous intéresse, votre pays..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-xl font-semibold hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Envoyer via WhatsApp
              </button>
              <p className="text-xs text-gray-500 text-center">
                Le formulaire ouvre WhatsApp avec votre message prérempli.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
