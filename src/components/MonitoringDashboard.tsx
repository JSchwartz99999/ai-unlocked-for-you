
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface PerformanceMetrics {
  LCP: number;
  FID: number;
  CLS: number;
  FCP: number;
  TTFB: number;
}

interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  responseTime: number;
  errorRate: number;
  memoryUsage: number;
}

const MonitoringDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    LCP: 0,
    FID: 0,
    CLS: 0,
    FCP: 0,
    TTFB: 0
  });
  const [health, setHealth] = useState<SystemHealth>({
    status: 'healthy',
    uptime: 99.9,
    responseTime: 150,
    errorRate: 0.1,
    memoryUsage: 45
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or when explicitly enabled
    const showDashboard = localStorage.getItem('show-monitoring') === 'true' || 
                         process.env.NODE_ENV === 'development';
    setIsVisible(showDashboard);
  }, []);

  const getMetricStatus = (value: number, good: number, poor: number) => {
    if (value <= good) return 'good';
    if (value <= poor) return 'needs-improvement';
    return 'poor';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'needs-improvement': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'critical': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md w-full z-50 opacity-90 hover:opacity-100 transition-opacity">
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Performance Monitor
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="ml-auto p-1 h-6 w-6"
            >
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>LCP</span>
                <Badge variant="outline" className={getStatusColor(getMetricStatus(metrics.LCP, 2500, 4000))}>
                  {metrics.LCP}ms
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>FID</span>
                <Badge variant="outline" className={getStatusColor(getMetricStatus(metrics.FID, 100, 300))}>
                  {metrics.FID}ms
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>CLS</span>
                <Badge variant="outline" className={getStatusColor(getMetricStatus(metrics.CLS, 0.1, 0.25))}>
                  {metrics.CLS.toFixed(3)}
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {getHealthIcon(health.status)}
                <span className="text-xs">System {health.status}</span>
              </div>
              <div className="text-xs text-gray-600">
                <div>Uptime: {health.uptime}%</div>
                <div>Response: {health.responseTime}ms</div>
                <div>Error Rate: {health.errorRate}%</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Memory Usage</span>
              <span>{health.memoryUsage}%</span>
            </div>
            <Progress value={health.memoryUsage} className="h-1" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringDashboard;
