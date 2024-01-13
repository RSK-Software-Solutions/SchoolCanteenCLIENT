import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../../components/adminPanel/AdminPanel";
import AdminManagmentOptions from "../../components/adminPanel/adminManagmentOptions/AdminManagmentOptions";
import React from "react";

const AdminRouter = () => {
  const [selected, setSelected] = useState<string>("");
  const navigate = useNavigate();
  const localStorageToken = localStorage.getItem("token");
  const localStorageRole = localStorage.getItem("role");
  //TODO SPRAWDZ CZY JEST ADMINEM

  useEffect(() => {
    const handleAuthentication = () => {
      if (!localStorageToken) {
        navigate("/login");
      }
    };
    handleAuthentication();
  }, [navigate, localStorageToken, localStorageRole]);

  return (
    <div className="flex flex-col w-full justify-center">
      <AdminManagmentOptions setSelected={setSelected} selected={selected} />
      <div className="flex w-full">
        <AdminPanel selected={selected} />
      </div>
    </div>
  );
};

export default AdminRouter;
