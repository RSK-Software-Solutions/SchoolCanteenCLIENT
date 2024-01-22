import React, { SetStateAction } from "react";
import EmployeesManagment from "./EmployeesManagment/EmployeesManagment";
import { CompanyManagment } from "./CompanyManagment/CompanyManagment";

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
        <EmployeesManagment />
      ) : selectedOptionByAdmin === "company" ? (
        <CompanyManagment />
      ) : null}
    </div>
  );
};
export default AdminPanel;
