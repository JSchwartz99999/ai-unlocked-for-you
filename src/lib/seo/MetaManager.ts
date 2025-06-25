
import { SEOConfig } from './types';

export class MetaManager {
  constructor(private config: SEOConfig) {}

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
    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
