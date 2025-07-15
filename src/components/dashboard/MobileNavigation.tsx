
import React from 'react';
import { Home, TrendingUp, Users, Settings, PlusCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export const MobileNavigation = () => {
  const { role } = useAuth();
  
  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', active: true },
      { icon: TrendingUp, label: 'Sales', active: false },
      { icon: PlusCircle, label: 'Quick Add', active: false },
    ];

    switch (role) {
      case 'Owner':
        return [
          ...baseItems,
          { icon: Users, label: 'Team', active: false },
          { icon: Settings, label: 'Settings', active: false },
        ];
      case 'Admin':
        return [
          ...baseItems,
          { icon: Users, label: 'Customers', active: false },
          { icon: Settings, label: 'Settings', active: false },
        ];
      case 'Salesperson':
        return [
          ...baseItems,
          { icon: Users, label: 'Customers', active: false },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-200 z-50">
      <div className="grid grid-cols-4 lg:grid-cols-5">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex flex-col items-center justify-center p-3 text-xs font-medium transition-colors",
              item.active
                ? "text-green-600 bg-green-50"
                : "text-green-700 hover:text-green-600 hover:bg-green-50"
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
