import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css"
import { AuthContextProvider } from "@/context/AuthContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <div className="font-medium">
        <App />
      </div>
    </AuthContextProvider>
  </React.StrictMode>
);
