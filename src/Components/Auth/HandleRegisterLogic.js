import axios from "axios";

// const isExistingCompany = async (formData) => {
//     const URL = process.env.REACT_APP_URL;
//     try {
//       const {companies} = await axios.get(URL + "/GetAll");
//       return  companies.filter((Firm) => Firm.Name === formData.Name).length > 0;
//     } catch (err) {
//       console.error(err);
//     }
//   };
 export const HandleRegisterCompany = async (formData) => {
    // const URL = process.env.REACT_APP_URL;

    try {
      // if (await isExistingCompany(formData)) {
      //   return;
      // }

      if (!formData.Name) return;
      if (!formData.Login) return;
      if (!formData.Password) return;

      await axios.post("/auth/register", formData);
    } catch (error) {
      return error;
    }
  };