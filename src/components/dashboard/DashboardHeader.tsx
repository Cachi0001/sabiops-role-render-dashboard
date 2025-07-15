
import React from 'react';
import { Bell, MessageCircle, Crown, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { MasterSearchBar } from '@/components/search/MasterSearchBar';

export const DashboardHeader = () => {
  const { user, role, subscription } = useAuth();

  const handleTwitterClick = () => {
    window.open('https://x.com/Caleb0533', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2348158025887', '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-white to-green-50 border-b border-green-200 sticky top-0 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                SabiOps
              </h1>
              <p className="text-xs text-green-600">Business Dashboard</p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <MasterSearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Social Links */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleTwitterClick}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              title="Follow our CEO"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWhatsAppClick}
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
              title="Contact us for feedback"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <NotificationCenter />

            {/* Trial Indicator */}
            {subscription?.is_trial && (
              <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-100 to-orange-100 px-2 py-1 rounded-full">
                <Crown className="h-3 w-3 text-yellow-600" />
                <span className="text-xs font-medium text-yellow-700">
                  {subscription.trial_days_left} days
                </span>
              </div>
            )}

            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-green-900">
                Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0]}!
              </h2>
              <p className="text-sm text-green-700 flex items-center space-x-2">
                <span>Business at a glance</span>
                <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  {role}
                </span>
              </p>
            </div>
            
            {subscription?.plan === 'free' && role === 'Owner' && (
              <Button
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                Upgrade Now
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <MasterSearchBar />
        </div>
      </div>
    </div>
  );
};
