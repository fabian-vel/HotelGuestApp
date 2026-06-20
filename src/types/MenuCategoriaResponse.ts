export interface MenuCategoriaResponse {
    mecaId: number;
    mecaNombre: string;
    mecaDescripcion: string;
    mecaImagenUrl: string | null;
    mecaParentId: number | null;
    subCategorias: MenuCategoriaResponse[];
}
