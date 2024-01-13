import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./pages/privateRouter/PrivateRouter";
import DashboardPage from "./pages/routes/DashboardPage";
import AdminPanelPage from "./pages/routes/AdminPanelPage";
import NotificationsPage from "./pages/routes/NotificationsPage";
import RaportsPage from "./pages/routes/RaportsPage";
import UserSettingsPage from "./pages/routes/UserSettingsPage";
import Menu from "./pages/routes/MenuPage";
import LoginPage from "./pages/routes/LoginPage";
import RegisterPage from "./pages/routes/RegisterPage";
import AdminRouter from "./pages/adminRouter/AdminRouter";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/admin" element={<AdminRouter />}>
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
