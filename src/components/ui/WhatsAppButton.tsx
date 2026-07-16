import { MessageCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { buildWhatsappUrl, trackFbLead } from '../../utils/whatsapp';
import { useStore } from '../../store';

interface WhatsAppButtonProps {
  message: string;
  productId?: string;
  productName?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  fullWidth?: boolean;
}

export function WhatsAppButton({
  message,
  productId,
  productName,
  className,
  size = 'md',
  label = 'Contacter sur WhatsApp',
  fullWidth = false,
}: WhatsAppButtonProps) {
  const { settings, recordWhatsappClick } = useStore();

  const handleClick = () => {
    trackFbLead();
    if (productId && productName) {
      recordWhatsappClick(productId, productName);
    }
  };

  const url = buildWhatsappUrl(settings.whatsappNumber, message);

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-lg',
        'bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2',
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
    >
      <MessageCircle className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />
      {label}
    </a>
  );
}
