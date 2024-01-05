import axios from 'axios';

export const HandleLogin = async (e,{formData}) => {
    const URL = process.env.REACT_APP_URL
    e.preventDefault();
    try {
      await axios.post(URL + "/login-auth", formData);
    } catch (error) {
        console.error('Error:', error.message);
    }
};