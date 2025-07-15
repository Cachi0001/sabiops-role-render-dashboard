
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, Users, Package, FileText, DollarSign, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface OverviewCardsProps {
  data: any;
  role: string;
  subscription: any;
  loading: boolean;
}

export const OverviewCards: React.FC<OverviewCardsProps> = ({ 
  data, 
  role, 
  subscription, 
  loading 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-white border-green-200">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getCardsForRole = () => {
    const commonCards = [
      {
        title: 'Revenue',
        value: formatCurrency(data?.revenue?.total || 0),
        change: `+${formatCurrency(data?.revenue?.this_month || 0)} this month`,
        icon: DollarSign,
        color: 'text-green-600',
      },
    ];

    if (subscription?.plan === 'free') {
      return [
        ...commonCards,
        {
          title: 'Customers',
          value: data?.customers?.total || 0,
          change: `+${data?.customers?.new_this_month || 0} new`,
          icon: Users,
          color: 'text-green-600',
        },
        {
          title: 'Invoices Used',
          value: `${data?.subscription_status?.current_usage?.invoices || 0}/5`,
          change: 'Monthly limit',
          icon: FileText,
          color: 'text-orange-600',
        },
      ];
    }

    switch (role) {
      case 'Owner':
        return [
          ...commonCards,
          {
            title: 'Gross Profit',
            value: formatCurrency(data?.gross_profit?.total || 0),
            change: `+${formatCurrency(data?.gross_profit?.this_month || 0)}`,
            icon: TrendingUp,
            color: 'text-green-600',
          },
          {
            title: 'Expenses',
            value: formatCurrency(data?.expenses?.total || 0),
            change: `${formatCurrency(data?.expenses?.this_month || 0)} this month`,
            icon: TrendingDown,
            color: 'text-red-600',
          },
          {
            title: 'Net Profit',
            value: formatCurrency(data?.net_profit?.total || 0),
            change: `+${formatCurrency(data?.net_profit?.this_month || 0)}`,
            icon: DollarSign,
            color: 'text-green-600',
          },
          {
            title: 'Inventory Value',
            value: formatCurrency(data?.inventory_value || 0),
            change: `${data?.low_stock?.length || 0} low stock items`,
            icon: Package,
            color: 'text-blue-600',
          },
          {
            title: 'Total Customers',
            value: data?.customers?.total || 0,
            change: `+${data?.customers?.new_this_month || 0} new`,
            icon: Users,
            color: 'text-green-600',
          },
        ];

      case 'Admin':
        return [
          ...commonCards,
          {
            title: 'Customers',
            value: data?.customers?.total || 0,
            change: `+${data?.customers?.new_this_month || 0} new`,
            icon: Users,
            color: 'text-green-600',
          },
          {
            title: 'Products',
            value: data?.products?.total || 0,
            change: `${data?.low_stock?.length || 0} low stock`,
            icon: Package,
            color: 'text-blue-600',
          },
          {
            title: 'Expenses',
            value: formatCurrency(data?.expenses?.total || 0),
            change: `${formatCurrency(data?.expenses?.this_month || 0)} this month`,
            icon: TrendingDown,
            color: 'text-red-600',
          },
        ];

      case 'Salesperson':
        return [
          ...commonCards,
          {
            title: 'Sales',
            value: data?.sales?.total_sales || 0,
            change: `${data?.sales?.total_quantity || 0} items sold`,
            icon: TrendingUp,
            color: 'text-green-600',
          },
          {
            title: 'Customers',
            value: data?.customers?.total || 0,
            change: `+${data?.customers?.new_this_month || 0} new`,
            icon: Users,
            color: 'text-green-600',
          },
        ];

      default:
        return commonCards;
    }
  };

  const cards = getCardsForRole();

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="bg-white border-green-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800 flex items-center">
              <card.icon className={`h-4 w-4 mr-2 ${card.color}`} />
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {card.value}
            </div>
            <p className="text-xs text-green-600 mt-1">
              {card.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
