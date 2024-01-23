import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthContext from "@/context/AuthContext";
import { TFormField, handleChangeInput } from "@/lib/utils/HandlingChangeInput";
import HandleLogin from "@/features/authentication/LoginAuthentication";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export type TLoginCredentials = {
  email: string;
  password: string;
};

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

  return (
    <div className="shadow-md p-10 rounded-md bg-white">
      <div className="text-xl font-semibold text-center mb-6">Logowanie</div>
      {formFields.map((field) => (
        <div key={field.key} className="mt-5">
          <Label className="block text-gray-700 text-sm font-bold">{field.label}</Label>
          <Input
            type={field.key}
            className="focus-visible:outline-1 focus-visible:outline"
            value={formData[field.key as keyof TLoginCredentials]}
            onChange={(e) => handleChangeInput(setFormData, e, field)}
          />
        </div>
      ))}
      <div className="flex justify-center gap-x-5 mt-6">
        <Button variant={'outline'} type="button" onClick={() => HandleLogin(formData, AuthContext.userSetter)}>
          Zaloguj
        </Button>
        <div className="text-center text-sm flex flex-col">
          Nie masz konta?
          <Link to='/register' className="underline">
            Zarejestruj się
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
