import {HabitacionAccesoRequest} from "@/types/HabitacionAccesoRequest";
import {HabitacionAcceso} from "@/types/HabitacionAcceso";
import axiosInstance from "@/shared/api/axiosInstance";


export const getFechaAcceso = async (body: HabitacionAccesoRequest): Promise<HabitacionAcceso> => {
    const response = await axiosInstance.post('/fechas-acceso', body);
    return response.data.data;
}
