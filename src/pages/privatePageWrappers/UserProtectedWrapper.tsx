import Navbar from "@/layout/Navbar";
import Sidebar from "@/layout/Sidebar";
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";


const UserProtectedWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const localStorageToken = localStorage.getItem("token");

  useEffect(() => {
    const handleAuthentication = () => {
      if (localStorageToken) {
        navigate("/login");
      }
    };
    handleAuthentication();
  }, [navigate, localStorageToken]);

  return (
    <div>
      <Navbar setIsOpen={setIsOpen} />
      <div className="flex w-full">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserProtectedWrapper;
