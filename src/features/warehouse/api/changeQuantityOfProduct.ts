import axios from "axios";
import { TypeOfAction } from "../initial-warehouse/InitialWareHouseProducts";

export const changeQuantityOfProduct = async (productId: number, typeOfAction: TypeOfAction, amount: number, token: string | null, getAllProducts: () => Promise<unknown>) => {
    const URL = process.env.REACT_APP_URL + `/api/product/${productId}/${typeOfAction}`
    try {
        await axios.post(URL, amount, {
            headers: {
                Authorization: `bearer ${token}`
            }
        })
        getAllProducts();
    } catch (error) {
        console.error(error)
        return error;
    }
}