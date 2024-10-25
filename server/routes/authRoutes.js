const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

// Rutas públicas
router.post('/login', authController.login);
router.post('/register', authController.register);

// Ruta protegida (requiere autenticación)
router.get('/dashboard', verifyToken, (req, res) => {
    res.status(200).json({ 
        message: `${req.user.nombre} ${req.user.apellido}, Bienvenido al dashboard` });
});

module.exports = router;
