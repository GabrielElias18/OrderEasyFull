const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoriaId: { type: Number, unique: true, required: true }, // ID autoincrementable
    nombre: { type: String, required: true },
    descripcion: { type: String },
    usuarioId: { type: Number, required: true } // Relación con el usuario propietario
});

module.exports = mongoose.model('Category', categorySchema, 'categorias');
