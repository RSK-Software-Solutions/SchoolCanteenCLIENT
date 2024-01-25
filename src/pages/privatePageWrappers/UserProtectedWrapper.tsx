import useAuthContext from "@/context/AuthContext";
import Navbar from "@/layout/Navbar";
import Sidebar from "@/layout/Sidebar";
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";


const UserProtectedWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthContext()

  useEffect(() => {
    const handleAuthentication = () => {
      if (user.user?.roles.includes("Parent")) {
        navigate("/menu")
      }
      if (!user.token) {
        navigate("/login");
      }
    };
    handleAuthentication();
  }, [navigate, user.token, user.user?.roles]);

  return (
    <div>
      <Navbar setIsOpen={setIsOpen} />
      <div className="flex w-full">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default UserProtectedWrapper;
