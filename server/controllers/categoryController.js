const Categoria = require('../models/categoryModel');
const Counter = require('../models/counterModel');

// Función para obtener el siguiente valor de `categoriaId`
const obtenerSiguienteCategoriaId = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: 'categoriaId' },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
    );
    return counter.value;
};

// Crear una nueva categoría
exports.createCategory = async (req, res) => {
    const { nombre, descripcion } = req.body;
    const usuarioId = req.user.usuarioId; // ID del usuario autenticado

    try {
        const categoriaId = await obtenerSiguienteCategoriaId();

        const nuevaCategoria = new Categoria({
            categoriaId,
            nombre,
            descripcion,
            usuarioId
        });

        await nuevaCategoria.save();
        res.status(201).json({ mensaje: 'Categoría creada exitosamente', categoria: nuevaCategoria });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la categoría', error });
    }
};

// Obtener categorías del usuario autenticado
exports.getCategories = async (req, res) => {
    const usuarioId = req.user.usuarioId;

    try {
        const categorias = await Categoria.find({ usuarioId });
        res.status(200).json({ categorias });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las categorías', error });
    }
};
