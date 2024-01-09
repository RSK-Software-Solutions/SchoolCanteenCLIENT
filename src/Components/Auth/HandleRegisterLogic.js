import axios from "axios";

const isExistingCompany = async (formData) => {
  const ApiUrl = process.env.REACT_APP_URL;
  console.log(ApiUrl + "jlasndfjaskfjasdf");
  try {
    const { companies } = await axios.get(ApiUrl+"api/Company/GetAll");
    return companies.filter((Firm) => Firm.Name === formData.Name).length > 0;
  } catch (err) {
    console.error(err);
  }
};
export const HandleRegisterCompany = async (formData) => {
  const ApiUrl = process.env.REACT_APP_URL;
  console.log(ApiUrl + "HANDLEREGISTERCOMPANY");
  console.log(formData);
  try {
 
    if (await isExistingCompany(formData)) {
      return;
    }

    if (!formData.Name) return;
    if (!formData.Login) return;
    if (!formData.Password) return;

    await axios.post(ApiUrl+"Auth/Register");
  } catch (error) {
    return error;
  }
};