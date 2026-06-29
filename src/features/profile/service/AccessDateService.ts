import {RoomAccessRequest} from "@/types/RoomAccessRequest";
import {RoomAccess} from "@/types/RoomAccess";
import axiosInstance from "@/shared/api/axiosInstance";


export const getAccessDate = async (body: RoomAccessRequest): Promise<RoomAccess> => {
    const response = await axiosInstance.post('/fechas-acceso', body);
    return response.data.data;
}
