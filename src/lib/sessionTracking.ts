
// Advanced user session tracking
interface SessionData {
  sessionId: string;
  userId?: string;
  startTime: number;
  lastActivity: number;
  pageViews: number;
  events: SessionEvent[];
  device: DeviceInfo;
  referrer: string;
  utmParams: Record<string, string>;
}

interface SessionEvent {
  type: string;
  timestamp: number;
  data: any;
  page: string;
}

interface DeviceInfo {
  userAgent: string;
  platform: string;
  screenResolution: string;
  colorDepth: number;
  timezone: string;
  language: string;
}

class SessionTracker {
  private session: SessionData;
  private isActive: boolean = true;
  private inactivityTimeout: number = 30 * 60 * 1000; // 30 minutes
  private heartbeatInterval: number = 60 * 1000; // 1 minute
  private heartbeatTimer?: NodeJS.Timeout;
  private inactivityTimer?: NodeJS.Timeout;

  constructor() {
    this.session = this.initializeSession();
    this.setupEventListeners();
    this.startHeartbeat();
  }

  private initializeSession(): SessionData {
    const existingSessionId = localStorage.getItem('session_id');
    const sessionId = existingSessionId || this.generateSessionId();
    
    if (!existingSessionId) {
      localStorage.setItem('session_id', sessionId);
    }

    return {
      sessionId,
      startTime: Date.now(),
      lastActivity: Date.now(),
      pageViews: 1,
      events: [],
      device: this.getDeviceInfo(),
      referrer: document.referrer,
      utmParams: this.extractUtmParams()
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getDeviceInfo(): DeviceInfo {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language
    };
  }

  private extractUtmParams(): Record<string, string> {
    const params: Record<string, string> = {};
    const urlParams = new URLSearchParams(window.location.search);
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        params[param] = value;
      }
    });

    return params;
  }

  private setupEventListeners(): void {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent('page_hidden', {});
        this.isActive = false;
      } else {
        this.trackEvent('page_visible', {});
        this.isActive = true;
        this.updateActivity();
      }
    });

    // Track user interactions
    ['click', 'scroll', 'keydown', 'mousemove'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        this.updateActivity();
      }, { passive: true });
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.trackEvent('page_unload', {
        sessionDuration: Date.now() - this.session.startTime,
        pageViews: this.session.pageViews,
        eventCount: this.session.events.length
      });
      this.saveSession();
    });

    // Track navigation
    window.addEventListener('popstate', () => {
      this.trackPageView();
    });
  }

  private updateActivity(): void {
    this.session.lastActivity = Date.now();
    
    // Reset inactivity timer
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
    
    this.inactivityTimer = setTimeout(() => {
      this.trackEvent('session_inactive', {
        inactivityDuration: this.inactivityTimeout
      });
    }, this.inactivityTimeout);
  }

  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.isActive) {
        this.trackEvent('heartbeat', {
          sessionDuration: Date.now() - this.session.startTime,
          pageViews: this.session.pageViews
        });
      }
    }, this.heartbeatInterval);
  }

  trackEvent(type: string, data: any): void {
    const event: SessionEvent = {
      type,
      timestamp: Date.now(),
      data,
      page: window.location.pathname
    };

    this.session.events.push(event);
    this.updateActivity();

    // Limit events to prevent memory issues
    if (this.session.events.length > 1000) {
      this.session.events = this.session.events.slice(-500);
    }

    console.log('Session Event:', event);
  }

  trackPageView(): void {
    this.session.pageViews++;
    this.trackEvent('page_view', {
      path: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      title: document.title
    });
  }

  setUserId(userId: string): void {
    this.session.userId = userId;
    this.trackEvent('user_identified', { userId });
  }

  getSessionSummary(): {
    duration: number;
    pageViews: number;
    eventCount: number;
    isActive: boolean;
    topEvents: Array<{ type: string; count: number }>;
  } {
    const duration = Date.now() - this.session.startTime;
    const eventCounts: Record<string, number> = {};
    
    this.session.events.forEach(event => {
      eventCounts[event.type] = (eventCounts[event.type] || 0) + 1;
    });

    const topEvents = Object.entries(eventCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      duration,
      pageViews: this.session.pageViews,
      eventCount: this.session.events.length,
      isActive: this.isActive,
      topEvents
    };
  }

  private saveSession(): void {
    localStorage.setItem('session_data', JSON.stringify(this.session));
  }

  exportSession(): SessionData {
    return { ...this.session };
  }

  destroy(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
    }
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
    this.saveSession();
  }
}

// Global session tracker
export const sessionTracker = new SessionTracker();

// Auto-cleanup on page unload
window.addEventListener('beforeunload', () => {
  sessionTracker.destroy();
});
