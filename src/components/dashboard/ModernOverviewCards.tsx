
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Users, FileText, DollarSign, Package, Crown, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ModernOverviewCardsProps {
  data: any;
  loading: boolean;
}

export const ModernOverviewCards: React.FC<ModernOverviewCardsProps> = ({ data, loading }) => {
  const { role, subscription } = useAuth();

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-6 w-20 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getCardsForRole = () => {
    const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;
    
    if (subscription?.plan === 'free') {
      return [
        {
          title: 'Revenue',
          value: formatCurrency(data?.revenue?.total || 45000),
          change: `+${formatCurrency(data?.revenue?.this_month || 8500)}`,
          changeType: 'positive',
          icon: DollarSign,
          gradient: 'from-green-500 to-green-600',
        },
        {
          title: 'Customers',
          value: data?.customers?.total || 25,
          change: `+${data?.customers?.new_this_month || 5} new`,
          changeType: 'positive',
          icon: Users,
          gradient: 'from-blue-500 to-blue-600',
        },
        {
          title: 'Invoices Used',
          value: `${data?.current_usage?.invoices || 3}/5`,
          change: 'Monthly limit',
          changeType: 'warning',
          icon: AlertTriangle,
          gradient: 'from-orange-500 to-red-500',
        },
      ];
    }

    const baseCards = [
      {
        title: 'Revenue',
        value: formatCurrency(data?.revenue?.total || 125000),
        change: `+${formatCurrency(data?.revenue?.this_month || 22000)}`,
        changeType: 'positive',
        icon: DollarSign,
        gradient: 'from-green-500 to-green-600',
      },
      {
        title: 'Customers',
        value: data?.customers?.total || 145,
        change: `+${data?.customers?.new_this_month || 12} new`,
        changeType: 'positive',
        icon: Users,
        gradient: 'from-blue-500 to-purple-500',
      },
    ];

    switch (role) {
      case 'Owner':
        return [
          ...baseCards,
          {
            title: 'Gross Profit',
            value: formatCurrency(data?.gross_profit?.total || 75000),
            change: `+${formatCurrency(data?.gross_profit?.this_month || 14000)}`,
            changeType: 'positive',
            icon: TrendingUp,
            gradient: 'from-purple-500 to-pink-500',
          },
          {
            title: 'Expenses',
            value: formatCurrency(data?.expenses?.total || 25000),
            change: `${formatCurrency(data?.expenses?.this_month || 4500)}`,
            changeType: 'neutral',
            icon: TrendingDown,
            gradient: 'from-orange-500 to-red-500',
          },
          {
            title: 'Net Profit',
            value: formatCurrency(data?.net_profit?.total || 50000),
            change: `+${formatCurrency(data?.net_profit?.this_month || 9500)}`,
            changeType: 'positive',
            icon: DollarSign,
            gradient: 'from-green-600 to-teal-500',
          },
          {
            title: 'Inventory',
            value: formatCurrency(data?.inventory_value || 180000),
            change: `${data?.low_stock?.length || 3} low stock`,
            changeType: 'warning',
            icon: Package,
            gradient: 'from-indigo-500 to-blue-600',
          },
        ];

      case 'Admin':
        return [
          ...baseCards,
          {
            title: 'Products',
            value: data?.products?.total || 89,
            change: `${data?.low_stock?.length || 3} low stock`,
            changeType: 'warning',
            icon: Package,
            gradient: 'from-purple-500 to-indigo-500',
          },
          {
            title: 'Expenses',
            value: formatCurrency(data?.expenses?.total || 25000),
            change: `${formatCurrency(data?.expenses?.this_month || 4500)}`,
            changeType: 'neutral',
            icon: TrendingDown,
            gradient: 'from-orange-500 to-red-500',
          },
        ];

      case 'Salesperson':
        return [
          ...baseCards,
          {
            title: 'Sales',
            value: data?.sales?.total_sales || 234,
            change: `${data?.sales?.total_quantity || 456} items`,
            changeType: 'positive',
            icon: TrendingUp,
            gradient: 'from-green-500 to-teal-500',
          },
        ];

      default:
        return baseCards;
    }
  };

  const cards = getCardsForRole();

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'warning': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((card, index) => (
        <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <CardContent className="p-0">
            <div className={`h-1 bg-gradient-to-r ${card.gradient}`} />
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${card.gradient} bg-opacity-10`}>
                  <card.icon className={`h-4 w-4 text-white`} style={{
                    filter: `drop-shadow(0 0 4px hsl(var(--${card.gradient.split('-')[1]}-500)))`
                  }} />
                </div>
                {subscription?.is_trial && index === 0 && (
                  <Crown className="h-4 w-4 text-yellow-500" />
                )}
              </div>
              
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-lg font-bold text-gray-900 mb-1">{card.value}</p>
                <p className={`text-xs ${getChangeColor(card.changeType)}`}>
                  {card.change}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
