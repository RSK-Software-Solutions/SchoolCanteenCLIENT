import Navbar from "@/layout/Navbar";
import Sidebar from "@/layout/Sidebar";
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";


const UserProtectedWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  useEffect(() => {
    const handleAuthentication = () => {
      if (!token) {
        navigate("/login");
      }
      if (window.location.pathname === "/") {
        navigate("/dashboard");
      }
    };

    handleAuthentication();
  }, [token, navigate]);

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
