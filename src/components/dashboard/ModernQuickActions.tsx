
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Users, Package, CreditCard, Settings, TrendingUp, Crown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ModernQuickActionsProps {
  onUpgrade?: () => void;
}

export const ModernQuickActions: React.FC<ModernQuickActionsProps> = ({ onUpgrade }) => {
  const { role, subscription } = useAuth();

  const getActionsForRole = () => {
    const baseActions = [
      { 
        icon: FileText, 
        label: 'New Invoice', 
        gradient: 'from-green-500 to-teal-500',
        bgGradient: 'from-green-50 to-teal-50',
        action: () => console.log('New Invoice') 
      },
      { 
        icon: Users, 
        label: 'Add Customer', 
        gradient: 'from-blue-500 to-purple-500',
        bgGradient: 'from-blue-50 to-purple-50',
        action: () => console.log('Add Customer') 
      },
    ];

    if (subscription?.plan === 'free') {
      return [
        ...baseActions,
        { 
          icon: CreditCard, 
          label: 'Upgrade Plan', 
          gradient: 'from-orange-500 to-red-500',
          bgGradient: 'from-orange-50 to-red-50',
          action: onUpgrade 
        },
      ];
    }

    switch (role) {
      case 'Owner':
        return [
          ...baseActions,
          { 
            icon: Package, 
            label: 'Add Product', 
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50',
            action: () => console.log('Add Product') 
          },
          { 
            icon: CreditCard, 
            label: 'View Payments', 
            gradient: 'from-indigo-500 to-blue-500',
            bgGradient: 'from-indigo-50 to-blue-50',
            action: () => console.log('View Payments') 
          },
          { 
            icon: Users, 
            label: 'Manage Team', 
            gradient: 'from-teal-500 to-green-500',
            bgGradient: 'from-teal-50 to-green-50',
            action: () => console.log('Manage Team') 
          },
          { 
            icon: Settings, 
            label: 'Settings', 
            gradient: 'from-gray-500 to-gray-600',
            bgGradient: 'from-gray-50 to-gray-100',
            action: () => console.log('Settings') 
          },
        ];

      case 'Admin':
        return [
          ...baseActions,
          { 
            icon: Package, 
            label: 'Add Product', 
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50',
            action: () => console.log('Add Product') 
          },
          { 
            icon: CreditCard, 
            label: 'View Payments', 
            gradient: 'from-indigo-500 to-blue-500',
            bgGradient: 'from-indigo-50 to-blue-50',
            action: () => console.log('View Payments') 
          },
        ];

      case 'Salesperson':
        return baseActions;

      default:
        return baseActions;
    }
  };

  const actions = getActionsForRole();

  return (
    <Card className="bg-white border-0 shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
          <Plus className="h-4 w-4 text-purple-500" />
          <span>Quick Actions</span>
          {subscription?.is_trial && (
            <Crown className="h-3 w-3 text-yellow-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`h-auto p-3 bg-gradient-to-br ${action.bgGradient} hover:shadow-md transition-all duration-300 border-0`}
              onClick={action.action}
            >
              <div className="flex flex-col items-center space-y-2 w-full">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${action.gradient}`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700">{action.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
