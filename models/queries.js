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

    deleteProjectResource: `
    DELETE FROM project_resources
    WHERE project_id = $1 AND resource_id = $2
    RETURNING *
    `,

    // Crear un recurso en un proyecto
    addProjectResource: `
    INSERT INTO project_resources (project_id, user_id, file_name, file_type, file_url)
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

    // Actualización parcial de un proyecto (PATCH)
    partialUpdateProject: `
    UPDATE projects
    SET 
        name = COALESCE($2, name),
        description = COALESCE($3, description),
        start_date = COALESCE($4, start_date),
        end_date = COALESCE($5, end_date)
    WHERE project_id = $1
    RETURNING *
    `
};

module.exports = {
    projects
};
