export type Options = {
  option: string;
};

export type TUserSettingsContent = {
  label: string;
  key: string;
};

export const userSettingsStaticData: TUserSettingsContent[] = [
  {
    label: "Imię",
    key: "firstName",
  },
  {
    label: "Nazwisko",
    key: "lastName",
  },
  {
    label: "Adres Email",
    key: "email",
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
