import { options, userSettingsStaticData } from "@/data/userSettingsStaticData/UserEditSettingsStaticData";
import React, { useState } from "react";
import { UserPersonalSettingsOption } from "./UserEmployeeOptions/UserPersonalSettingsOption";

export type TUserPersonalData = {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  state: string;
  city: string;
  country: string;
};

const UserSettings = () => {
  const [optionPicked, setOptionPicked] = useState<string>("Użytkownika");

  const [userSettingsData, setUserSettingsData] = useState<TUserPersonalData>({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    state: "",
    city: "",
    country: "",
  });


  return (
    <div key="1" className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Ustawienia</h1>
        </div>
        <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start gap-6 max-w-6xl w-full mx-auto">
          <nav className="text-sm text-gray-500 grid gap-4 dark:text-gray-400">
            {options.map(option => (
              <button
                onClick={() => setOptionPicked(option.option)}
                className={`${option.option === optionPicked ? 'text-black underline' : ''}`}
              >
                {option.option}
              </button>
            ))}

          </nav>
          <div className="grid gap-6">
            {optionPicked === "Użytkownika" ? (
              <UserPersonalSettingsOption
                setUserSettingsData={setUserSettingsData}
                userSettingsData={userSettingsData}
                userSettings={userSettingsStaticData}
                optionPicked={optionPicked}
              />
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserSettings;

