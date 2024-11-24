const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos los datos del token en req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Middleware para verificar roles específicos
const verifyRole = (role_id) => (req, res, next) => {
  if (req.user.role_id !== role_id) {
    return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
  }
  next();
};

module.exports = { verifyToken, verifyRole };