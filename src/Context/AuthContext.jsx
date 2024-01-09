import React, { createContext, useState, useEffect } from "react";
import * as jose from "jose";

const defaultSettings = {
  token: "",
  email: "",
  userName: "",
  tokenSetter: {},
};
export const AuthContext = createContext(defaultSettings);

export const AuthContextProvider = (props) => {
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

  const isTokenValid = (token) => {
    try {
      const decodedToken = jose.decodeJwt(token);
      console.log(decodedToken.exp * 1000, Date.now());
      return decodedToken.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  const UserSetter = (token, email, userName) => {
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
    <AuthContext.Provider value={{ token, UserSetter, isLoading, session, email, userName, clearSession }}>
      {props.children}
    </AuthContext.Provider>
  );
};
