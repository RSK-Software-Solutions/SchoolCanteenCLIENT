import React, { SetStateAction } from "react";
import EmployeesManagment from "../adminPanel-EmployeesManagment/EmployeesManagment";

const AdminPanel = ({
  selectedOptionByAdmin,
  setSelectedOptionByAdmin,
}: {
  selectedOptionByAdmin: string;
  setSelectedOptionByAdmin: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="w-full">
      {selectedOptionByAdmin === "employees" ? (
        <div className="flex justify-center w-full">
          <EmployeesManagment />
        </div>
      ) : selectedOptionByAdmin === "company" ? (
        <div>
          <div>Miejsce Na Komponent</div>
        </div>
      ) : selectedOptionByAdmin === "market" ? (
        <div>
          <div>Miejsce Na Komponent</div>
        </div>
      ) : selectedOptionByAdmin === "jakaś opcja" ? (
        <div>
          <div>Miejsce Na Komponent</div>
        </div>
      ) : null}
    </div>
  );
};
export default AdminPanel;
