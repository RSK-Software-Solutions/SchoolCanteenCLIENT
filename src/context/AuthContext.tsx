import React, { createContext, useState, useContext, type ReactNode, useEffect } from "react";
import * as jwt from "jose";

type AuthContextProviderProps = {
  children: ReactNode;
};

export type TAuthContext = {
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
  const setCookies = (decodedUser: Record<string, string>) => {
    const expirationDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `userRoles=${Array.isArray(decodedUser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
      ? (decodedUser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as string[])
      : []}; expires=${expirationDate}`;
    document.cookie = `userID=${decodedUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] as string}; expires=${expirationDate}`;
  };

  const tokenSetter = async (token: string) => {
    try {
      if (isTokenValid(token)) {
        const decodedUser = jwt.decodeJwt(token) as Record<string, string>;
        localStorage.setItem("token", token);
        setCookies(decodedUser);
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
    } catch (error) {
      console.error("Error decoding token:", error);
      clearSession();
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && isTokenValid(storedToken)) {
      setToken(storedToken);
      tokenSetter(storedToken);
    } else {
      clearSession();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setToken]);


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

