import React, {createContext, useState} from "react";

const defaultSettings = {
    token: "",
    tokenSetter: {},
}
export const AuthContext = createContext(defaultSettings)

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState("test");
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] =useState(false);

    const tokenSetter = async (token) => {
        setIsLoading(true)
        const res = await setToken(token)
        if (res) {
            setSession(true)
            setIsLoading(false)
        }
    }
    return <AuthContext.Provider value={{token, tokenSetter, isLoading, session}}>{props.children}</AuthContext.Provider>
}