
// Web Vitals monitoring with real metrics collection
interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
}

type WebVitalsCallback = (metric: WebVitalsMetric) => void;

// Thresholds based on Google's Core Web Vitals
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 }
};

const getRating = (value: number, thresholds: { good: number; poor: number }) => {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
};

export const webVitals = {
  // Get Largest Contentful Paint
  getLCP: (callback: WebVitalsCallback) => {
    if (typeof window === 'undefined') return;

    let lcp = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      lcp = lastEntry.startTime;
      
      callback({
        name: 'LCP',
        value: lcp,
        rating: getRating(lcp, THRESHOLDS.LCP),
        delta: lcp,
        entries
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  },

  // Get First Input Delay
  getFID: (callback: WebVitalsCallback) => {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fid = entry.processingStart - entry.startTime;
        callback({
          name: 'FID',
          value: fid,
          rating: getRating(fid, THRESHOLDS.FID),
          delta: fid,
          entries: [entry]
        });
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
  },

  // Get Cumulative Layout Shift
  getCLS: (callback: WebVitalsCallback) => {
    if (typeof window === 'undefined') return;

    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });

      callback({
        name: 'CLS',
        value: clsValue,
        rating: getRating(clsValue, THRESHOLDS.CLS),
        delta: clsValue,
        entries
      });
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  },

  // Get First Contentful Paint
  getFCP: (callback: WebVitalsCallback) => {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          callback({
            name: 'FCP',
            value: entry.startTime,
            rating: getRating(entry.startTime, THRESHOLDS.FCP),
            delta: entry.startTime,
            entries: [entry]
          });
        }
      });
    });

    observer.observe({ entryTypes: ['paint'] });
  },

  // Get Time to First Byte
  getTTFB: (callback: WebVitalsCallback) => {
    if (typeof window === 'undefined') return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      callback({
        name: 'TTFB',
        value: ttfb,
        rating: getRating(ttfb, THRESHOLDS.TTFB),
        delta: ttfb,
        entries: [navigation]
      });
    }
  },

  // Initialize all Web Vitals monitoring
  init: (callback: WebVitalsCallback) => {
    webVitals.getLCP(callback);
    webVitals.getFID(callback);
    webVitals.getCLS(callback);
    webVitals.getFCP(callback);
    webVitals.getTTFB(callback);
  }
};
