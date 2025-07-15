
import { useState, useEffect } from 'react';

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [syncErrors, setSyncErrors] = useState<string[]>([]);
  const [pendingSync, setPendingSync] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      triggerSync();
    };
    
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial sync check
    if (isOnline) {
      triggerSync();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerSync = async () => {
    if (!isOnline) return;

    setPendingSync(true);
    try {
      // Mock sync operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSync(new Date());
      setSyncErrors([]);
      console.log('Sync completed successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sync failed';
      setSyncErrors(prev => [...prev, errorMessage]);
      console.error('Sync error:', error);
    } finally {
      setPendingSync(false);
    }
  };

  return {
    isOnline,
    lastSync,
    syncErrors,
    pendingSync,
    triggerSync,
  };
};
