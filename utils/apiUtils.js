const { Pool } = require('pg')

/* Creamos pool de conexiones para las diferentes llamadas */
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false 
    }
});

/**
 * Funcion para conectarse a la base de datos postgresql y
 * hacer consultas.
 * 
 * @param {Object} consulta 
 * @param {Array} variables 
 * @returns {Promise} - Respuesta con la query.
 * @throws {Reject} - Respuesta con la query.
 */
const runQuery = async (consulta, variables=[]) =>{
    let client, response;
    try {
        client = await pool.connect();
        response = await client.query(consulta, variables);
    } catch (error) {
        console.error(
            'Error ejecutando query:', consulta,
            'Con las variables:', variables, 
            'Error:', error
        );
        throw error
    } finally {
        client.release();
    }
    return response;
}

module.exports = { runQuery };