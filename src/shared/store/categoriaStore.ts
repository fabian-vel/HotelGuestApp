import { create } from 'zustand';
import { MenuCategoria } from '@/types/MenuCategoria';
import { getCategory } from '@/features/menu/service/MenuService';

interface CategoriaState {
    categorias: MenuCategoria[];
    loading: boolean;
    error: string | null;
    fetchCategorias: () => Promise<void>;
}

export const useCategoriaStore = create<CategoriaState>((set, get) => ({
    categorias: [],
    loading: false,
    error: null,

    fetchCategorias: async () => {
        if (get().categorias.length > 0) return;
        set({ loading: true });
        try {
            const data = await getCategory();
            set({ categorias: data });
        } catch (error: any) {
            set({ error: error?.message ?? 'Error inesperado' });
        } finally {
            set({ loading: false });
        }
    },
}));
