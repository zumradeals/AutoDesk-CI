type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const pixelId = import.meta.env.VITE_META_PIXEL_ID?.trim();
const productionHostnames = new Set(['autodesk-ci.com', 'www.autodesk-ci.com']);
let initialized = false;

function isValidPixelId(value: string | undefined): value is string {
  return Boolean(value && /^\d{5,30}$/.test(value));
}

function installFbq(): Fbq {
  if (window.fbq) return window.fbq;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  } as Fbq;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  return fbq;
}

export function initMetaPixel(): boolean {
  if (
    typeof window === 'undefined' ||
    !productionHostnames.has(window.location.hostname) ||
    !isValidPixelId(pixelId) ||
    initialized
  ) {
    return initialized;
  }

  const fbq = installFbq();
  fbq('init', pixelId);
  fbq('track', 'PageView');
  initialized = true;

  return true;
}
