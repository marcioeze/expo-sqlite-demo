# Expo SQLite Demo

Este proyecto es una demostración de una aplicación desarrollada con **Expo** que utiliza SQLite para almacenar datos localmente. Está diseñado para ser fácil de usar y comprender, ideal para aprender a trabajar con bases de datos en aplicaciones React Native.

## Funcionalidades

- Conexión con una base de datos SQLite local.
- CRUD (Crear, Leer, Actualizar y Eliminar) de datos.
- Interfaz de usuario sencilla y amigable.

## Requisitos

Asegúrate de tener instalados los siguientes programas antes de comenzar:

- **Node.js** (versión 14 o superior)
- **Expo CLI** (puedes instalarlo globalmente con `npm install -g expo-cli`)
- Un emulador Android/iOS o Expo Go instalado en tu dispositivo móvil. Podes usar Android Studio e inicializar una instancia de un telefono virtual

## Instalación

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/marcioeze/expo-sqlite-demo.git
   cd expo-sqlite-demo
Instala las dependencias:

bash
Copiar código
npm install
Inicia la aplicación:

bash
Copiar código
expo start
Abre la app en un dispositivo o emulador:

# Expo SQLite Demo

Usa la app **Expo Go** en tu dispositivo móvil para escanear el código QR.  
O selecciona un emulador desde la interfaz de Expo.

## Cómo Usar

1. Abre la aplicación en tu dispositivo o emulador.
2. Prueba las funcionalidades:
   - **Agregar datos** a la base de datos SQLite.
   - **Leer los datos** almacenados.
   - **Actualizar o eliminar registros**.

## Estructura del Proyecto

```bash
expo-sqlite-demo/
├── App.js               # Archivo principal de la app
├── db/                  # Configuración de la base de datos SQLite
│   └── database.js      # Conexión y operaciones con SQLite
├── utils/               # Utilidades auxiliares
│   ├── handleExportToJSON.js        # Función para exportar y compartir datos en un archivo JSON
│   ├── handleImportFromJSON.js      # Función para importar datos desde un archivo JSON
│   ├── handleDeleteWithConfirmation.js # Función para manejar eliminación con confirmación
│   └── shareFile.js     # Función para compartir archivos
├── assets/              # Recursos como imágenes o fuentes
├── package.json         # Dependencias del proyecto
└── README.md            # Este archivo
```
## Notas
SQLite: La base de datos SQLite es local al dispositivo. Si reinstalas la app, los datos se perderán.
Compatibilidad: Este proyecto funciona en Android e iOS, pero requiere un dispositivo o emulador que soporte Expo Go.
