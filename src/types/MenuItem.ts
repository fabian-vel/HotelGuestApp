import {Tag} from "@/types/Tag";

export interface MenuItem {
    meitId: number,
    meitNombre: string,
    meitDescripcion: string,
    meitPrecio: number,
    meitImagenUrl?: string,
    mecaId: number,
    mecaParentId: number,
    quantity?: number,
    etiquetas: Tag[],
}
