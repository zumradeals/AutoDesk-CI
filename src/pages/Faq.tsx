import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useStore } from '../store';
import { WhatsAppButton } from '../components/ui/WhatsAppButton';

export function Faq() {
  const { faqs, settings } = useStore();
  const [open, setOpen] = useState<string | null>(null);

  const published = faqs.filter((f) => f.status === 'published' && !f.productId)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const categories = [...new Set(published.map((f) => f.categoryLabel || 'Général'))];

  return (
    <>
      <Helmet>
        <title>FAQ — Questions fréquentes | Autodesk CI</title>
        <meta name="description" content="Toutes les réponses à vos questions sur l'activation, l'installation, les tarifs et le support des logiciels professionnels sur Autodesk CI." />
        <link rel="canonical" href="https://autodesk-ci.com/faq" />
      </Helmet>

      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Questions fréquentes</h1>
        <p className="text-xl text-gray-600">Toutes les réponses à vos questions</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {categories.map((cat) => (
          <div key={cat} className="mb-10">
            <h2 className="text-lg font-bold text-navy mb-4 pb-2 border-b border-gray-100">{cat}</h2>
            <div className="space-y-3">
              {published
                .filter((f) => (f.categoryLabel || 'Général') === cat)
                .map((faq) => (
                  <div key={faq.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setOpen(open === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 text-sm pr-4">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-navy flex-shrink-0 transition-transform ${open === faq.id ? 'rotate-180' : ''}`} />
                    </button>
                    {open === faq.id && (
                      <div className="px-5 pb-5">
                        <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}

        <div className="bg-gray-50 rounded-2xl p-8 text-center mt-8">
          <p className="text-gray-700 font-medium mb-2">Vous ne trouvez pas la réponse à votre question ?</p>
          <p className="text-gray-600 text-sm mb-5">Contactez-nous directement sur WhatsApp, nous répondons rapidement.</p>
          <WhatsAppButton
            message={`Bonjour, j'ai une question sur ${settings.logoText} : `}
            label="Poser ma question sur WhatsApp"
            size="lg"
          />
        </div>
      </div>
    </>
  );
}
