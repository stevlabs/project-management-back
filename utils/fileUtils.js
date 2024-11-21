const fs = require('fs');
const path = require('path');

/**
 * Función para eliminar un archivo de cualquier directorio.
 * 
 * @param {string} fileName - Nombre del archivo a eliminar.
 * @param {string} directory - Directorio donde se encuentra el archivo.
 */
const deleteFile = (fileName, directory) => {
    try {
        const filePath = path.join(__dirname, '..', directory, fileName);

        // Verificar si el archivo existe
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Archivo eliminado: ${filePath}`);
        } else {
            console.warn(`Archivo no encontrado: ${filePath}`);
        }
    } catch (error) {
        console.error('Error al eliminar el archivo:', error);
        throw error;
    }
};

module.exports = {
    deleteFile,
};
