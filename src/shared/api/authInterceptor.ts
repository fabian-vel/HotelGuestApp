import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from "@/shared/api/axiosInstance";

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error.response?.status;
        const data = error.response?.data;

        if (status === 401) {
            await AsyncStorage.removeItem('token');
        }

        throw Object.assign(new Error(data?.message ?? 'Error de conexión'), {
            status,
            code: data?.code ?? 'NETWORK_ERROR',
            message: data?.message ?? 'Error de conexión',
            correlationId: data?.correlationId ?? null,
        });
    }
);

export default axiosInstance;
