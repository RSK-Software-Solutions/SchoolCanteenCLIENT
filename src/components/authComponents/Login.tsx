import { useEffect, useState } from "react";
import { FormField, handleChangeInput } from "../../formhandleChangeLogic/HandlingChangeInput";
import HandleLogin from "./HandleLoginLogic";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import React from "react";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthSetter = (token: string, email: string, userName: string) => void;

const Login = () => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const AuthContext = useAuthContext();
  useEffect(() => {
    if (AuthContext.token) {
      navigate("/");
    }
  }, [AuthContext.token, navigate]);

  const formFields: FormField[] = [
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Hasło",
      key: "password",
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
            value={formData[field.key as keyof LoginCredentials]}
            onChange={(e) => handleChangeInput(setFormData, e, field)}
          />
        </div>
      ))}
      <div className="text-center">
        <button type="button" onClick={() => HandleLogin(formData, AuthContext.userSetter)}>
          Zaloguj
        </button>
      </div>
    </div>
  );
};

export default Login;
