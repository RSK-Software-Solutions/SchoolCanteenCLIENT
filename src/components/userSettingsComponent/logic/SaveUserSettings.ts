import axios from "axios"
import { UserPersonalData, UserResidenceData } from "../UserSettings"

export const SaveSettings = async (formdata: UserPersonalData | UserResidenceData) => {
    try {
        const URL = process.env.REACT_APP_URL + "/" // TODO: add endpoint
        await axios.post(URL, formdata)
    } catch (error) {
        console.error(error)
    }
}