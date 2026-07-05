import axiosInstance from "@/shared/api/axiosInstance";
import {Order} from "@/types/Order";

export const getOrders = async (): Promise<Order[]> => {
    const response = await axiosInstance.get('/consulta-pedidos');
    return response.data.data;
}
