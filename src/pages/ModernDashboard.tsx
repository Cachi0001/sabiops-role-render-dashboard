
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ModernOverviewCards } from '@/components/dashboard/ModernOverviewCards';
import { ModernChartsSection } from '@/components/dashboard/ModernChartsSection';
import { ModernQuickActions } from '@/components/dashboard/ModernQuickActions';
import { ModernRecentActivities } from '@/components/dashboard/ModernRecentActivities';
import { ModernSubscriptionStatus } from '@/components/dashboard/ModernSubscriptionStatus';
import { UsageTracker } from '@/components/usage/UsageTracker';
import { ExportButtons } from '@/components/export/ExportButtons';
import { ReferralWidget } from '@/components/referrals/ReferralWidget';
import { TeamManagement } from '@/components/team/TeamManagement';
import { SyncStatus } from '@/components/sync/SyncStatus';
import { UpgradeModal } from '@/components/subscription/UpgradeModal';
import { WithdrawalModal } from '@/components/referrals/WithdrawalModal';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from '@/hooks/useDashboard';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { toast } from '@/hooks/use-toast';
import { toast as hotToast } from 'react-hot-toast';

const ModernDashboard = () => {
  const { user, role, subscription } = useAuth();
  const { dashboardData, loading, error, refreshData } = useDashboard();
  const { isOnline } = useOfflineSync();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);

  useEffect(() => {
    if (error) {
      toast({
        title: "Dashboard Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error]);

  // Auto-refresh data every 30 seconds when online
  useEffect(() => {
    if (!isOnline) return;
    
    const interval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => clearInterval(interval);
  }, [isOnline, refreshData]);

  // Show upgrade notification for free plan users nearing limits
  useEffect(() => {
    if (subscription?.plan === 'free' && subscription.current_usage) {
      const invoiceUsage = subscription.current_usage.invoices || 0;
      const expenseUsage = subscription.current_usage.expenses || 0;
      
      if (invoiceUsage >= 4 || expenseUsage >= 4) {
        hotToast('You are nearing your monthly limits. Consider upgrading!', {
          icon: '⚠️',
          duration: 6000,
        });
      }
    }
  }, [subscription]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-purple-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Please Login
          </h1>
          <p className="text-gray-600">Access your SabiOps dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <DashboardHeader />

      {/* Main Dashboard Content */}
      <div className="p-4 space-y-6 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
        {/* Subscription Status */}
        <ModernSubscriptionStatus onUpgrade={() => setUpgradeModalOpen(true)} />

        {/* Usage Tracker for Free Plan */}
        <UsageTracker />

        {/* Export Buttons */}
        <div className="flex justify-end">
          <ExportButtons type="dashboard" />
        </div>

        {/* Overview Cards */}
        <ModernOverviewCards data={dashboardData} loading={loading} />

        {/* Charts Section */}
        <ModernChartsSection data={dashboardData} loading={loading} />

        {/* Quick Actions */}
        <ModernQuickActions onUpgrade={() => setUpgradeModalOpen(true)} />

        {/* Owner-only sections */}
        {role === 'Owner' && subscription?.plan !== 'free' && (
          <>
            {/* Referral Widget */}
            <ReferralWidget 
              referralData={dashboardData?.referral_earnings}
              loading={loading}
              onWithdraw={() => setWithdrawalModalOpen(true)}
            />

            {/* Team Management */}
            <TeamManagement 
              teamData={dashboardData?.team}
              loading={loading}
            />
          </>
        )}

        {/* Sync Status */}
        <SyncStatus />

        {/* Recent Activities */}
        <ModernRecentActivities 
          activities={dashboardData?.recent_activities} 
          loading={loading}
        />

        {/* Bottom Upgrade Section for Free Plan */}
        {subscription?.plan === 'free' && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-2xl shadow-lg text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12" />
            <div className="relative">
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">
                  🚀 Unlock Full Features
                </h3>
                <p className="text-orange-100 mb-4">
                  You've used {dashboardData?.subscription_status?.current_usage?.invoices || 3} of 5 invoices this month
                </p>
                <button 
                  className="bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
                  onClick={() => setUpgradeModalOpen(true)}
                >
                  Upgrade Now 🎯
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <UpgradeModal 
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
      />
      
      <WithdrawalModal
        isOpen={withdrawalModalOpen}
        onClose={() => setWithdrawalModalOpen(false)}
        availableAmount={dashboardData?.referral_earnings?.available_for_withdrawal || 0}
      />
    </DashboardLayout>
  );
};

export default ModernDashboard;
