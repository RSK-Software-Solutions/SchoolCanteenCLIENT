import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import * as jose from "jose";

type AuthContextProviderProps = {
  children: ReactNode;
};

type TAuthContext = {
  token: string;
  email: string;
  userName: string;
  isLoading: boolean;
  session: boolean;
  userSetter: (token: string, email: string, userName: string) => void;
  clearSession: () => void;
};

export const AuthContext = createContext<TAuthContext | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(false);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    if (localStorageToken) {
      if (isTokenValid(localStorageToken)) {
        setToken(localStorageToken);
        setSession(true);
      } else {
        clearSession();
      }
    }

    setIsLoading(false);
  }, []);

  const isTokenValid = (token: string) => {
    try {
      const decodedToken = jose.decodeJwt(token);
      return decodedToken.exp !== undefined && decodedToken.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  const userSetter = (token: string, email: string, userName: string) => {
    setIsLoading(true);

    if (isTokenValid(token)) {
      setToken(token);
      setEmail(email);
      setUserName(userName);

      localStorage.setItem("token", token);

      setSession(true);
    } else {
      clearSession();
    }

    setIsLoading(false);
  };

  const clearSession = () => {
    setToken("");
    setEmail("");
    setUserName("");
    localStorage.removeItem("token");
    setSession(false);
  };

  return (
    <AuthContext.Provider value={{ token, userSetter, isLoading, session, email, userName, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Must be wrapped inside of ContextProvider");
  }
  return context;
}
