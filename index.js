require('dotenv').config();
const express =require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de Express
const app = express();

// Llamar BBDD
dbConnection();

// CORS
app.use( cors() );

// Directorio público
app.use( express.static('public') )

// Parseo body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});