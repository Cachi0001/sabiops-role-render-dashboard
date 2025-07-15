
import { useState, useEffect } from 'react';

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Mock API call - replace with actual API calls
        const mockData = {
          revenue: { total: 450000, this_month: 85000 },
          gross_profit: { total: 270000, this_month: 51000 },
          expenses: { total: 120000, this_month: 22000 },
          net_profit: { total: 150000, this_month: 29000 },
          inventory_value: 180000,
          customers: { total: 145, new_this_month: 12 },
          products: { total: 89, low_stock: 3 },
          sales: { total_sales: 234, total_quantity: 456, total_amount: 450000 },
          low_stock: [
            { name: 'Printer Paper', quantity: 2 },
            { name: 'Desk Lamp', quantity: 1 },
          ],
          top_products: [
            { name: 'Office Chair', quantity: 45 },
            { name: 'Desk', quantity: 32 },
          ],
          recent_activities: [
            { type: 'sale', description: 'Sold 2 Office Chairs to John Doe', timestamp: '2025-01-07T10:00:00Z' },
            { type: 'invoice', description: 'Invoice #INV-1234 paid by Jane Smith', timestamp: '2025-01-07T09:30:00Z' },
          ],
          referral_earnings: {
            total_earnings: 13500,
            active_referrals: 3,
            available_for_withdrawal: 8500,
            monthly_earnings: 4500,
          },
          team: [
            { id: 1, name: 'John Admin', role: 'Admin', status: 'active', email: 'jo***@example.com' },
          ],
          subscription_status: {
            plan: 'silver_monthly',
            current_usage: { invoices: 15, expenses: 8 },
            usage_limits: { invoices: 'unlimited', expenses: 'unlimited' },
          },
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setDashboardData(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const refreshData = () => {
    setLoading(true);
    // Refetch data
  };

  return {
    dashboardData,
    loading,
    error,
    refreshData,
  };
};
