
// Analytics and monitoring utilities
interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export const analytics = {
  // Track custom events
  track: (event: AnalyticsEvent) => {
    const eventData = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
    
    console.log('Analytics Event:', eventData);
    
    // In production, send to analytics service
    if (process.env.NODE_ENV === 'production') {
      // Send to your analytics service here
      // Example: gtag('event', event.name, event.properties);
    }
  },

  // Track page views
  trackPageView: (path: string) => {
    analytics.track({
      name: 'page_view',
      properties: {
        path,
        title: document.title
      }
    });
  },

  // Track user interactions
  trackInteraction: (element: string, action: string) => {
    analytics.track({
      name: 'user_interaction',
      properties: {
        element,
        action
      }
    });
  },

  // Track performance metrics
  trackPerformance: (metrics: Partial<PerformanceMetrics>) => {
    analytics.track({
      name: 'performance_metrics',
      properties: metrics
    });
  },

  // Track errors
  trackError: (error: Error, context?: string) => {
    analytics.track({
      name: 'error',
      properties: {
        message: error.message,
        stack: error.stack,
        context,
        url: window.location.href
      }
    });
  },

  // Track conversion events
  trackConversion: (conversionType: string, value?: number) => {
    analytics.track({
      name: 'conversion',
      properties: {
        type: conversionType,
        value
      }
    });
  }
};

// Global error tracking
window.addEventListener('error', (event) => {
  analytics.trackError(event.error, 'global_error_handler');
});

window.addEventListener('unhandledrejection', (event) => {
  analytics.trackError(new Error(event.reason), 'unhandled_promise_rejection');
});
