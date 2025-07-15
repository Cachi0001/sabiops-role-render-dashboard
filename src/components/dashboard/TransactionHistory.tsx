import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar as CalendarIcon, 
  Eye, 
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Banknote,
  Smartphone
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

// Mock transaction data
const transactions = [
  {
    id: 'TXN-001',
    date: '2025-01-07',
    customer: 'John Doe',
    type: 'sale',
    amount: 25000,
    status: 'completed',
    method: 'card',
    invoice: 'INV-001',
    description: 'Office Chair Purchase'
  },
  {
    id: 'TXN-002',
    date: '2025-01-07',
    customer: 'Jane Smith',
    type: 'refund',
    amount: -5000,
    status: 'completed',
    method: 'card',
    invoice: 'INV-002',
    description: 'Product Return - Desk Lamp'
  },
  {
    id: 'TXN-003',
    date: '2025-01-06',
    customer: 'Mike Johnson',
    type: 'sale',
    amount: 45000,
    status: 'pending',
    method: 'bank_transfer',
    invoice: 'INV-003',
    description: 'Standing Desk Purchase'
  },
  {
    id: 'TXN-004',
    date: '2025-01-06',
    customer: 'Sarah Wilson',
    type: 'sale',
    amount: 15000,
    status: 'completed',
    method: 'mobile_money',
    invoice: 'INV-004',
    description: 'Wireless Keyboard'
  },
  {
    id: 'TXN-005',
    date: '2025-01-05',
    customer: 'David Brown',
    type: 'sale',
    amount: 35000,
    status: 'failed',
    method: 'card',
    invoice: 'INV-005',
    description: 'Monitor Purchase - Payment Failed'
  },
  {
    id: 'TXN-006',
    date: '2025-01-05',
    customer: 'Lisa Anderson',
    type: 'sale',
    amount: 28000,
    status: 'completed',
    method: 'card',
    invoice: 'INV-006',
    description: 'Ergonomic Mouse Set'
  },
  {
    id: 'TXN-007',
    date: '2025-01-04',
    customer: 'Robert Taylor',
    type: 'sale',
    amount: 55000,
    status: 'completed',
    method: 'bank_transfer',
    invoice: 'INV-007',
    description: 'Executive Desk'
  },
  {
    id: 'TXN-008',
    date: '2025-01-04',
    customer: 'Emma Davis',
    type: 'sale',
    amount: 12000,
    status: 'completed',
    method: 'mobile_money',
    invoice: 'INV-008',
    description: 'Cable Management Kit'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'failed':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'sale':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'refund':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPaymentMethodIcon = (method: string) => {
  switch (method) {
    case 'card':
      return <CreditCard className="h-4 w-4" />;
    case 'bank_transfer':
      return <Banknote className="h-4 w-4" />;
    case 'mobile_money':
      return <Smartphone className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

export const TransactionHistory = () => {
  const { subscription, role } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date>();
  
  const itemsPerPage = 10;

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = 
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
      const matchesDate = !date || transaction.date === format(date, 'yyyy-MM-dd');
      
      return matchesSearch && matchesStatus && matchesType && matchesDate;
    })
    .sort((a, b) => {
      const aValue = sortBy === 'date' ? a.date : sortBy === 'amount' ? a.amount : a.customer;
      const bValue = sortBy === 'date' ? b.date : sortBy === 'amount' ? b.amount : b.customer;
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Calculate summary stats
  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const completedTransactions = filteredTransactions.filter(t => t.status === 'completed').length;
  const pendingTransactions = filteredTransactions.filter(t => t.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-green-900">Transaction History</h2>
          <p className="text-green-600">Complete record of all business transactions</p>
        </div>
        <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{filteredTransactions.length}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">₦{totalAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{completedTransactions}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{pendingTransactions}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-green-500" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-green-200 focus:border-green-500">
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
              <SelectTrigger className="border-green-200 focus:border-green-500">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sale">Sales</SelectItem>
                <SelectItem value="refund">Refunds</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-green-200 hover:bg-green-50",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
                setDate(undefined);
              }}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Table */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
        <CardHeader>
          <CardTitle className="text-green-900">Transactions</CardTitle>
          <CardDescription className="text-green-600">
            {filteredTransactions.length} transactions found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-green-200">
                  <TableHead className="text-green-700">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('id')}
                      className="h-auto p-0 font-semibold text-green-700 hover:text-green-900"
                    >
                      ID
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-green-700">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('date')}
                      className="h-auto p-0 font-semibold text-green-700 hover:text-green-900"
                    >
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-green-700">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('customer')}
                      className="h-auto p-0 font-semibold text-green-700 hover:text-green-900"
                    >
                      Customer
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-green-700">Type</TableHead>
                  <TableHead className="text-green-700">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('amount')}
                      className="h-auto p-0 font-semibold text-green-700 hover:text-green-900"
                    >
                      Amount
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-green-700">Status</TableHead>
                  <TableHead className="text-green-700">Method</TableHead>
                  <TableHead className="text-green-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-green-100 hover:bg-green-25">
                    <TableCell className="font-medium text-green-900">{transaction.id}</TableCell>
                    <TableCell className="text-green-700">{format(new Date(transaction.date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="text-green-900">{transaction.customer}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(transaction.type)}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className={`font-semibold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount >= 0 ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-green-700">
                        {getPaymentMethodIcon(transaction.method)}
                        <span className="text-xs">{transaction.method.replace('_', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800 hover:bg-green-50">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-green-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};