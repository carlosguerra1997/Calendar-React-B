const { response } = require('express');
const { validationResult } = require('express-validator');

module.exports.loginUsuario = (req, res = response) => {

    const { email, password } = req.body;

    

    res.status(201).json({
        ok: true,
        msg: 'Login correcto',
        email,
        password
    })
}  

module.exports.crearUsuario = ( req, res = response ) => {

    const { name, email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'Registro correcto',
        name,
        email, 
        password
    })
}  

module.exports.revalidarToken = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'Renovar token'
    })
}  