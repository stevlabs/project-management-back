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
    password VARCHAR(50) NOT NULL,
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

-- RECURSOS DE PROYECTO -- 
CREATE TABLE project_resources (
    resource_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(user_id),
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
('Rediseño del Sitio Web Corporativo', 
 'Actualización completa del sitio web de la empresa con diseño responsivo y mejora de la experiencia de usuario.', 
 1, '2024-11-01', '2024-11-30'),

('Desarrollo de Aplicación Móvil', 
 'Creación de una app móvil para gestionar inventarios en tiempo real, disponible para Android e iOS.', 
 1, '2024-12-01', '2025-03-31'),

('Lanzamiento de Campaña de Marketing Digital', 
 'Planificación y ejecución de una campaña para promocionar el nuevo producto estrella en redes sociales y medios digitales.', 
 1, '2024-11-15', '2024-12-20'),

('Implementación de CRM Empresarial', 
 'Integración de un sistema CRM para mejorar la gestión de clientes y automatizar procesos de ventas.', 
 1, '2025-01-10', '2025-04-15'),

('Optimización de Procesos Internos', 
 'Análisis y reestructuración de procesos clave para aumentar la eficiencia operativa en el área de logística.', 
 1, '2024-11-20', '2025-02-10'),

('Desarrollo de Plataforma de e-Learning', 
 'Creación de una plataforma educativa online para ofrecer cursos de formación técnica a empleados.', 
 1, '2025-01-01', '2025-06-30'),

('Migración a la Nube', 
 'Migrar la infraestructura tecnológica de la empresa a un proveedor de servicios en la nube como AWS o Azure.', 
 1, '2024-12-05', '2025-03-05'),

('Evento de Networking Empresarial', 
 'Organización de un evento para conectar startups con inversores y grandes empresas del sector.', 
 1, '2024-12-10', '2024-12-12'),

('Actualización de Software de Facturación', 
 'Implementación de nuevas funcionalidades y optimización del software de facturación utilizado por la empresa.', 
 1, '2024-11-25', '2025-01-15'),

('Investigación de Mercado para Nuevo Producto', 
 'Estudio de viabilidad para el lanzamiento de un nuevo producto en el mercado latinoamericano.', 
 1, '2025-01-15', '2025-03-31');


INSERT INTO assignments (project_id, user_id, project_role_id) VALUES
(1, 1, 1),  
(2, 1, 1),  
(3, 1, 1), 
(4, 1, 1),  
(5, 1, 1);
