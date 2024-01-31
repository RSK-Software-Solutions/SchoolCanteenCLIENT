import axios from "axios";
import { TLoginCredentials } from "../Login";
import { TAuthContext } from "@/context/AuthContext";
import { NavigateFunction } from "react-router-dom";

const HandleLogin = async (formData: TLoginCredentials, user: TAuthContext, navigate: NavigateFunction) => {
  const ApiUrl = process.env.REACT_APP_URL + "/Auth/Login";

  try {
    // Check if form data is provided
    if (!formData || !formData.email || !formData.password) {
      throw new Error("Please fill out the login form");
    }

    const { data } = await axios.post(ApiUrl, formData);

    // Check if the response contains a token
    if (!data || !data.token) {
      throw new Error("Wrong credentials");
    }
    // Set the token in the authentication context
    user.tokenSetter(data.token);

    navigate("/dashboard")
  } catch (error) {
    console.error('Login Error:', error);
  }
};

export default HandleLogin;
