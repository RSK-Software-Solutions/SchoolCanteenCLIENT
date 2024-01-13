// HandlingChangeInput.tsx

import { SetStateAction, Dispatch } from "react";
import { LoginCredentials } from "../components/authComponents/Login";
import { RegisterCredentials } from "../components/authComponents/Register";
import { UserPersonalData, UserResidenceData } from "../components/userSettingsComponent/UserSettings";

export type AuthCredentials = LoginCredentials | RegisterCredentials | UserPersonalData | UserResidenceData;

export type FormField = {
  label: string;
  key: string;
};

export const handleChangeInput = <T extends AuthCredentials>(
  setter: Dispatch<SetStateAction<T>>,
  e: React.ChangeEvent<HTMLInputElement>,
  field: FormField
) => {
  setter((prev: T) => ({
    ...prev,
    [field.key]: e.target.value,
  }));
};
