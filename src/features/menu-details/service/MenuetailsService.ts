import axiosInstance from '../../../shared/api/authInterceptor';
import {MenuItemResponse} from "@/types/MenuItemResponse";
import {MenuItemRequest} from "@/types/MenuItemRequest";

export const getMenuItem = async (body: MenuItemRequest): Promise<MenuItemResponse[]> => {
    const response = await axiosInstance.post('/menu', body);
    return response.data.data;
}
