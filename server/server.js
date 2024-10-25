// Importar dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Rutas
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
