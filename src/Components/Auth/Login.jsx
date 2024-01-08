import React, { useState } from "react";
import { handleChangeInput } from "../../Logic/HandlingChangeInput";
import { HandleLogin } from "./HandleLoginLogic";

const Login = () => {
  const [formData, setFormData] = useState({
    Login: "",
    Password: "",
  });

  const formFields = [
    {
      label: "Email",
      key: "Login",
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
            type="text"
            className="flex flex-col border"
            value={formData[field.key]}
            onChange={(e) => handleChangeInput(setFormData, formData, field.key, e)}
          />
        </div>
      ))}
      <div className="text-center">
        <button type="submit" onClick={() =>HandleLogin(formData)}>
          Zaloguj
        </button>
      </div>
    </div>
  );
};

export default Login;
