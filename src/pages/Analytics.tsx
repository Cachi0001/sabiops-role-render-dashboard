import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AdvancedAnalytics } from '@/components/dashboard/AdvancedAnalytics';

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <AdvancedAnalytics />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;