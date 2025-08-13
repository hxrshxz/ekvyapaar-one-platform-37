import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("demo_authed") === "true";
  });
  const [user, setUser] = useState<{ username: string } | null>(() => {
    const u = localStorage.getItem("demo_user");
    return u ? { username: u } : null;
  });

  const login = (username: string) => {
    setIsAuthenticated(true);
    setUser({ username });
    localStorage.setItem("demo_authed", "true");
    localStorage.setItem("demo_user", username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("demo_authed");
    localStorage.removeItem("demo_user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
