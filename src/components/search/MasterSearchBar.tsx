
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, FileText, Users, Package, Settings, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SearchResult {
  id: string;
  title: string;
  type: 'invoice' | 'customer' | 'product' | 'expense' | 'settings' | 'action';
  description?: string;
  icon: React.ComponentType<any>;
}

export const MasterSearchBar: React.FC = () => {
  const { subscription } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  // Only show for paid plans
  const canUseSearch = subscription?.plan !== 'free';

  const mockResults: SearchResult[] = [
    { id: '1', title: 'INV-1234', type: 'invoice', description: 'Invoice for John Doe', icon: FileText },
    { id: '2', title: 'John Doe', type: 'customer', description: 'Customer details', icon: Users },
    { id: '3', title: 'Office Chair', type: 'product', description: 'Product inventory', icon: Package },
    { id: '4', title: 'Settings', type: 'settings', description: 'Account settings', icon: Settings },
    { id: '5', title: 'Add Invoice', type: 'action', description: 'Create new invoice', icon: TrendingUp },
  ];

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      const filtered = mockResults.filter(result =>
        result.title.toLowerCase().includes(value.toLowerCase()) ||
        result.description?.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    console.log('Navigate to:', result);
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  if (!canUseSearch) return null;

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
        <Input
          placeholder="Search invoices, customers, products..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-4 py-2 border-green-200 focus:border-green-500"
        />
      </div>

      {isOpen && (query.length > 0 || results.length > 0) && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-green-200 shadow-lg">
          <CardContent className="p-0 max-h-80 overflow-y-auto">
            {results.length > 0 ? (
              <div className="divide-y divide-green-100">
                {results.map((result) => (
                  <Button
                    key={result.id}
                    variant="ghost"
                    className="w-full justify-start p-3 h-auto hover:bg-green-50"
                    onClick={() => handleResultClick(result)}
                  >
                    <result.icon className="h-4 w-4 mr-3 text-green-600" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-green-900">{result.title}</p>
                      {result.description && (
                        <p className="text-xs text-green-600">{result.description}</p>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-green-600 text-sm">
                {query.length > 0 ? 'No results found' : 'Start typing to search...'}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
