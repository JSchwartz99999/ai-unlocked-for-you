
// Main SEO exports
export { SEOManager } from './SEOManager';
export { MetaManager } from './MetaManager';
export { SEOAnalyzer } from './SEOAnalyzer';
export { SEOReporter } from './SEOReporter';
export type { SEOConfig, SEOMetrics, SEOReport } from './types';

// Import SEOManager for auto-initialization
import { SEOManager } from './SEOManager';

// Auto-initialize for development
if (process.env.NODE_ENV === 'development') {
  // Create a global SEO manager for debugging
  (window as any).seoManager = new SEOManager({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    keywords: []
  });
}
