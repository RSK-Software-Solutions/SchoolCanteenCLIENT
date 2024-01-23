// 
export type TAdminManagmentOptionsData = {
    text: string;
    key: string;
};


export const adminManagmentOptionsPickerData: TAdminManagmentOptionsData[] = [
    {
        text: "Zarządzanie Użytkownikami",
        key: "employees",
    },
    {
        text: "Zarządzanie Firmą",
        key: "company",
    },
];