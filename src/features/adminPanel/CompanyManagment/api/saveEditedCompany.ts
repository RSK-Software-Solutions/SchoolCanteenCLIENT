import { TcompanyForm } from "@/features/adminPanel/companyManagment/CompanyManagment";
import { api, baseApiURL } from "@/lib/axios.interceptors";
import { SetStateAction } from "react";

export const saveCompanyEdited = async (companyData: TcompanyForm, setIsDisabled: React.Dispatch<SetStateAction<boolean>>) => {
    try {
        const { data } = await api.put(baseApiURL + "", companyData)
        if (data) return setIsDisabled(prev => !prev)
    } catch (error) {
        return new Error("error saveCompanyEdited Function");
    }
}