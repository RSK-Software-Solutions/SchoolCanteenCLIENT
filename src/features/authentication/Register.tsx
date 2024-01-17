import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TRegisterCredentials } from "@/data/dataTypes/user-creds-types-d";
import { TFormField, handleChangeInput } from "@/lib/utils/HandlingChangeInput";
import HandleRegisterCompany from "@/lib/utils/RegisterAuthentication";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="shadow-md p-10 w-[450px] rounded-md bg-white">

      <div className="text-xl font-semibold text-center mb-6">Rejestracja</div>
      {formFields.map((field) => (
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
        <Button type="button" onClick={handleClick} variant={"outline"}>
          Zarejestruj
        </Button>
        <div className="text-center text-sm flex flex-col">
          Posiadasz już konto?
          <Link to='/login' className="underline">
            Zaloguj się
          </Link>
        </div>
      </div>
    </div >
  );
};

export default Register;
