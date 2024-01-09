import React, { useState } from "react";
import { handleChangeInput } from "../../Logic/HandlingChangeInput";
import HandleRegisterCompany from "./HandleRegisterLogic";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    Password: "",
    Role: "user",
  });

  const formFields = [
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Username",
      key: "userName",
    },
    {
      label: "Password",
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
            onChange={(e) => handleChangeInput(setFormData, formData, e, field.key)}
          />
        </div>
      ))}
      <div className="text-center">
        <button type="button" onClick={() => HandleRegisterCompany(formData)}>
          Zarejestruj
        </button>
      </div>
    </div>
  );
};

export default Register;
