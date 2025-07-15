
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'ghost', 
  size = 'sm', 
  className,
  showText = false 
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(
        "flex items-center gap-2",
        isDark 
          ? "text-gray-200 hover:text-white hover:bg-gray-700" 
          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
        className
      )}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      {showText && (
        <span className="text-xs">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </Button>
  );
};
