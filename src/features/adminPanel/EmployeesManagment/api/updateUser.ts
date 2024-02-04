import { TEditedUserForm } from '@/features/adminPanel/employeesManagment/EmployeesManagment';
import axios from "axios";

export const updateUser = async (token: string | null, fetchEmployees: () => void, editedUserData: TEditedUserForm) => {
  const URL = process.env.REACT_APP_URL + `/api/user`;
  try {
    await axios.put(URL, editedUserData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchEmployees();
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error in function: deleteUser");
  }
}