
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Subscription {
  plan: 'free' | 'silver_weekly' | 'silver_monthly' | 'silver_yearly';
  status: 'active' | 'trial' | 'expired';
  is_trial: boolean;
  trial_days_left: number;
  current_usage: {
    invoices: number;
    expenses: number;
  };
  usage_limits: {
    invoices: number | 'unlimited';
    expenses: number | 'unlimited';
  };
  next_billing_date?: string;
}

interface AuthContextType {
  user: User | null;
  role: 'Owner' | 'Admin' | 'Salesperson' | null;
  subscription: Subscription | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'Owner' | 'Admin' | 'Salesperson' | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock authentication for demo
    const mockUser: User = {
      id: '1',
      name: 'John Owner',
      email: 'owner@sabiops.com',
    };

    const mockSubscription: Subscription = {
      plan: 'silver_monthly',
      status: 'active',
      is_trial: false,
      trial_days_left: 0,
      current_usage: {
        invoices: 15,
        expenses: 8,
      },
      usage_limits: {
        invoices: 'unlimited',
        expenses: 'unlimited',
      },
      next_billing_date: '2025-02-07',
    };

    setUser(mockUser);
    setRole('Owner');
    setSubscription(mockSubscription);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Mock login logic
    setTimeout(() => {
      setUser({
        id: '1',
        name: 'John Owner',
        email,
      });
      setRole('Owner');
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setSubscription(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      subscription,
      login,
      logout,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
