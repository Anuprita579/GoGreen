import axios from "axios"
import { useEffect, useState } from "react";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
})

const useFetchData = (url, options = {}) => {
    const { 
        method = 'GET',
        body = null,
        headers = {},
        dependencies = [],
    } = options;

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!url) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const config = {
                    method,
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers
                    },
                    ...(method !== 'GET' && { data: body })
                };

                const response = await api(config);
                setData(response.data);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err);
                setData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, method, body, ...dependencies]);

    return { data, isLoading, error };
};

export default useFetchData;
