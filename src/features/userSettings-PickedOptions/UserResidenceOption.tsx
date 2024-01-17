import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TUserResidenceData } from "@/data/dataTypes/user-creds-types-d";
import { TUserSettingsContent } from "@/data/userSettingsStaticData/UserEditSettingsStaticData";
import { handleChangeInput } from "@/lib/utils/HandlingChangeInput";
import { SaveSettings } from "@/lib/utils/SaveUserSettings";
import React, { SetStateAction, useEffect } from "react";


type UserResidenceOptionProps = {
  userResidenceData: TUserResidenceData;
  setUserResidenceData: React.Dispatch<SetStateAction<TUserResidenceData>>;
  userResidenceSettings: TUserSettingsContent[];
  optionPicked: string;
};

export const UserResidenceOption = ({
  userResidenceData,
  setUserResidenceData,
  userResidenceSettings,
  optionPicked,
}: UserResidenceOptionProps) => {

  useEffect(() => {
    console.log(userResidenceData);

  }, [userResidenceData])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ustawienia {optionPicked}</CardTitle>
        <CardDescription>Aktualizuj swoje ustawienia {optionPicked}</CardDescription>
      </CardHeader>
      {userResidenceSettings.map(ResidenceSettings => (
        <form className="flex flex-col gap-4">
          <CardContent>
            <Label>{ResidenceSettings.label}</Label>
            <Input placeholder={ResidenceSettings.label} onChange={(e) => handleChangeInput(setUserResidenceData, e, ResidenceSettings)} />
          </CardContent>
        </form>
      ))}
      <CardFooter className="border-t p-6">
        <Button onClick={() => SaveSettings(userResidenceData)}>Save</Button>
      </CardFooter>
    </Card>
  );
};
