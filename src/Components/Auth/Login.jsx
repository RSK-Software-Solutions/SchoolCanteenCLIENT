import React, { useContext, useEffect, useState } from "react";
import { handleChangeInput } from "../../formhandleChangeLogic/HandlingChangeInput";
import HandleLogin from "./HandleLoginLogic";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    Password: "",
  });

  const navigate = useNavigate();
  const setUserSession = useContext(AuthContext);

  useEffect(() => {
    if (setUserSession.token) {
      navigate("/");
    }
  }, [setUserSession, navigate]);

  const formFields = [
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Hasło",
      key: "Password",
    },
  ];

  return (
    <div className="border">
      {formFields.map((field) => (
        <div key={field.key}>
          <label>{field.label}</label>
          <input
            type={field.key}
            className="flex flex-col border"
            value={formData[field.key]}
            onChange={(e) => handleChangeInput(setFormData, formData, e, field.key)}
          />
        </div>
      ))}
      <div className="text-center">
        <button type="submit" onClick={() => HandleLogin(formData, setUserSession)}>
          Zaloguj
        </button>
      </div>
    </div>
  );
};

export default Login;
