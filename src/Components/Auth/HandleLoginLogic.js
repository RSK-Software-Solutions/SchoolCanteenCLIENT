import axios from 'axios';

export const HandleLogin = async (e,{formData}) => {
    e.preventDefault();
    try {
      await axios.post("/login-auth", formData);
    } catch (error) {
        console.error('Error:', error.message);
    }
};