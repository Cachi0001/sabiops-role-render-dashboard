
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface ChartsSectionProps {
  data: any;
  role: string;
  subscription: any;
  loading: boolean;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ 
  data, 
  role, 
  subscription, 
  loading 
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="bg-white border-green-200">
          <CardHeader>
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock data for charts
  const revenueData = data?.revenue_chart || [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 19000 },
    { month: 'Mar', revenue: 15000 },
    { month: 'Apr', revenue: 22000 },
    { month: 'May', revenue: 18000 },
    { month: 'Jun', revenue: 25000 },
  ];

  const topProductsData = data?.top_products || [
    { name: 'Office Chair', sales: 45, color: '#16a34a' },
    { name: 'Desk Lamp', sales: 35, color: '#22c55e' },
    { name: 'Notebook', sales: 25, color: '#bbf7d0' },
    { name: 'Pen Set', sales: 20, color: '#15803d' },
  ];

  const salesAnalyticsData = data?.sales_analytics || [
    { day: 'Mon', sales: 12 },
    { day: 'Tue', sales: 19 },
    { day: 'Wed', sales: 8 },
    { day: 'Thu', sales: 15 },
    { day: 'Fri', sales: 22 },
    { day: 'Sat', sales: 18 },
    { day: 'Sun', sales: 9 },
  ];

  const getChartsForRole = () => {
    if (subscription?.plan === 'free') {
      return [
        {
          title: 'Revenue Trend',
          component: (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData.slice(0, 3)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value) => [`₦${value.toLocaleString()}`, 'Revenue']}
                  labelStyle={{ color: '#15803d' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#16a34a" 
                  strokeWidth={2}
                  dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )
        }
      ];
    }

    switch (role) {
      case 'Owner':
        return [
          {
            title: 'Revenue Trend (12 Months)',
            component: (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`₦${value.toLocaleString()}`, 'Revenue']}
                    labelStyle={{ color: '#15803d' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#16a34a" 
                    strokeWidth={2}
                    dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )
          },
          {
            title: 'Top Products',
            component: (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={topProductsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [value, 'Sales']}
                    labelStyle={{ color: '#15803d' }}
                  />
                  <Bar dataKey="sales" fill="#16a34a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )
          }
        ];

      case 'Admin':
        return [
          {
            title: 'Revenue Trend',
            component: (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`₦${value.toLocaleString()}`, 'Revenue']}
                    labelStyle={{ color: '#15803d' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#16a34a" 
                    strokeWidth={2}
                    dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )
          }
        ];

      case 'Salesperson':
        return [
          {
            title: 'Daily Sales',
            component: (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={salesAnalyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [value, 'Sales']}
                    labelStyle={{ color: '#15803d' }}
                  />
                  <Bar dataKey="sales" fill="#16a34a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )
          }
        ];

      default:
        return [];
    }
  };

  const charts = getChartsForRole();

  return (
    <div className="space-y-4">
      {charts.map((chart, index) => (
        <Card key={index} className="bg-white border-green-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-green-800 flex items-center">
              {chart.title}
              {subscription?.is_trial && (
                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  👑 Trial
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {chart.component}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
