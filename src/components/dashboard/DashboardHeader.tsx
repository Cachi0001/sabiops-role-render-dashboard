
import React, { useState } from 'react';
import { Bell, MessageCircle, Crown, Search, Menu, X, Bed, BarChart3, History, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { MasterSearchBar } from '@/components/search/MasterSearchBar';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/theme-toggle';

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
    <div className="bg-primary border-b border-primary/20 sticky top-0 z-40 dark:bg-primary/90 dark:border-primary/30">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary/80 to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-primary-foreground">
                SabiOps
              </h1>
              <p className="text-xs text-primary-foreground/80">Business Dashboard</p>
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
            {/* Theme Toggle - Desktop */}
            <div className="hidden md:block">
              <ThemeToggle 
                variant="ghost" 
                size="sm" 
                className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
              />
            </div>

            {/* Analytics & Transactions for Desktop - Paid Plans */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAnalyticsClick}
                className={`text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10 flex items-center gap-1 ${
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
                className={`text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10 flex items-center gap-1 ${
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
                className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10 flex items-center gap-1"
                title="Follow our CEO"
              >
                <Bed className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Follow our CEO</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWhatsAppClick}
                className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
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
                className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10 flex items-center gap-1"
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
                <Button variant="ghost" size="sm" className="md:hidden text-primary-foreground hover:bg-primary-foreground/10">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Menu</h2>
                  <div className="flex items-center gap-2">
                    <ThemeToggle showText />
                    <SheetClose asChild>
                      <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Notifications */}
                  <div className="pb-2 border-b border-border">
                    <NotificationCenter />
                  </div>
                  
                  {/* Search Bar - Only for paid plans */}
                  {subscription?.plan !== 'free' && (
                    <div className="w-full">
                      <MasterSearchBar />
                    </div>
                  )}
                  
                  {/* Reports & Analytics for Mobile */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Reports & Analytics</h3>
                    <Button
                      variant="ghost"
                      onClick={handleAnalyticsClick}
                      className={`w-full justify-start text-foreground hover:text-foreground hover:bg-accent ${
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
                      className={`w-full justify-start text-foreground hover:text-foreground hover:bg-accent ${
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
                    <h3 className="text-sm font-medium text-muted-foreground">Connect</h3>
                    <Button
                      variant="ghost"
                      onClick={handleTwitterClick}
                      className="w-full justify-start text-foreground hover:text-foreground hover:bg-accent"
                    >
                      <Bed className="h-4 w-4 mr-2" />
                      Follow our CEO
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={handleWhatsAppClick}
                      className="w-full justify-start text-foreground hover:text-foreground hover:bg-accent"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                  
                  {/* Logout */}
                  <div className="pt-2 border-t border-border">
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-foreground hover:text-foreground hover:bg-accent"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                  
                  {/* User Info */}
                  <div className="pt-2 border-t border-border">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{role}</p>
                      {subscription?.plan && (
                        <p className="text-xs text-muted-foreground capitalize">
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
              <h2 className="text-xl font-bold text-primary-foreground">
                Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0]}!
              </h2>
              <p className="text-sm text-primary-foreground/80 flex items-center space-x-2">
                <span>Business at a glance</span>
                <span className="w-1 h-1 bg-primary-foreground/60 rounded-full"></span>
                <span className="text-xs bg-primary-foreground/20 text-primary-foreground px-2 py-0.5 rounded-full">
                  {role}
                </span>
                {subscription?.plan === 'free' && (
                  <>
                    <span className="w-1 h-1 bg-primary-foreground/60 rounded-full"></span>
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
