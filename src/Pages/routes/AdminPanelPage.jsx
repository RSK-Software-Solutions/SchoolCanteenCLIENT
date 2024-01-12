import React from "react";
import AdminPanel from "../../components/adminPanel/AdminPanel";

const AdminPanelPage = ({ selected }) => {
  return (
    <div>
      <AdminPanel selected={selected} />
    </div>
  );
};

export default AdminPanelPage;
