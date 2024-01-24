import { TUserPersonalData } from "@/features/userSettings/UserSettings";
import axios from "axios";

export const SaveSettings = async (formData: TUserPersonalData, token: string) => {
    try {
        console.log(token);

        const URL = process.env.REACT_APP_URL + "/api/users";
        await axios.put(URL, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error(error);
    }
};
