
// Resource optimization utilities
export const resourceOptimization = {
  // Preload critical resources
  preloadCriticalResources: () => {
    const criticalResources = [
      { href: '/src/styles/index.css', as: 'style' },
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' }
    ];

    criticalResources.forEach(({ href, as }) => {
      const existing = document.querySelector(`link[href="${href}"]`);
      if (!existing) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        if (as === 'style') {
          link.onload = () => {
            link.rel = 'stylesheet';
          };
        }
        document.head.appendChild(link);
      }
    });
  },

  // Prefetch next page resources
  prefetchNextPageResources: (routes: string[]) => {
    routes.forEach((route) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  },

  // Inline critical CSS
  inlineCriticalCSS: (css: string) => {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
  },

  // Remove unused CSS (basic implementation)
  removeUnusedCSS: () => {
    // This would need a more sophisticated implementation in production
    // For now, we'll just log unused selectors
    if (typeof window !== 'undefined' && window.getComputedStyle) {
      const stylesheets = Array.from(document.styleSheets);
      console.log('Total stylesheets:', stylesheets.length);
      
      // In a real implementation, you'd analyze which CSS rules are actually used
      // and remove the unused ones
    }
  },

  // Optimize font loading
  optimizeFontLoading: () => {
    // Add font-display: swap to improve loading performance
    const fontFaces = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontFaces.forEach((link: any) => {
      if (!link.href.includes('display=swap')) {
        link.href += link.href.includes('?') ? '&display=swap' : '?display=swap';
      }
    });
  }
};
