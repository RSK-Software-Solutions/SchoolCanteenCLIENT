import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handleChangeInput } from "@/lib/handleChangeInput"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { recipeFormData } from "../../static/AddRecipeFormData"
import { Button } from "@/components/ui/button"
import { api, baseApiURL } from "@/lib/axios.interceptors"

export type TAddRecipeForm = {
    unitId: number;
    name: string;
    quantity: number;
    validityPeriod: number;
}

type TUnit = {
    name: string;
    unitId: number;
}

const AddRecipeForm = ({ getAllRecipes: getAllRecipes, setIsAddRecipeToggled }: { getAllRecipes: () => Promise<unknown>, setIsAddRecipeToggled: Dispatch<SetStateAction<boolean>> }) => {
    const [addRecipeForm, setAddRecipeForm] = useState<TAddRecipeForm>({
        unitId: 0,
        name: "",
        quantity: 0,
        validityPeriod: 0
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

    const handleAddRecipe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await api.post(baseApiURL + '/api/recipe', addRecipeForm)
            setIsAddRecipeToggled(false)
            getAllRecipes()
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    useEffect(() => {
        getAllUnits();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addRecipeForm])

    return (
        <main className="w-full flex justify-center mt-5 flex-col">
            <Label className="flex w-full justify-center">Create Recipe</Label>
            <form onSubmit={(e) => handleAddRecipe(e)} className="w-full flex justify-center">
                <div className="w-2/5 p-6 flex justify-center flex-col rounded-xl shadow-lg bg-gray-50 shadow-gray-500">
                    {recipeFormData.map((recipes) => (
                        <React.Fragment key={recipes.key}>
                            <Label className="mt-5">{recipes.label}</Label>
                            {recipes.key === "unitId" ? (
                                <select
                                    value={addRecipeForm.unitId}
                                    onChange={(e) => setAddRecipeForm({
                                        ...addRecipeForm,
                                        unitId: parseInt(e.target.value)
                                    })}
                                    className="mt-2 p-2 border rounded-md"
                                >
                                    <option value={"select"}>Select...</option>
                                    {units.map((unit) => (
                                        <option key={unit.unitId} value={unit.unitId}>{unit.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <Input
                                    onChange={(e) => handleChangeInput(setAddRecipeForm, e, recipes)}
                                    className="mt-2 p-2 border rounded-md"
                                />
                            )}
                        </React.Fragment>
                    ))}
                    <div className="flex  gap-y-10 mx-auto mt-3 gap-4">
                        <Button variant={"outline"}>Save Recipe</Button>
                        <Button variant={'outline'} onClick={() => setIsAddRecipeToggled(false)}>Cancel</Button>
                    </div>

                </div>
            </form>
        </main>
    );


}

export default AddRecipeForm