/* Importaciones */
const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');

// Ruta para el registro de usuarios
router.post('/register', register);

// Ruta para el login
router.post('/login', login);


/* Exportación de rutas */
module.exports = router;
