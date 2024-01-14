import React, { useState } from "react";
import AdminPanel from "../../features/adminPanel-AdminDashboard/AdminPanel";

const AdminPanelPage = () => {
  const [selectedOptionByAdmin, setSelectedOptionByAdmin] = useState("");
  return (
    <div>
      <AdminPanel selectedOptionByAdmin={selectedOptionByAdmin} setSelectedOptionByAdmin={setSelectedOptionByAdmin} />
    </div>
  );
};

export default AdminPanelPage;
