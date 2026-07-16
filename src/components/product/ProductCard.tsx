import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import type { Product } from '../../types';
import { Badge } from '../ui/Badge';
import { useStore } from '../../store';
import { buildWhatsappUrl, trackFbLead } from '../../utils/whatsapp';
import { cn } from '../../utils/cn';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { settings, recordWhatsappClick } = useStore();
  const mainImage = product.images.find((i) => i.isMain) || product.images[0];
  const cheapestOffer = product.offers.find((o) => o.price) || product.offers[0];
  const promoOffer = product.offers.find((o) => o.isPromo);

  const whatsappUrl = buildWhatsappUrl(settings.whatsappNumber, product.whatsappMessage);

  const handleWhatsapp = (e: React.MouseEvent) => {
    e.preventDefault();
    trackFbLead();
    recordWhatsappClick(product.id, product.name);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={cn(
        'group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden',
        'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col',
        className
      )}
    >
      {/* Image */}
      <div className="relative h-44 bg-gray-50 overflow-hidden">
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={mainImage.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <span className="text-4xl font-bold">{product.name.charAt(0)}</span>
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isPopular && <Badge variant="popular">Populaire</Badge>}
          {promoOffer && <Badge variant="promo">Promo</Badge>}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 mb-1.5 text-base">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{product.shortDescription}</p>

        {/* Price */}
        <div className="mb-4">
          {cheapestOffer?.price ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-navy">{cheapestOffer.price}</span>
              {promoOffer?.oldPrice && (
                <span className="text-sm text-gray-400 line-through">{promoOffer.oldPrice}</span>
              )}
            </div>
          ) : (
            <span className="text-sm font-semibold text-gray-500">Sur devis</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/produit/${product.slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-navy text-white px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-dark transition-colors"
          >
            Consulter
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleWhatsapp}
            className="flex items-center justify-center p-2.5 bg-[#25D366] text-white rounded-lg hover:bg-[#20bd5a] transition-colors"
            aria-label="Contacter sur WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
