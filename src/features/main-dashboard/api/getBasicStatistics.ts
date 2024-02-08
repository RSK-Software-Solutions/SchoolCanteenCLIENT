import { api, baseApiURL } from "@/lib/axios.interceptors";

export const getBasicStats = async () => {
    try {
        const { data } = await api.get(baseApiURL + "/api/summary")
        return data;
    } catch (error) {
        return error;
    }
}