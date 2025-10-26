import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  memberSince: string;
  points: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for saved user
    const savedUser = localStorage.getItem('febsin_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: '1',
      name: 'Member Febsin',
      email: email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      memberSince: 'Jan 2024',
      points: 150
    };
    
    setUser(mockUser);
    localStorage.setItem('febsin_user', JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock register
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      memberSince: new Date().toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }),
      points: 0
    };
    
    setUser(mockUser);
    localStorage.setItem('febsin_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('febsin_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
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
