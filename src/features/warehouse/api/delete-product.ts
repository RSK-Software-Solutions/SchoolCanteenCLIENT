import { api } from "@/lib/axios.interceptors";

export const deleteProduct = async (productId: number, getAllProducts: () => Promise<unknown>) => {
    const URL = process.env.REACT_APP_URL + `/api/product/?id=${productId}`
    console.log(URL);
    try {
        await api.delete(URL)
        getAllProducts();
    } catch (error) {
        return new Error("error while deleting product in function: deleteProduct");
    }
}