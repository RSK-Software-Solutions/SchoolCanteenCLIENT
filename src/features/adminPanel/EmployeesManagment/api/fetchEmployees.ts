import { useCallback } from 'react';
import { FetchAction, StatusInidicator } from '@/reducer/reducerFetching';
import { type TUser } from '@/context/AuthContext';
import { api } from '@/lib/axios.interceptors';



const useFetchEmployees = (dispatch: (value: FetchAction) => void) => {
    const fetchEmployees = useCallback(async () => {
        const URL = process.env.REACT_APP_URL + "/api/users";
        try {
            dispatch({ type: StatusInidicator.LOADING, payload: null });
            const { data } = await api.get(URL);
            dispatch({ type: StatusInidicator.GET, payload: data as TUser[] });
        } catch (error) {
            dispatch({ type: StatusInidicator.FAILED, payload: null });
            console.error("Error fetching employees:", error);
        }
    }, [dispatch]);

    return fetchEmployees;
};

export default useFetchEmployees;
