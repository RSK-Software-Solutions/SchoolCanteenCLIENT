import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handleChangeInput } from "@/lib/handleChangeInput"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { productFormData } from "../../static/AddProductFormData"
import { Button } from "@/components/ui/button"
import { api, baseApiURL } from "@/lib/axios.interceptors"

export type TAddProductForm = {
    unitId: number;
    name: string;
    price: number;
    quantity: number;
    validityPeriod: number;
    active: boolean;
    minQuantity: number;
}

type TUnit = {
    name: string;
    unitId: number;
}

const AddProductForm = ({ getAllProducts, setIsAddProductToggled }: { getAllProducts: () => Promise<unknown>, setIsAddProductToggled: Dispatch<SetStateAction<boolean>> }) => {
    const [addProductForm, setAddProductForm] = useState<TAddProductForm>({
        unitId: 0,
        name: "",
        price: 0,
        quantity: 0,
        minQuantity: 0,
        validityPeriod: 0,
        active: true
    })
    const [units, setUnits] = useState<TUnit[]>([])


    const getAllUnits = async () => {
        try {
            const { data } = await api.get(baseApiURL + '/api/units')
            setUnits(data)
        } catch (error) {
            console.error(error)
            return error;
        }
    }

    const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await api.post(baseApiURL + '/api/product', addProductForm)
            setIsAddProductToggled(false)
            getAllProducts()
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    useEffect(() => {
        getAllUnits();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addProductForm])

    return (
        <main className="w-full flex justify-center mt-5 flex-col">
            <Label className="flex w-full justify-center">Dodaj Produkt!</Label>
            <form onSubmit={(e) => handleAddProduct(e)} className="w-full flex justify-center">
                <div className="w-2/5 p-6 flex justify-center flex-col rounded-xl shadow-lg bg-gray-50 shadow-gray-500">
                    {productFormData.map((products) => (
                        <React.Fragment key={products.key}>
                            <Label className="mt-5">{products.label}</Label>
                            {products.key === "unitId" ? (
                                <select
                                    value={addProductForm.unitId}
                                    onChange={(e) => setAddProductForm({
                                        ...addProductForm,
                                        unitId: parseInt(e.target.value)
                                    })}
                                    className="mt-2 p-2 border rounded-md"
                                >
                                    <option value={"select"}>Wybierz...</option>
                                    {units.map((unit) => (
                                        <option key={unit.unitId} value={unit.unitId}>{unit.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <Input
                                    onChange={(e) => handleChangeInput(setAddProductForm, e, products)}
                                    className="mt-2 p-2 border rounded-md"
                                />
                            )}
                        </React.Fragment>
                    ))}
                    <div className="flex  gap-y-10 mx-auto mt-3 gap-4">
                        <Button variant={"outline"}>Zapisz</Button>
                        <Button variant={'outline'} onClick={() => setIsAddProductToggled(false)}>Anuluj</Button>
                    </div>

                </div>
            </form>
        </main>
    );


}

export default AddProductForm