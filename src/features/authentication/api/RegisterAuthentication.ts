import { type ToasterToast, type Toast } from "@/components/ui/use-toast";
import { TRegisterCredentials } from "@/features/authentication/Register";
import { baseApiURL } from "@/lib/axios.interceptors";
import axios from "axios";
import { NavigateFunction } from "react-router-dom"

const HandleRegisterCompany = async (formData: TRegisterCredentials, navigateHook: NavigateFunction, toast: ({ ...props }: Toast) => {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
}) => {
  try {
    const { data } = await axios.post(baseApiURL + "/Auth/Register", formData);
    if (data) toast({ variant: "default", title: "SUCCESS", description: `Successfully registered user with email: ${formData.email}` })
    if (!data) toast({ variant: "destructive", title: "FAILED", description: `Failed to register user` })
    if (data) navigateHook("/login")
  } catch (error) {
    toast({ variant: "destructive", title: "ERROR", description: `Error while registering user: ${error}` })
    return error;
  }
};

export default HandleRegisterCompany