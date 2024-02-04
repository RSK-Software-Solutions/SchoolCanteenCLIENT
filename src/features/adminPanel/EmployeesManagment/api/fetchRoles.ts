import { useCallback } from 'react';
import axios from 'axios';

const useGetAllRoles = (token: string | null) => {
    const getAllroles = useCallback(async () => {
        const URL = process.env.REACT_APP_URL + "/api/roles";
        try {
            const { data } = await axios.get(URL, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });
            return data;
        } catch (error) {

            console.error("Error fetching employees:", error);
        }
    }, [token]);

    return getAllroles;
};


export default useGetAllRoles;