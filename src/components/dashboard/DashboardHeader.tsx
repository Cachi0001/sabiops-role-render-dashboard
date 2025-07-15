import React, { useState } from 'react';
import { Bell, MessageCircle, Crown, Search, Menu, X, Bed, BarChart3, History, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { MasterSearchBar } from '@/components/search/MasterSearchBar';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

export const DashboardHeader = () => {
  const { user, role, subscription, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTwitterClick = () => {
    window.open('https://x.com/Caleb0533', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2348158025887', '_blank');
  };

  const handleAnalyticsClick = () => {
    if (subscription?.plan === 'free') {
      // Show upgrade prompt
      alert('Upgrade to access advanced analytics');
      return;
    }
    window.location.href = '/analytics';
  };

  const handleTransactionsClick = () => {
    if (subscription?.plan === 'free') {
      // Show upgrade prompt
      alert('Upgrade to access transaction history');
      return;
    }
    window.location.href = '/transactions';
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="bg-green-500 border-b border-green-400 sticky top-0 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-300 rounded-lg flex items-center justify-center">
              <span className="text-green-900 font-bold text-sm">S</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-white">
                SabiOps
              </h1>
              <p className="text-xs text-green-200">Business Dashboard</p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile for free plan */}
          {subscription?.plan !== 'free' && (
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <MasterSearchBar />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Analytics & Transactions for Desktop - Paid Plans */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAnalyticsClick}
                className={`text-white hover:text-green-100 hover:bg-green-600 flex items-center gap-1 ${
                  subscription?.plan === 'free' ? 'opacity-60' : ''
                }`}
                title={subscription?.plan === 'free' ? 'Upgrade to access Analytics' : 'Advanced Analytics'}
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Analytics</span>
                {subscription?.plan === 'free' && <Crown className="h-3 w-3 text-yellow-400 ml-1" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleTransactionsClick}
                className={`text-white hover:text-green-100 hover:bg-green-600 flex items-center gap-1 ${
                  subscription?.plan === 'free' ? 'opacity-60' : ''
                }`}
                title={subscription?.plan === 'free' ? 'Upgrade to access Transactions' : 'Transaction History'}
              >
                <History className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Transactions</span>
                {subscription?.plan === 'free' && <Crown className="h-3 w-3 text-yellow-400 ml-1" />}
              </Button>
            </div>

            {/* Social Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleTwitterClick}
                className="text-white hover:text-green-100 hover:bg-green-600 flex items-center gap-1"
                title="Follow our CEO"
              >
                <Bed className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Follow our CEO</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWhatsAppClick}
                className="text-white hover:text-green-100 hover:bg-green-600"
                title="Contact us for feedback"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>

            {/* Logout - Desktop */}
            <div className="hidden md:block">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:text-green-100 hover:bg-green-600 flex items-center gap-1"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Logout</span>
              </Button>
            </div>

            {/* Notifications */}
            <div className="hidden md:block">
              <NotificationCenter />
            </div>

            {/* Trial Indicator */}
            {subscription?.is_trial && (
              <div className="flex items-center space-x-1 bg-yellow-500 px-2 py-1 rounded-full">
                <Crown className="h-3 w-3 text-yellow-900" />
                <span className="text-xs font-medium text-yellow-900">
                  {subscription.trial_days_left} days
                </span>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-white hover:bg-green-600">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-green-500 border-green-400">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">Menu</h2>
                  <SheetClose asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-green-600">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>
                
                <div className="space-y-4">
                  {/* Search Bar - Only for paid plans */}
                  {subscription?.plan !== 'free' && (
                    <div className="w-full">
                      <MasterSearchBar />
                    </div>
                  )}
                  
                  {/* Reports & Analytics for Mobile */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-green-100">Reports & Analytics</h3>
                    <Button
                      variant="ghost"
                      onClick={handleAnalyticsClick}
                      className={`w-full justify-start text-white hover:text-green-100 hover:bg-green-600 ${
                        subscription?.plan === 'free' ? 'opacity-60' : ''
                      }`}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Advanced Analytics
                      {subscription?.plan === 'free' && <Crown className="h-3 w-3 text-yellow-400 ml-auto" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={handleTransactionsClick}
                      className={`w-full justify-start text-white hover:text-green-100 hover:bg-green-600 ${
                        subscription?.plan === 'free' ? 'opacity-60' : ''
                      }`}
                    >
                      <History className="h-4 w-4 mr-2" />
                      Transaction History
                      {subscription?.plan === 'free' && <Crown className="h-3 w-3 text-yellow-400 ml-auto" />}
                    </Button>
                  </div>
                  
                  {/* Social Links */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-green-100">Connect</h3>
                    <Button
                      variant="ghost"
                      onClick={handleTwitterClick}
                      className="w-full justify-start text-white hover:text-green-100 hover:bg-green-600"
                    >
                      <Bed className="h-4 w-4 mr-2" />
                      Follow our CEO
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={handleWhatsAppClick}
                      className="w-full justify-start text-white hover:text-green-100 hover:bg-green-600"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                  
                  {/* Logout */}
                  <div className="pt-2 border-t border-green-400">
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-white hover:text-green-100 hover:bg-green-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                  
                  {/* Notifications */}
                  <div className="pt-2 border-t border-green-400">
                    <NotificationCenter />
                  </div>
                  
                  {/* User Info */}
                  <div className="pt-2 border-t border-green-400">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="text-xs text-green-200">{role}</p>
                      {subscription?.plan && (
                        <p className="text-xs text-green-300 capitalize">
                          {subscription.plan === 'free' ? 'Free Plan' : `${subscription.plan} Plan`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0]}!
              </h2>
              <p className="text-sm text-green-100 flex items-center space-x-2">
                <span>Business at a glance</span>
                <span className="w-1 h-1 bg-green-200 rounded-full"></span>
                <span className="text-xs bg-green-600 text-green-100 px-2 py-0.5 rounded-full">
                  {role}
                </span>
                {subscription?.plan === 'free' && (
                  <>
                    <span className="w-1 h-1 bg-green-200 rounded-full"></span>
                    <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                      Free Plan
                    </span>
                  </>
                )}
              </p>
            </div>
            
            {subscription?.plan === 'free' && role === 'Owner' && (
              <Button
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                <Crown className="h-4 w-4 mr-1" />
                Upgrade Now
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search - Only for paid plans */}
        {subscription?.plan !== 'free' && (
          <div className="md:hidden mt-3">
            <MasterSearchBar />
          </div>
        )}
      </div>
    </div>
  );
};
