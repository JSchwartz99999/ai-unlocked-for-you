
// SEO type definitions
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  author?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: any;
}

export interface SEOMetrics {
  titleLength: number;
  descriptionLength: number;
  keywordDensity: Record<string, number>;
  imageAltTexts: number;
  internalLinks: number;
  externalLinks: number;
  headingStructure: Record<string, number>;
}

export interface SEOReport {
  score: number;
  issues: string[];
  recommendations: string[];
}
