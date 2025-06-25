
import { useEffect } from 'react';

export const usePerformance = () => {
  useEffect(() => {
    // Track page load performance
    const trackPageLoad = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        console.log('Performance Metrics:', {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalTime: navigation.loadEventEnd - navigation.fetchStart,
        });
      }
    };

    // Track when the page is fully loaded
    if (document.readyState === 'complete') {
      trackPageLoad();
    } else {
      window.addEventListener('load', trackPageLoad);
    }

    return () => {
      window.removeEventListener('load', trackPageLoad);
    };
  }, []);
};
