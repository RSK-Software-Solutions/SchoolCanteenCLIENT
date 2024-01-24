import { options, userSettingsStaticData } from "@/data/userSettingsStaticData/UserEditSettingsStaticData";
import React, { useState } from "react";
import { UserPersonalSettingsOption } from "./UserEmployeeOptions/UserPersonalSettingsOption";
import useAuthContext from "@/context/AuthContext";

export type TUserPersonalData = {
  id: string;
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  street: string;
  postalCode?: string | null;
  city: string;
  state: string;
  country: string;
  roles: string[];
};

const UserSettings = () => {
  const [optionPicked, setOptionPicked] = useState<string>("Użytkownika");
  const user = useAuthContext();
  const [userSettingsData, setUserSettingsData] = useState<TUserPersonalData>({
    id: user.user.id,
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    street: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    roles: user.user.roles,
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
              <React.Fragment key={option.option}>
                <button
                  onClick={() => setOptionPicked(option.option)}
                  className={`${option.option === optionPicked ? 'text-black underline' : ''}`}
                >
                  {option.option}
                </button>
              </React.Fragment>
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

