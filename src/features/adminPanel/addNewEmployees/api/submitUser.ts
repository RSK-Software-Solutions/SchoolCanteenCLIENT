import React from "react";
import { TNewUserForm } from "../../employeesManagment/EmployeesManagment";
import { api } from "@/lib/axios.interceptors";

export const submitUser = async (newUserFormData: TNewUserForm, e: React.MouseEvent<HTMLButtonElement, MouseEvent>, fetchEmployees: () => Promise<void>) => {
    const URL = process.env.REACT_APP_URL + "/api/user"

    e.preventDefault()
    try {
        await api.post(URL, newUserFormData)
        fetchEmployees()
    } catch (error) {
        console.error(error)
        return new Error("submitUser: error while trying to submit user in function submitUser")
    }
}  