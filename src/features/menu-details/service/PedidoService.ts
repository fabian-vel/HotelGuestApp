import axiosInstance from "@/shared/api/axiosInstance";
import {OrderRequest} from "@/types/OrderRequest";

export const createOrder = async (body: OrderRequest): Promise<string> => {
    const response = await axiosInstance.post('/pedido', body)
    return response.data.data;
}
