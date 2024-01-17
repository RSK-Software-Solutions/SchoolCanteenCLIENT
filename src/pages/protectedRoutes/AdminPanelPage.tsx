import AdminPanel from "@/features/adminPanel-AdminDashboard/AdminPanel";
import React, { useState } from "react";

const AdminPanelPage = () => {
  const [selectedOptionByAdmin, setSelectedOptionByAdmin] = useState("");
  return (
    <div>
      <AdminPanel selectedOptionByAdmin={selectedOptionByAdmin} setSelectedOptionByAdmin={setSelectedOptionByAdmin} />
    </div>
  );
};

export default AdminPanelPage;
