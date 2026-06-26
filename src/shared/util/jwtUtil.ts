import AsyncStorage from '@react-native-async-storage/async-storage';

interface JwtPayload {
    sub: string;           // habitación
    clienteNombre: string;
    accesoId: number;
    exp: number;           // fecha expiración (= fecha fin acceso)
}

const decodeToken = (token: string): JwtPayload => {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
};

export const getTokenPayload = async (): Promise<JwtPayload | null> => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return null;
    return decodeToken(token);
};
