import { TUserPersonalData, TUserResidenceData } from "@/data/dataTypes/user-creds-types-d"
import axios from "axios"


export const SaveSettings = async (formdata: TUserPersonalData | TUserResidenceData) => {
    try {
        const URL = process.env.REACT_APP_URL + "/" // TODO: add endpoint
        await axios.post(URL, formdata)
    } catch (error) {
        console.error(error)
    }
}