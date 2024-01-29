import { useCallback } from 'react';
import axios from 'axios';
import { FetchAction, StatusInidicator } from '@/reducer/reducerFetching';
import { type TUser } from '@/context/AuthContext';

const useFetchEmployees = (dispatch: (value: FetchAction) => void, token: string | null) => {
    const fetchEmployees = useCallback(async () => {
        const URL = process.env.REACT_APP_URL + "/api/users";
        try {
            dispatch({ type: StatusInidicator.LOADING, payload: null });
            const { data } = await axios.get(URL, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });
            dispatch({ type: StatusInidicator.GET, payload: data as TUser[] });
        } catch (error) {
            dispatch({ type: StatusInidicator.FAILED, payload: null });
            console.error("Error fetching employees:", error);
        }
    }, [token, dispatch]);

    return fetchEmployees;
};

export default useFetchEmployees;
