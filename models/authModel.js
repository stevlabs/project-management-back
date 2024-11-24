const { runQuery } = require("../utils/apiUtils");
const { users } = require("./queries");

// Obtener un proyecto específico por ID
const getUserByEmailModel = async (email) => {
    try {
        const result = await runQuery(users.getUserByEmail, [email]);
        console.log(result.rows[0])
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Crear un nuevo proyecto
const createUserModel = async (name, email, hashedPassword, role_id) => {
    try {
        const result = await runQuery(users.createUser, [name, email, hashedPassword, role_id]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    getUserByEmailModel,
    createUserModel
};