import { Menu } from "lucide-react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProtectedWrapper from "./pages/privatePageWrappers/AdminProtectedWrapper";
import UserProtectedWrapper from "./pages/privatePageWrappers/UserProtectedWrapper";
import AdminPanelPage from "./pages/protectedRoutes/AdminPanelPage";
import DashboardPage from "./pages/protectedRoutes/DashboardPage";
import NotificationsPage from "./pages/protectedRoutes/NotificationsPage";
import RaportsPage from "./pages/protectedRoutes/RaportsPage";
import UserSettingsPage from "./pages/protectedRoutes/UserSettingsPage";
import LoginPage from "./pages/publicRoutes/LoginPage";
import RegisterPage from "./pages/publicRoutes/RegisterPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserProtectedWrapper />}>
          <Route path="/admin" element={<AdminProtectedWrapper />}>
            <Route path="/admin" element={<AdminPanelPage />} />
          </Route>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/raports" element={<RaportsPage />} />
          <Route path="/settings" element={<UserSettingsPage />} />
          <Route path="/menu" element={<Menu />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;