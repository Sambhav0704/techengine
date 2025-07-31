import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  currentUser: any;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userType: 'student' | 'hr') => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  userType: 'student' | 'hr' | null;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'student' | 'hr' | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function signup(email: string, password: string, userType: 'student' | 'hr') {
    try {
      console.log('Signing up user:', email, 'as:', userType);
      
      // Mock user creation
      const mockUser = {
        uid: Date.now().toString(),
        email: email,
        displayName: userType === 'student' ? 'Student' : 'HR'
      };
      
      // Store in localStorage for persistence
      try {
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        localStorage.setItem('userType', userType);
      } catch (storageError) {
        console.warn('localStorage not available, continuing without persistence');
      }
      
      setCurrentUser(mockUser);
      setUserType(userType);
      setError(null);
      
      console.log('User signed up successfully');
    } catch (error: any) {
      console.error('Error creating user:', error);
      setError(error.message || 'Failed to create account');
      throw error;
    }
  }

  async function login(email: string, password: string) {
    try {
      console.log('Logging in user:', email);
      
      // Mock authentication - check for demo credentials
      if (email === 'student@demo.com' && password === 'password123') {
        const mockUser = {
          uid: 'student-demo',
          email: email,
          displayName: 'Student'
        };
        
        try {
          localStorage.setItem('currentUser', JSON.stringify(mockUser));
          localStorage.setItem('userType', 'student');
        } catch (storageError) {
          console.warn('localStorage not available, continuing without persistence');
        }
        
        setCurrentUser(mockUser);
        setUserType('student');
        setError(null);
        return;
      }
      
      if (email === 'hr@demo.com' && password === 'password123') {
        const mockUser = {
          uid: 'hr-demo',
          email: email,
          displayName: 'HR'
        };
        
        try {
          localStorage.setItem('currentUser', JSON.stringify(mockUser));
          localStorage.setItem('userType', 'hr');
        } catch (storageError) {
          console.warn('localStorage not available, continuing without persistence');
        }
        
        setCurrentUser(mockUser);
        setUserType('hr');
        setError(null);
        return;
      }
      
      // For any other email/password, create a new user
      const mockUser = {
        uid: Date.now().toString(),
        email: email,
        displayName: 'User'
      };
      
      try {
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        localStorage.setItem('userType', 'student'); // Default to student
      } catch (storageError) {
        console.warn('localStorage not available, continuing without persistence');
      }
      
      setCurrentUser(mockUser);
      setUserType('student');
      setError(null);
      
    } catch (error: any) {
      console.error('Error logging in:', error);
      setError(error.message || 'Failed to login');
      throw error;
    }
  }

  async function logout() {
    try {
      try {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userType');
      } catch (storageError) {
        console.warn('localStorage not available during logout');
      }
      setCurrentUser(null);
      setUserType(null);
      setError(null);
    } catch (error: any) {
      console.error('Error logging out:', error);
      setError(error.message || 'Failed to logout');
      throw error;
    }
  }

  useEffect(() => {
    // Check for existing user in localStorage
    try {
      const savedUser = localStorage.getItem('currentUser');
      const savedUserType = localStorage.getItem('userType') as 'student' | 'hr' | null;
      
      if (savedUser && savedUserType) {
        setCurrentUser(JSON.parse(savedUser));
        setUserType(savedUserType);
      }
    } catch (storageError) {
      console.warn('localStorage not available during initialization');
    }
    
    setLoading(false);
  }, []);



  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
    userType,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 