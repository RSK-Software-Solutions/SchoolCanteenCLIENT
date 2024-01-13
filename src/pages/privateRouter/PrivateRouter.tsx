import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import React from "react";

const PrivateRoutes = () => {
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

export default PrivateRoutes;
