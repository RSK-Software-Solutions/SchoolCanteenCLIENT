import AdminPanel from "@/features/adminPanel/AdminPanel";
import AdminManagmentOptions from "@/features/adminPanel/AdminManagmentOptions";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "@/context/AuthContext";


const AdminProtectedWrapper = () => {
  const [selectedOptionByAdmin, setSelectedOptionByAdmin] = useState("employees");
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
