import { create } from 'zustand';
import { MenuCategoria } from '@/types/MenuCategoria';
import { getCategorias } from '@/features/menu/service/MenuService';

interface CategoriaState {
    categorias: MenuCategoria[];
    loading: boolean;
    fetchCategorias: () => Promise<void>;
}

export const useCategoriaStore = create<CategoriaState>((set, get) => ({
    categorias: [],
    loading: false,

    fetchCategorias: async () => {
        if (get().categorias.length > 0) return; // ya cargadas, no vuelve a consultar
        set({ loading: true });
        try {
            const data = await getCategorias();
            set({ categorias: data });
        } catch (error) {
            console.error('Error al cargar categorías', error);
        } finally {
            set({ loading: false });
        }
    },
}));
