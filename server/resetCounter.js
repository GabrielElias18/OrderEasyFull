// resetCounter.js
const mongoose = require('mongoose');
require('dotenv').config();

const Counter = require('./models/counterModel');
// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Conexión a MongoDB exitosa');

        // Reinicia el contador a 0
        await Counter.findOneAndUpdate(
            { name: 'usuarioId' },
            { $set: { value: 0 } },
            { upsert: true }
        );

        console.log('Contador usuarioId reiniciado a 0');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error);
    });
