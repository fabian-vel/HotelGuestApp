import {MenuItem} from "@/types/MenuItem";
import {MenuItemRequest} from "@/types/MenuItemRequest";
import axiosInstance from "@/shared/api/axiosInstance";

export const getMenuItem = async (body: MenuItemRequest): Promise<MenuItem[]> => {
    const response = await axiosInstance.post('/menu', body);
    return response.data.data;
}
