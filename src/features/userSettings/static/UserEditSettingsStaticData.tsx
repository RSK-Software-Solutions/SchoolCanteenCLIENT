export type Options = {
  option: string;
};

export type TUserSettingsContent = {
  label: string;
  key: string;
};

export const userSettingsStaticData: TUserSettingsContent[] = [
  {
    "label": "Imię",
    "key": "firstName"
  },
  {
    "label": "Nazwisko",
    "key": "lastName"
  },
  {
    "label": "Ulica",
    "key": "street"
  },
  {
    "label": "Kod pocztowy",
    "key": "postalCode"
  },
  {
    "label": "Miasto",
    "key": "city"
  },
  {
    "label": "Województwo",
    "key": "state"
  },
  {
    "label": "Kraj",
    "key": "country"
  }
]

export const options: Options[] = [
  {
    option: "Użytkownika",
  },
];
