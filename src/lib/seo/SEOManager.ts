
import { SEOConfig, SEOMetrics, SEOReport } from './types';
import { MetaManager } from './MetaManager';
import { SEOAnalyzer } from './SEOAnalyzer';
import { SEOReporter } from './SEOReporter';

export class SEOManager {
  private metaManager: MetaManager;
  private analyzer: SEOAnalyzer;
  private reporter: SEOReporter;

  constructor(private config: SEOConfig) {
    this.metaManager = new MetaManager(config);
    this.analyzer = new SEOAnalyzer();
    this.reporter = new SEOReporter();
  }

  updateMeta(): void {
    this.metaManager.updateMeta();
  }

  analyzeContent(): SEOMetrics {
    return this.analyzer.analyzeContent();
  }

  generateSEOReport(): SEOReport {
    return this.reporter.generateSEOReport();
  }
}
