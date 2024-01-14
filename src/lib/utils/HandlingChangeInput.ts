// HandlingChangeInput.tsx

import { SetStateAction, Dispatch } from "react";
import { TLoginCredentials, TRegisterCredentials, TUserPersonalData, TUserResidenceData } from "../../data/dataTypes/user-creds-types-d";
export type TAuthCredentials = TLoginCredentials | TRegisterCredentials | TUserPersonalData | TUserResidenceData;

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
