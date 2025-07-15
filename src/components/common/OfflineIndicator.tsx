
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface OfflineIndicatorProps {
  isOnline: boolean;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline }) => {
  return (
    <div className="flex items-center">
      {isOnline ? (
        <Wifi className="h-4 w-4 text-green-600" />
      ) : (
        <div className="flex items-center space-x-1 text-red-600">
          <WifiOff className="h-4 w-4" />
          <span className="text-xs">Offline</span>
        </div>
      )}
    </div>
  );
};
