import React, { useState } from "react";
import { handleChangeInput } from "../../Logic/HandlingChangeInput";
import { HandleRegisterCompany } from "./HandleRegisterLogic";

const Register = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Login: "",
    Password: "",
  });

  const formFields = [
    { label: "Firma", key: "Name" },
    { label: "Login", key: "Login" },
    { label: "Hasło", key: "Password" },
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
        <button
          type="button"
          onClick={() => {
            HandleRegisterCompany(formData);
          }}
        >
          Zarejestruj
        </button>
      </div>
    </div>
  );
};

export default Register;
