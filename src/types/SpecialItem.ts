export interface SpecialItems {
    itemsMasPedidos: SpecialItem[],
    itemsMasRecientes: SpecialItem[]
}

export interface SpecialItem {
    meitId: number,
    meitNombre: string,
    meitImagenUrl: string,
    meitPrecio: number
}
