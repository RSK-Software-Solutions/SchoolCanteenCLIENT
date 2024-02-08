import axios from "axios";

export const baseApiURL = process.env.REACT_APP_URL

export const api = axios.create({
    baseURL: baseApiURL,
});

api.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json';
        const authToken = localStorage.getItem('token');
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('Response Error Status Code:', error.response.status);
            console.error('Response Error Data:', error.response.data);
        } else if (error.request) {
            console.error('Request Error:', error.request);
        } else {
            console.error('Error Message:', error.message);
        }

        return Promise.reject(error);
    }
);