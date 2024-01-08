import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthContextProvider } from "./Context/AuthContext";
import App from "./App";

//todo: authProvider, auth-context ???? refactor code login register to useReducer

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>
);

