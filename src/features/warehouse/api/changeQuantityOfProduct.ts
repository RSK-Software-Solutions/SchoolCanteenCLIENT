import { TypeOfAction } from "../initial-warehouse/InitialWareHouseProducts";
import { api } from "@/lib/axios.interceptors";

export const changeQuantityOfProduct = async (productId: number, typeOfAction: TypeOfAction, amount: number, getAllProducts: () => Promise<unknown>) => {
    const URL = process.env.REACT_APP_URL + `/api/product/${productId}/${typeOfAction}`
    try {
        await api.post(URL, amount)
        getAllProducts();
    } catch (error) {
        return new Error("error while changing quantity of product in function: changeQuantityOfProduct");
    }
}