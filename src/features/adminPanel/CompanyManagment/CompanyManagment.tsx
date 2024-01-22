import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { CompanyManagmentOverview } from "@/features/adminPanel/CompanyManagment/CompanyManagmentOverview"
import { CompanyManagmentData } from "@/data/adminManagment/CompanyManagmentData"
import { TFormField, handleChangeInput } from "@/lib/utils/HandlingChangeInput"
import { saveCompanyEdited } from "@/lib/utils/saveEditedCompany"

export type TcompanyForm = {
    name: string;
    email: string;
    address: string;
    phone: string;
}

export const CompanyManagment = () => {
    const [isDisabled, setIsDisabled] = useState(true)
    const [companyForm, setCompanyForm] = useState<TcompanyForm>({
        name: "",
        email: "",
        address: "",
        phone: ""
    })



    return (
        <div key="1" className="flex flex-col h-screen w-full">
            <main className="flex-1 p-4 md:p-6 w-full">
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full justify-center">
                    <div className="md:w-3/4">
                        <div className="grid gap-4">
                            <div className="grid md:grid-cols-3 gap-6">
                                <CompanyManagmentOverview />
                            </div>
                            <div className="grid gap-1">
                                <h2 className="text-2xl font-bold">Informacje o firmie</h2>
                                <p className="text-gray-500 dark:text-gray-400">tutaj znajdują sie informacje które możesz edytowac.</p>
                            </div>
                            <div className="grid gap-4">
                                {CompanyManagmentData.map((companyInputs: TFormField) => (
                                    <div className="grid gap-1" key={companyInputs.key}>
                                        <Label htmlFor="name">{companyInputs.label}</Label>
                                        {isDisabled ? <Input disabled value={companyInputs.value} id={companyInputs.key} /> : <Input id={companyInputs.key} onChange={(e) => handleChangeInput(setCompanyForm, e, companyInputs)} />}
                                    </div>
                                ))}
                            </div>
                            <div className="w-full flex justify-center flex-col">
                                <div className="flex justify-center">
                                    {/* @UserKacper ~ if is disabled is toggled than this button shows up with with a click calls a func to save information to provided*/}
                                    {isDisabled === false && <Button variant="outline" className="w-1/2" onClick={async () => {
                                        await saveCompanyEdited(companyForm, setIsDisabled)
                                    }}>Save</Button>}

                                    <Button variant="outline" onClick={() => {
                                        setIsDisabled(prev => !prev)
                                    }} className="w-1/2">{isDisabled ? "Edytuj" : "Przestań edytować"}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}