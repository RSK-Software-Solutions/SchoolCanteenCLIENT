import { TypeOfAction } from "../initial-warehouse/InitialWareHouseProducts";
import { api } from "@/lib/axios.interceptors";

export const changeQuantityOfFinishedProduct = async (finishedProductId: number, typeOfAction: TypeOfAction, amount: number, getAllFinishedProducts: () => Promise<unknown>) => {
    const URL = process.env.REACT_APP_URL + `/api/article/${finishedProductId}/${typeOfAction}?quantity=${amount}`
    try {
        await api.post(URL)
        getAllFinishedProducts();
    } catch (error) {
        return new Error("error while changing quantity of product in function: changeQuantityOfProduct");
    }
}