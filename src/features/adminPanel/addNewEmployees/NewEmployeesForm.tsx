import { Button } from '@/components/ui/button'
import { handleChangeInput } from '@/lib/handleChangeInput'
import { Label } from '@radix-ui/react-label'
import React, { SetStateAction } from 'react'
import { submitUser } from './api/submitUser'
import { AddUserFormData } from './static/newEmployeesFormData'
import { Input } from '@/components/ui/input'
import { TNewUserForm } from '../employeesManagment/EmployeesManagment'

type TNewEmloyeesForm = {
    setNewUserForm: React.Dispatch<SetStateAction<TNewUserForm>>;
    newUserForm: TNewUserForm;
    roles: string[];
    token: string | null;
    fetchEmployees: () => Promise<void>;
}

const NewEmployeesForm = ({ setNewUserForm, newUserForm, roles, token, fetchEmployees }: TNewEmloyeesForm) => {
    return (
        <div className="flex flex-col mx-5 mt-10">
            {AddUserFormData.map(userForm => (
                <div className='pt-2' key={userForm.key}>
                    <Label>{userForm.label}</Label>
                    <Input placeholder={userForm.value} onChange={(e) => handleChangeInput(setNewUserForm, e, userForm)} />
                </div>
            ))}
            <select
                className="mt-5"
                value={newUserForm.roleName}
                onChange={(e) =>
                    setNewUserForm({
                        ...newUserForm,
                        roleName: e.target.value,
                    })}
            >
                {roles.map((role: undefined | any) => (
                    <option key={role?.name} value={role?.name}>
                        {role?.name}
                    </option>
                ))}
            </select>

            <div className="flex flex-col gap-y-10 mx-auto">
                <Button variant={'outline'} onClick={(e) => submitUser(newUserForm, token, e, fetchEmployees)}>Dodaj</Button>
            </div>

        </div>
    )
}

export default NewEmployeesForm