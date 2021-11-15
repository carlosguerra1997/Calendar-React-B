const { response } = require('express');
const jwt = require('jsonwebtoken');

module.exports.validarJWT = (req, res = response, next) => {
    // Leemos el token que nos llega en los headers de la petición.
    const token = req.header('x-token');

    // Comprobamos si viene el token.
    if ( !token ) return res.status(401).json({ ok: false, msg: 'No hay token en la petición' });

    try {
        const { id, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.id = id;
        req.name = name;
    } catch(err) {
        return res.status(401).json({ ok: false, msg: 'Token no válido' });
    }
    // Llamamos el next para que siga ejecutando lo siguiente.
    next();
}