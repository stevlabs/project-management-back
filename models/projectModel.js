const { runQuery } = require('../utils/apiUtils');
const { projects } = require('../models/queries');

// Obtener todos los proyectos creados por el usuario
const getAllProjectsByUserModel = async (userId) => {
    try {
        const result = await runQuery(projects.getAllProjectsByUser, [userId]);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Obtener un proyecto específico por ID
const getProjectByIdModel = async (projectId) => {
    try {
        const result = await runQuery(projects.getProjectById, [projectId]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Crear un nuevo proyecto
const createProjectModel = async (name, description, createdBy, startDate, endDate) => {
    try {
        const result = await runQuery(projects.createProject, [name, description, createdBy, startDate, endDate]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Actualizar un proyecto por ID
const updateProjectModel = async (projectId, name, description, startDate, endDate) => {
    try {
        const result = await runQuery(projects.updateProject, [projectId, name, description, startDate, endDate]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};


// Eliminar un proyecto por ID
const deleteProjectModel = async (projectId) => {
    try {
        const result = await runQuery(projects.deleteProject, [projectId]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Obtener todos los recursos de un proyecto por ID
const getAllProjectResourcesModel = async (projectId) => {
    try {
        const result = await runQuery(projects.getAllProjectResources, [projectId]);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


// Añadir un recurso al proyecto
const createProjectResourceModel = async (projectId, userId, fileName, fileType, fileUrl) => {
    try {
        const result = await runQuery(projects.createProjectResource, [projectId, userId, fileName, fileType, fileUrl]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Eliminar un recurso de un proyecto
const deleteProjectResourceModel = async (resourceId) => {
    try {
        const result = await runQuery(projects.deleteProjectResource, [resourceId]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    getAllProjectsByUserModel,
    getProjectByIdModel,
    createProjectModel,
    updateProjectModel,
    deleteProjectModel,
    getAllProjectResourcesModel,
    createProjectResourceModel,
    deleteProjectResourceModel,
};