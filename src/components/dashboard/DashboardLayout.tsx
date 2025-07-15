
import React from 'react';
import { MobileNavigation } from './MobileNavigation';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* Mobile-first layout */}
      <div className="pb-16"> {/* Bottom padding for mobile nav */}
        {children}
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
};
