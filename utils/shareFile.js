import * as Sharing from 'expo-sharing';

export const shareFile = async (fileUri) => {
    // Verifica si el dispositivo soporta la funcionalidad de compartir
    if (await Sharing.isAvailableAsync()) {
        try {
            await Sharing.shareAsync(fileUri); // Aquí usas la URI del archivo
        } catch (error) {
            console.log('Error al compartir el archivo', error /*O podes usar error.stack para ver los detalles del error*/);
        }
    } else {
        console.log('Compartir no está disponible en este dispositivo');
    }
};
