// HandlingChangeInput.tsx

import { TLoginCredentials, TRegisterCredentials, TUserPersonalData } from "@/data/dataTypes/user-creds-types-d";
import { SetStateAction, Dispatch } from "react";
export type TAuthCredentials = TLoginCredentials | TRegisterCredentials | TUserPersonalData;

export type TFormField = {
  label: string;
  key: string;
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
