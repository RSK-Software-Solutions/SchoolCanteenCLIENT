export type Options = {
  option: string;
};

export type TUserSettingsContent = {
  label: string;
  key: string;
};

export const userSettingsStaticData: TUserSettingsContent[] = [
  {
    "label": "First Name",
    "key": "firstName"
  },
  {
    "label": "Last Name",
    "key": "lastName"
  },
  {
    "label": "Street",
    "key": "street"
  },
  {
    "label": "Postal Code",
    "key": "postalCode"
  },
  {
    "label": "City",
    "key": "city"
  },
  {
    "label": "State",
    "key": "state"
  },
  {
    "label": "Country",
    "key": "country"
  }
]

export const options: Options[] = [
  {
    option: "User",
  },
];
