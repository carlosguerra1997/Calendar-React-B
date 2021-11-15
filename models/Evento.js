const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: { type: Schema.Types.String, required: true },
    notes: { type: Schema.Types.String },
    start: { type: Schema.Types.Date, required: true },
    end: { type: Schema.Types.Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { versionKey: false, timeStamp: false });

module.exports = model('Evento', EventoSchema);