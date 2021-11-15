const { response } = require('express');

// Modelos
const Evento = require('../models/Evento');

module.exports.crearEvento = async( req, res = response ) => {
    const evento = new Evento( req.body );

    try {
        evento.user = req.id;
        const eventoGuardado = await evento.save();
        return res.status(200).json({ ok: true, eventoGuardado });
    } catch(err) {
        return res.status(500).json({ ok: false, msg: 'Hable con el administrador...' });
    }
}

module.exports.obtenerEventos = async ( req, res = response ) => {
    // Buscamos todos los eventos y del usuario cogemos el name.
    const eventos = await Evento.find().populate('user', 'name');
    return res.json({ ok: true, eventos });
}

module.exports.actualizarEventos = async( req, res = response ) => {
    const eventoId = req.params.id;
    const id = req.id;
    try {
        // Buscamos si existe el evento por la ID que pasamos.
        const evento = await Evento.findById(eventoId);
        if ( !evento ) res.status(404).json({ ok: false, msg: 'El evento no existe' });

        // Comprobamos si el usuario que quiere editar el evento es el creador del mismo.
        if ( evento.user.toString() !== id ) return res.status(401).json({ ok: false, msg: 'No tiene privilegio para editar ese evento' });

        // Creamos la instancia del nuevo evento y lo actualizamos.
        // El parámetro { new: true } especifica que el Update nos devuelva el documento actualizado y no el viejo.
        const nuevoEvento = { ...req.body, user: id };
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        return res.json({ ok: true, evento: eventoActualizado });

    } catch(err) {
        res.status(500).json({ ok: false, msg: 'Por favor, hable con el administrador' });
    }
}

module.exports.borrarEvento = async( req, res = response ) => {
    const eventoId = req.params.id;
    const id = req.id;
    try {
        // Buscamos si existe el evento por la ID que pasamos.
        const evento = await Evento.findById( eventoId );
        if ( !evento ) res.status(404).json({ ok: false, msg: 'El evento no existe' });

        // Comprobamos que el usuario que intenta borrar el evento es el mismo que el que lo creó.
        if (evento.user.toString() !== id) return res.status(401).json({ ok: false, msg: 'No tiene privilegio para eliminar ese evento' });

        const eventoBorrado = await Evento.findByIdAndDelete( eventoId );
        return res.status(200).json({ ok: true, eventoBorrado });

    } catch(err) {
        return res.status(500).json({ ok: false, msg: 'Por favor, hable con el administrador' });
    }
}