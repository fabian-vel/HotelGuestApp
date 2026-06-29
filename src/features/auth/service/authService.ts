import axiosInstance from "@/shared/api/axiosInstance";

export interface LoginResponse {
    token: string;
    expiracion: string;
}

export const login = async (habitacion: string, codigo: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post('/auth/login', { habitacion, codigo });
    return response.data.data;
};
