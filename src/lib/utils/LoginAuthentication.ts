import { TLoginCredentials } from '@/features/authentication/Login';
import axios from 'axios';

type AuthSetter = (token: string, email: string, userName: string) => void;

const HandleLogin = async (formData: TLoginCredentials, AuthContextSetter: AuthSetter) => {
  const ApiUrl = process.env.REACT_APP_URL + "/Auth/Login";
  try {
    const { data } = await axios.post(ApiUrl, formData);
    AuthContextSetter(data.token, data.email, data.userName)
  } catch (error) {
    console.error('Error:', error);
  }
};

export default HandleLogin