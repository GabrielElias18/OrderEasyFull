const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Asegúrate de importar el modelo User

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
        
        // Busca el usuario completo en la base de datos
        const user = await User.findOne({ username: decoded.username });
        if (!user) {
            return res.status(401).json({ message: 'Token no válido' });
        }

        // Agrega nombre y apellido al objeto req.user
        req.user = { username: user.username, nombre: user.nombre, apellido: user.apellido };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token no válido' });
    }
};

module.exports = verifyToken;
