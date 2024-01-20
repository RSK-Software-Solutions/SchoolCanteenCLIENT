import { Options } from "../dataTypes/data-types-d";
export type TUserSettingsContent = {
  label: string;
  key: string;
};
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
  {
    label: "Numer Telefonu",
    key: "phoneNumber",
  },
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
];
