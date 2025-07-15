import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { TransactionHistory } from '@/components/dashboard/TransactionHistory';

const Transactions = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <TransactionHistory />
      </div>
    </DashboardLayout>
  );
};

export default Transactions;