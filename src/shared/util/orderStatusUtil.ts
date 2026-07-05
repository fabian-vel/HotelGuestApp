// shared/util/orderStatusUtil.ts

interface StatusStyle {
    backgroundColor: string;
    color: string;
}

export const getOrderStatusStyle = (espeId: number): StatusStyle => {
    switch (espeId) {
        case 1: // Pendiente
            return {backgroundColor: '#1a3a5c', color: '#64b5f6'};
        case 2: // En preparación
            return {backgroundColor: '#4c3f08', color: '#efd444'};
        case 3: // Entregado
            return {backgroundColor: '#1a3d2b', color: '#4caf50'};
        case 4: // Cancelado
            return {backgroundColor: '#1a1a1a', color: '#ffffff'};
        default:
            return {backgroundColor: '#333333', color: '#ffffff'};
    }
};
