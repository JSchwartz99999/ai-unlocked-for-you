
import { useEffect, useRef } from 'react';
import { webVitals } from '@/lib/webVitals';
import { analytics } from '@/lib/analytics';
import { performanceBudget } from '@/lib/performanceBudget';

export const useAdvancedPerformance = () => {
  const metricsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    // Initialize Web Vitals monitoring
    webVitals.init((metric) => {
      console.log(`${metric.name}:`, metric.value, `(${metric.rating})`);
      
      // Store metric
      metricsRef.current[metric.name] = metric.value;
      
      // Track in analytics
      analytics.track({
        name: 'web_vital',
        properties: {
          metric: metric.name,
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta
        }
      });

      // Check against performance budget
      const budgetCheck = performanceBudget.checkBudget({
        pageLoadTime: metric.name === 'LCP' ? metric.value : undefined,
        maxLCP: metric.name === 'LCP' ? metric.value : undefined,
        maxFID: metric.name === 'FID' ? metric.value : undefined,
        maxCLS: metric.name === 'CLS' ? metric.value : undefined
      });

      if (!budgetCheck.passed) {
        console.warn('Performance Budget Violation:', budgetCheck.violations);
        analytics.track({
          name: 'performance_budget_violation',
          properties: {
            metric: metric.name,
            value: metric.value,
            violations: budgetCheck.violations
          }
        });
      }
    });

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const resource = entry as PerformanceResourceTiming;
        if (resource.transferSize && resource.transferSize > 100000) { // 100KB+
          console.warn(`Large resource detected: ${resource.name} (${(resource.transferSize / 1024).toFixed(2)}KB)`);
          analytics.track({
            name: 'large_resource_detected',
            properties: {
              url: resource.name,
              size: resource.transferSize,
              type: resource.initiatorType
            }
          });
        }
      });
    });

    resourceObserver.observe({ entryTypes: ['resource'] });

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration}ms`);
            analytics.track({
              name: 'long_task',
              properties: {
                duration: entry.duration,
                startTime: entry.startTime
              }
            });
          }
        });
      });

      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Long task API not supported
      }
    }

    return () => {
      resourceObserver.disconnect();
    };
  }, []);

  return {
    metrics: metricsRef.current
  };
};
