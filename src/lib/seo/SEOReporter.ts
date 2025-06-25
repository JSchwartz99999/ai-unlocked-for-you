
import { SEOReport, SEOMetrics } from './types';
import { SEOAnalyzer } from './SEOAnalyzer';

export class SEOReporter {
  private analyzer: SEOAnalyzer;

  constructor() {
    this.analyzer = new SEOAnalyzer();
  }

  generateSEOReport(): SEOReport {
    const metrics = this.analyzer.analyzeContent();
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Title length check
    if (metrics.titleLength < 30 || metrics.titleLength > 60) {
      issues.push('Title length is not optimal (30-60 characters recommended)');
      score -= 10;
    }

    // Description length check
    if (metrics.descriptionLength < 120 || metrics.descriptionLength > 160) {
      issues.push('Meta description length is not optimal (120-160 characters recommended)');
      score -= 10;
    }

    // Image alt text check
    const totalImages = document.querySelectorAll('img').length;
    if (totalImages > 0 && metrics.imageAltTexts < totalImages) {
      issues.push('Some images are missing alt text');
      score -= 15;
    }

    // Heading structure check
    if (!metrics.headingStructure.h1 || metrics.headingStructure.h1 > 1) {
      issues.push('Page should have exactly one H1 tag');
      score -= 10;
    }

    // Generate recommendations
    if (metrics.internalLinks < 3) {
      recommendations.push('Consider adding more internal links to improve site structure');
    }

    if (Object.keys(metrics.keywordDensity).length < 10) {
      recommendations.push('Consider expanding content to include more relevant keywords');
    }

    return {
      score: Math.max(0, score),
      issues,
      recommendations
    };
  }
}
