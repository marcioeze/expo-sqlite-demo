import { Alert } from "react-native";
import { handleClearTable } from "../db/database";

// Función para manejar la eliminación de la tabla con confirmación
export const handleDeleteWithConfirmation = async (db, setDataRead, setName, setAge) => {
    // Mostrar un mensaje de confirmación antes de eliminar
    Alert.alert(
        "Confirmar Eliminación",
        '¿Estás seguro de que deseas eliminar la tabla "Users"? Esta acción no se puede deshacer.',
        [
            {
                text: "Cancelar", // Si el usuario cancela, no hace nada
                style: "cancel"
            },
            {
                text: "Eliminar", // Si el usuario confirma, se elimina la tabla
                onPress: async () => {
                    await handleClearTable(db) // Llamar a la función para eliminar la tabla
                    setDataRead(null); // Limpiar los datos leídos
                    setName(""); // Limpiar el campo de nombre
                    setAge(""); // Limpiar el campo de edad
                }
            }
        ]
    );
};