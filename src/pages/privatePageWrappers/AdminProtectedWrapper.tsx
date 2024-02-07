import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import getCookie from "@/lib/getCookieByName";


const AdminProtectedWrapper = () => {
  const navigate = useNavigate();
  const roles = getCookie("userRoles");
  useEffect(() => {
    const handleAuthentication = () => {
      if (!roles?.includes("Admin")) {
        navigate("/dashboard")
      }
    };
    handleAuthentication();
  }, [navigate, roles]);


  return (
    <div className="flex flex-col w-full">
      <Outlet />
    </div>
  );
};

export default AdminProtectedWrapper;
