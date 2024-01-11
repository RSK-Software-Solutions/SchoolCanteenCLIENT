import React from "react";
import EmployeesManagment from "./Employees/EmployeesManagment";

const AdminPanel = ({ selected }) => {
  return (
    <div className="w-full">
      {selected === "warehouse" ? (
        <div>
          <div>hello</div>
        </div>
      ) : selected === "employees" ? (
        <div className="flex justify-center w-full">
          <EmployeesManagment />
        </div>
      ) : selected === "company" ? (
        <div>
          <div>company</div>
        </div>
      ) : selected === "market" ? (
        <div>
          <div>market</div>
        </div>
      ) : selected === "company" ? (
        <div>
          <div>nic</div>
        </div>
      ) : null}
    </div>
  );
};
export default AdminPanel;
