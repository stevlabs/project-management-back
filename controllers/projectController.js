const { 
    getAllProjectsByUserModel,
    getProjectByIdModel,
    createProjectModel,
    addProjectResourceModel,
    deleteProjectResourceModel,
    updateProjectModel,
    deleteProjectModel
} = require('../models/projectModel');

/**
 * Controlador para obtener todos los proyectos del usuario.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - Objeto JSON con la respuesta.
 */
const getAllProjectsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const projects = await getAllProjectsByUserModel(id);
        if (projects.length > 0) {
            return res.status(200).json({
                ok: true,
                data: projects
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: "No se encontraron proyectos"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener los proyectos, contacte con el administrador"
        });
    }
};

/**
 * Controlador para obtener un proyecto por su id.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - Objeto JSON con la respuesta.
 */
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await getProjectByIdModel(id);
        if (project) {
            return res.status(200).json({
                ok: true,
                msg: "Proyecto encontrado",
                data: project
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: "Proyecto no encontrado"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener el proyecto, contacte con el administrador"
        });
    }
};

/**
 * Controlador para crear un nuevo proyecto.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - Objeto JSON con la respuesta.
 */
const createProject = async (req, res) => {
    try {
        const { name, description, created_by, start_date, end_date } = req.body;
        const newProject = await createProjectModel(name, description, created_by, start_date, end_date);
        return res.status(201).json({
            ok: true,
            msg: "Proyecto creado con éxito",
            data: newProject
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al crear el proyecto, contacte con el administrador"
        });
    }
};

/**
 * Controlador para añadir un recurso a un proyecto.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - Objeto JSON con la respuesta.
 */
const addProjectResource = async (req, res) => {
    try {
        const { id } = req.params; 
        const { user_id } = req.body;
        const file = req.file;
        console.log(file);
        if (!file) {
            return res.status(400).json(
                { 
                    ok: false, 
                    msg: "Archivo no proporcionado" 
                }
            );
        }

        const fileName = file.filename;
        const fileType = file.mimetype;
        const fileUrl = `uploads/${file.filename}`;

        const resource = await addProjectResourceModel(id, user_id, fileName, fileType, fileUrl);

        res.status(201).json({
            ok: true,
            msg: "Recurso añadido",
            data: resource
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al añadir el recurso, contacte con el administrador"
        });
    }
};

/**
 * Controlador para eliminar un recurso de un proyecto.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - Objeto JSON con la respuesta.
 */
const deleteProjectResource = async (req, res) => {
    try {
        const { id, resource_id } = req.params;
        const deletedResource = await deleteProjectResourceModel(id, resource_id);

        if (deletedResource) {
            return res.status(200).json({
                ok: true,
                msg: "Recurso eliminado con éxito",
                data: deletedResource
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: "Recurso no encontrado"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al eliminar el recurso, contacte con el administrador"
        });
    }
};

/**
 * Controlador para actualizar un proyecto por su id.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - Objeto JSON con la respuesta.
 */
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, start_date, end_date } = req.body;
        const updatedProject = await updateProjectModel(id, name, description, start_date, end_date);
        if (updatedProject) {
            return res.status(200).json({
                ok: true,
                msg: "Proyecto actualizado con éxito",
                data: updatedProject
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: "Proyecto no encontrado"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al actualizar el proyecto, contacte con el administrador"
        });
    }
};

/**
 * Controlador para eliminar un proyecto por su id.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - Objeto JSON con la respuesta.
 */
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await deleteProjectModel(id);
        if (deletedProject) {
            return res.status(200).json({
                ok: true,
                msg: "Proyecto eliminado con éxito"
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: "Proyecto no encontrado"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al eliminar el proyecto, contacte con el administrador"
        });
    }
};

module.exports = {
    getAllProjectsByUser,
    getProjectById,
    createProject,
    addProjectResource,
    deleteProjectResource, 
    updateProject,
    deleteProject
};
