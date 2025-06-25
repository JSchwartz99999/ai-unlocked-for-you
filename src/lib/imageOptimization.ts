
// Image optimization utilities
export const imageOptimization = {
  // Create responsive image srcSet
  createSrcSet: (baseSrc: string, sizes: number[] = [400, 800, 1200, 1600]) => {
    return sizes.map(size => `${baseSrc}?w=${size} ${size}w`).join(', ');
  },

  // Lazy load images with intersection observer
  lazyLoadImages: () => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          const srcSet = img.dataset.srcset;

          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          if (srcSet) {
            img.srcset = srcSet;
            img.removeAttribute('data-srcset');
          }

          img.classList.remove('lazy');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all lazy images
    document.querySelectorAll('img[data-src], img[data-srcset]').forEach((img) => {
      imageObserver.observe(img);
    });
  },

  // Preload critical images
  preloadCriticalImages: (imageSrcs: string[]) => {
    imageSrcs.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  },

  // Convert images to WebP format (client-side check)
  supportsWebP: (): Promise<boolean> => {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }
};
