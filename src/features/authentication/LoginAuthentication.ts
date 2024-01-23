import { TLoginCredentials } from '@/features/authentication/Login';
import axios from 'axios';

type AuthSetter = (token: string) => void;

const HandleLogin = async (formData: TLoginCredentials, tokenSetter: AuthSetter) => {

  const ApiUrl = process.env.REACT_APP_URL + "/Auth/Login";
  try {
    const { data } = await axios.post(ApiUrl, formData);
    tokenSetter(data.token)
  } catch (error) {
    console.error('Error:', error);
  }
};

export default HandleLogin