import { TRegisterCredentials } from "@/features/authentication/Register";
import axios from "axios";
import { NavigateFunction } from "react-router-dom"

const HandleRegisterCompany = async (formData: TRegisterCredentials, navigateHook: NavigateFunction) => {
  const ApiUrl = process.env.REACT_APP_URL + "/Auth/Register";
  try {
    const res = await axios.post(ApiUrl, formData);
    if (res) navigateHook("/login")
  } catch (error) {
    console.error(error)
  }
};

export default HandleRegisterCompany