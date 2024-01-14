import { SetStateAction } from "react";

// 
export type TAdminManagmentOptionsData = {
  text: string;
  key: string;
};

export type TAdminSelectedOptionProps = {
  selectedOptionByAdmin: string;
  setSelectedOptionByAdmin: React.Dispatch<SetStateAction<string>>;
};

export type Options = {
  option: string;
};