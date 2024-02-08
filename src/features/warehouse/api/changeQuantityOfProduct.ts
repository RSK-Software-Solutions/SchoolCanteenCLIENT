import { Toast, ToasterToast } from "@/components/ui/use-toast";
import { TypeOfAction, TQuantity } from "../initial-warehouse/InitialWareHouseProducts";
import { api, baseApiURL } from "@/lib/axios.interceptors";

export const changeQuantityOfProduct = async (productId: number, typeOfAction: TypeOfAction, amount: TQuantity, getAllProducts: () => Promise<unknown>, toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
}) => {
    try {
        const { data } = await api.post(baseApiURL + `/api/product/${productId}/${typeOfAction}`, amount)
        if (data) {
            toast({ variant: "default", title: "SUCCESS", description: `Successfully ${typeOfAction} of product:${productId} by ${amount.quantity}` })
            getAllProducts();
        }
        if (!data) toast({ variant: "destructive", title: "FAILED", description: `failed to update product :${productId}` })
    } catch (error) {
        toast({ variant: "destructive", title: "ERROR", description: `Error while changing quantity of product: ${error}` })
        return new Error("error while changing quantity of product in function: changeQuantityOfProduct");
    }
}