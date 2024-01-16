import { TUserPersonalData, TUserResidenceData } from "@/data/dataTypes/user-creds-types-d";
import { options, userSettingsStaticData, userResidenceStaticData } from "@/data/userSettingsStaticData/UserEditSettingsStaticData";
import React, { useState } from "react";
import { UserPersonalSettingsOption } from "../userSettings-PickedOptions/UserPersonalSettingsOption";
import { UserResidenceOption } from "../userSettings-PickedOptions/UserResidenceOption";


const UserSettings = () => {
  const [userSettingsData, setUserSettingsData] = useState<TUserPersonalData>({
    firstName: "",
    lastName: "",
    surname: "",
    email: "",
    phoneNumber: "",
  });

  const [userResidenceData, setUserResidenceData] = useState<TUserResidenceData>({
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
          userSettings={userSettingsStaticData}
        />
      ) : optionPicked === "Zamieszkanie" ? (
        <UserResidenceOption
          setUserResidenceData={setUserResidenceData}
          userResidenceData={userResidenceData}
          userResidenceSettings={userResidenceStaticData}
        />
      ) : null}
    </div>
  );
};

export default UserSettings;
