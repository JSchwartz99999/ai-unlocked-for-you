
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  eventId?: string;
}

class AdvancedErrorBoundary extends Component<Props, State> {
  private retryCount = 0;
  private maxRetries = 3;

  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const eventId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.error('AdvancedErrorBoundary caught an error:', error, errorInfo);
    
    // Enhanced error tracking
    analytics.trackError(error, 'error_boundary');
    analytics.track({
      name: 'error_boundary_triggered',
      properties: {
        eventId,
        errorMessage: error.message,
        errorStack: error.stack,
        componentStack: errorInfo.componentStack,
        retryCount: this.retryCount,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString()
      }
    });

    this.setState({
      error,
      errorInfo,
      eventId
    });

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo, tags: { eventId } });
    }
  }

  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      analytics.track({
        name: 'error_boundary_retry',
        properties: {
          eventId: this.state.eventId,
          retryCount: this.retryCount
        }
      });
      this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    }
  };

  private handleReload = () => {
    analytics.track({
      name: 'error_boundary_reload',
      properties: {
        eventId: this.state.eventId
      }
    });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Oops! Something went wrong
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We've encountered an unexpected error. Our team has been notified.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm">
                <summary className="cursor-pointer font-medium mb-2">Error Details</summary>
                <div className="font-mono text-xs">
                  <p><strong>Error:</strong> {this.state.error.message}</p>
                  <p><strong>Event ID:</strong> {this.state.eventId}</p>
                </div>
              </details>
            )}
            
            <div className="space-y-3">
              {this.retryCount < this.maxRetries && (
                <Button onClick={this.handleRetry} className="w-full">
                  Try Again ({this.maxRetries - this.retryCount} attempts left)
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={this.handleReload}
                className="w-full"
              >
                Reload Page
              </Button>
            </div>

            {this.state.eventId && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                Reference ID: {this.state.eventId}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AdvancedErrorBoundary;
