import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, MessageCircle } from 'lucide-react';
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
  const mainImage = product.images.find((image) => image.isMain) || product.images[0];
  const pricedOffer = product.offers.find((offer) => offer.price) || product.offers[0];
  const promoOffer = product.offers.find((offer) => offer.isPromo);

  const whatsappUrl = buildWhatsappUrl(
    settings.whatsappNumber,
    product.whatsappMessage
  );

  const handleWhatsapp = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    trackFbLead();
    recordWhatsappClick(product.id, product.name);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white',
        'transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-200/70',
        className
      )}
    >
      <Link to={`/produit/${product.slug}`} className="relative block h-48 overflow-hidden bg-slate-50">
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={mainImage.alt}
            className="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-black text-slate-200">
            {product.name.charAt(0)}
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.isPopular && <Badge variant="popular">Très demandé</Badge>}
          {promoOffer && <Badge variant="promo">Promo</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <Clock3 className="h-3.5 w-3.5" />
          {product.deliveryTime}
        </div>
        <Link to={`/produit/${product.slug}`}>
          <h3 className="mt-3 text-lg font-extrabold text-slate-900 transition group-hover:text-[#0a3d62]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-slate-500">
          {product.shortDescription}
        </p>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-slate-400">
            À partir de
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-extrabold tracking-tight text-[#0a3d62]">
              {pricedOffer?.price || 'Sur devis'}
            </span>
            {promoOffer?.oldPrice && (
              <span className="text-xs text-slate-400 line-through">{promoOffer.oldPrice}</span>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/produit/${product.slug}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0a3d62] px-3 py-3 text-sm font-bold text-white transition hover:bg-[#083050]"
          >
            Voir l’offre
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={handleWhatsapp}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366] text-white transition hover:bg-[#20bd5a]"
            aria-label={`Commander ${product.name} sur WhatsApp`}
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
