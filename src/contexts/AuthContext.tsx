import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'patient' | 'practitioner' | 'clinic' | 'admin';

interface User {
  username: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const users = [
  { username: 'patient', password: 'P@tient!2025', role: 'patient' as UserRole, name: 'Patient User' },
  { username: 'doctor', password: 'Doctor@2025', role: 'practitioner' as UserRole, name: 'Dr. Smith' },
  { username: 'clinic', password: 'Clinic@2025', role: 'clinic' as UserRole, name: 'Clinic Admin' },
  { username: 'admin', password: 'Admin@2025', role: 'admin' as UserRole, name: 'System Administrator' },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      setUser({
        username: foundUser.username,
        role: foundUser.role,
        name: foundUser.name,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
