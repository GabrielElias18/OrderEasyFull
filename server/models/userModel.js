const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Especifica que la colección se llamará 'usuarios'
module.exports = mongoose.model('User', userSchema, 'usuarios');
