// HandlingChangeInput.tsx

import { TcompanyForm } from "@/features/adminPanel/companyManagment/CompanyManagment";
import { TLoginCredentials } from "@/features/authentication/Login";
import { TRegisterCredentials } from "@/features/authentication/Register";
import { TUserPersonalData } from "@/features/userSettings/UserSettings";
import { SetStateAction, Dispatch } from "react";

// TODO: these types could be refactored for better read-ability
export type TAuthCredentials = TLoginCredentials | TRegisterCredentials | TUserPersonalData | TcompanyForm;

export type TFormField = {
  label: string;
  key: string;
  value?: string;
};

export const handleChangeInput = <T extends TAuthCredentials>(
  setter: Dispatch<SetStateAction<T>>,
  e: React.ChangeEvent<HTMLInputElement>,
  field: TFormField
) => {
  setter((prev: T) => ({
    ...prev,
    [field.key]: e.target.value,
  }));
};
