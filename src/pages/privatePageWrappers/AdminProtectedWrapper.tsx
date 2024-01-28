import AdminManagmentOptions from "@/layout/adminPanelLayout/AdminManagmentOptions";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthContext from "@/context/AuthContext";


const AdminProtectedWrapper = () => {
  const navigate = useNavigate();
  const user = useAuthContext()

  useEffect(() => {
    const handleAuthentication = () => {
      if (!user.user.roles.includes("Admin")) {
        navigate("/dashboard")
      }
    };
    handleAuthentication();
  }, [navigate, user]);


  return (
    <div className="flex flex-col w-full h-screen">
      <AdminManagmentOptions />
      <div className="flex w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminProtectedWrapper;
