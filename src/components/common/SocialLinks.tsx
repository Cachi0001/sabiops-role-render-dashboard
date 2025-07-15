
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export const SocialLinks = () => {
  const handleTwitterClick = () => {
    window.open('https://x.com/Caleb0533', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2348158025887', '_blank');
  };

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleTwitterClick}
        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        title="Follow our CEO"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleWhatsAppClick}
        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50"
        title="Contact us for feedback"
      >
        <MessageCircle className="h-4 w-4" />
      </Button>
    </div>
  );
};
