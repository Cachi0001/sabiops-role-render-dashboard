import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Package, Calendar, Download, Crown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0'];

// Mock data - in real app, this would come from API
const salesTrends = [
  { month: 'Jan', revenue: 45000, orders: 120, customers: 85 },
  { month: 'Feb', revenue: 52000, orders: 135, customers: 92 },
  { month: 'Mar', revenue: 48000, orders: 128, customers: 88 },
  { month: 'Apr', revenue: 61000, orders: 155, customers: 110 },
  { month: 'May', revenue: 55000, orders: 142, customers: 98 },
  { month: 'Jun', revenue: 67000, orders: 168, customers: 125 },
];

const productPerformance = [
  { name: 'Office Chairs', value: 35, sales: 1200000 },
  { name: 'Desks', value: 25, sales: 850000 },
  { name: 'Monitors', value: 20, sales: 680000 },
  { name: 'Keyboards', value: 12, sales: 410000 },
  { name: 'Others', value: 8, sales: 270000 },
];

const customerSegments = [
  { segment: 'Enterprise', customers: 45, revenue: 890000, growth: 12.5 },
  { segment: 'SMB', customers: 128, revenue: 567000, growth: 8.3 },
  { segment: 'Individual', customers: 234, revenue: 234000, growth: -2.1 },
];

const dailyMetrics = [
  { date: '2025-01-01', revenue: 12000, orders: 45, conversion: 3.2 },
  { date: '2025-01-02', revenue: 15000, orders: 52, conversion: 3.8 },
  { date: '2025-01-03', revenue: 9000, orders: 38, conversion: 2.9 },
  { date: '2025-01-04', revenue: 18000, orders: 61, conversion: 4.1 },
  { date: '2025-01-05', revenue: 14000, orders: 48, conversion: 3.5 },
  { date: '2025-01-06', revenue: 16000, orders: 55, conversion: 3.7 },
  { date: '2025-01-07', revenue: 13000, orders: 44, conversion: 3.3 },
];

export const AdvancedAnalytics = () => {
  const { subscription, role } = useAuth();

  // Check if user has access to advanced analytics
  const hasAdvancedAccess = subscription?.plan !== 'free';

  if (!hasAdvancedAccess) {
    return (
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-xl text-green-900">Advanced Analytics</CardTitle>
          <CardDescription className="text-green-700">
            Unlock detailed business insights with advanced analytics
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-green-600 mb-4">
            Get deeper insights into your business performance, customer behavior, and sales trends.
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Upgrade to Premium
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-green-900">Advanced Analytics</h2>
          <p className="text-green-600">Deep insights into your business performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <Crown className="h-3 w-3 mr-1" />
            Premium Feature
          </Badge>
          <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-green-50 border border-green-200">
          <TabsTrigger value="sales" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Sales Trends
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Product Performance
          </TabsTrigger>
          <TabsTrigger value="customers" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Customer Segments
          </TabsTrigger>
          <TabsTrigger value="daily" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Daily Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Avg Order Value</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">₦394</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">3.4%</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.8% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Customer LTV</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">₦1,250</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Churn Rate</CardTitle>
                <TrendingDown className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">2.1%</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -0.5% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardHeader>
              <CardTitle className="text-green-900">Revenue & Orders Trend</CardTitle>
              <CardDescription className="text-green-600">
                Monthly performance over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
                  <XAxis dataKey="month" stroke="#15803d" />
                  <YAxis stroke="#15803d" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#f0fdf4', 
                      border: '1px solid #bbf7d0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#16a34a" fill="#22c55e" />
                  <Area type="monotone" dataKey="orders" stackId="2" stroke="#15803d" fill="#4ade80" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader>
                <CardTitle className="text-green-900">Product Performance</CardTitle>
                <CardDescription className="text-green-600">
                  Revenue distribution by product category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productPerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader>
                <CardTitle className="text-green-900">Top Products</CardTitle>
                <CardDescription className="text-green-600">
                  Best performing products by sales volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productPerformance.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index] }} />
                        <span className="font-medium text-green-900">{product.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-900">₦{product.sales.toLocaleString()}</div>
                        <div className="text-sm text-green-600">{product.value}% of total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardHeader>
              <CardTitle className="text-green-900">Customer Segments</CardTitle>
              <CardDescription className="text-green-600">
                Analysis by customer type and growth trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerSegments.map((segment) => (
                  <div key={segment.segment} className="p-4 bg-white rounded-lg border border-green-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-green-900">{segment.segment}</h3>
                      <Badge 
                        variant={segment.growth > 0 ? "default" : "destructive"}
                        className={segment.growth > 0 ? "bg-green-100 text-green-800 border-green-200" : ""}
                      >
                        {segment.growth > 0 ? '+' : ''}{segment.growth}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-green-600">Customers</p>
                        <p className="font-semibold text-green-900">{segment.customers}</p>
                      </div>
                      <div>
                        <p className="text-green-600">Revenue</p>
                        <p className="font-semibold text-green-900">₦{segment.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily">
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardHeader>
              <CardTitle className="text-green-900">Daily Performance</CardTitle>
              <CardDescription className="text-green-600">
                Daily metrics and conversion rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
                  <XAxis dataKey="date" stroke="#15803d" />
                  <YAxis yAxisId="left" stroke="#15803d" />
                  <YAxis yAxisId="right" orientation="right" stroke="#15803d" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#f0fdf4', 
                      border: '1px solid #bbf7d0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#22c55e" />
                  <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};