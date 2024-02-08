import React from "react";
import { TNewUserForm } from "../../employeesManagment/EmployeesManagment";
import { api } from "@/lib/axios.interceptors";
import { Toast, ToasterToast } from "@/components/ui/use-toast";

export const submitUser = async (newUserFormData: TNewUserForm, e: React.MouseEvent<HTMLButtonElement, MouseEvent>, fetchEmployees: () => Promise<void>, toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
}) => {
    const URL = process.env.REACT_APP_URL + "/api/user"
    e.preventDefault()
    try {
        const { data } = await api.post(URL, newUserFormData)
        if (data) toast({ variant: "default", title: `SUCCESS`, description: `successfuly created user` })
        if (!data) toast({ variant: "destructive", title: `FAILED`, description: `failed to create user` })

        fetchEmployees()
    } catch (error) {
        toast({ variant: "destructive", title: `ERROR`, description: `Error while submiting user in submitUser` })
        return new Error("submitUser: error while trying to submit user in function submitUser")
    }
}  