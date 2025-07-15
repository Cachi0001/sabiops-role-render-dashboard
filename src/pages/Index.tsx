
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { OverviewCards } from '@/components/dashboard/OverviewCards';
import { ChartsSection } from '@/components/dashboard/ChartsSection';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { SubscriptionStatus } from '@/components/subscription/SubscriptionStatus';
import { ReferralWidget } from '@/components/referrals/ReferralWidget';
import { TeamManagement } from '@/components/team/TeamManagement';
import { OfflineIndicator } from '@/components/common/OfflineIndicator';
import { SocialLinks } from '@/components/common/SocialLinks';
import { MasterSearchBar } from '@/components/search/MasterSearchBar';
import { UpgradeModal } from '@/components/subscription/UpgradeModal';
import { WithdrawalModal } from '@/components/referrals/WithdrawalModal';
import { ExportButtons } from '@/components/export/ExportButtons';
import { UsageTracker } from '@/components/usage/UsageTracker';
import { SyncStatus } from '@/components/sync/SyncStatus';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from '@/hooks/useDashboard';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { toast } from '@/hooks/use-toast';
import { toast as hotToast } from 'react-hot-toast';

const Index = () => {
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
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-900 mb-4">Please Login</h1>
          <p className="text-green-700">Access your SabiOps dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="bg-white border-b border-green-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div>
              <h1 className="text-xl font-bold text-green-900">
                Welcome back, {user.name}
              </h1>
              <p className="text-green-700 text-sm">
                Business at a glance • {role}
              </p>
            </div>
            
            {/* Master Search Bar */}
            <MasterSearchBar />
          </div>
          
          <div className="flex items-center space-x-2">
            <SocialLinks />
            <NotificationCenter />
            <OfflineIndicator isOnline={isOnline} />
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="p-4 space-y-6 bg-green-50 min-h-screen">
        {/* Subscription Status - Owner only or trial indicators */}
        {(role === 'Owner' || subscription?.is_trial) && (
          <SubscriptionStatus 
            subscription={subscription} 
            role={role}
            onUpgrade={() => setUpgradeModalOpen(true)}
          />
        )}

        {/* Usage Tracker for Free Plan */}
        <UsageTracker />

        {/* Export Buttons */}
        <div className="flex justify-end">
          <ExportButtons type="dashboard" />
        </div>

        {/* Overview Cards - Role-based rendering */}
        <OverviewCards 
          data={dashboardData} 
          role={role} 
          subscription={subscription}
          loading={loading}
        />

        {/* Charts Section - Role-based charts */}
        <ChartsSection 
          data={dashboardData} 
          role={role} 
          subscription={subscription}
          loading={loading}
        />

        {/* Quick Actions - Role-based actions */}
        <QuickActions 
          role={role} 
          subscription={subscription}
          onUpgrade={() => setUpgradeModalOpen(true)}
        />

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

        {/* Recent Activities - All roles */}
        <RecentActivities 
          activities={dashboardData?.recent_activities} 
          role={role}
          loading={loading}
        />

        {/* Upgrade Prompts for Free Plan */}
        {subscription?.plan === 'free' && (
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-lg border-2 border-green-300">
            <div className="text-center">
              <h3 className="text-lg font-bold text-green-900 mb-2">
                Unlock Full Features
              </h3>
              <p className="text-green-700 mb-4">
                You've used {dashboardData?.subscription_status?.current_usage?.invoices || 0} of 5 invoices this month
              </p>
              <button 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
                onClick={() => setUpgradeModalOpen(true)}
              >
                Upgrade Now
              </button>
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

export default Index;
