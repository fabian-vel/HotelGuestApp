import axiosInstance from '../../../shared/api/authInterceptor';
import {MenuCategoria} from "@/types/MenuCategoria";

export const getCategory = async (): Promise<MenuCategoria[]> => {
    const response = await axiosInstance.get('/categorias');
    return response.data.data;
};
