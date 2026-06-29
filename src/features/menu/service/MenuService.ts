import axiosInstance from '../../../shared/api/authInterceptor';
import {MenuCategory} from "@/types/MenuCategory";

export const getCategory = async (): Promise<MenuCategory[]> => {
    const response = await axiosInstance.get('/categorias');
    return response.data.data;
};
