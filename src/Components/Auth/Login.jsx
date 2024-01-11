import React, { useContext, useEffect, useState } from "react";
import { handleChangeInput } from "../../Logic/HandlingChangeInput";
import HandleLogin from "./HandleLoginLogic";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        <button type="button" onClick={() => HandleLogin(formData, setUserSession)}>
          Zaloguj
        </button>
      </div>
    </div>
  );
};

export default Login;
