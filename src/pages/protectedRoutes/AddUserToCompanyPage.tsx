
import { Button } from '@/components/ui/button'
import { CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { handleChangeInput } from '@/lib/utils/HandlingChangeInput'
import React, { useState } from 'react'

type TNewUserForm = {
    name: string;
    email: string;
    password: string;
    role: string[];
}

const AddUserToCompanyPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [newUserForm, setNewUserForm] = useState<TNewUserForm>({
        name: "",
        email: "",
        password: "",
        role: [],
    })
    // TODO: this AddUserFormData should be in Data folder
    const AddUserFormData = [
        {
            label: "Nazwa użytkownika",
            value: "nazwa użytkownika...",
            key: "name"
        },
        {
            label: "Email",
            value: "email...",
            key: "email"
        },
        {
            label: "Hasło",
            value: "hasło...",
            key: "password"
        },
    ]
    return (
        <>
            <div className='w-full flex justify-center'>
                <form className='flex flex-col shadow-md rounded-lg justify-center mt-10'>
                    <CardTitle className='w-full text-center self-center mt-5'>Dodaj Użytkownika</CardTitle>
                    <CardContent className='mx-10 mt-10'>
                        {AddUserFormData.map(userForm => (
                            <div className='pt-2'>
                                <Label>{userForm.label}</Label>
                                <Input placeholder={userForm.value} onChange={(e) => handleChangeInput(setNewUserForm, e, userForm)} />
                            </div>
                        ))}
                    </CardContent>
                    {/* TODO: add select option with roles `admin can select multiple roles` */}
                    <div className='flex justify-center mb-10'>
                        {/* TODO: add event handler to add user */}
                        <Button>Dodaj</Button>
                    </div>
                </form>
            </div >

        </>
    )
}

export default AddUserToCompanyPage