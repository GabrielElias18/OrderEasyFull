const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Asegúrate de importar el modelo User


const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }

    // Verifica el token y extrae `usuarioId` y `username`
    jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensaje: 'Token no válido' });
        }
        // Asigna `usuarioId` y `username` a `req.user` para acceso en rutas protegidas
        req.user = { usuarioId: decoded.usuarioId, username: decoded.username, nombre: decoded.nombre, apellido: decoded.apellido };
        next();
    });
};

module.exports = verificarToken;
