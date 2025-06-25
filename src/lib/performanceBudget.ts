
// Performance budget monitoring
interface PerformanceBudget {
  maxLoadTime: number; // in milliseconds
  maxBundleSize: number; // in KB
  maxImageSize: number; // in KB
  maxLCP: number; // Largest Contentful Paint in milliseconds
  maxFID: number; // First Input Delay in milliseconds
  maxCLS: number; // Cumulative Layout Shift score
}

const PERFORMANCE_BUDGET: PerformanceBudget = {
  maxLoadTime: 3000, // 3 seconds
  maxBundleSize: 512, // 512KB
  maxImageSize: 200, // 200KB
  maxLCP: 2500, // 2.5 seconds
  maxFID: 100, // 100ms
  maxCLS: 0.1 // 0.1 score
};

export const performanceBudget = {
  // Check if performance metrics meet budget
  checkBudget: (metrics: Partial<PerformanceBudget>) => {
    const violations: string[] = [];
    
    Object.entries(metrics).forEach(([key, value]) => {
      const budgetKey = key as keyof PerformanceBudget;
      const budgetValue = PERFORMANCE_BUDGET[budgetKey];
      
      if (value > budgetValue) {
        violations.push(`${key}: ${value} exceeds budget of ${budgetValue}`);
      }
    });
    
    return {
      passed: violations.length === 0,
      violations
    };
  },

  // Monitor resource sizes
  monitorResourceSizes: () => {
    if (typeof window === 'undefined') return;
    
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const violations: string[] = [];
    
    resources.forEach((resource) => {
      if (resource.transferSize) {
        const sizeKB = resource.transferSize / 1024;
        
        // Check image sizes
        if (resource.initiatorType === 'img' && sizeKB > PERFORMANCE_BUDGET.maxImageSize) {
          violations.push(`Image ${resource.name} is ${sizeKB.toFixed(2)}KB (budget: ${PERFORMANCE_BUDGET.maxImageSize}KB)`);
        }
        
        // Check script sizes
        if (resource.initiatorType === 'script' && sizeKB > PERFORMANCE_BUDGET.maxBundleSize) {
          violations.push(`Script ${resource.name} is ${sizeKB.toFixed(2)}KB (budget: ${PERFORMANCE_BUDGET.maxBundleSize}KB)`);
        }
      }
    });
    
    if (violations.length > 0) {
      console.warn('Performance Budget Violations:', violations);
    }
    
    return violations;
  },

  // Get performance score
  getPerformanceScore: () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const loadTime = navigation.loadEventEnd - navigation.fetchStart;
    
    const metrics = {
      loadTime,
      // Add other metrics as they become available
    };
    
    const result = performanceBudget.checkBudget(metrics);
    
    return {
      score: result.passed ? 100 : Math.max(0, 100 - (result.violations.length * 20)),
      metrics,
      violations: result.violations
    };
  }
};

// Auto-monitor on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceBudget.monitorResourceSizes();
      const score = performanceBudget.getPerformanceScore();
      console.log('Performance Score:', score);
    }, 1000);
  });
}
