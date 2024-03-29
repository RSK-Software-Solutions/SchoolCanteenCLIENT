import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleChangeInput } from "@/lib/handleChangeInput";
import HandleLogin from "@/features/authentication/api/LoginAuthentication";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { loginFields } from "./static/authData";

export type TLoginCredentials = {
  email: string;
  password: string;
};

const Login = () => {
  const [formData, setFormData] = useState<TLoginCredentials>({
    email: "",
    password: "",
  });
  const user = useAuthContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="shadow-md p-10 rounded-md bg-white">
      <div className="text-xl font-semibold text-center mb-6  select-none">Login</div>
      {loginFields.map((field) => (
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
        <Button variant={'outline'} type="button" onClick={() => HandleLogin(formData, user, navigate, toast)}>
          Login
        </Button>
        <div className="text-center text-sm flex flex-col">
          dont have an account?
          <Link to='/register' className="underline">
            Register!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
