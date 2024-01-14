import { Options } from "../dataTypes/data-types-d";
import { TUserSettingsContent } from "../dataTypes/user-creds-types-d";

export const userSettingsStaticData: TUserSettingsContent[] = [
  {
    label: "Imię",
    key: "name",
  },
  {
    label: "Nazwisko",
    key: "surname",
  },
  {
    label: "Adres Email",
    key: "email",
  },
];

export const userResidenceStaticData: TUserSettingsContent[] = [
  {
    label: "Ulica",
    key: "street",
  },
  {
    label: "Województwo",
    key: "state",
  },
  {
    label: "Miasto",
    key: "city",
  },
  {
    label: "Kraj",
    key: "country",
  },
];

export const options: Options[] = [
  {
    option: "Użytkownika",
  },
  {
    option: "Zamieszkanie",
  },
];
