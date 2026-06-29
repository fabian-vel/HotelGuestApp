export interface MenuCategory {
    mecaId: number;
    mecaNombre: string;
    mecaDescripcion: string;
    mecaImagenUrl: string | null;
    mecaParentId: number | null;
    subCategorias: MenuCategory[];
}
