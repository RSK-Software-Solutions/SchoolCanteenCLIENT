import { TUserPersonalData } from "@/features/userSettings/UserSettings";
import axios from "axios";

export const SaveSettings = async (formData: TUserPersonalData, token: string | null) => {
    try {
        console.log(formData);

        const URL = process.env.REACT_APP_URL + "/api/user";
        await axios.put(URL, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error(error);
    }
};
