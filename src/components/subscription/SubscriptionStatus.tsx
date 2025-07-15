
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Calendar, CreditCard, TrendingUp } from 'lucide-react';

interface SubscriptionStatusProps {
  subscription: any;
  role: string;
}

export const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({ 
  subscription, 
  role 
}) => {
  if (!subscription) return null;

  const isOwner = role === 'Owner';
  const isTrial = subscription.is_trial;
  const plan = subscription.plan || 'free';
  const trialDaysLeft = subscription.trial_days_left || 0;

  if (plan === 'free' && isOwner) {
    return (
      <Card className="bg-gradient-to-r from-orange-100 to-red-100 border-orange-200">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-orange-800 flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Free Plan - Limited Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-orange-700">
                {subscription.current_usage?.invoices || 0}/5 invoices used this month
              </p>
              <p className="text-xs text-orange-600 mt-1">
                Upgrade to unlock unlimited features
              </p>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white text-xs">
              Upgrade Now
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isTrial && isOwner) {
    return (
      <Card className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-yellow-800 flex items-center">
            <Crown className="h-4 w-4 mr-2" />
            Trial Period Active
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-yellow-700 font-medium">
                {trialDaysLeft} days remaining
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                Enjoying all premium features
              </p>
            </div>
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs">
              Continue Trial
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isOwner && (plan === 'silver_monthly' || plan === 'silver_yearly')) {
    return (
      <Card className="bg-gradient-to-r from-green-100 to-green-200 border-green-300">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-green-800 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            {plan === 'silver_yearly' ? 'Silver Yearly Plan' : 'Silver Monthly Plan'} - Active
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-green-700">
                All features unlocked
              </p>
              <p className="text-xs text-green-600 mt-1">
                Next billing: {subscription.next_billing_date || 'N/A'}
              </p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white text-xs">
              Manage Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
