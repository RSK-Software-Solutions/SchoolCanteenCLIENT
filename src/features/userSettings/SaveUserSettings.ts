import { TUserPersonalData } from "@/features/userSettings/UserSettings";
import axios from "axios";

export const SaveSettings = async (formData: TUserPersonalData) => {
    try {
        const URL = process.env.REACT_APP_URL + "/api/user";
        await axios.post(URL, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    } catch (error) {
        console.error(error);
    }
};
