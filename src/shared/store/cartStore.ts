import {create} from 'zustand';
import {MenuItem} from '@/types/MenuItem';

export interface CartItem {
    meitId: number;
    meitNombre: string;
    meitPrecio: number;
    meitImagenUrl?: string;
    mecaParentId: number;  // ← para agrupar en el resumen
    cantidad: number;
}

interface CartState {
    items: Record<number, CartItem>;
    add: (item: MenuItem, cantidad: number) => void;
    remove: (meitId: number) => void;
    clear: () => void;
    total: () => number;
    totalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: {},

    add: (item, cantidad) => {
        if (cantidad === 0) {
            // si cantidad es 0 elimina del carrito
            set(state => {
                const updated = {...state.items};
                delete updated[item.meitId];
                return {items: updated};
            });
            return;
        }
        set(state => ({
            items: {
                ...state.items,
                [item.meitId]: {
                    meitId: item.meitId,
                    meitNombre: item.meitNombre,
                    meitPrecio: item.meitPrecio,
                    meitImagenUrl: item.meitImagenUrl,
                    mecaParentId: item.mecaParentId,
                    cantidad,
                },
            },
        }));
    },

    remove: (meitId) => {
        set(state => {
            const updated = {...state.items};
            delete updated[meitId];
            return {items: updated};
        });
    },

    clear: () => set({items: {}}),

    total: () => Object.values(get().items)
        .reduce((acc, item) => acc + item.meitPrecio * item.cantidad, 0),

    totalItems: () => Object.values(get().items)
        .reduce((acc, item) => acc + item.cantidad, 0),
}));
