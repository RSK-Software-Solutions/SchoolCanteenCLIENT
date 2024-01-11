import { useState } from "react";
import { UserResidenceOption } from "./UserResidenceOption";
import { options, userSettingsContent } from "./Content/UserSettingsContent";
import { userResidenceContent } from "./Content/UserSettingsContent";
import { UserPersonalSettingsOption } from "./UserPersonalSettingsOption";

const UserSettings = () => {
  const [userSettingsData, setUserSettingsData] = useState({
    name: "",
    email: "",
    surname: "",
  });
  const [userResidenceData, setUserResidenceData] = useState({
    street: "",
    state: "",
    city: "",
    country: "",
  });
  const [optionPicked, setOptionPicked] = useState("Użytkownika");

  return (
    <div className="flex justify-center">
      <div className="w-[200px] mt-8 bg-white rounded-md shadow-md flex justify-center mx-10">
        <div className=" mb-4 flex flex-col w-full">
          <span className="flex justify-center text-xl font-semibold">Wybór</span>
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
      ) : optionPicked === "widok" ? (
        <div>ThemeSelector</div>
      ) : optionPicked === "zamieszkanie" ? (
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
