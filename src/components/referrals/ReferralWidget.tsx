
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, DollarSign, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface ReferralWidgetProps {
  referralData: any;
  loading: boolean;
  onWithdraw?: () => void;
}

export const ReferralWidget: React.FC<ReferralWidgetProps> = ({ 
  referralData, 
  loading,
  onWithdraw
}) => {
  if (!referralData && !loading) return null;

  const totalEarnings = referralData?.total_earnings || 0;
  const activeReferrals = referralData?.active_referrals || 0;
  const availableForWithdrawal = referralData?.available_for_withdrawal || 0;
  const monthlyEarnings = referralData?.monthly_earnings || 0;

  return (
    <Card className="bg-white border-green-200">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-green-800 flex items-center">
          <Users className="h-4 w-4 mr-2 text-green-600" />
          Referral Earnings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-900">
              {formatCurrency(totalEarnings)}
            </div>
            <p className="text-xs text-green-600">Total Earned</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-900">
              {activeReferrals}
            </div>
            <p className="text-xs text-green-600">Active Referrals</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs">
            <span className="text-green-700">Available for withdrawal:</span>
            <span className="font-medium text-green-900">
              {formatCurrency(availableForWithdrawal)}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-green-700">This month:</span>
            <span className="font-medium text-green-900">
              {formatCurrency(monthlyEarnings)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white text-xs"
            disabled={availableForWithdrawal < 3000}
            onClick={onWithdraw}
          >
            Withdraw
          </Button>
          <Button 
            variant="outline" 
            className="border-green-200 text-green-700 hover:bg-green-50 text-xs"
          >
            View Details
          </Button>
        </div>

        {availableForWithdrawal < 3000 && (
          <p className="text-xs text-orange-600 mt-2 text-center">
            Minimum withdrawal: ₦3,000
          </p>
        )}
      </CardContent>
    </Card>
  );
};
