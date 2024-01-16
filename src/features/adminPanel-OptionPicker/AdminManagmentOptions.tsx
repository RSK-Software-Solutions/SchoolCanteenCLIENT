import { adminManagmentOptionsPickerData } from "@/data/adminManagmentOptionsData/AminManagmentOptionsPickerData";
import { TAdminSelectedOptionProps } from "@/data/dataTypes/data-types-d";
import React from "react";


const AdminManagmentOptions = ({ selectedOptionByAdmin, setSelectedOptionByAdmin }: TAdminSelectedOptionProps) => {
  return (
    <div className="border p-4 overflow-x-auto">
      {adminManagmentOptionsPickerData.map((e) => (
        <button
          key={e.text}
          type="button"
          onClick={() => setSelectedOptionByAdmin(e.key)}
          className={`inline-block p-2 mx-2 ${
            selectedOptionByAdmin === e.key ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
        >
          {e.text}
        </button>
      ))}
    </div>
  );
};

export default AdminManagmentOptions;
