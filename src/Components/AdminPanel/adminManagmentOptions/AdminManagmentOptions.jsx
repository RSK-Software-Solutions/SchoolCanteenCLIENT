import React from "react";

const AdminManagmentOptions = ({ selected, setSelected }) => {
  const options = [
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
    <div className="border p-4 overflow-x-auto">
      {options.map((e, index) => (
        <button
          key={e.text}
          type="button"
          onClick={() => setSelected(e.key)}
          className={`inline-block p-2 mx-2 ${selected === e.key ? "bg-blue-500 text-white" : "bg-white text-black"}`}
        >
          {e.text}
        </button>
      ))}
    </div>
  );
};

export default AdminManagmentOptions;
