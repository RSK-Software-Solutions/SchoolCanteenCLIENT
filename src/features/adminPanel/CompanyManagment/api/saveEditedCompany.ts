import { TcompanyForm } from "@/features/adminPanel/companyManagment/CompanyManagment";
import { api } from "@/lib/axios.interceptors";
import { SetStateAction } from "react";

export const saveCompanyEdited = async (companyData: TcompanyForm, setIsDisabled: React.Dispatch<SetStateAction<boolean>>) => {
    const URL = process.env.REACT_APP_URL + "/"
    try {
        const { data } = await api.put(URL, companyData)
        if (data) return setIsDisabled(prev => !prev)
    } catch (error) {
        return new Error("error saveCompanyEdited Function");
    }
}