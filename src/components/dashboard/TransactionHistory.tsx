
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Filter, Calendar, TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';

export const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data - replace with actual API call
  const transactions = [
    { id: 'TXN-002', date: 'Jan 07, 2025', customer: 'Jane Smith', type: 'Sale', amount: 35000, status: 'Completed', method: 'Bank Transfer' },
    { id: 'TXN-001', date: 'Jan 07, 2025', customer: 'John Doe', type: 'Payment', amount: 25000, status: 'Completed', method: 'Cash' },
    { id: 'TXN-004', date: 'Jan 06, 2025', customer: 'Sarah Wilson', type: 'Sale', amount: 45000, status: 'Pending', method: 'Card' },
    { id: 'TXN-003', date: 'Jan 06, 2025', customer: 'Mike Johnson', type: 'Refund', amount: 15000, status: 'Completed', method: 'Bank Transfer' },
    { id: 'TXN-006', date: 'Jan 05, 2025', customer: 'Lisa Anderson', type: 'Sale', amount: 28000, status: 'Completed', method: 'Cash' },
    { id: 'TXN-005', date: 'Jan 05, 2025', customer: 'David Brown', type: 'Payment', amount: 32000, status: 'Completed', method: 'Card' },
    { id: 'TXN-008', date: 'Jan 04, 2025', customer: 'Emma Davis', type: 'Sale', amount: 22000, status: 'Failed', method: 'Card' },
    { id: 'TXN-007', date: 'Jan 04, 2025', customer: 'Robert Miller', type: 'Payment', amount: 38000, status: 'Completed', method: 'Bank Transfer' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-3 w-3" />;
      case 'Pending': return <Clock className="h-3 w-3" />;
      case 'Failed': return <TrendingDown className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const completedTransactions = transactions.filter(t => t.status === 'Completed').length;
  const pendingTransactions = transactions.filter(t => t.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-green-50">
      <DashboardHeader />
      
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-green-900">Transaction History</h1>
            <p className="text-sm text-green-700">Complete record of all business transactions</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Total Transactions</p>
                  <p className="text-2xl font-bold text-green-900">{transactions.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Total Amount</p>
                  <p className="text-2xl font-bold text-green-900">₦{totalAmount.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Completed</p>
                  <p className="text-2xl font-bold text-green-900">{completedTransactions}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Pending</p>
                  <p className="text-2xl font-bold text-green-900">{pendingTransactions}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white border-green-200">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-green-200 focus:border-green-500"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-32 border-green-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-32 border-green-200">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="refund">Refund</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="bg-white border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">
              Transactions
              <span className="ml-2 text-sm font-normal text-green-600">
                {filteredTransactions.length} transactions found
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-green-100">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-green-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="font-medium text-green-900">{transaction.id}</div>
                        <Badge className={`${getStatusColor(transaction.status)} flex items-center space-x-1`}>
                          {getStatusIcon(transaction.status)}
                          <span>{transaction.status}</span>
                        </Badge>
                      </div>
                      <div className="mt-1 text-sm text-green-700">
                        {transaction.customer} • {transaction.date}
                      </div>
                      <div className="mt-1 text-sm text-green-600">
                        {transaction.type} • {transaction.method}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-900">
                        ₦{transaction.amount.toLocaleString()}
                      </div>
                    </div>
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
