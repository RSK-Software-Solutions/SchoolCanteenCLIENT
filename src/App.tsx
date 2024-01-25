import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProtectedWrapper from "./pages/privatePageWrappers/AdminProtectedWrapper";
import UserProtectedWrapper from "./pages/privatePageWrappers/UserProtectedWrapper";
import DashboardPage from "./pages/protectedRoutes/DashboardPage";
import NotificationsPage from "./pages/protectedRoutes/NotificationsPage";
import RaportsPage from "./pages/protectedRoutes/RaportsPage";
import UserSettingsPage from "./pages/protectedRoutes/UserSettingsPage";
import LoginPage from "./pages/publicRoutes/LoginPage";
import RegisterPage from "./pages/publicRoutes/RegisterPage";
import MenuPage from "./pages/protectedRoutes/MenuPage";
import InitialWareHousePage from "./pages/protectedRoutes/InitialWareHousePage";
import FinishProductsWareHousePage from "./pages/protectedRoutes/FinishProductsWareHousePage";
import EmployeesManagment from "./features/adminPanel/employeesManagment/EmployeesManagment";
import { CompanyManagment } from "./features/adminPanel/companyManagment/CompanyManagment";
import AddUserToCompanyPage from "./pages/protectedRoutes/AddUserToCompanyPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* employees Routes */}
        <Route path="/" element={<UserProtectedWrapper />}>
          {/* admin Routes~ must be inside of this wrapper since this UserProtectedWrapper is rendering navbar and sidebar */}
          <Route path="/admin" element={<AdminProtectedWrapper />}>
            <Route path="/admin/employees/adduser" element={<AddUserToCompanyPage />} />
            <Route path="/admin/employees" element={<EmployeesManagment />} />
            <Route path="/admin/company" element={<CompanyManagment />} />
          </Route>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/raports" element={<RaportsPage />} />
          <Route path="/settings" element={<UserSettingsPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/warehouse" element={<InitialWareHousePage />} />
          <Route path="/warehouse/finished" element={<FinishProductsWareHousePage />} />
        </Route>
        {/* public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
