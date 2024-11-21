
# Web de Gestión de Proyectos

Back para la aplicación web para la gestión de proyectos.

## API

- **Gestión de proyectos:** Crear, eliminar y gestionar proyectos.
- **Gestión de documentos:** Subir, eliminar y descargar archivos.

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/stevlabs/project-management-front.git
   cd project-management-back
   ```

2. **Instala las dependencias con NPM:**
   ```bash
   npm install
   ```
3. **Creacion de base de datos:**
    Importar el archivo queriesInicial.sql en postgresql para
    tener la base de datos de prubea para el proyecto

4. **Configura las variables de entorno:**
   Crea un archivo .env y agrega:
   ```bash
    # Puerto del servidor
    PORT=TU_PUERTO

    # BASE DE DATOS
    DB_HOST=TU_HOST
    DB_USER=TU_USER
    DB_DATABASE=TU_DATABASE
    DB_PASSWORD=TU_PASSWORD
   ```

5. **Inicia la aplicación con Nodemon:**
   ```bash
    npm run dev
    ```