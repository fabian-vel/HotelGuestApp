import axiosInstance from '../../../shared/api/authInterceptor';

export interface MenuCategoriaResponse {
    mecaId: number;
    mecaNombre: string;
    mecaDescripcion: string;
    mecaImagenUrl: string | null;
    mecaParentId: number | null;
    subCategorias: MenuCategoriaResponse[];
}

export const getCategorias = async (): Promise<MenuCategoriaResponse[]> => {
    const response = await axiosInstance.get('/categorias');
    return response.data.data;
};
