import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type TUserSettingsContent } from "@/features/userSettings/static/UserEditSettingsStaticData";
import { handleChangeInput } from "@/lib/handleChangeInput";
import { SaveSettings } from "@/features/userSettings/api/SaveUserSettings";
import React, { useState } from "react";
import { type TUserPersonalData } from "../UserSettings";
import getCookie from "@/lib/getCookieByName";

export type TUserPersonalCredentials = {
  userSettingsData: TUserSettingsContent[];
  optionPicked: string;
};

export const UserPersonalSettingsOption = ({
  userSettingsData,
  optionPicked,
}: TUserPersonalCredentials) => {
  const userId = getCookie("userID");
  const userRoles = getCookie("userRoles");
  const userRolesArr = userRoles ? userRoles.split(",") : [];

  const [userSettings, setUserSettings] = useState<TUserPersonalData>({
    id: userId,
    firstName: "",
    lastName: "",
    street: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    roles: userRolesArr,
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Ustawienia {optionPicked}</CardTitle>
          <CardDescription>Aktualizuj swoje ustawienia {optionPicked}</CardDescription>
        </CardHeader>
        {userSettingsData.map((settings) => (
          <form className="flex flex-col gap-4" key={settings.key}>
            <CardContent>
              <Label>{settings.label}</Label>
              <Input placeholder={settings.label} onChange={(e) => handleChangeInput(setUserSettings, e, settings)} />
            </CardContent>
          </form>
        ))}
        <CardFooter className="border-t p-6">
          <Button onClick={() => { SaveSettings(userSettings) }}>Zapisz</Button>
        </CardFooter>
      </Card>
    </>
  );
};
