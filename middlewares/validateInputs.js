const { validationResult } = require('express-validator');

/**
 * Middleware para validar los inputs.
 * Si hay errores, devuelve un res 400 con los errores.
 * Si todo está bien continua.
 * 
 * @param {Object} req - Objeto solicitud.
 * @param {Object} res - Objeto respuesta.
 * @param {Function} next - Función para continuar.
 */
const validateInputs = (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped(), 
        });
    }
    next();
};

module.exports = {
    validateInputs
};