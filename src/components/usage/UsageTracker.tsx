
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const UsageTracker: React.FC = () => {
  const { subscription } = useAuth();

  if (!subscription || subscription.plan !== 'free') return null;

  const invoiceUsage = subscription.current_usage?.invoices || 0;
  const expenseUsage = subscription.current_usage?.expenses || 0;
  const invoiceLimit = 5;
  const expenseLimit = 5;

  const invoicePercentage = (invoiceUsage / invoiceLimit) * 100;
  const expensePercentage = (expenseUsage / expenseLimit) * 100;

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 80) return 'text-orange-600';
    return 'text-green-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-orange-800 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
          Monthly Usage - Free Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-orange-700">Invoices</span>
            <span className={`text-sm font-medium ${getUsageColor(invoicePercentage)}`}>
              {invoiceUsage}/{invoiceLimit}
            </span>
          </div>
          <Progress 
            value={invoicePercentage} 
            className="h-2"
            // className={`h-2 ${getProgressColor(invoicePercentage)}`} 
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-orange-700">Expenses</span>
            <span className={`text-sm font-medium ${getUsageColor(expensePercentage)}`}>
              {expenseUsage}/{expenseLimit}
            </span>
          </div>
          <Progress 
            value={expensePercentage} 
            className="h-2"
            // className={`h-2 ${getProgressColor(expensePercentage)}`} 
          />
        </div>

        {(invoicePercentage >= 80 || expensePercentage >= 80) && (
          <div className="pt-2 border-t border-orange-200">
            <p className="text-xs text-orange-700 mb-2">
              You're nearing your monthly limits. Upgrade for unlimited access.
            </p>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Upgrade Now
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
