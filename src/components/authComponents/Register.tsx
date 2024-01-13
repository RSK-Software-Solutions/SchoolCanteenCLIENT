import React, { useState } from "react";
import { FormField, handleChangeInput } from "../../formhandleChangeLogic/HandlingChangeInput";
import HandleRegisterCompany from "./HandleRegisterLogic";

export type RegisterCredentials = {
  email: string;
  userName: string;
  password: string;
  role: string;
  comapanyName: string;
};

const Register = () => {
  const [formData, setFormData] = useState<RegisterCredentials>({
    email: "",
    userName: "",
    password: "",
    role: "User",
    comapanyName: "",
  });
  const [showPass, setShowPass] = useState<boolean>(false);

  const formFields: FormField[] = [
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Login",
      key: "userName",
    },
    {
      label: "Hasło",
      key: "password",
    },
    {
      label: "Firma",
      key: "comapanyName",
    },
  ];

  const handleClick = () => {
    HandleRegisterCompany(formData);
  };

  return (
    <div className="border">
      {formFields.map((field) => (
        <div key={field.key as string} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
          <div className="flex">
            {field.key === "password" ? (
              <>
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={formData[field.key]}
                  onChange={(e) => handleChangeInput(setFormData, e, field)}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}>
                  {showPass ? "Ukryj" : "Pokaż"}
                </button>
              </>
            ) : (
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={formData[field.key as keyof RegisterCredentials]}
                onChange={(e) => handleChangeInput(setFormData, e, field)}
              />
            )}
          </div>
        </div>
      ))}

      <div className="text-center">
        <button type="button" onClick={handleClick}>
          Zarejestruj
        </button>
      </div>
    </div>
  );
};

export default Register;
