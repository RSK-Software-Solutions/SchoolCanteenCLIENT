import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleChangeInput } from "@/lib/handleChangeInput";
import HandleRegisterCompany from "@/features/authentication/api/RegisterAuthentication";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { registerFields } from "./static/authData";

export type TRegisterCredentials = {
  email: string;
  userName: string;
  password: string;
  role: string;
  comapanyName: string;
};


const Register = () => {
  const [formData, setFormData] = useState<TRegisterCredentials>({
    email: "",
    userName: "",
    password: "",
    role: "User",
    comapanyName: "",
  });
  const [showPass, setShowPass] = useState<boolean>(false);

  const { toast } = useToast()
  const navigate = useNavigate()

  return (
    <div className="shadow-md p-10 w-[450px] rounded-md bg-white">
      <div className="text-xl font-semibold text-center mb-6">Register</div>
      {registerFields.map((field) => (
        <div key={field.key as string} className="mt-5">
          <Label className="block text-gray-700 text-sm font-bold">{field.label}</Label>
          <div className="flex gap-5 w-full">
            {field.key === "password" ? (
              <>
                <Input
                  type={showPass ? "text" : "password"}
                  className="focus-visible:outline-1 focus-visible:outline w-full"
                  value={formData[field.key]}
                  onChange={(e) => handleChangeInput(setFormData, e, field)}
                />
                <Button type="button" onClick={() => setShowPass(!showPass)} className="w-[100px]">
                  {showPass ? <EyeOff /> : <Eye />}
                </Button>
              </>
            ) : (
              <Input
                type="text"
                className="focus-visible:outline-1 focus-visible:outline"
                value={formData[field.key as keyof TRegisterCredentials]}
                onChange={(e) => handleChangeInput(setFormData, e, field)}
              />
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-evenly gap-x-5 mt-6">
        <Button type="button" onClick={() => HandleRegisterCompany(formData, navigate, toast)} variant={"outline"}>
          Register
        </Button>
        <div className="text-center text-sm flex flex-col">
          already have an account?
          <Link to='/login' className="underline">
            Login here!
          </Link>
        </div>
      </div>
    </div >
  );
};

export default Register;
