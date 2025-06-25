
// Advanced caching strategies
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
}

class AdvancedCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private maxSize: number;
  private defaultTTL: number;

  constructor(maxSize = 100, defaultTTL = 5 * 60 * 1000) {
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  set(key: string, data: T, ttl?: number): void {
    // Implement LRU eviction if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.findLeastRecentlyUsed();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
      accessCount: 0,
      lastAccessed: Date.now()
    };

    this.cache.set(key, entry);
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = Date.now();

    return entry.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private findLeastRecentlyUsed(): string | null {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  getStats() {
    const entries = Array.from(this.cache.values());
    return {
      size: this.cache.size,
      totalAccesses: entries.reduce((sum, entry) => sum + entry.accessCount, 0),
      hitRate: entries.length > 0 ? entries.reduce((sum, entry) => sum + entry.accessCount, 0) / entries.length : 0,
      oldestEntry: Math.min(...entries.map(entry => entry.timestamp)),
      newestEntry: Math.max(...entries.map(entry => entry.timestamp))
    };
  }
}

// Global cache instances
export const apiCache = new AdvancedCache<any>(50, 5 * 60 * 1000); // 5 minutes
export const imageCache = new AdvancedCache<string>(100, 30 * 60 * 1000); // 30 minutes
export const componentCache = new AdvancedCache<any>(25, 10 * 60 * 1000); // 10 minutes

// Cache utilities
export const cacheUtils = {
  // Memoize function results
  memoize: <T extends (...args: any[]) => any>(fn: T, cache: AdvancedCache<ReturnType<T>>) => {
    return (...args: Parameters<T>): ReturnType<T> => {
      const key = JSON.stringify(args);
      const cached = cache.get(key);
      
      if (cached !== null) {
        return cached;
      }
      
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  },

  // Cache API responses
  cacheApiResponse: async <T>(key: string, fetcher: () => Promise<T>, ttl?: number): Promise<T> => {
    const cached = apiCache.get(key);
    if (cached !== null) {
      return cached;
    }
    
    const data = await fetcher();
    apiCache.set(key, data, ttl);
    return data;
  },

  // Preload cache entries
  preloadCache: (entries: Array<{ key: string; fetcher: () => Promise<any>; ttl?: number }>) => {
    entries.forEach(async ({ key, fetcher, ttl }) => {
      if (!apiCache.has(key)) {
        try {
          const data = await fetcher();
          apiCache.set(key, data, ttl);
        } catch (error) {
          console.warn(`Failed to preload cache entry: ${key}`, error);
        }
      }
    });
  }
};
