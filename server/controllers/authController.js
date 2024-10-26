const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Counter = require('../models/counterModel');


// Iniciar sesión
// Iniciar sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Incluye `usuarioId` y `username` en el token
        const token = jwt.sign(
            { usuarioId: user.usuarioId, username: user.username },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Registro
exports.register = async (req, res) => {
    const { username, password, nombre, apellido } = req.body;
    try {
        // Obtén el siguiente valor de `usuarioId` incrementando el contador
        let counter = await Counter.findOneAndUpdate(
            { name: 'usuarioId' },
            { $inc: { value: 1 } },
            { new: true, upsert: true } // Si no existe, crea el contador
        );

        // Asigna el `usuarioId` desde el valor del contador
        const newUser = new User({ 
            usuarioId: counter.value, 
            username, 
            password, 
            nombre, 
            apellido 
        });
        
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error });
    }
};
