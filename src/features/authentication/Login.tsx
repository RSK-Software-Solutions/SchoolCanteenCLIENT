import { useEffect, useState } from "react";
import { TFormField, handleChangeInput } from "../../lib/utils/HandlingChangeInput";
import HandleLogin from "../../lib/utils/LoginAuthentication";
import { useNavigate } from "react-router-dom";
import React from "react";
import { TLoginCredentials } from "../../data/dataTypes/user-creds-types-d";
import useAuthContext from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState<TLoginCredentials>({
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

  const formFields: TFormField[] = [
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Hasło",
      key: "password",
    },
  ];

  useEffect(() => {
    const formDataKeys = Object.keys(formData);
    console.log(formDataKeys);
  });

  return (
    <div className="border">
      {formFields.map((field) => (
        <div key={field.key}>
          <label>{field.label}</label>
          <input
            type={field.key}
            className="flex flex-col border"
            value={formData[field.key as keyof TLoginCredentials]}
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
