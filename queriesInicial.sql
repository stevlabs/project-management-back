-- TABLAS -- 

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

-- DATOS DE PRUEBA --
INSERT INTO global_roles (role_name) VALUES
('Admin'),
('User');

INSERT INTO users (name, email, role_id) VALUES
('Admin User', 'admin@example.com', 1);

INSERT INTO project_roles (role_name) VALUES
('Project Superadmin'),
('Project Admin'),
('Project User');

INSERT INTO projects (name, description, created_by, start_date, end_date) VALUES
('Project A', 'Description for Project A', 1, '2024-11-01', '2024-11-10'),
('Project B', 'Description for Project B', 1, '2024-11-15', '2024-11-25'),
('Project C', 'Description for Project C', 1, '2024-12-01', '2024-12-10'),
('Project D', 'Description for Project D', 1, '2024-12-15', '2024-12-20'),
('Project E', 'Description for Project E', 1, '2024-12-25', '2024-12-31');

INSERT INTO assignments (project_id, user_id, project_role_id) VALUES
(1, 1, 1),  
(2, 1, 1),  
(3, 1, 1), 
(4, 1, 1),  
(5, 1, 1);
