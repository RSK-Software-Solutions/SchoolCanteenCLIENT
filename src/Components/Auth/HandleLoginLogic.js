import axios from 'axios';


const HandleLogin = async (formData, setUserSession) => {
  const ApiUrl = process.env.REACT_APP_URL + "/Auth/Login";
  try {
    const { data } = await axios.post(ApiUrl, formData);
    setUserSession.UserSetter(data.token, data.email, data.userName)
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export default HandleLogin