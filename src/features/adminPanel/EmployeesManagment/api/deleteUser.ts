import axios from "axios";

export const deleteUser = async (userId: string | null, token: string | null, fetchEmployees: () => void) => {
    const URL = process.env.REACT_APP_URL + `/api/user?id=${userId}`;
    try {
        await axios.delete(URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        fetchEmployees();
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Error in function: deleteUser");
    }
};