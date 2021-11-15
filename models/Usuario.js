const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String, required: true }
}, { versionKey: false });

module.exports = model('Usuario', UsuarioSchema);