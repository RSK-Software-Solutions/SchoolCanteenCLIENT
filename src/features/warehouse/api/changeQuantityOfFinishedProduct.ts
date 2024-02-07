import axios from "axios";
import { TypeOfAction, TQuantity } from "../initial-warehouse/InitialWareHouseProducts";

export const changeQuantityOfFinishedProduct = async (token: string | null) => {
    const URL = process.env.REACT_APP_URL + `/api/product/`
    try {

    } catch (error) {
        console.error(error)
        return error;
    }
}