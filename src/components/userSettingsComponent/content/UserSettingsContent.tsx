export type UserSettingsContent = {
  label: string;
  key: string;
};

export const userSettingsContent: UserSettingsContent[] = [
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

export const userResidenceContent: UserSettingsContent[] = [
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

export type Options = {
  option: string;
};
export const options: Options[] = [
  {
    option: "Użytkownika",
  },
  {
    option: "Zamieszkanie",
  },
];
