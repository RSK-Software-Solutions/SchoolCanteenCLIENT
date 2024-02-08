import { api } from "@/lib/axios.interceptors";

export const deleteUser = async (userId: string | null, fetchEmployees: () => void) => {
    const URL = process.env.REACT_APP_URL + `/api/user?id=${userId}`;
    try {
        await api.delete(URL);
        fetchEmployees();
    } catch (error) {
        console.error("Error deleting user:", error);
        return new Error("Error in function: deleteUser");
    }
};