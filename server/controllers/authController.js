const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Iniciar sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Registro
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error });
    }
};
