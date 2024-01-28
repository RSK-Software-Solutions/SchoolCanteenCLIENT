import React, { createContext, useState, useContext, type ReactNode, useEffect } from "react";
import * as jwt from "jose";

type AuthContextProviderProps = {
  children: ReactNode;
};

type TAuthContext = {
  token: string;
  user: TUser;
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

  //!@UserKacper isTokenValid function get's token this token get's decoded and is checked if its not expired
  const isTokenValid = (token: string) => {
    try {
      const decodedToken = jwt.decodeJwt(token);
      return decodedToken.exp !== undefined && decodedToken.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  //!@UserKacper tokenSetter function get's token validates it to check if is not expired if not sets it as localstorage
  const tokenSetter = async (token: string) => {
    if (isTokenValid(token)) {
      localStorage.setItem("token", token);
    } else {
      clearSession();
    }
  };

  //!@UserKacper clearSession function is used in logout button which clears session/token removes localstorage
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


  //!@UserKacper this useEffect is checking if token is valid and setting user on every re-render so state after login is always there to get data 
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

  return (
    <AuthContext.Provider value={{ token, user, tokenSetter, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
};


//!@UserKacper this is a custom hook to use this context you can:
//! const user = useAuthContext();
//! now you have access to data from context
//? const token = user.token 

export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Must be wrapped inside of ContextProvider");
  }
  return context;
}
