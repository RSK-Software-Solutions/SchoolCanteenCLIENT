import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handleChangeInput } from "@/lib/handleChangeInput"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { productFormData } from "../../static/AddProductFormData"
import axios from "axios"
import { Button } from "@/components/ui/button"

export type TAddProductForm = {
    unitId: number;
    name: string;
    price: number;
    quantity: number;
    validityPeriod: number;
    active: boolean;
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
        validityPeriod: 0,
        active: true
    })

    const [units, setUnits] = useState<TUnit[]>([])

    const token = localStorage.getItem('token')

    const getAllUnits = async () => {
        const URL = process.env.REACT_APP_URL + '/api/units'
        try {
            const { data } = await axios.get(URL, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            setUnits(data)

        } catch (error) {
            console.error(error)
            return error;
        }
    }

    const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        const URL = process.env.REACT_APP_URL + '/api/product'
        e.preventDefault()
        try {
            console.log(addProductForm, URL);
            await axios.post(URL, addProductForm, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
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
                <div className="w-fit flex justify-center flex-col">
                    {productFormData.map((products) => (
                        <React.Fragment key={products.key}>
                            <Label className="mt-5">{products.label}</Label>
                            {products.key === "unitId" ? <select
                                value={addProductForm.unitId}
                                onChange={(e) => setAddProductForm({
                                    ...addProductForm,
                                    unitId: parseInt(e.target.value)
                                })}
                            >
                                <option value={"select"}>Wybierz...</option>

                                {units.map((unit) => (
                                    <option key={unit.unitId} value={unit.unitId}>{unit.name}</option>
                                ))}
                            </select> :
                                <Input onChange={(e) => handleChangeInput(setAddProductForm, e, products)} />}
                        </React.Fragment>
                    ))}
                    <Button className="mt-3" type="submit" variant={"outline"}>Zapisz</Button>
                </div>
            </form>
        </main>
    )
}

export default AddProductForm