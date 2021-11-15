const jwt = require('jsonwebtoken');

module.exports.generarJWT = ( id, name ) => {
    return new Promise( (resolve, reject) => {
        const payload = { id, name };
        jwt.sign( 
            payload, 
            process.env.SECRET_JWT_SEED, 
            { expiresIn: '2h' }, 
            (err, token) => {
                if ( err ) reject('No se pudo generar el token');
                else resolve(token);
        });
    });
}