import { adminManagmentOptionsPickerData } from "@/data/adminManagment/AminManagmentOptionsPickerData";
import React, { SetStateAction } from "react";

export type TAdminSelectedOptionProps = {
  selectedOptionByAdmin: string;
  setSelectedOptionByAdmin: React.Dispatch<SetStateAction<string>>;
};

const AdminManagmentOptions = ({ selectedOptionByAdmin, setSelectedOptionByAdmin }: TAdminSelectedOptionProps) => {
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOptionByAdmin(selectedValue);
  };

  return (
    <div className="p-4 overflow-x-auto mx-auto">

      <select className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-black text-sm" onChange={handleSelectChange} value={selectedOptionByAdmin}>
        {adminManagmentOptionsPickerData.map((e) => (
          <option key={e.key} value={e.key} className="p-4 text-center">
            {e.text}
          </option>

        ))}
      </select>
    </div>
  );
};

export default AdminManagmentOptions;
