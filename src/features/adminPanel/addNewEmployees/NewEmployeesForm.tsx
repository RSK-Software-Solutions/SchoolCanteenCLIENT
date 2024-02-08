import { Button } from '@/components/ui/button'
import { handleChangeInput } from '@/lib/handleChangeInput'
import { Label } from '@radix-ui/react-label'
import React, { SetStateAction } from 'react'
import { submitUser } from './api/submitUser'
import { AddUserFormData } from './static/newEmployeesFormData'
import { Input } from '@/components/ui/input'
import { TNewUserForm } from '../employeesManagment/EmployeesManagment'
import { useToast } from '@/components/ui/use-toast'
type TNewEmloyeesForm = {
    setNewUserForm: React.Dispatch<SetStateAction<TNewUserForm>>;
    newUserForm: TNewUserForm;
    roles: string[];
    token: string | null;
    fetchEmployees: () => Promise<void>;
    setToggleAddUser: React.Dispatch<SetStateAction<boolean>>
}

const NewEmployeesForm = ({ setNewUserForm, newUserForm, roles, fetchEmployees, setToggleAddUser }: TNewEmloyeesForm) => {
    const { toast } = useToast()
    return (
        <div className="flex flex-col max-sm:mx-5 mx-48 my-10 border p-8 rounded-md bg-muted shadow-lg">
            {AddUserFormData.map(userForm => (
                <div className='pt-2' key={userForm.key}>
                    <Label>{userForm.label}</Label>
                    <Input placeholder={userForm.value} onChange={(e) => handleChangeInput(setNewUserForm, e, userForm)} />
                </div>
            ))}
            <Label className='mt-2'>Rola</Label>
            <select
                className="mt-2 border"
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

            <div className="flex  gap-y-10 mx-auto mt-3 gap-4">
                <Button variant={'outline'} onClick={(e) => {
                    submitUser(newUserForm, e, fetchEmployees, toast)
                }}>Save</Button>
                <Button variant={'outline'} onClick={() => setToggleAddUser(false)}>Cancel</Button>
            </div>
        </div>
    )
}

export default NewEmployeesForm