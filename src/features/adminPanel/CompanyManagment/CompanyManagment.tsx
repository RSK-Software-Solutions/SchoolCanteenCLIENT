import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { CompanyManagmentOverview } from "@/features/adminPanel/companyManagment/CompanyManagmentOverview"
import { saveCompanyEdited } from "@/features/adminPanel/companyManagment/api/saveEditedCompany"

export type TcompanyForm = {
    name: string;
    email: string;
    address: string;
    phone: string;
}

export const CompanyManagment = () => {
    const [isDisabled, setIsDisabled] = useState(true)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [companyForm, setCompanyForm] = useState<TcompanyForm>({
        name: "",
        email: "",
        address: "",
        phone: ""
    })

    return (
        <div key="1" className="flex flex-col w-full">
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
                                <div className="grid gap-1" >
                                    <Label htmlFor="name"></Label>
                                    {isDisabled ? <Input disabled /> : <Input />}
                                </div>
                            </div>
                            <div className="w-full flex justify-center flex-col">
                                {isDisabled === false && <Button variant="outline" onClick={async () => {
                                    await saveCompanyEdited(companyForm, setIsDisabled)
                                }}>Zapisz</Button>}

                                <Button variant="outline" onClick={() => {
                                    setIsDisabled(prev => !prev)
                                }} className="w-full">{isDisabled ? "Edytuj" : "Przestań edytować"}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}