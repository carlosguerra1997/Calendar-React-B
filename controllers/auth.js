const { response } = require('express');
const bcrypt = require('bcryptjs');

// Modelos
const Usuario = require('../models/Usuario');

// Función para generar Tokens
const { generarJWT } = require('../helpers/jwt');

module.exports.loginUsuario = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        // Buscamos el usuario.
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) return res.status(400).json({ ok: false, msg: 'No existe un usuario con ese email' });

        // Comprobamos que las contraseñas sean iguales.
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) return res.status(400).json({ ok: false, msg: 'Contraseña no válida' });

        // Generar JWT
        const token = await generarJWT(usuario._id, usuario.name);

        res.status(200).json({ 
            ok: true, 
            id: usuario.id, 
            name: usuario.name, 
            token 
        });

    } catch(err) {
        return res.status(500).json({ ok: false, msg: 'Por favor, hable con el administrador.' })
    }
};  

module.exports.crearUsuario = async( req, res = response ) => {
    const { name, email, password } = req.body;
    try {
        // Comprobamos si ya existe el usuario.
        let usuario = await Usuario.findOne({ email });
        if (usuario) return res.status(400).json({ ok: false, msg: 'Ya hay un usuario registrado con ese correo' });

        // Si el usuario no está registrado, lo setteamos.
        usuario = new Usuario({ name, email, password });

        // Generamos el salt y encriptamos la contraseña.
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Insertamos el registro en la BBDD.
        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario._id, usuario.name);

        res.status(201).json({
            ok: true,
            id: usuario._id,
            name: usuario.name,
            token
        });

    } catch(err) {
        res.status(500).json({ ok: false, msg: 'Por favor, contacte con el administrador.' })
    }    
};

module.exports.revalidarToken = async( req, res = response ) => {
    // Cogemos lo que viene de los headers.
    const { id, name } = req;

    // Generar nuevo JWT y retornarlo.
    const token = await generarJWT(id, name);

    res.json({ ok: true, token });
};