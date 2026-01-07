import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdvancedErrorBoundary from "./components/AdvancedErrorBoundary";
import MaintenanceMode from "./components/MaintenanceMode";
import { performanceMonitor } from "./lib/performance";
import { analytics } from "./lib/analytics";
import { performanceBudget } from "./lib/performanceBudget";
import { useAdvancedPerformance } from "./hooks/useAdvancedPerformance";
import { resourceOptimization } from "./lib/resourceOptimization";
import { imageOptimization } from "./lib/imageOptimization";
import MonitoringDashboard from "./components/MonitoringDashboard";
import { healthChecker } from "./lib/healthCheck";
import { sessionTracker } from "./lib/sessionTracking";
import { SEOManager } from "./lib/seo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const AppContent = () => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const { metrics } = useAdvancedPerformance();

  useEffect(() => {
    // Initialize performance monitoring
    performanceMonitor.trackCoreWebVitals();
    performanceMonitor.setupLazyLoading();
    performanceMonitor.preloadCriticalResources();
    
    // Initialize resource optimizations
    resourceOptimization.preloadCriticalResources();
    resourceOptimization.optimizeFontLoading();
    
    // Initialize image optimizations
    imageOptimization.lazyLoadImages();
    imageOptimization.preloadCriticalImages(['/placeholder.svg']);
    
    // Check WebP support and log it
    imageOptimization.supportsWebP().then((supported) => {
      console.log('WebP support:', supported);
      if (supported) {
        analytics.track({
          name: 'webp_support',
          properties: { supported: true }
        });
      }
    });
    
    // Initialize analytics
    analytics.trackPageView(window.location.pathname);
    
    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
          analytics.track({
            name: 'service_worker_registered',
            properties: { scope: registration.scope }
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
          analytics.trackError(new Error('Service Worker registration failed'), 'sw_registration');
        });
    }
    
    // Check maintenance mode
    const checkMaintenanceMode = () => {
      const maintenanceFlag = localStorage.getItem('maintenance-mode');
      setIsMaintenanceMode(maintenanceFlag === 'true');
    };
    
    checkMaintenanceMode();
    
    // Initialize advanced features
    sessionTracker.trackPageView();
    
    // Initialize SEO manager
    const seoManager = new SEOManager({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      keywords: ['AI', 'learning', 'education', 'artificial intelligence', 'no-code'],
      canonicalUrl: window.location.href,
      ogImage: '/ai-unlocked-for-you/og-image.png',
      ogType: 'website',
      twitterCard: 'summary_large_image'
    });

    // Run health checks
    const runHealthChecks = async () => {
      const results = await healthChecker.runAllChecks();
      const systemMetrics = await healthChecker.getSystemMetrics();
      const overallHealth = healthChecker.getOverallHealth(results);
      
      console.log('Health Check Results:', {
        overall: overallHealth,
        checks: results,
        metrics: systemMetrics
      });

      // Track health status
      analytics.track({
        name: 'health_check',
        properties: {
          status: overallHealth,
          checkCount: results.length,
          systemMetrics
        }
      });
    };

    // Run initial health check
    runHealthChecks();

    // Set up periodic health checks
    const healthCheckInterval = setInterval(runHealthChecks, 5 * 60 * 1000); // Every 5 minutes

    // Performance monitoring with enhanced tracking
    const performanceTimer = setTimeout(() => {
      const score = performanceBudget.getPerformanceScore();
      analytics.trackPerformance({
        ...score.metrics,
        performanceScore: score.score,
        largestContentfulPaint: metrics.LCP,
        firstInputDelay: metrics.FID,
        cumulativeLayoutShift: metrics.CLS,
        firstContentfulPaint: metrics.FCP
      });

      // Log performance summary
      console.log('Performance Summary:', {
        score: score.score,
        pageLoadTime: score.metrics.pageLoadTime,
        webVitals: metrics,
        budgetViolations: score.violations
      });
    }, 2000);

    return () => {
      clearTimeout(performanceTimer);
      clearInterval(healthCheckInterval);
    };
  }, [metrics]);

  return (
    <>
      <MaintenanceMode 
        isActive={isMaintenanceMode}
        message="We're upgrading our AI learning platform to serve you better!"
        estimatedTime="Expected completion: 30 minutes"
      />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/ai-unlocked-for-you">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <MonitoringDashboard />
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
};

const App = () => {
  return (
    <AdvancedErrorBoundary>
      <AppContent />
    </AdvancedErrorBoundary>
  );
};

export default App;
