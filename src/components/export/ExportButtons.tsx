
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, FileSpreadsheet, Image, FileDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

interface ExportButtonsProps {
  type: 'dashboard' | 'sales' | 'customers' | 'products' | 'invoices';
  className?: string;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ type, className = '' }) => {
  const { role, subscription } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const canExport = subscription?.plan !== 'free';

  const getAvailableFormats = () => {
    if (!canExport) return [];

    switch (role) {
      case 'Owner':
        return ['pdf', 'excel', 'csv', 'png'];
      case 'Admin':
        if (type === 'sales') return ['pdf', 'png'];
        return ['pdf', 'excel', 'csv', 'png'];
      case 'Salesperson':
        return ['pdf', 'png'];
      default:
        return [];
    }
  };

  const handleExport = async (format: string) => {
    if (!canExport) {
      toast.error('Upgrade to download reports');
      return;
    }

    setLoading(format);
    try {
      toast.loading(`Preparing ${format.toUpperCase()} export...`);
      
      // Mock API call - replace with actual backend endpoint
      const endpoint = `https://sabiops-backend.vercel.app/api/${type}/export?format=${format}`;
      console.log('Export endpoint:', endpoint);
      
      setTimeout(() => {
        toast.dismiss();
        toast.success(`${format.toUpperCase()} report downloaded successfully`);
        // In real implementation, trigger file download here
      }, 2000);
    } catch (error) {
      toast.error(`Failed to export ${format.toUpperCase()} report`);
    } finally {
      setLoading(null);
    }
  };

  const formatButtons = [
    { format: 'pdf', icon: FileText, label: 'PDF', color: 'text-red-600' },
    { format: 'excel', icon: FileSpreadsheet, label: 'Excel', color: 'text-green-600' },
    { format: 'csv', icon: FileDown, label: 'CSV', color: 'text-blue-600' },
    { format: 'png', icon: Image, label: 'PNG', color: 'text-purple-600' },
  ];

  const availableFormats = getAvailableFormats();

  if (!canExport) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Button
          variant="outline"
          size="sm"
          className="border-orange-200 text-orange-700 hover:bg-orange-50"
          onClick={() => toast.error('Upgrade to download reports')}
        >
          <Download className="h-4 w-4 mr-1" />
          Upgrade to Export
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {formatButtons
        .filter(btn => availableFormats.includes(btn.format))
        .map(({ format, icon: Icon, label, color }) => (
          <Button
            key={format}
            variant="outline"
            size="sm"
            className="border-green-200 text-green-700 hover:bg-green-50"
            onClick={() => handleExport(format)}
            disabled={loading === format}
          >
            <Icon className={`h-4 w-4 mr-1 ${color}`} />
            {loading === format ? 'Exporting...' : label}
          </Button>
        ))}
    </div>
  );
};
