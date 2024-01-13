import { useState } from "react";
import { UserResidenceOption } from "./UserResidenceOption";
import { options, userSettingsContent } from "./content/UserSettingsContent";
import { userResidenceContent } from "./content/UserSettingsContent";
import { UserPersonalSettingsOption } from "./UserPersonalSettingsOption";
import React from "react";

export type UserPersonalData = {
  firstName: string;
  lastName: string;
  surname: string;
  email: string;
  phoneNumber: string;
};

export type UserResidenceData = {
  street: string;
  state: string;
  city: string;
  country: string;
};

const UserSettings = () => {
  const [userSettingsData, setUserSettingsData] = useState<UserPersonalData>({
    firstName: "",
    lastName: "",
    surname: "",
    email: "",
    phoneNumber: "",
  });

  const [userResidenceData, setUserResidenceData] = useState<UserResidenceData>({
    street: "",
    state: "",
    city: "",
    country: "",
  });

  const [optionPicked, setOptionPicked] = useState("Użytkownika");

  return (
    <div className="flex justify-center max-sm:flex-col max-sm:mx-10">
      <div className="w-[200px] mt-8 bg-white rounded-md shadow-md flex  justify-center max-sm:w-full">
        <div className=" mb-4 flex flex-col w-full">
          <span className="flex justify-center text-xl font-semibold mb-8">Ustawienia</span>
          {options.map((option) => (
            <button
              key={option.option}
              className="text-start w-fit ml-4 my-1"
              onClick={() => setOptionPicked(option.option)}
            >
              {option.option}
            </button>
          ))}
        </div>
      </div>
      {optionPicked === "Użytkownika" ? (
        <UserPersonalSettingsOption
          setUserSettingsData={setUserSettingsData}
          userSettingsData={userSettingsData}
          userSettings={userSettingsContent}
        />
      ) : optionPicked === "Zamieszkanie" ? (
        <UserResidenceOption
          setUserResidenceData={setUserResidenceData}
          userResidenceData={userResidenceData}
          userResidenceSettings={userResidenceContent}
        />
      ) : null}
    </div>
  );
};

export default UserSettings;
