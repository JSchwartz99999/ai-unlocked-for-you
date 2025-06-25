
// Performance monitoring and optimization utilities
export const performanceMonitor = {
  // Track Core Web Vitals
  trackCoreWebVitals: () => {
    if (typeof window === 'undefined') return;
    
    // Track Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('LCP:', entry.startTime);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Track First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fidEntry = entry as PerformanceEventTiming;
        if (fidEntry.processingStart) {
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
        }
      }
    }).observe({ entryTypes: ['first-input'] });

    // Track Cumulative Layout Shift (CLS)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const clsEntry = entry as any; // Using any type as LayoutShift is not in standard TypeScript definitions
        if (clsEntry.hadRecentInput !== undefined && !clsEntry.hadRecentInput) {
          console.log('CLS:', clsEntry.value);
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  },

  // Lazy load images
  setupLazyLoading: () => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });
    }
  },

  // Preload critical resources
  preloadCriticalResources: () => {
    const criticalStyles = document.createElement('link');
    criticalStyles.rel = 'preload';
    criticalStyles.as = 'style';
    criticalStyles.href = '/src/styles/index.css';
    document.head.appendChild(criticalStyles);
  }
};
