
// Advanced SEO utilities
interface SEOConfig {
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

interface SEOMetrics {
  titleLength: number;
  descriptionLength: number;
  keywordDensity: Record<string, number>;
  imageAltTexts: number;
  internalLinks: number;
  externalLinks: number;
  headingStructure: Record<string, number>;
}

class SEOManager {
  private config: SEOConfig;

  constructor(config: SEOConfig) {
    this.config = config;
  }

  updateMeta(): void {
    // Update title
    document.title = this.config.title;

    // Update meta tags
    this.setMetaTag('description', this.config.description);
    this.setMetaTag('keywords', this.config.keywords.join(', '));
    this.setMetaTag('author', this.config.author || '');

    // Update Open Graph tags
    this.setMetaTag('og:title', this.config.title, 'property');
    this.setMetaTag('og:description', this.config.description, 'property');
    this.setMetaTag('og:type', this.config.ogType || 'website', 'property');
    this.setMetaTag('og:image', this.config.ogImage || '', 'property');

    // Update Twitter Card tags
    this.setMetaTag('twitter:card', this.config.twitterCard || 'summary_large_image');
    this.setMetaTag('twitter:title', this.config.title);
    this.setMetaTag('twitter:description', this.config.description);
    this.setMetaTag('twitter:image', this.config.ogImage || '');

    // Update canonical URL
    if (this.config.canonicalUrl) {
      this.setLinkTag('canonical', this.config.canonicalUrl);
    }

    // Add structured data
    if (this.config.structuredData) {
      this.setStructuredData(this.config.structuredData);
    }
  }

  private setMetaTag(name: string, content: string, attribute: string = 'name'): void {
    if (!content) return;

    let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, name);
      document.head.appendChild(tag);
    }
    tag.content = content;
  }

  private setLinkTag(rel: string, href: string): void {
    let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
    if (!tag) {
      tag = document.createElement('link');
      tag.rel = rel;
      document.head.appendChild(tag);
    }
    tag.href = href;
  }

  private setStructuredData(data: any): void {
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  analyzeContent(): SEOMetrics {
    const metrics: SEOMetrics = {
      titleLength: document.title.length,
      descriptionLength: this.getMetaContent('description').length,
      keywordDensity: this.calculateKeywordDensity(),
      imageAltTexts: this.countImageAltTexts(),
      internalLinks: this.countInternalLinks(),
      externalLinks: this.countExternalLinks(),
      headingStructure: this.analyzeHeadingStructure()
    };

    return metrics;
  }

  private getMetaContent(name: string): string {
    const meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    return meta ? meta.content : '';
  }

  private calculateKeywordDensity(): Record<string, number> {
    const text = document.body.textContent || '';
    const words = text.toLowerCase().split(/\s+/);
    const density: Record<string, number> = {};

    // Count word frequencies
    words.forEach(word => {
      if (word.length > 3) { // Ignore short words
        density[word] = (density[word] || 0) + 1;
      }
    });

    // Convert to percentages
    const totalWords = words.length;
    Object.keys(density).forEach(word => {
      density[word] = (density[word] / totalWords) * 100;
    });

    return density;
  }

  private countImageAltTexts(): number {
    const images = document.querySelectorAll('img');
    return Array.from(images).filter(img => img.alt && img.alt.trim() !== '').length;
  }

  private countInternalLinks(): number {
    const links = document.querySelectorAll('a[href]');
    return Array.from(links).filter(link => {
      const href = link.getAttribute('href') || '';
      return href.startsWith('/') || href.startsWith(window.location.origin);
    }).length;
  }

  private countExternalLinks(): number {
    const links = document.querySelectorAll('a[href]');
    return Array.from(links).filter(link => {
      const href = link.getAttribute('href') || '';
      return href.startsWith('http') && !href.startsWith(window.location.origin);
    }).length;
  }

  private analyzeHeadingStructure(): Record<string, number> {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const structure: Record<string, number> = {};

    headings.forEach(heading => {
      const tag = heading.tagName.toLowerCase();
      structure[tag] = (structure[tag] || 0) + 1;
    });

    return structure;
  }

  generateSEOReport(): { score: number; issues: string[]; recommendations: string[] } {
    const metrics = this.analyzeContent();
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

// Export utilities
export { SEOManager, type SEOConfig, type SEOMetrics };

// Auto-initialize for development
if (process.env.NODE_ENV === 'development') {
  // Create a global SEO manager for debugging
  (window as any).seoManager = new SEOManager({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    keywords: []
  });
}
