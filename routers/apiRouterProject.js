/* Importaciones */
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validateInputs');
const { 
    getAllProjectsByUser, 
    getProjectById, 
    createProject,
    updateProject, 
    deleteProject,
    getAllProjectResources,
    createProjectResource,
    deleteProjectResource, 
    serveFile
} = require('../controllers/projectController');

/* Rutas para CRUD de proyectos */

// Obtener todos los proyectos del usuario autenticado
router.get('/user/:id', [
    check('id')
        .notEmpty().withMessage('El ID es requerido')
        .isInt().withMessage('El ID debe ser un número entero'),
    validateInputs
], getAllProjectsByUser);

// Obtener un proyecto específico por ID
router.get('/project/:id', [
    check('id')
        .notEmpty().withMessage('El ID es requerido')
        .isInt().withMessage('El ID debe ser un número entero'),
    validateInputs
], getProjectById);

// Crear un nuevo proyecto
router.post('/', [
    check('name')
        .notEmpty().withMessage('El nombre del proyecto es obligatorio')
        .isLength({ max: 100 }).withMessage('El nombre no puede exceder los 100 caracteres'),
    check('description')
        .optional()
        .isLength({ max: 500 }).withMessage('La descripción no puede exceder los 500 caracteres'),
    check('created_by')
        .notEmpty().withMessage('El ID del creador es obligatorio')
        .isInt().withMessage('El ID del creador debe ser un número'),
    check('start_date')
        .optional()
        .isISO8601().withMessage('La fecha de inicio debe ser una fecha válida'),
    check('end_date')
        .optional()
        .isISO8601().withMessage('La fecha de fin debe ser una fecha válida'),
    validateInputs
], createProject);

// Actualizar un proyecto por ID
router.put('/project/:id', [
    check('id')
        .notEmpty().withMessage('El ID del proyecto es requerido')
        .isInt().withMessage('El ID debe ser un número'),
    check('name')
        .notEmpty().withMessage('El nombre del proyecto es obligatorio')
        .isLength({ max: 100 }).withMessage('El nombre no puede exceder los 100 caracteres'),
    check('description')
        .optional()
        .isLength({ max: 500 }).withMessage('La descripción no puede exceder los 500 caracteres'),
    check('start_date')
        .optional()
        .isISO8601().withMessage('La fecha de inicio debe ser una fecha válida'),
    check('end_date')
        .optional()
        .isISO8601().withMessage('La fecha de fin debe ser una fecha válida'),
    validateInputs
], updateProject);

// Eliminar un proyecto por ID
router.delete('/project/:id', [
    check('id')
        .notEmpty().withMessage('El ID del proyecto es requerido')
        .isInt().withMessage('El ID debe ser un número'),
    validateInputs
], deleteProject);

// Obtener todos los recursos de un proyecto por ID
router.get('/project/:id/resources', [
    check('id')
        .notEmpty().withMessage('El ID del proyecto es requerido')
        .isInt().withMessage('El ID debe ser un número'),
    validateInputs
], getAllProjectResources);

// Crear un recurso al proyecto
router.post('/project/:id/upload', [
    check('id').isInt().withMessage('El ID del proyecto debe ser un número'),
    validateInputs,
    upload.single('file')
], createProjectResource);

// Eliminar un recurso de un proyecto
router.delete('/resource/:id', [
    check('id')
        .notEmpty().withMessage('El ID del proyecto es requerido')
        .isInt().withMessage('El ID debe ser un número'),
    validateInputs
], deleteProjectResource);

// Obtener archivos
router.get('/uploads/:filename', serveFile);


/* Exportación de rutas */
module.exports = router;
