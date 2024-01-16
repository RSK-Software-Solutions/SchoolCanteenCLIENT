import { TRegisterCredentials } from "@/data/dataTypes/user-creds-types-d";
import axios from "axios";

const HandleRegisterCompany = async (formData: TRegisterCredentials) => {
  const ApiUrl = process.env.REACT_APP_URL + "/Auth/Register";
  try {
    await axios.post(ApiUrl, formData);
  } catch (error) {
    console.error(error)
  }
};

export default HandleRegisterCompany