export const getFormatFecha = (fechaStr: string): string => {
    const fecha = new Date(fechaStr);
    const hoy = new Date();
    const esHoy = fecha.toDateString() === hoy.toDateString();

    const hora = fecha.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit'
    });

    if (esHoy) return `Hoy, ${hora}`;

    return fecha.toLocaleDateString('es-CO', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
};
