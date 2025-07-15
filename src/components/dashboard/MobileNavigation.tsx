
import React from 'react';
import { Home, TrendingUp, PlusCircle, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export const MobileNavigation = () => {
  const { role, subscription } = useAuth();
  
  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', active: true, path: '/' },
      { icon: TrendingUp, label: 'Sales', active: false, path: '/sales' },
      { icon: PlusCircle, label: 'Quick Add', active: false, path: '/quick-add' },
      { icon: BarChart3, label: 'Analytics', active: false, path: '/analytics' },
      { icon: Settings, label: 'Settings', active: false, path: '/settings' },
    ];

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  const handleNavigation = (path: string) => {
    // Check if analytics is locked for free plan
    if (path === '/analytics' && subscription?.plan === 'free') {
      alert('Upgrade to access advanced analytics');
      return;
    }
    
    // Navigate to the path
    window.location.href = path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-500 border-t border-green-400 z-50 safe-area-pb">
      <div className="px-2 py-1">
        <div className="grid grid-cols-5 gap-1 w-full">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 text-xs font-medium transition-colors rounded-lg min-h-[60px]",
                item.active
                  ? "text-white bg-green-600"
                  : "text-white hover:text-green-100 hover:bg-green-600",
                item.path === '/analytics' && subscription?.plan === 'free' && "opacity-60"
              )}
            >
              <item.icon className="h-5 w-5 mb-1 flex-shrink-0" />
              <span className="text-center leading-tight truncate w-full">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
