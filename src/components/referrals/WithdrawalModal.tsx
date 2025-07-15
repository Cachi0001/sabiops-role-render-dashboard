
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, DollarSign, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableAmount: number;
}

export const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ 
  isOpen, 
  onClose, 
  availableAmount 
}) => {
  const [formData, setFormData] = useState({
    amount: '',
    bankName: '',
    accountNumber: '',
    accountName: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseInt(formData.amount);
    if (amount < 3000) {
      toast.error('Minimum withdrawal amount is ₦3,000');
      return;
    }
    
    if (amount > availableAmount) {
      toast.error('Amount exceeds available balance');
      return;
    }

    setLoading(true);
    try {
      toast.loading('Processing withdrawal request...');
      
      // Mock API call
      setTimeout(() => {
        toast.dismiss();
        toast.success('Withdrawal request submitted successfully');
        console.log('Withdrawal request:', formData);
        onClose();
      }, 2000);
    } catch (error) {
      toast.error('Failed to process withdrawal');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-green-200">
        <CardHeader className="border-b border-green-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-green-900 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
              Withdraw Earnings
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Available for withdrawal:</strong> {formatCurrency(availableAmount)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="amount" className="text-green-800">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                min="3000"
                max={availableAmount}
                className="border-green-200 focus:border-green-500"
                required
              />
              <p className="text-xs text-green-600 mt-1">
                Minimum: ₦3,000
              </p>
            </div>

            <div>
              <Label htmlFor="bankName" className="text-green-800">Bank Name</Label>
              <Select 
                value={formData.bankName} 
                onValueChange={(value) => setFormData({...formData, bankName: value})}
              >
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue placeholder="Select your bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="access">Access Bank</SelectItem>
                  <SelectItem value="gtb">GTBank</SelectItem>
                  <SelectItem value="first">First Bank</SelectItem>
                  <SelectItem value="zenith">Zenith Bank</SelectItem>
                  <SelectItem value="uba">UBA</SelectItem>
                  <SelectItem value="fidelity">Fidelity Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="accountNumber" className="text-green-800">Account Number</Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="Enter 10-digit account number"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                maxLength={10}
                className="border-green-200 focus:border-green-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="accountName" className="text-green-800">Account Name</Label>
              <Input
                id="accountName"
                type="text"
                placeholder="Enter account name"
                value={formData.accountName}
                onChange={(e) => setFormData({...formData, accountName: e.target.value})}
                className="border-green-200 focus:border-green-500"
                required
              />
            </div>

            <div className="flex items-start space-x-2 text-xs text-orange-600 bg-orange-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Processing Information:</p>
                <p>• Withdrawals are processed within 1-3 business days</p>
                <p>• No processing fees</p>
                <p>• Ensure account details are correct</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
