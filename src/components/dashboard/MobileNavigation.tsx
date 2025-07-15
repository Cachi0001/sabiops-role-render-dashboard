
import React from 'react';
import { Home, TrendingUp, Users, Settings, PlusCircle, BarChart3, History } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export const MobileNavigation = () => {
  const { role, subscription } = useAuth();
  
  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', active: true, path: '/' },
      { icon: TrendingUp, label: 'Sales', active: false, path: '/sales' },
      { icon: PlusCircle, label: 'Quick Add', active: false, path: '/quick-add' },
    ];

    // Add Analytics and Transactions for paid users
    if (subscription?.plan !== 'free') {
      baseItems.push(
        { icon: BarChart3, label: 'Analytics', active: false, path: '/analytics' },
        { icon: History, label: 'Transactions', active: false, path: '/transactions' }
      );
    }

    switch (role) {
      case 'Owner':
        return [
          ...baseItems,
          { icon: Users, label: 'Team', active: false, path: '/team' },
          { icon: Settings, label: 'Settings', active: false, path: '/settings' },
        ];
      case 'Admin':
        return [
          ...baseItems,
          { icon: Users, label: 'Customers', active: false, path: '/customers' },
          { icon: Settings, label: 'Settings', active: false, path: '/settings' },
        ];
      case 'Salesperson':
        return [
          ...baseItems,
          { icon: Users, label: 'Customers', active: false, path: '/customers' },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const handleNavigation = (path: string) => {
    // For Analytics and Transactions on free plan, show upgrade prompt
    if (subscription?.plan === 'free' && (path === '/analytics' || path === '/transactions')) {
      // You can add upgrade modal logic here
      console.log('Upgrade required for', path);
      return;
    }
    
    // Navigate to the path
    window.location.href = path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-500 border-t border-green-400 z-50 safe-area-pb">
      <div className="px-2 py-1">
        <div className={cn(
          "grid gap-1 w-full",
          navigationItems.length === 3 && "grid-cols-3",
          navigationItems.length === 4 && "grid-cols-4", 
          navigationItems.length === 5 && "grid-cols-5",
          navigationItems.length === 6 && "grid-cols-3",
          navigationItems.length === 7 && "grid-cols-4"
        )}>
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 text-xs font-medium transition-colors rounded-lg min-h-[60px]",
                item.active
                  ? "text-white bg-green-600"
                  : "text-white hover:text-green-100 hover:bg-green-600",
                // Dim locked features for free plan
                subscription?.plan === 'free' && (item.path === '/analytics' || item.path === '/transactions') && "opacity-60"
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
