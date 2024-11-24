const projects = {
    // Obtener todos los proyectos creados por el usuario
    getAllProjectsByUser: `
    SELECT projects.*
    FROM projects
    WHERE projects.created_by = $1
    ORDER BY projects.created_at DESC
    `,

    // Obtener un proyecto específico por ID
    getProjectById: `
    SELECT projects.*, users.name AS created_by_name
    FROM projects
    JOIN users ON projects.created_by = users.user_id
    WHERE projects.project_id = $1
    `,

    // Crear un nuevo proyecto
    createProject: `
    INSERT INTO projects (name, description, created_by, start_date, end_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,

    // Actualizar un proyecto específico por ID
    updateProject: `
    UPDATE projects
    SET name = $2,
        description = $3,
        start_date = $4,
        end_date = $5,
        created_at = CURRENT_TIMESTAMP
    WHERE project_id = $1
    RETURNING *
    `,

    // Eliminar un proyecto específico por ID
    deleteProject: `
    DELETE FROM projects
    WHERE project_id = $1
    RETURNING *
    `,

    // Obtener todos los recursos de un projecto
    getAllProjectResources: `
    SELECT project_resources.*
    FROM project_resources
    WHERE project_id = $1
    ORDER BY uploaded_at DESC
    `,

    // Crear un recurso en un proyecto
    createProjectResource: `
    INSERT INTO project_resources (project_id, user_id, file_name, file_type, file_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,

    // Eliminar un recurso de un proyecto
    deleteProjectResource: `
    DELETE FROM project_resources
    WHERE resource_id = $1
    RETURNING *
    `,

};

const users = {

    getUserByEmail: `
    SELECT *
    FROM users
    WHERE users.email = $1
    `,

    createUser: `
    INSERT INTO users (name, email, password, role_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `
};

module.exports = {
    projects,
    users
};
