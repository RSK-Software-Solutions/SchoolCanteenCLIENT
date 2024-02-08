import { TEditedUserForm } from '@/features/adminPanel/employeesManagment/EmployeesManagment';
import { api } from '@/lib/axios.interceptors';
import { SetStateAction } from 'react';

export const updateUser = async (fetchEmployees: () => void, editedUserData: TEditedUserForm, setEditedUserData: React.Dispatch<SetStateAction<TEditedUserForm>>, userId: string | null) => {
  const URL = process.env.REACT_APP_URL + `/api/user`;
  setEditedUserData({
    ...editedUserData,
    id: userId
  })
  try {
    await api.put(URL, editedUserData);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error in function: updateUser");
  }
}