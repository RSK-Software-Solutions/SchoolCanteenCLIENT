import React, { createContext, useState, useContext, type ReactNode, useEffect } from "react";
import * as jwt from "jose";

type AuthContextProviderProps = {
  children: ReactNode;
};

type TAuthContext = {
  token: string
  user: TUser
  tokenSetter: (token: string) => void;
  clearSession: () => void;
};

export type TUser = {
  id: string,
  email: string,
  login: string,
  roles: string[];
}

export const AuthContext = createContext<TAuthContext | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string>("")
  const [user, setUser] = useState<TUser>({
    id: "",
    email: "",
    login: "",
    roles: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenValid(token)) {
        setToken(token)
        const decodedUser = jwt.decodeJwt(token) as Record<string, string>;
        setUser({
          id: decodedUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] as string,
          email: decodedUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] as string,
          login: decodedUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] as string,
          roles: Array.isArray(decodedUser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
            ? (decodedUser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as string[])
            : []
        });
      } else {
        clearSession();
      }
    }
  }, [setUser]);


  const isTokenValid = (token: string) => {
    try {
      const decodedToken = jwt.decodeJwt(token);
      return decodedToken.exp !== undefined && decodedToken.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  const tokenSetter = async (token: string) => {
    if (isTokenValid(token)) {
      localStorage.setItem("token", token);
    } else {
      clearSession();
    }
  };

  const clearSession = async () => {
    setToken("")
    setUser({
      id: "",
      email: "",
      login: "",
      roles: [],
    })
    localStorage.removeItem("token");
  };


  return (
    <AuthContext.Provider value={{ token, user, tokenSetter, clearSession }}>
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
