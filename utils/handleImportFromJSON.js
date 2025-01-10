import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import { handleSaveInDB } from "../db/database";


export const handleImportFromJSON = async (db) => {
    try {
        // Abrir el selector de documentos para que el usuario seleccione un archivo JSON
        const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
        /*console.log('Picker result:', result);*/

        // Obtener la URI del archivo seleccionado
        const uri = result.assets[0].uri;
        if (!uri) {
            // Mostrar una alerta si no se puede obtener la URI del archivo
            Alert.alert('No se pudo obtener la URI del archivo');
            return;
        }

        // Obtener información del archivo seleccionado
        const fileInfo = await FileSystem.getInfoAsync(uri);
        /*console.log('File info:', fileInfo);*/
        if (!fileInfo.exists) {
            // Mostrar una alerta si el archivo no existe
            Alert.alert('El archivo seleccionado no existe');
            return;
        }

        // Leer el contenido del archivo como una cadena de texto
        const fileContent = await FileSystem.readAsStringAsync(uri);
        /*console.log('File content:', fileContent);*/

        try {
            // Intentar analizar el contenido del archivo como JSON
            const json = JSON.parse(fileContent);
            /*console.log('Los datos json son: ', json);*/

            // Guardar los datos importados en la base de datos
            await handleSaveInDB(db, json, null, null);

        } catch (jsonParseError) {
            // Mostrar una alerta si el archivo no contiene un JSON válido
            console.log('El archivo no contiene un JSON valido ', jsonParseError /*O podes usar jsonParseError.stack para ver los detalles del error*/)
            Alert.alert('El archivo no contiene un JSON válido, mas detalles en la consola');
        }

    } catch (error) {
        // Manejar errores generales relacionados con la importación del archivo
        console.error("Error al importar datos desde el archivo JSON:", error /*O podes usar error.stack para ver los detalles del error*/);
        alert("Ocurrió un error al importar los datos, mira la consola para mas detalles");
    }
};