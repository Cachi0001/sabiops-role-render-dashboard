
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Users, Package, DollarSign, Crown, Download, BarChart3, Calendar } from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';

export const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data - replace with actual API call
  const analyticsData = {
    overview: {
      avgOrderValue: 394,
      avgOrderValueChange: 12.5,
      conversionRate: 3.4,
      conversionRateChange: 0.8,
      customerLTV: 1250,
      customerLTVChange: 8.2,
      repeatCustomerRate: 68,
      repeatCustomerRateChange: -2.1,
    },
    salesTrends: [
      { metric: 'Sales Trends', value: '₦2.4M', change: '+18%', trend: 'up' },
      { metric: 'Product Performance', value: '89 items', change: '+12%', trend: 'up' },
      { metric: 'Customer Segments', value: '156 customers', change: '+24%', trend: 'up' },
      { metric: 'Daily Metrics', value: '₦45K avg', change: '-3%', trend: 'down' },
    ],
    topProducts: [
      { name: 'Office Chair', sales: 45, revenue: 225000 },
      { name: 'Desk Lamp', sales: 32, revenue: 96000 },
      { name: 'Laptop Stand', sales: 28, revenue: 168000 },
      { name: 'Wireless Mouse', sales: 24, revenue: 72000 },
    ],
    customerSegments: [
      { segment: 'Premium', customers: 45, revenue: 675000, percentage: 35 },
      { segment: 'Regular', customers: 89, revenue: 534000, percentage: 45 },
      { segment: 'New', customers: 22, revenue: 110000, percentage: 20 },
    ]
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />;
  };

  return (
    <div className="min-h-screen bg-green-50">
      <DashboardHeader />
      
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-green-900">Advanced Analytics</h1>
              <Badge className="bg-green-600 text-white flex items-center space-x-1">
                <Crown className="h-3 w-3" />
                <span>Premium Feature</span>
              </Badge>
            </div>
            <p className="text-sm text-green-700">Deep insights into your business performance</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 border-green-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-green-700">Avg Order Value</p>
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-green-900">₦{analyticsData.overview.avgOrderValue}</p>
                <div className={`flex items-center space-x-1 ${getChangeColor(analyticsData.overview.avgOrderValueChange)}`}>
                  {getChangeIcon(analyticsData.overview.avgOrderValueChange)}
                  <span className="text-sm font-medium">+{analyticsData.overview.avgOrderValueChange}%</span>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-1">from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-green-700">Conversion Rate</p>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-green-900">{analyticsData.overview.conversionRate}%</p>
                <div className={`flex items-center space-x-1 ${getChangeColor(analyticsData.overview.conversionRateChange)}`}>
                  {getChangeIcon(analyticsData.overview.conversionRateChange)}
                  <span className="text-sm font-medium">+{analyticsData.overview.conversionRateChange}%</span>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-1">from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-green-700">Customer LTV</p>
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-green-900">₦{analyticsData.overview.customerLTV}</p>
                <div className={`flex items-center space-x-1 ${getChangeColor(analyticsData.overview.customerLTVChange)}`}>
                  {getChangeIcon(analyticsData.overview.customerLTVChange)}
                  <span className="text-sm font-medium">+{analyticsData.overview.customerLTVChange}%</span>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-1">from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-green-700">Repeat Rate</p>
                <Package className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-green-900">{analyticsData.overview.repeatCustomerRate}%</p>
                <div className={`flex items-center space-x-1 ${getChangeColor(analyticsData.overview.repeatCustomerRateChange)}`}>
                  {getChangeIcon(analyticsData.overview.repeatCustomerRateChange)}
                  <span className="text-sm font-medium">{analyticsData.overview.repeatCustomerRateChange}%</span>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-1">from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Trends */}
        <Card className="bg-white border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analyticsData.salesTrends.map((trend, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700">{trend.metric}</p>
                      <p className="text-xl font-bold text-green-900">{trend.value}</p>
                    </div>
                    <div className={`flex items-center space-x-1 ${trend.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {trend.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="text-sm font-medium">{trend.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-white border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-green-900">{product.name}</p>
                      <p className="text-sm text-green-700">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-900">₦{product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card className="bg-white border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.customerSegments.map((segment, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-900">{segment.segment} Customers</h4>
                    <span className="text-sm text-green-700">{segment.percentage}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">{segment.customers} customers</span>
                    <span className="font-bold text-green-900">₦{segment.revenue.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 w-full bg-green-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${segment.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
