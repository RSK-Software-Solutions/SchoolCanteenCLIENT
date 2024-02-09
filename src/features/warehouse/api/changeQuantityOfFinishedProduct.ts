import { Toast, ToasterToast } from "@/components/ui/use-toast";
import { TypeOfAction } from "../initial-warehouse/InitialWareHouseProducts";
import { api } from "@/lib/axios.interceptors";

export const changeQuantityOfFinishedProduct = async (finishedProductId: number, typeOfAction: TypeOfAction, amount: number, getAllFinishedProducts: () => Promise<unknown>, toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
}) => {
    const URL = process.env.REACT_APP_URL + `/api/article/${finishedProductId}/${typeOfAction}?quantity=${amount}`
    try {
        const { data } = await api.post(URL)
        if (data) {
            toast({ variant: "default", title: "SUCCESS", description: `Successfully served meal: ${finishedProductId}` })
            getAllFinishedProducts();
        }
        toast({ variant: "destructive", title: "FAILED", description: `Failed to served meal: ${finishedProductId}` })

    } catch (error) {
        toast({ variant: "destructive", title: "ERROR", description: `Error while serving meal: ${error}` })
        return new Error("error while changing quantity of product in function: changeQuantityOfProduct");
    }
}