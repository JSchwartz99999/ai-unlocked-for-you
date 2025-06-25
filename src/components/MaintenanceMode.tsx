
import React from 'react';
import { AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MaintenanceModeProps {
  isActive: boolean;
  message?: string;
  estimatedTime?: string;
}

const MaintenanceMode: React.FC<MaintenanceModeProps> = ({
  isActive,
  message = "We're currently performing scheduled maintenance to improve your experience.",
  estimatedTime = "We'll be back shortly"
}) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Under Maintenance
          </h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {message}
        </p>
        
        <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Clock className="w-4 h-4 mr-2" />
          {estimatedTime}
        </div>
        
        <Button 
          onClick={() => window.location.reload()} 
          className="w-full"
          variant="outline"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Check Again
        </Button>
        
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
          Thank you for your patience
        </p>
      </div>
    </div>
  );
};

export default MaintenanceMode;
