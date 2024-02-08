import { Toast, ToasterToast } from '@/components/ui/use-toast';
import { TEditedUserForm } from '@/features/adminPanel/employeesManagment/EmployeesManagment';
import { api, baseApiURL } from '@/lib/axios.interceptors';
import { SetStateAction } from 'react';

export const updateUser = async (fetchEmployees: () => void, editedUserData: TEditedUserForm, setEditedUserData: React.Dispatch<SetStateAction<TEditedUserForm>>, userId: string | null, toast: ({ ...props }: Toast) => {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
}) => {
  setEditedUserData({
    ...editedUserData,
    id: userId
  })
  try {
    const { data } = await api.put(baseApiURL + `/api/user`, editedUserData);
    if (data) toast({ variant: "default", title: "SUCCESS", description: `Successfully updated user with id:\n ${userId}` })
    if (!data) toast({ variant: "destructive", title: "FAILED", description: `Failed to update user with id:\n ${userId}` })
    fetchEmployees();
  } catch (error) {
    toast({ variant: "destructive", title: "ERROR", description: `Error while updating user in updateUser: ${error}` })
    return new Error("Error in function: updateUser");
  }
}