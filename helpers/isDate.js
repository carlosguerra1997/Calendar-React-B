const moment = require('moment');

module.exports.isDate = ( value, { req, location, path } ) => {
    // Miramos si viene valor. Si no viene, retornamos false que es comos si hubiera un error.
    if (!value) return false;
    // Transformamos lo que llega con moment.
    // Comprobamos que la fecha sea válida.
    const fecha = moment(value);
    if ( fecha.isValid() ) return true;
    else return false;
}