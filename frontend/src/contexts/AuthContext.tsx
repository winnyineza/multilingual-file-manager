import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/api';
import { ProfileUpdateData } from '@/services/types';
import { useTranslation } from 'react-i18next';

interface AuthContextType {
  user: any;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token and set user
      authService.validateToken(token)
        .then(response => setUser(response.data))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const login = async (credentials: any) => {
    const response = await authService.login(credentials);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (data: ProfileUpdateData) => {
    try {
      const response = await authService.put('/users/profile', data);
      setUser(response.data);
      // Update language preference if changed
      if (data.language) {
        i18n.changeLanguage(data.language);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      updateProfile, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 