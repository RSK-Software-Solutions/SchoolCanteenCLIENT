import { TcompanyForm } from "@/features/adminPanel/companyManagment/CompanyManagment";
import axios from "axios";
import { SetStateAction } from "react";

export const saveCompanyEdited = async (companyData: TcompanyForm, setIsDisabled: React.Dispatch<SetStateAction<boolean>>) => {
    const URL = process.env.REACT_APP_URL + "/"
    try {
        const res = await axios.put(URL, companyData)
        if (res) return setIsDisabled(prev => !prev)
    } catch (error) {
        console.error(error);
        throw error;
    }
}