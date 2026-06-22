export interface MenuCategoria {
    mecaId: number;
    mecaNombre: string;
    mecaDescripcion: string;
    mecaImagenUrl: string | null;
    mecaParentId: number | null;
    subCategorias: MenuCategoria[];
}
