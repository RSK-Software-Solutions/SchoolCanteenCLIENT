import React from "react";

const AdminPanel = ({ selected }) => {
  return (
    <div>
      {selected === "warehouse" ? (
        <div>
          <div>hello</div>
        </div>
      ) : selected === "employees" ? (
        <div>
          <div>chaawa</div>
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
