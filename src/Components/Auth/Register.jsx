import React, { useState } from "react";
import { handleChangeInput } from "../../formhandleChangeLogic/HandlingChangeInput";
import HandleRegisterCompany from "./HandleRegisterLogic";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    Password: "",
    Role: "user",
  });
  const [showPass, setShowPass] = useState(false);

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
        <div key={field.key} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
          <div className="flex">
            {field.key.toLowerCase() === "password" ? (
              <>
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={formData[field.key]}
                  onChange={(e) => handleChangeInput(setFormData, formData, e, field.key)}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}>
                  {showPass ? "Ukryj" : "Pokaż"}
                </button>
              </>
            ) : (
              <input
                type={field.key}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={formData[field.key]}
                onChange={(e) => handleChangeInput(setFormData, formData, e, field.key)}
              />
            )}
          </div>
        </div>
      ))}

      <div className="text-center">
        <button type="submit" onClick={() => HandleRegisterCompany(formData)}>
          Zarejestruj
        </button>
      </div>
    </div>
  );
};

export default Register;
