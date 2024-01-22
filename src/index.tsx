import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css"
import { AuthContextProvider } from "@/context/AuthContext";
import App from "./App";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <div className="font-medium">
          <App />
        </div>
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode >
);
