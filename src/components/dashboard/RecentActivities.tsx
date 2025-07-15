
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, TrendingUp, FileText, CreditCard, Package } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface RecentActivitiesProps {
  activities: any[];
  role: string;
  loading: boolean;
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({ 
  activities, 
  role, 
  loading 
}) => {
  if (loading) {
    return (
      <Card className="bg-white border-green-200">
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

  // Mock activities if no data
  const mockActivities = [
    { type: 'sale', description: 'Sold 2 Office Chairs to John Doe', timestamp: '2025-01-07T10:00:00Z' },
    { type: 'invoice', description: 'Invoice #INV-1234 paid by Jane Smith', timestamp: '2025-01-07T09:30:00Z' },
    { type: 'product', description: 'Added new product: Desk Lamp', timestamp: '2025-01-07T09:00:00Z' },
    { type: 'payment', description: 'Received payment of ₦15,000', timestamp: '2025-01-07T08:30:00Z' },
    { type: 'customer', description: 'New customer registered: Alice Johnson', timestamp: '2025-01-07T08:00:00Z' },
  ];

  const displayActivities = activities || mockActivities;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sale':
        return TrendingUp;
      case 'invoice':
        return FileText;
      case 'payment':
        return CreditCard;
      case 'product':
        return Package;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'sale':
        return 'text-green-600 bg-green-100';
      case 'invoice':
        return 'text-blue-600 bg-blue-100';
      case 'payment':
        return 'text-purple-600 bg-purple-100';
      case 'product':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className="bg-white border-green-200">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-green-800 flex items-center">
          <Activity className="h-4 w-4 mr-2 text-green-600" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayActivities.slice(0, 5).map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            const colorClass = getActivityColor(activity.type);
            
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-green-900 font-medium">
                    {activity.description}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {formatRelativeTime(activity.timestamp)}
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
