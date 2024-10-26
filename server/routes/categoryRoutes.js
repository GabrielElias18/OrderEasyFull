const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const verifyToken = require('../middlewares/authMiddleware');

// Crear una nueva categoría (requiere autenticación)
router.post('/categories', verifyToken, categoryController.createCategory);

// Obtener categorías del usuario autenticado
router.get('/categories', verifyToken, categoryController.getCategories);

module.exports = router;
