import useAuthContext from "@/context/AuthContext";
import { TUserPersonalData } from "@/features/userSettings/UserSettings";
import axios from "axios";

export const SaveSettings = async (formData: TUserPersonalData) => {
    const user = useAuthContext()
    try {
        const URL = process.env.REACT_APP_URL + "/api/user";
        await axios.post(URL, formData, {
            headers: {
                Authorization: `Bearer ${user.user?.token}`
            }
        });
    } catch (error) {
        console.error(error);
    }
};
