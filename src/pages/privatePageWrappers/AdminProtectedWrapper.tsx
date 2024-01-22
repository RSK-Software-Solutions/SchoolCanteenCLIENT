import AdminPanel from "@/features/adminPanel/AdminPanel";
import AdminManagmentOptions from "@/features/adminPanel/AdminManagmentOptions";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AdminProtectedWrapper = () => {
  const [selectedOptionByAdmin, setSelectedOptionByAdmin] = useState("employees");
  const navigate = useNavigate();
  const localStorageToken = localStorage.getItem("token");

  //TODO in this wrapper we need to check if user is logged in as a Admin - we must decode jwt to check this
  useEffect(() => {
    const handleAuthentication = () => {
      //! if localStorageToken is set with starting "!"- means it checks for token if you remove this you can use this application without logging in
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
