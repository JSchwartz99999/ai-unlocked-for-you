
// Health check and monitoring system
interface HealthCheckResult {
  service: string;
  status: 'healthy' | 'warning' | 'critical';
  responseTime: number;
  message: string;
  timestamp: number;
}

interface SystemMetrics {
  uptime: number;
  memoryUsage: number;
  networkLatency: number;
  errorRate: number;
  performanceScore: number;
}

class HealthChecker {
  private checks: Map<string, () => Promise<HealthCheckResult>> = new Map();
  private metrics: SystemMetrics = {
    uptime: 0,
    memoryUsage: 0,
    networkLatency: 0,
    errorRate: 0,
    performanceScore: 0
  };

  registerCheck(name: string, checkFn: () => Promise<HealthCheckResult>) {
    this.checks.set(name, checkFn);
  }

  async runAllChecks(): Promise<HealthCheckResult[]> {
    const results: HealthCheckResult[] = [];
    
    for (const [name, checkFn] of this.checks) {
      try {
        const result = await checkFn();
        results.push(result);
      } catch (error) {
        results.push({
          service: name,
          status: 'critical',
          responseTime: 0,
          message: `Check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          timestamp: Date.now()
        });
      }
    }
    
    return results;
  }

  async getSystemMetrics(): Promise<SystemMetrics> {
    // Calculate uptime
    const navigationStart = performance.timing?.navigationStart || Date.now();
    this.metrics.uptime = Date.now() - navigationStart;

    // Estimate memory usage (if available)
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100;
    }

    // Calculate network latency
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.metrics.networkLatency = navigation.responseStart - navigation.requestStart;
    }

    // Calculate performance score
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    const fidEntries = performance.getEntriesByType('first-input');
    
    if (lcpEntries.length > 0) {
      const lcp = lcpEntries[lcpEntries.length - 1].startTime;
      this.metrics.performanceScore = Math.max(0, 100 - (lcp / 25)); // Rough scoring
    }

    return this.metrics;
  }

  getOverallHealth(results: HealthCheckResult[]): 'healthy' | 'warning' | 'critical' {
    const statuses = results.map(r => r.status);
    
    if (statuses.includes('critical')) return 'critical';
    if (statuses.includes('warning')) return 'warning';
    return 'healthy';
  }
}

// Default health checks
const healthChecker = new HealthChecker();

// API connectivity check
healthChecker.registerCheck('api_connectivity', async () => {
  const start = Date.now();
  try {
    // Test with a simple fetch to a known endpoint
    const response = await fetch(window.location.origin, { method: 'HEAD' });
    const responseTime = Date.now() - start;
    
    return {
      service: 'API Connectivity',
      status: response.ok ? 'healthy' : 'warning',
      responseTime,
      message: response.ok ? 'API is responsive' : `HTTP ${response.status}`,
      timestamp: Date.now()
    };
  } catch (error) {
    return {
      service: 'API Connectivity',
      status: 'critical',
      responseTime: Date.now() - start,
      message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      timestamp: Date.now()
    };
  }
});

// Performance check
healthChecker.registerCheck('performance', async () => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const loadTime = navigation ? navigation.loadEventEnd - navigation.fetchStart : 0;
  
  return {
    service: 'Performance',
    status: loadTime < 3000 ? 'healthy' : loadTime < 5000 ? 'warning' : 'critical',
    responseTime: loadTime,
    message: `Page load time: ${loadTime}ms`,
    timestamp: Date.now()
  };
});

// LocalStorage availability check
healthChecker.registerCheck('local_storage', async () => {
  const start = Date.now();
  try {
    const testKey = 'health_check_test';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    
    return {
      service: 'Local Storage',
      status: 'healthy',
      responseTime: Date.now() - start,
      message: 'Local storage is available',
      timestamp: Date.now()
    };
  } catch (error) {
    return {
      service: 'Local Storage',
      status: 'warning',
      responseTime: Date.now() - start,
      message: 'Local storage is not available',
      timestamp: Date.now()
    };
  }
});

export { healthChecker, type HealthCheckResult, type SystemMetrics };
