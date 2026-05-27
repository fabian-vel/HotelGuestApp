import axios from 'axios';

const apiClient = axios.create({
    // Usa tu IP local si pruebas en un dispositivo físico
    baseURL: 'http://192.168.1.XX:8080/api',
    timeout: 10000,
});

export default apiClient;

