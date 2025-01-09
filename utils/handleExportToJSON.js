import * as FileSystem from "expo-file-system";
import { shareFile } from "./shareFile";
import { checkIfTableExists } from "../db/database";
import { Alert } from "react-native";

// Funcion para exportar el archivo JSON y compartirlo
export const handleExportToJSON = async (db) => {
    if (db) {
        try {

            // Comprobamos si la tabla 'users' existe
            const checkTableExistence = await checkIfTableExists(db, 'users')

            // Si la tabla no existe, mostramos un mensaje adecuado
            if (!checkTableExistence) {  // Aquí verificamos directamente el valor booleano
                Alert.alert('Error', 'La tabla "Users" no existe. Por lo tanto no hay datos que Exportar');
                return null;
            }

            // Leer los datos de la base de datos
            const result = await db.getAllAsync("SELECT * FROM users");

            // Si la tabla está vacía, mostramos un mensaje adecuado
            if (!result || result.length === 0) {
                Alert.alert('Atención', 'La tabla "Users" está vacía. Por lo tanto no hay datos que Exportar');
                return null;
            }

            // Aca tranformamos el JSON importado a un objeto de Javascript
            const jsonData = JSON.stringify(result);

            // Ruta para guardar el archivo JSON
            const fileUri = `${FileSystem.documentDirectory}data.json`;

            // Escribir el archivo
            await FileSystem.writeAsStringAsync(fileUri, jsonData);

            await shareFile(fileUri);
            Alert.alert('Has compartido y/o guardado los datos correctamente!!!!!')
            /*alert(`Archivo JSON guardado en:\n${fileUri}`);*/
        } catch (error) {
            console.error("Error al exportar los datos:", error /*O podes usar error.stack para ver los detalles del error*/);
        }
    }
};