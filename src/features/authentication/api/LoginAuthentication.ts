import axios from "axios";
import { TLoginCredentials } from "../Login";
import { TAuthContext } from "@/context/AuthContext";
import { NavigateFunction } from "react-router-dom";
import { Toast, ToasterToast } from "@/components/ui/use-toast";
import { baseApiURL } from "@/lib/axios.interceptors";

const HandleLogin = async (formData: TLoginCredentials, user: TAuthContext, navigate: NavigateFunction, toast: ({ ...props }: Toast) => {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
}) => {

  try {
    if (!formData || !formData.email || !formData.password) {
      toast({ variant: "destructive", title: "FAILED", description: "All fields are required..." })
      return;
    }

    const { data } = await axios.post(baseApiURL + "/Auth/Login", formData);

    if (!data || !data.token) {
      toast({ variant: "destructive", title: "FAILED TO LOGIN", description: "Wrong Credentials..." })
      return;
    }

    user.tokenSetter(data.token);
    toast({ variant: "default", title: "SUCCESS", description: "Successfully logged in..." })
    navigate("/dashboard")
  } catch (error) {
    toast({ variant: "destructive", title: "ERROR", description: "Error while logging in at: HandleLogin" })
    return error;
  }
};

export default HandleLogin;
