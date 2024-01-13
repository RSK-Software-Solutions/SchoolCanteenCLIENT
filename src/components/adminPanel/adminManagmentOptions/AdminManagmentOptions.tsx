import React from "react";
import { SetStateAction } from "react";

type OptionsSelector = {
  text: string;
  key: string;
};

export type SelectedOption = {
  selected: string;
  setSelected: React.Dispatch<SetStateAction<string>>;
};

const AdminManagmentOptions = ({ selected, setSelected }: SelectedOption) => {
  const options: OptionsSelector[] = [
    {
      text: "Zarządzanie Użytkownikami",
      key: "employees",
    },
    {
      text: "Zarządzanie Firmą",
      key: "company",
    },
    {
      text: "Zarządzanie Dochodami",
      key: "market",
    },
  ];
  return (
    <div className="border p-4 overflow-x-auto">
      {options.map((e) => (
        <button
          key={e.text}
          type="button"
          onClick={() => setSelected(e.key)}
          className={`inline-block p-2 mx-2 ${selected === e.key ? "bg-blue-500 text-white" : "bg-white text-black"}`}
        >
          {e.text}
        </button>
      ))}
    </div>
  );
};

export default AdminManagmentOptions;
