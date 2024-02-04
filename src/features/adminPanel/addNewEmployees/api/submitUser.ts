import axios from "axios"
import React from "react";
import { TNewUserForm } from "../../employeesManagment/EmployeesManagment";

export const submitUser = async (newUserFormData: TNewUserForm, token: string | null, e: React.MouseEvent<HTMLButtonElement, MouseEvent>, fetchEmployees: () => Promise<void>) => {
    const URL = process.env.REACT_APP_URL + "/api/user"

    e.preventDefault()
    try {
        if (!newUserFormData) return new Error(`newUserFormData: ${newUserFormData}: is missing/null`)
        if (!token) return new Error(`newUserFormData: ${token}: is missing/null`)
        await axios.post(URL, newUserFormData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        fetchEmployees()
    } catch (error) {
        console.error(error)
        throw new Error("submitUser: error while trying to submit user in function submitUser")
    }
}  