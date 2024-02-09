import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { saveCompanyEdited } from "@/features/adminPanel/companyManagment/api/saveEditedCompany"
import { companyInputData } from "./static/companyInputData"
import { handleChangeInput } from "@/lib/handleChangeInput"

export type TcompanyForm = {
    name: string;
    nip: number;
    street: string;
    email: string;
    address: string;
    phone: string;
    number: string;
    city: string;
    postalCode: string;
}

export const CompanyManagment = () => {
    const [isDisabled, setIsDisabled] = useState(true)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [companyForm, setCompanyForm] = useState<TcompanyForm>({
        name: "",
        nip: 0,
        street: "",
        number: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        email: "",
    })

    return (
        <div key="1" className="flex flex-col w-full">
            <main className="flex-1 p-4 md:p-6 w-full">
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full justify-center">
                    <div className="md:w-3/4">
                        <div className="grid gap-4">
                            <div className="grid md:grid-cols-3 gap-6">
                            </div>
                            <div className="grid gap-1">
                                <h2 className="text-2xl font-bold">Company Information</h2>
                                <p className="text-gray-500 dark:text-gray-400">Here you can edit company</p>
                            </div>
                            <div className="grid gap-4">
                                <div className="grid gap-1" >
                                    {companyInputData.map(companyData => (
                                        <React.Fragment key={companyData.key}>
                                            <Label htmlFor="name">{companyData.label}</Label>
                                            {isDisabled ? <Input disabled placeholder={companyData.key} onChange={(e) => handleChangeInput(setCompanyForm, e, companyData)} /> : <Input />}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full flex justify-center flex-col">
                                <Button variant="outline" onClick={() => {
                                    setIsDisabled(prev => !prev)
                                }} className="w-full">{isDisabled ? "Edit" : "Cancel"}</Button>
                                {isDisabled === false && <Button variant="outline" onClick={async () => {
                                    await saveCompanyEdited(companyForm, setIsDisabled)
                                }}>Save</Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}