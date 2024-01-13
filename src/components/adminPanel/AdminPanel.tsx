import React from "react";
import EmployeesManagment from "./employeesManagment/EmployeesManagment";

type AdminPanelProps = {
  selected?: string;
};

const AdminPanel = ({ selected }: AdminPanelProps) => {
  return (
    <div className="w-full">
      {selected === "employees" ? (
        <div className="flex justify-center w-full">
          <EmployeesManagment />
        </div>
      ) : selected === "company" ? (
        <div>
          <div>Miejsce Na Komponent</div>
        </div>
      ) : selected === "market" ? (
        <div>
          <div>Miejsce Na Komponent</div>
        </div>
      ) : selected === "jakaś opcja" ? (
        <div>
          <div>Miejsce Na Komponent</div>
        </div>
      ) : null}
    </div>
  );
};
export default AdminPanel;
