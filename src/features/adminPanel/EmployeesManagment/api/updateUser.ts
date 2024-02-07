import { TEditedUserForm } from '@/features/adminPanel/employeesManagment/EmployeesManagment';
import axios from "axios";
import { SetStateAction } from 'react';

export const updateUser = async (token: string | null, fetchEmployees: () => void, editedUserData: TEditedUserForm, setEditedUserData: React.Dispatch<SetStateAction<TEditedUserForm>>, userId: string | null) => {
  const URL = process.env.REACT_APP_URL + `/api/user`;
  setEditedUserData({
    ...editedUserData,
    id: userId
  })

  try {
    await axios.put(URL, editedUserData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchEmployees();
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error in function: updateUser");
  }
}