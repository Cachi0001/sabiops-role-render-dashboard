
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Check, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  const { subscription } = useAuth();
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 'silver_weekly',
      name: 'Silver Weekly',
      price: '₦1,400',
      period: '/week',
      trial: '7-day free trial',
      features: ['All features', '7-day trial', 'Team management', 'Advanced analytics'],
    },
    {
      id: 'silver_monthly',
      name: 'Silver Monthly',
      price: '₦4,500',
      period: '/month',
      popular: true,
      features: ['All features', 'Advanced analytics', 'Export reports', 'Priority support'],
    },
    {
      id: 'silver_yearly',
      name: 'Silver Yearly',
      price: '₦50,000',
      period: '/year',
      savings: 'Save ₦4,000',
      features: ['All features', 'Maximum benefits', 'Priority support', 'Early access'],
    },
  ];

  const handleUpgrade = async (planId: string) => {
    setLoading(true);
    try {
      toast.loading('Initializing payment...');
      
      // Mock payment initialization
      setTimeout(() => {
        toast.dismiss();
        toast.success('Redirecting to payment...');
        console.log('Upgrade to:', planId);
        onClose();
      }, 2000);
    } catch (error) {
      toast.error('Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-green-200">
        <CardHeader className="text-center border-b border-green-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-green-900">
              Choose Your Plan
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-green-600 mt-2">
            Unlock all features and grow your business
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative border-2 ${
                  plan.popular ? 'border-green-500' : 'border-green-200'
                } hover:border-green-400 transition-colors`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-lg font-bold text-green-900">
                    {plan.name}
                  </CardTitle>
                  <div className="text-3xl font-bold text-green-600">
                    {plan.price}
                    <span className="text-sm font-normal text-green-500">
                      {plan.period}
                    </span>
                  </div>
                  {plan.trial && (
                    <div className="flex items-center justify-center text-yellow-600">
                      <Crown className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">{plan.trial}</span>
                    </div>
                  )}
                  {plan.savings && (
                    <div className="text-green-600 text-sm font-medium">
                      {plan.savings}
                    </div>
                  )}
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-green-800">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Upgrade Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {subscription?.plan === 'free' && (
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-orange-800 text-sm">
                <strong>Current usage:</strong> {subscription.current_usage?.invoices || 0}/5 invoices, {subscription.current_usage?.expenses || 0}/5 expenses this month
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
