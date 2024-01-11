import React from "react";
import AdminPanel from "../Components/AdminPanel/AdminPanel";

const AdminPanelPage = ({ selected }) => {
  return (
    <div>
      <AdminPanel selected={selected} />
    </div>
  );
};

export default AdminPanelPage;
