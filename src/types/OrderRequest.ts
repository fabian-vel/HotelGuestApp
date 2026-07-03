export interface OrderRequest {
    observacion?: string;
    items: OrderItem[];
}

export interface OrderItem {
    meitId: number;
    cantidad: number;
    observacion?: string;
}
