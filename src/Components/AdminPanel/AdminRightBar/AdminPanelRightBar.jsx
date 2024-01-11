import React from "react";

const AdminRightBar = ({ setSelected }) => {
  const options = [
    {
      text: "Zarządzanie Magazynem",
      key: "warehouse",
    },
    {
      text: "Zarządzanie Użytkownikami",
      key: "employees",
    },
    {
      text: "Zarządzanie Firmą",
      key: "company",
    },
    {
      text: "Zarządzanie Dochodami",
      key: "market",
    },
  ];
  return (
    <div className="border w-[200px]">
      <div>
        {options.map((e) => (
          <button key={e.text} type="button" onClick={() => setSelected(e.key)} className="flex flex-col">
            <div className="my-3">{e.text}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminRightBar;
