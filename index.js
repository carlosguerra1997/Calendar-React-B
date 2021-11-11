require('dotenv').config();
const express =require('express');

// Crear el servidor de Express
const app = express();

// Directorio público
app.use( express.static('public') )

// Parseo body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});