import React from 'react';
import {Route, Routes} from "react-router-dom";
import DashboardPage from "../DashboardPage";
import AdminPanelPage from "../AdminPanelPage";
import NotificationsPage from "../NotificationsPage";
import Menu from "../Menu";
import RapportsPage from "../RaportsPage";
import UserSettingsPage from "../UserSettingsPage";

const ProtectedRoutes = () => {
    return (
        <Routes>
            <Route path={"/dashboard"} element={<DashboardPage/>}/>
            <Route path={"/panel-admina"} element={<AdminPanelPage/>}/>
            <Route path={"/powiadomienia"} element={<NotificationsPage/>}/>
            <Route path={"/jadlospis"} element={<Menu/>}/>
            <Route path={"/raporty"} element={<RapportsPage/>}/>
            <Route path={"/ustawienia"} element={<UserSettingsPage/>}/>
        </Routes>
    );
};

export default ProtectedRoutes;