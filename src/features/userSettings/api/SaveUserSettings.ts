import { Toast, ToasterToast } from "@/components/ui/use-toast";
import { TUserPersonalData } from "@/features/userSettings/UserSettings";
import { api, baseApiURL } from "@/lib/axios.interceptors";

export const SaveSettings = async (formData: TUserPersonalData, toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
}) => {
    try {
        const { data } = await api.put(baseApiURL + "/api/user", formData);
        if (data) toast({ title: "SUCCES", description: "Successfully updated account information" })
        if (!data) toast({ variant: "destructive", title: "FAILED", description: "failed to update account information" })
    } catch (error) {
        toast({ variant: "destructive", title: "ERROR", description: `Error while updating account information: ${error}` })
        return new Error("error while saving settings in SaveSettings function")
    }
};
