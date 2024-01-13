import axios from "axios";
import { RegisterCredentials } from "./Register";

const HandleRegisterCompany = async (formData: RegisterCredentials) => {
  const ApiUrl = process.env.REACT_APP_URL + "/Auth/Register";
  try {
    await axios.post(ApiUrl, formData);
  } catch (error) {
    console.error(error)
  }
};

export default HandleRegisterCompany