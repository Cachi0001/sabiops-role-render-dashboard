
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, TrendingUp, FileText, CreditCard, Package, Users, Crown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ModernRecentActivitiesProps {
  activities?: any[];
  loading: boolean;
}

export const ModernRecentActivities: React.FC<ModernRecentActivitiesProps> = ({ 
  activities, 
  loading 
}) => {
  const { subscription } = useAuth();

  if (loading) {
    return (
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader>
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-24 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const mockActivities = activities || [
    { type: 'sale', description: 'Sold 2 Office Chairs to John Doe', timestamp: '2 hours ago', amount: '₦45,000' },
    { type: 'invoice', description: 'Invoice #INV-1234 paid by Jane Smith', timestamp: '4 hours ago', amount: '₦15,000' },
    { type: 'product', description: 'Added new product: Desk Lamp', timestamp: '6 hours ago' },
    { type: 'payment', description: 'Received payment via transfer', timestamp: '8 hours ago', amount: '₦25,000' },
    { type: 'customer', description: 'New customer: Alice Johnson', timestamp: '1 day ago' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sale': return TrendingUp;
      case 'invoice': return FileText;
      case 'payment': return CreditCard;
      case 'product': return Package;
      case 'customer': return Users;
      default: return Activity;
    }
  };

  const getActivityGradient = (type: string) => {
    switch (type) {
      case 'sale': return 'from-green-500 to-teal-500';
      case 'invoice': return 'from-blue-500 to-indigo-500';
      case 'payment': return 'from-purple-500 to-pink-500';
      case 'product': return 'from-orange-500 to-red-500';
      case 'customer': return 'from-teal-500 to-green-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <Card className="bg-white border-0 shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500" />
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
          <Activity className="h-4 w-4 text-blue-500" />
          <span>Recent Activities</span>
          {subscription?.is_trial && (
            <Crown className="h-3 w-3 text-yellow-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {mockActivities.slice(0, 5).map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            const gradient = getActivityGradient(activity.type);
            
            return (
              <div key={index} className="flex items-start space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                <div className={`p-2 rounded-full bg-gradient-to-br ${gradient} shadow-sm`}>
                  <Icon className="h-3 w-3 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-gray-900 font-medium leading-5">
                      {activity.description}
                    </p>
                    {activity.amount && (
                      <span className="text-xs font-semibold text-green-600 ml-2 flex-shrink-0">
                        {activity.amount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
