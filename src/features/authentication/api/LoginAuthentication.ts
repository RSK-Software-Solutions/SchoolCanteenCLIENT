import { TLoginCredentials } from '@/features/authentication/Login';
import axios from 'axios';


const HandleLogin = async (formData: TLoginCredentials, tokenSetter: (token: string) => void) => {
  const ApiUrl = process.env.REACT_APP_URL + "/Auth/Login";
  try {
    const { data } = await axios.post(ApiUrl, formData);

    if (!data) throw new Error("wrong Credentials")
    if (!formData) throw new Error("please fill out login form")

    return tokenSetter(data.token)
  } catch (error) {
    console.error('Error:', error);
  }
};

export default HandleLogin