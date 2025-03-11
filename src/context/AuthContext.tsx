import React, { createContext, useContext, useState } from 'react';
import { User, Order, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real app, this would be in a database
let users: User[] = [];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    if (users.some(u => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      orders: []
    };

    users.push(newUser);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (order: Order) => {
    if (user) {
      const updatedUser = {
        ...user,
        orders: [...user.orders, order]
      };
      users = users.map(u => u.id === user.id ? updatedUser : u);
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}