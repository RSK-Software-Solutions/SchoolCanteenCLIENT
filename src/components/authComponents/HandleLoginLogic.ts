import axios from 'axios';
import { AuthSetter, LoginCredentials } from './Login';

const HandleLogin = async (formData: LoginCredentials, AuthContextSetter: AuthSetter) => {
  const ApiUrl = process.env.REACT_APP_URL + "/Auth/Login";
  try {
    const { data } = await axios.post(ApiUrl, formData);
    AuthContextSetter(data.token, data.email, data.userName)
  } catch (error) {
    console.error('Error:', error);
  }
};

export default HandleLogin