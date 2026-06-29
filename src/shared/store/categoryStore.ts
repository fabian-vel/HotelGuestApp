import { create } from 'zustand';
import { MenuCategory } from '@/types/MenuCategory';
import { getCategory } from '@/features/menu/service/MenuService';

interface CategoriaState {
    categories: MenuCategory[];
    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoriaState>((set, get) => ({
    categories: [],
    loading: false,
    error: null,

    fetchCategories: async () => {
        if (get().categories.length > 0) return;
        set({ loading: true });
        try {
            const data = await getCategory();
            set({ categories: data });
        } catch (error: any) {
            set({ error: error?.message ?? 'Error inesperado' });
        } finally {
            set({ loading: false });
        }
    },
}));
