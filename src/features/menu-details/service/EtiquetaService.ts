import {Etiqueta} from "@/types/Etiqueta";
import {EtiquetaRequest} from "@/types/EtiquetaRequest";
import axiosInstance from "@/shared/api/axiosInstance";

export const getEtiquetas = async (body: EtiquetaRequest): Promise<Etiqueta[]> => {
    const response = await axiosInstance.post('/etiqueta', body);
    return response.data.data;
}
