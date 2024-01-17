import AdminPanel from "@/features/adminPanel-AdminDashboard/AdminPanel";
import AdminManagmentOptions from "@/features/adminPanel-OptionPicker/AdminManagmentOptions";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AdminProtectedWrapper = () => {
  const [selectedOptionByAdmin, setSelectedOptionByAdmin] = useState("employees");
  const navigate = useNavigate();
  const localStorageToken = localStorage.getItem("token");

  //TODO SPRAWDZ CZY JEST ADMINEM
  useEffect(() => {
    const handleAuthentication = () => {
      if (localStorageToken) {
        navigate("/login");
      }
    };
    handleAuthentication();
  }, [navigate, localStorageToken]);

  return (
    <div className="flex flex-col w-full justify-center">
      <AdminManagmentOptions
        setSelectedOptionByAdmin={setSelectedOptionByAdmin}
        selectedOptionByAdmin={selectedOptionByAdmin}
      />
      <div className="flex w-full">
        <AdminPanel setSelectedOptionByAdmin={setSelectedOptionByAdmin} selectedOptionByAdmin={selectedOptionByAdmin} />
      </div>
    </div>
  );
};

export default AdminProtectedWrapper;
