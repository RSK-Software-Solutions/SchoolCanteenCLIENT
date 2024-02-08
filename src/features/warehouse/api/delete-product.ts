import { Toast, ToasterToast } from "@/components/ui/use-toast";
import { api, baseApiURL } from "@/lib/axios.interceptors";

export const deleteProduct = async (productId: number, getAllProducts: () => Promise<unknown>, toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
}) => {
    try {
        const { data } = await api.delete(baseApiURL + `/api/product/?id=${productId}`)
        if (data) {
            toast({ variant: "default", title: "SUCCESS", description: `Successfully deleted product:${productId}` })
            getAllProducts();
        }
        if (!data) toast({ variant: "destructive", title: "FAILED", description: `failed to delete product :${productId}` })
    } catch (error) {
        toast({ variant: "destructive", title: "ERROR", description: `error while deleting product: ${error}` })
        return new Error("error while deleting product in function: deleteProduct");
    }
}