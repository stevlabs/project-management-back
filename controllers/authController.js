const bcrypt = require('bcryptjs'); // Para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Para manejar tokens JWT
const { 
    getUserByEmailModel,
    createUserModel
} = require('../models/authModel');

// Controlador para registrar usuarios
const register = async (req, res) => {
  const { name, email, password, role_id } = req.body;

  // Validamos que se envíen todos los campos
  if (!name || !email || !password || !role_id) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Encriptamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUserModel(name, email, hashedPassword, role_id);
    console.log(hashedPassword)
    res.status(201).json({ userId: result.user_id });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

// Controlador para iniciar sesión
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password )
  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Buscamos el usuario en la base de datos
    const result = await getUserByEmailModel(email);
    if (!result) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }    

    const user = result;

    // Verificamos la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generamos un token JWT con el id del usuario y su rol
    const token = jwt.sign({ userId: user.user_id, role: user.role_id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Controlador para obtener el perfil del usuario
const getProfile = async (req, res) => {
  try {
    // Obtenemos los datos del usuario desde la base de datos
    const result = await pool.query('SELECT id, username, role FROM users WHERE id = $1', [
      req.user.userId,
    ]);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
};

module.exports = { register, login, getProfile };


module.exports = {
    register, 
    login, 
    getProfile
};
