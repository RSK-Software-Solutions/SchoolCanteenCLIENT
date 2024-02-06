import axios from "axios";

export const deleteProduct = async (productId: number, token: string | null, getAllProducts: () => Promise<unknown>) => {
    const URL = process.env.REACT_APP_URL + `/api/product/?id=${productId}`
    console.log(URL);
    try {
        await axios.delete(URL, {
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