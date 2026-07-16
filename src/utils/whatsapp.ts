export function buildWhatsappUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsappMessage(
  productName: string,
  offerLabel?: string,
  price?: string | null
): string {
  let msg = `Bonjour, je souhaite obtenir des informations sur *${productName}*.`;
  if (offerLabel) msg += `\n\nOffre sélectionnée : ${offerLabel}`;
  if (price) msg += `\nPrix affiché : ${price}`;
  msg += `\nJe suis situé(e) à : [votre ville/pays]\n\nMerci !`;
  return msg;
}

export function trackFbLead() {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead');
  }
}
