import { TUserPersonalData } from "@/features/userSettings/UserSettings";
import { api } from "@/lib/axios.interceptors";

export const SaveSettings = async (formData: TUserPersonalData) => {
    try {
        const URL = process.env.REACT_APP_URL + "/api/user";
        await api.put(URL, formData);
    } catch (error) {
        return new Error("error while saving settings in SaveSettings function")
    }
};
