
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Calendar, CreditCard, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ModernSubscriptionStatusProps {
  onUpgrade?: () => void;
}

export const ModernSubscriptionStatus: React.FC<ModernSubscriptionStatusProps> = ({ onUpgrade }) => {
  const { subscription, role } = useAuth();

  if (!subscription || (role !== 'Owner' && !subscription.is_trial)) return null;

  const isOwner = role === 'Owner';
  const isTrial = subscription.is_trial;
  const plan = subscription.plan || 'free';

  if (plan === 'free' && isOwner) {
    return (
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-orange-500 to-red-500" />
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-orange-800 flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Free Plan - Limited Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-2 bg-orange-200 rounded-full w-20">
                  <div 
                    className="h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300"
                    style={{ width: `${((subscription.current_usage?.invoices || 3) / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-orange-700 font-medium">
                  {subscription.current_usage?.invoices || 3}/5
                </span>
              </div>
              <p className="text-xs text-orange-600">
                Upgrade to unlock unlimited features
              </p>
            </div>
            <Button 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xs px-4 py-2 shadow-lg"
              onClick={onUpgrade}
            >
              Upgrade Now
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isTrial && isOwner) {
    return (
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-yellow-500 to-orange-500" />
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-yellow-800 flex items-center space-x-2">
            <Crown className="h-4 w-4 text-yellow-600" />
            <span>Trial Period Active</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3 text-yellow-600" />
                  <span className="text-sm font-bold text-yellow-800">
                    {subscription.trial_days_left || 7} days remaining
                  </span>
                </div>
              </div>
              <p className="text-xs text-yellow-600">
                Enjoying all premium features
              </p>
            </div>
            <Button 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-xs px-4 py-2 shadow-lg"
              onClick={onUpgrade}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isOwner && (plan === 'silver_monthly' || plan === 'silver_yearly')) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-0 shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-green-500 to-teal-500" />
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-green-800 flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>{plan === 'silver_yearly' ? 'Silver Yearly' : 'Silver Monthly'} - Active</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-700 font-medium mb-1">
                All features unlocked
              </p>
              <p className="text-xs text-green-600 flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Next billing: {subscription.next_billing_date || 'Feb 07, 2025'}</span>
              </p>
            </div>
            <Button 
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50 text-xs px-4 py-2"
              onClick={onUpgrade}
            >
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
