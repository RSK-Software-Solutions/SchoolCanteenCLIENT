import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TUserSettingsContent } from "@/data/userSettingsStaticData/UserEditSettingsStaticData";
import { handleChangeInput } from "@/lib/utils/HandlingChangeInput";
import { SaveSettings } from "@/features/userSettings/SaveUserSettings";
import React, { SetStateAction } from "react";
import { TUserPersonalData } from "../UserSettings";

export type TUserPersonalCredentials = {
  userSettingsData: TUserPersonalData;
  setUserSettingsData: React.Dispatch<SetStateAction<TUserPersonalData>>;
  userSettings: TUserSettingsContent[];
  optionPicked: string;
};

export const UserPersonalSettingsOption = ({
  userSettingsData,
  setUserSettingsData,
  userSettings,
  optionPicked,
}: TUserPersonalCredentials) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Ustawienia {optionPicked}</CardTitle>
          <CardDescription>Aktualizuj swoje ustawienia {optionPicked}</CardDescription>
        </CardHeader>
        {userSettings.map((settings) => (
          <form className="flex flex-col gap-4" key={settings.key}>
            <CardContent>
              <Label>{settings.label}</Label>
              <Input placeholder={settings.label} onChange={(e) => handleChangeInput(setUserSettingsData, e, settings)} />
            </CardContent>
          </form>
        ))}
        <CardFooter className="border-t p-6">
          <Button onClick={() => { SaveSettings(userSettingsData) }}>Zapisz</Button>
        </CardFooter>
      </Card>
    </>
  );
};
