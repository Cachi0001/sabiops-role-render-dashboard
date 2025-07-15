
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, X } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      message: 'Low stock: Printer Paper (2 remaining)',
      type: 'warning',
      timestamp: '2025-01-07T08:00:00Z',
      read: false,
    },
    {
      id: 2,
      message: 'Payment received: ₦15,000 from John Doe',
      type: 'success',
      timestamp: '2025-01-07T07:30:00Z',
      read: false,
    },
    {
      id: 3,
      message: 'Invoice #INV-1234 is overdue',
      type: 'error',
      timestamp: '2025-01-07T07:00:00Z',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="relative p-2 text-green-700 hover:text-green-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 max-w-sm z-50">
          <Card className="border-green-200 shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-green-200">
              <h3 className="font-medium text-green-900">Notifications</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-0 max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-green-600 text-sm">
                  No notifications
                </div>
              ) : (
                <div className="divide-y divide-green-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-l-4 ${getNotificationColor(notification.type)} ${
                        !notification.read ? 'bg-opacity-75' : 'bg-opacity-25'
                      }`}
                    >
                      <p className="text-sm text-green-900 font-medium">
                        {notification.message}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {formatRelativeTime(notification.timestamp)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
