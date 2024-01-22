// HandlingChangeInput.tsx

import { TLoginCredentials, TRegisterCredentials, TUserPersonalData } from "@/data/dataTypes/user-creds-types-d";
import { TcompanyForm } from "@/features/adminPanel-CompanyManagment/CompanyManagment";
import { SetStateAction, Dispatch } from "react";
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
