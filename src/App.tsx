
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import MaintenanceMode from "./components/MaintenanceMode";
import { performanceMonitor } from "./lib/performance";
import { analytics } from "./lib/analytics";
import { performanceBudget } from "./lib/performanceBudget";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  useEffect(() => {
    // Initialize performance monitoring
    performanceMonitor.trackCoreWebVitals();
    performanceMonitor.setupLazyLoading();
    performanceMonitor.preloadCriticalResources();
    
    // Initialize analytics
    analytics.trackPageView(window.location.pathname);
    
    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
    
    // Check maintenance mode (you can connect this to your backend)
    const checkMaintenanceMode = () => {
      // Example: fetch('/api/maintenance-status')
      // For now, we'll just check a flag
      const maintenanceFlag = localStorage.getItem('maintenance-mode');
      setIsMaintenanceMode(maintenanceFlag === 'true');
    };
    
    checkMaintenanceMode();
    
    // Performance monitoring
    setTimeout(() => {
      const score = performanceBudget.getPerformanceScore();
      analytics.trackPerformance(score.metrics);
    }, 2000);
  }, []);

  return (
    <ErrorBoundary>
      <MaintenanceMode 
        isActive={isMaintenanceMode}
        message="We're upgrading our AI learning platform to serve you better!"
        estimatedTime="Expected completion: 30 minutes"
      />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
