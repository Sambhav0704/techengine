import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminData {
  email: string;
  name: string;
}

interface AdminContextType {
  adminData: AdminData | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const session = localStorage.getItem('adminSession');
    if (session) {
      try {
        const parsedSession = JSON.parse(session);
        setAdminData(parsedSession);
      } catch (error) {
        console.error('Invalid admin session:', error);
        localStorage.removeItem('adminSession');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Hardcoded admin credentials
    const ADMIN_CREDENTIALS = {
      email: 'admin12@gmail.com',
      password: '12344321'
    };

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminData = {
        email: email,
        name: 'Admin User'
      };
      
      setAdminData(adminData);
      localStorage.setItem('adminSession', JSON.stringify(adminData));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setAdminData(null);
    localStorage.removeItem('adminSession');
  };

  const value: AdminContextType = {
    adminData,
    isAuthenticated: !!adminData,
    login,
    logout,
    loading
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}; 