import axiosInstance from '../../../shared/api/authInterceptor';
import {MenuCategoriaResponse} from "@/types/MenuCategoriaResponse";

export const getCategorias = async (): Promise<MenuCategoriaResponse[]> => {
    const response = await axiosInstance.get('/categorias');
    return response.data.data;
};
