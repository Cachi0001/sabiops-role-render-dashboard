
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, Package, FileText, CreditCard, Settings } from 'lucide-react';

interface QuickActionsProps {
  role: string;
  subscription: any;
  onUpgrade?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ role, subscription, onUpgrade }) => {
  const getActionsForRole = () => {
    const baseActions = [
      { icon: FileText, label: 'New Invoice', color: 'bg-green-600 hover:bg-green-700' },
      { icon: Users, label: 'Add Customer', color: 'bg-blue-600 hover:bg-blue-700' },
    ];

    if (subscription?.plan === 'free') {
      return [
        ...baseActions,
        { icon: CreditCard, label: 'Upgrade Plan', color: 'bg-orange-600 hover:bg-orange-700', action: onUpgrade },
      ];
    }

    switch (role) {
      case 'Owner':
        return [
          ...baseActions,
          { icon: Package, label: 'Add Product', color: 'bg-purple-600 hover:bg-purple-700' },
          { icon: CreditCard, label: 'View Payments', color: 'bg-indigo-600 hover:bg-indigo-700' },
          { icon: Users, label: 'Manage Team', color: 'bg-teal-600 hover:bg-teal-700' },
          { icon: Settings, label: 'Settings', color: 'bg-gray-600 hover:bg-gray-700' },
        ];

      case 'Admin':
        return [
          ...baseActions,
          { icon: Package, label: 'Add Product', color: 'bg-purple-600 hover:bg-purple-700' },
          { icon: CreditCard, label: 'View Payments', color: 'bg-indigo-600 hover:bg-indigo-700' },
        ];

      case 'Salesperson':
        return baseActions;

      default:
        return baseActions;
    }
  };

  const actions = getActionsForRole();

  return (
    <Card className="bg-white border-green-200">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-green-800 flex items-center">
          <PlusCircle className="h-4 w-4 mr-2 text-green-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              className={`${action.color} text-white text-xs p-3 h-auto flex flex-col items-center space-y-1`}
              onClick={action.action}
            >
              <action.icon className="h-4 w-4" />
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
