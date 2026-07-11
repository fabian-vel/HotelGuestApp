import axiosInstance from "@/shared/api/axiosInstance";
import {SpecialItems} from "@/types/SpecialItem";

export const getSpecialItems = async (): Promise<SpecialItems> => {
    const response = await axiosInstance.get('items-especiales');
    return response.data.data;
}
