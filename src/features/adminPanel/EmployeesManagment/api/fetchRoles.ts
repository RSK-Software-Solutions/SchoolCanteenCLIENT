import { useCallback } from 'react';
import { api } from '@/lib/axios.interceptors';

const useGetAllRoles = () => {
    const getAllroles = useCallback(async () => {
        const URL = process.env.REACT_APP_URL + "/api/roles";
        try {
            const { data } = await api.get(URL);
            return data;
        } catch (error) {

            console.error("Error fetching employees:", error);
        }
    },[]);

    return getAllroles;
};


export default useGetAllRoles;