
import { SEOMetrics } from './types';

export class SEOAnalyzer {
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
}
