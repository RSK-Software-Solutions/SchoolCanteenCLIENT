import { adminManagmentOptionsPickerData } from "@/data/adminManagment/AminManagmentOptionsPickerData";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminManagmentOptions = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelected(selectedValue);
    navigate(selectedValue);
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div className="p-4 flex w-full text-center">
      <select
        className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-black text-sm"
        value={selected}
        onChange={(event) => handleSelectChange(event)}>
        {adminManagmentOptionsPickerData.map((option) => (
          <option key={option.key} defaultValue={"wybierz"} value={option.path} className="p-4 text-center">
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AdminManagmentOptions;
