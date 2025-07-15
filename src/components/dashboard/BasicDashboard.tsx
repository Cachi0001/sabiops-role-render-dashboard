
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, Users, FileText, TrendingUp, Crown, 
  ArrowUpRight, AlertCircle, Zap, BarChart3, History 
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for free plan
const mockBasicData = {
  revenue: { total: 45000, this_month: 8500 },
  customers: { total: 12, new_this_month: 3 },
  invoices: { total: 3, monthly_count: 3, overdue: 1 },
  usage_limits: { invoices: 5, expenses: 5 },
  current_usage: { invoices: 3, expenses: 2 },
  recent_activities: [
    { type: 'invoice', description: 'Invoice #001 created', timestamp: '2025-01-07T10:00:00Z' },
    { type: 'payment', description: 'Payment received ₦15,000', timestamp: '2025-01-06T14:30:00Z' },
    { type: 'customer', description: 'New customer added', timestamp: '2025-01-05T09:15:00Z' },
  ],
  revenue_trend: [
    { month: 'Oct', revenue: 12000 },
    { month: 'Nov', revenue: 15000 },
    { month: 'Dec', revenue: 18000 },
  ]
};

export const BasicDashboard = () => {
  const { user, role, subscription } = useAuth();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  const usagePercentage = {
    invoices: (mockBasicData.current_usage.invoices / mockBasicData.usage_limits.invoices) * 100,
    expenses: (mockBasicData.current_usage.expenses / mockBasicData.usage_limits.expenses) * 100,
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-purple-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Please Login
          </h1>
          <p className="text-gray-600">Access your SabiOps dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <DashboardHeader />

      {/* Main Dashboard Content */}
      <div className="p-4 space-y-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen">
        {/* Free Plan Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-20 rounded-full -mr-16 -mt-16" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-bold">Free Plan Active</span>
                </div>
                <p className="text-orange-100">
                  You're using {mockBasicData.current_usage.invoices} of {mockBasicData.usage_limits.invoices} invoices this month
                </p>
              </div>
              <Button 
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold shadow-lg"
                onClick={() => setUpgradeModalOpen(true)}
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>

        {/* Usage Tracker */}
        <Card className="bg-gradient-to-r from-green-100 to-green-200 border-green-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-900 flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Monthly Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-700">Invoices</span>
                <span className="text-sm text-green-600">
                  {mockBasicData.current_usage.invoices}/{mockBasicData.usage_limits.invoices}
                </span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${usagePercentage.invoices}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-700">Expenses</span>
                <span className="text-sm text-green-600">
                  {mockBasicData.current_usage.expenses}/{mockBasicData.usage_limits.expenses}
                </span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${usagePercentage.expenses}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-white to-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">₦{mockBasicData.revenue.total.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                ₦{mockBasicData.revenue.this_month.toLocaleString()} this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{mockBasicData.customers.total}</div>
              <p className="text-xs text-blue-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{mockBasicData.customers.new_this_month} new this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Active Invoices</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{mockBasicData.invoices.total}</div>
              <p className="text-xs text-purple-600">
                {mockBasicData.invoices.overdue} overdue
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Basic Revenue Chart */}
        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900 flex items-center justify-between">
              Revenue Trend (Last 3 Months)
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Limited View
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mockBasicData.revenue_trend}>
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
                <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-purple-50 via-white to-orange-50 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-purple-900 flex items-center space-x-2">
              <FileText className="h-4 w-4 text-purple-600" />
              <span>Quick Actions</span>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Limited
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="ghost"
                className="h-auto p-3 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-green-200"
                disabled={mockBasicData.current_usage.invoices >= mockBasicData.usage_limits.invoices}
              >
                <div className="flex flex-col items-center space-y-2 w-full">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-md">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-800">
                    New Invoice ({mockBasicData.current_usage.invoices}/5)
                  </span>
                </div>
              </Button>
              
              <Button
                variant="ghost"
                className="h-auto p-3 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-200"
              >
                <div className="flex flex-col items-center space-y-2 w-full">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-800">Add Customer</span>
                </div>
              </Button>

              {/* Analytics Button - Locked for Free Plan */}
              <Button
                variant="ghost"
                onClick={() => setUpgradeModalOpen(true)}
                className="h-auto p-3 bg-gradient-to-br from-gray-50 to-white hover:shadow-lg transition-all duration-300 border-2 border-dashed border-gray-300 opacity-60"
              >
                <div className="flex flex-col items-center space-y-2 w-full">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-gray-400 to-gray-500 shadow-md relative">
                    <BarChart3 className="h-4 w-4 text-white" />
                    <Crown className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Analytics</span>
                </div>
              </Button>

              {/* Transaction History Button - Locked for Free Plan */}
              <Button
                variant="ghost"
                onClick={() => setUpgradeModalOpen(true)}
                className="h-auto p-3 bg-gradient-to-br from-gray-50 to-white hover:shadow-lg transition-all duration-300 border-2 border-dashed border-gray-300 opacity-60"
              >
                <div className="flex flex-col items-center space-y-2 w-full">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-gray-400 to-gray-500 shadow-md relative">
                    <History className="h-4 w-4 text-white" />
                    <Crown className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Transactions</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockBasicData.recent_activities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-white border border-blue-100">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">{activity.description}</p>
                    <p className="text-xs text-blue-600">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Final Upgrade Section */}
        <div className="bg-gradient-to-r from-green-500 via-orange-500 to-red-500 p-6 rounded-2xl shadow-xl text-white overflow-hidden relative border-2 border-green-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-20 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-20 rounded-full -ml-12 -mb-12" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white bg-opacity-10 rounded-full" />
          <div className="relative">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">
                🚀 Unlock Full SabiOps Features
              </h3>
              <p className="text-green-100 mb-4 font-medium">
                Get unlimited invoices, advanced analytics, transaction history, and more!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 text-sm">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <div className="font-semibold">Weekly Plan</div>
                  <div>₦1,400 • 7-day trial</div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <div className="font-semibold">Monthly Plan</div>
                  <div>₦4,500 • Most Popular</div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <div className="font-semibold">Yearly Plan</div>
                  <div>₦50,000 • Best Value</div>
                </div>
              </div>
              <Button 
                className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-xl font-bold shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-green-600"
                onClick={() => setUpgradeModalOpen(true)}
              >
                <Crown className="h-5 w-5 mr-2" />
                Choose Your Plan 🎯
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
