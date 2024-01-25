import { Button } from '@/components/ui/button'
import { CardContent, CardTitle } from '@/components/ui/card'
import { handleChangeInput } from '@/lib/handleChangeInput'
import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import { submitUser } from '../employeesManagment/api/submitUser'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import useAuthContext from '@/context/AuthContext'
import { AddUserFormData } from './static/newEmployeesFormData'

export type TNewUserForm = {
    userName: string;
    email: string;
    password: string;
    roleName: string;
}

const NewEmployeesForm = () => {
    const [newUserForm, setNewUserForm] = useState<TNewUserForm>({
        userName: "",
        email: "",
        password: "",
        roleName: "",
    })
    const [roles, setRoles] = useState<string[]>([])

    const { token } = useAuthContext()
    useEffect(() => {
        const URL = process.env.REACT_APP_URL + "/api/roles"
        const getAllroles = async () => {
            try {
                const { data } = await axios.get(URL, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                })
                setRoles(data)
                console.log(roles);
            } catch (error) {
                console.error(error);
                throw new Error("GetAllRoles ERROR:")
            }
        }
        getAllroles()
        // eslint-disable-next-line
    }, [])

    return (
        <div className='w-full flex justify-center  '>
            <form className='flex shadow-md flex-col rounded-lg justify-center mt-10'>
                <CardTitle className='w-full text-center self-center mt-5'>Dodaj Użytkownika</CardTitle>
                <CardContent className='mx-10 mt-10'>
                    {AddUserFormData.map(userForm => (
                        <div className='pt-2' key={userForm.key}>
                            <Label>{userForm.label}</Label>
                            <Input placeholder={userForm.value} onChange={(e) => handleChangeInput(setNewUserForm, e, userForm)} />
                        </div>
                    ))}

                    <Label className='text-center'>Roles</Label>
                    <select
                        className='w-full mt-2'
                        value={newUserForm.roleName}
                        onChange={(e) =>
                            setNewUserForm({
                                ...newUserForm,
                                roleName: e.target.value,
                            })}>
                        {roles.map((role: undefined | any) => (
                            <option key={role?.name} value={role?.name}>
                                {role?.name}
                            </option>
                        ))}
                    </select>
                </CardContent>
                <div className='flex justify-center mb-10 mt-4'>
                    <Button onClick={(e) => submitUser(newUserForm, token, e)}>Dodaj</Button>
                </div>
            </form>
        </div >
    )
}

export default NewEmployeesForm