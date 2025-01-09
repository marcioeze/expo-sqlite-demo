import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, } from "react-native";
import * as SQLite from "expo-sqlite";
import { handleSaveInDB, handleReadFromDB, checkIfTableExists, createTable } from "./db/database.js";
import { handleImportFromJSON } from "./utils/handleImportFromJSON.js";
import { handleExportToJSON } from "./utils/handleExportToJSON.js";
import { handleDeleteWithConfirmation } from "./utils/handleDeleteWithConfirmation.js";

export default function App() {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [db, setDb] = useState(null);
	const [dataRead, setDataRead,] = useState(null);


	// Abrir la base de datos al montar el componente y verificar si la tabla existe
	useEffect(() => {
		const openDatabase = async () => {
			const database = await SQLite.openDatabaseAsync("mi_db");
			setDb(database);

			// Verificar si la tabla 'users' existe al abrir la base de datos
			const checkTableExistence = await checkIfTableExists(database, "users");

			// Si la tabla no existe, crearla
			if (!checkTableExistence) {
				await createTable(database);
				console.log("Tabla 'users' creada.");
			} else {
				console.log("La tabla 'users' ya existe.");
			}
		};

		openDatabase();
	}, []); // Solo se ejecuta una vez cuando el componente se monta




	return (
		<View style={styles.container}>
			<Text style={styles.title}>Formulario</Text>

			<TextInput
				style={styles.input}
				placeholder="Ingresa tu nombre"
				value={name}
				onChangeText={setName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Ingresa tu edad"
				keyboardType="numeric"
				value={age}
				onChangeText={setAge}
			/>

			<Button title="Guardar" onPress={() => handleSaveInDB(db, name, age)} />

			<Button title="Leer Datos de la DB" onPress={async () => {
				const result = await handleReadFromDB(db)
				setDataRead(result)
			}} />

			<Button title="Exportar" onPress={() => handleExportToJSON(db)} />

			<Button title="Importar Datos" onPress={() => handleImportFromJSON(db)} />

			<Button
				title="Borrar Datos"
				onPress={() => handleDeleteWithConfirmation(db, setDataRead, setName, setAge)}
			/>


			{/* Mostrar datos guardados */}
			{name && age && (
				<Text style={styles.savedData}>
					Nombre: {name}, Edad: {age}
				</Text>
			)}

			{dataRead && (
				<Text style={styles.savedData}>
					Los datos leídos son: {JSON.stringify(dataRead)}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	input: {
		width: "100%",
		padding: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		marginBottom: 10,
		borderRadius: 5,
	},
	savedData: {
		marginTop: 20,
		fontSize: 16,
		fontWeight: "bold",
	},
});
