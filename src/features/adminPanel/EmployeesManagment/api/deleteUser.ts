import { Toast, ToasterToast } from "@/components/ui/use-toast";
import { api, baseApiURL } from "@/lib/axios.interceptors";

export const deleteUser = async (userId: string | null, fetchEmployees: () => void, toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
}) => {
    try {
        const { data } = await api.delete(baseApiURL + `/api/user?id=${userId}`);
        if (data) toast({ variant: "default", title: "SUCCESS", description: `Successfully deleted user with id:\n ${userId}` })
        if (!data) toast({ variant: "destructive", title: "FAILED", description: `Failed to delete user with id:\n ${userId}` })
        fetchEmployees();
    } catch (error) {
        toast({ variant: "destructive", title: "ERROR", description: `Error while updating user in updateUser: ${error}` })
        return new Error("Error in function: deleteUser");
    }
};