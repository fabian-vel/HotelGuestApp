import {MenuCategoria} from "@/types/MenuCategoria";

export const dataCategoria: MenuCategoria[] = [
    {
        mecaId: 1,
        mecaNombre: 'Platos',
        mecaDescripcion: 'Categoría principal que agrupa todos los platos del menú',
        mecaImagenUrl: null,
        mecaParentId: null,
        subCategorias: [
            {
                mecaId: 3,
                mecaNombre: 'Entradas',
                mecaDescripcion: 'Platos ligeros para abrir el apetito',
                mecaImagenUrl: null,
                mecaParentId: 1,
                subCategorias: []
            },
            {
                mecaId: 4,
                mecaNombre: 'Platos fuertes',
                mecaDescripcion: 'Platos principales y contundentes del menú',
                mecaImagenUrl: null,
                mecaParentId: 1,
                subCategorias: []
            },
            {
                mecaId: 5,
                mecaNombre: 'Postres',
                mecaDescripcion: 'Dulces y postres para cerrar la comida',
                mecaImagenUrl: null,
                mecaParentId: 1,
                subCategorias: []
            }
        ]
    },
    {
        mecaId: 2,
        mecaNombre: 'Bebidas',
        mecaDescripcion: 'Categoría principal que agrupa todas las bebidas del menú',
        mecaImagenUrl: null,
        mecaParentId: null,
        subCategorias: [
            {
                mecaId: 6,
                mecaNombre: 'Jugos',
                mecaDescripcion: 'Jugos naturales de frutas frescas',
                mecaImagenUrl: null,
                mecaParentId: 2,
                subCategorias: []
            },
            {
                mecaId: 7,
                mecaNombre: 'Cervezas',
                mecaDescripcion: 'Cervezas nacionales e importadas',
                mecaImagenUrl: null,
                mecaParentId: 2,
                subCategorias: []
            },
            {
                mecaId: 8,
                mecaNombre: 'Cócteles',
                mecaDescripcion: 'Cócteles y bebidas preparadas con licor',
                mecaImagenUrl: null,
                mecaParentId: 2,
                subCategorias: []
            },
            {
                mecaId: 9,
                mecaNombre: 'Gaseosas',
                mecaDescripcion: 'Bebidas gaseosas y refrescos embotellados',
                mecaImagenUrl: null,
                mecaParentId: 2,
                subCategorias: []
            }
        ]
    }
];
