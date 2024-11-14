-- USUARIOS --
CREATE TABLE global_roles (
    role_id SERIAL PRIMARY KEY,
    -- Ejemplos: "Admin", "User"
    role_name VARCHAR(50) NOT NULL UNIQUE 
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role_id INT NOT NULL REFERENCES global_roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PROJECTOS --
CREATE TABLE project_roles (
    project_role_id SERIAL PRIMARY KEY,
    -- Ejmplos: "Project Superadmin", "Project Admin", "Project User"
    role_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_by INT NOT NULL REFERENCES users(user_id),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assignments (
    assignment_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    project_role_id INT NOT NULL REFERENCES project_roles(project_role_id),
    UNIQUE (project_id, user_id)
);
