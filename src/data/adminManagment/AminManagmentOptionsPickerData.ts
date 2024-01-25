// 
export type TAdminManagmentOptionsData = {
    text: string;
    key: string;
    path: string;
};


export const adminManagmentOptionsPickerData: TAdminManagmentOptionsData[] = [
    {
        text: "Zarządzanie Użytkownikami",
        key: "employees",
        path: "/admin/employees"
    },
    {
        text: "Zarządzanie Firmą",
        key: "company",
        path: "/admin/company"
    },
];