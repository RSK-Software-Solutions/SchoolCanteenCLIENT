import axios from "axios"
import { TNewUserForm } from "../../addNewEmployees/NewEmployeesForm"

export const submitUser = async (newUserFormData: TNewUserForm, token: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const URL = process.env.REACT_APP_URL + "/api/users"
    e.preventDefault()
    if (!newUserFormData) throw new Error(`newUserFormData: ${newUserFormData}: is missing/null`)
    if (!token) throw new Error(`newUserFormData: ${token}: is missing/null`)

    try {
        await axios.post(URL, newUserFormData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.error(error)
        throw new Error("submitUser: error while trying to submit user in function submitUser")
    }
}