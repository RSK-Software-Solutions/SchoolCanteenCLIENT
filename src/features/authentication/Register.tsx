import React, { useState } from "react";
import { TFormField, handleChangeInput } from "../../lib/utils/HandlingChangeInput";
import HandleRegisterCompany from "../../lib/utils/RegisterAuthentication";
import { TRegisterCredentials } from "../../data/dataTypes/user-creds-types-d";

const Register = () => {
  const [formData, setFormData] = useState<TRegisterCredentials>({
    email: "",
    userName: "",
    password: "",
    role: "User",
    comapanyName: "",
  });
  const [showPass, setShowPass] = useState<boolean>(false);

  const formFields: TFormField[] = [
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
                value={formData[field.key as keyof TRegisterCredentials]}
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
