import { TUserResidenceData } from "@/data/dataTypes/user-creds-types-d";
import { TUserSettingsContent } from "@/data/userSettingsStaticData/UserEditSettingsStaticData";
import { handleChangeInput } from "@/lib/utils/HandlingChangeInput";
import React, { SetStateAction } from "react";


type UserResidenceOptionProps = {
  userResidenceData: TUserResidenceData;
  setUserResidenceData: React.Dispatch<SetStateAction<TUserResidenceData>>;
  userResidenceSettings: TUserSettingsContent[];
};

export const UserResidenceOption = ({
  userResidenceData,
  setUserResidenceData,
  userResidenceSettings,
}: UserResidenceOptionProps) => {
  return (
    <div className="mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Ustawienia Użytkownika</h2>
      <div className="flex flex-col">
        {userResidenceSettings.map((settings: TUserSettingsContent) => (
          <div key={settings.key} className="mb-4">
            <label className="block text-sm font-medium text-gray-600">{settings.label}</label>
            <div className="flex">
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                value={userResidenceData[settings.key as keyof TUserResidenceData]}
                onChange={(e) => handleChangeInput(setUserResidenceData, e, settings)}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="flex w-full justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Zapisz Ustawienia
      </button>
    </div>
  );
};
