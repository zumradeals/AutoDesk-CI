import { MessageCircle } from 'lucide-react';
import { useStore } from '../../store';
import { buildWhatsappUrl, trackFbLead } from '../../utils/whatsapp';

export function WhatsAppFloating() {
  const { settings } = useStore();
  const url = buildWhatsappUrl(settings.whatsappNumber, settings.whatsappDefaultMessage);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackFbLead}
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:bg-[#20bd5a] transition-all duration-200 hover:scale-110 z-40"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
