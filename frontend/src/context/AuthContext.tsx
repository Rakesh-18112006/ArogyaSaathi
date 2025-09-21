import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");

    if (savedAuth && savedAuth !== "undefined") {
      try {
        const parsed = JSON.parse(savedAuth);
        setUser(parsed);
      } catch (error) {
        console.error("Invalid auth JSON in localStorage", error);
        localStorage.removeItem("auth"); // cleanup broken entry
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
