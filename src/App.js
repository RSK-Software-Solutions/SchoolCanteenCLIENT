import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./Pages/PrivateRouter/PrivateRouter";
import DashboardPage from "./Pages/DashboardPage";
import AdminPanelPage from "./Pages/AdminPanelPage";
import NotificationsPage from "./Pages/NotificationsPage";
import RaportsPage from "./Pages/RaportsPage";
import UserSettingsPage from "./Pages/UserSettingsPage";
import Menu from "./Pages/Menu";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AdminRouter from "./Pages/AdminRouter/AdminRouter";

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
