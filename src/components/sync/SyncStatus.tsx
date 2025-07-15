
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wifi, WifiOff, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { formatRelativeTime } from '@/lib/utils';

export const SyncStatus: React.FC = () => {
  const { isOnline, lastSync, syncErrors, pendingSync, triggerSync } = useOfflineSync();

  return (
    <Card className="border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isOnline ? (
              <div className="flex items-center text-green-600">
                <Wifi className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Online</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <WifiOff className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Offline</span>
              </div>
            )}

            {lastSync && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                <span className="text-xs">
                  Synced {formatRelativeTime(lastSync.toISOString())}
                </span>
              </div>
            )}

            {syncErrors.length > 0 && (
              <div className="flex items-center text-red-600">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span className="text-xs">
                  {syncErrors.length} sync error{syncErrors.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={triggerSync}
            disabled={!isOnline || pendingSync}
            className="h-6 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <RefreshCw className={`h-3 w-3 ${pendingSync ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {syncErrors.length > 0 && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
            <p className="font-medium">Sync Issues:</p>
            {syncErrors.slice(0, 2).map((error, index) => (
              <p key={index}>• {error}</p>
            ))}
            {syncErrors.length > 2 && (
              <p>• ... and {syncErrors.length - 2} more</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
