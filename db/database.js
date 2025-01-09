import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

export const checkIfTableExists = async (db, tableName) => {
    try {
        // Consulta para verificar si la tabla existe en sqlite_master
        const result = await db.getAllAsync(
            `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`
        );

        // Si el resultado tiene alguna fila, la tabla existe
        return result.length > 0;
    } catch (error) {
        console.error("Error al verificar la existencia de la tabla:", error.message);
        return false; // En caso de error, consideramos que la tabla no existe
    }
};

// Crea la tabla 'users' si no existe
export const createTable = async (db) => {
    try {
        await db.runAsync(
            "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)"
        );
        console.log("Tabla 'users' creada o ya existe.");
    } catch (error) {
        console.error("Error al crear la tabla:", error /*O podes usar error.stack para ver los detalles del error*/);
    }
};

export const handleReadFromDB = async (db) => {
    try {

        // Verificar si la tabla 'users' existe antes de exportar
        const checkTableExistence = await checkIfTableExists(db, 'users');
        if (!checkTableExistence) {
            Alert.alert('Error', 'La tabla "Users" no existe. No se pueden leer datos.');
            return null;
        }

        // Leer los datos de la base de datos
        const result = await db.getAllAsync("SELECT * FROM users");

        // Si la tabla está vacía, mostramos un mensaje adecuado
        if (!result || result.length === 0) {
            Alert.alert('Atención', 'La tabla "Users" está vacía. Por lo tanto no hay datos que leer');
            return null;
        }

        // Retornamos los datos si todo fue exitoso
        return result;

    } catch (error) {
        console.log('Error al leer los datos:', error.message);
        Alert.alert('Error', 'Hubo un problema al leer los datos de la base de datos.');
        return null;
    }
};


export const handleClearTable = async (db) => {
    if (db) {
        try {
            // Ejecuta el comando SQL para eliminar todos los registros de la tabla
            await db.runAsync("DELETE FROM users");
            Alert.alert('La tabla "users" ha sido vaciada correctamente.');
        } catch (error) {
            console.error("Error al vaciar la tabla:", error.stack);
            Alert.alert('Ocurrió un error al vaciar la tabla. Mira la consola para más detalles');
        }
    } else {
        alert('La base de datos no está abierta, o no existe.');
    }
};


// Funcion para insertar un nuevo usuario
export const insertUser = async (db, name, age) => {
    try {
        await db.runAsync(
            "INSERT INTO users (name, age) VALUES (?, ?)",
            name,
            age
        );
    } catch (error) {
        console.error("Error al insertar el usuario:", error /*O podes usar error.stack para ver los detalles del error*/);
    }
};

export const handleSaveInDB = async (db, inputName, inputAge) => {
    if (inputName.trim() === '') {  // Asegurarse de que no sea solo espacio en blanco
        Alert.alert('El campo nombre no puede estar vacío');
        return;
    }

    if (inputAge === '' || Number.isNaN(Number(inputAge)) || Number(inputAge) <= 0) {
        Alert.alert('El campo edad debe ser un número mayor que 0');
        return;
    }
    try {
        await insertUser(db, inputName, inputAge); // Guardar el usuario
        Alert.alert(`Usuario ${inputName}, ${inputAge} insertado correctamente.`);
    } catch (error) {
        Alert.alert('Error al guardar los datos, revisa la consola para más detalles');
        console.error("Error al guardar los datos:", error); // Mostrar el error para debugging
    }
};



