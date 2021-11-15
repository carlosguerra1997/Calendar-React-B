const { Router } = require('express');
const { check } = require('express-validator');

// Métodos del controlador
const { crearEvento, obtenerEventos, actualizarEventos, borrarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Aplicar middleware para todas las rutas.
router.use(validarJWT);

// Crear evento
router.post('/new', [ 
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de fin es obligatoria').custom( isDate ),
    validarCampos
    ], crearEvento);

// Obtener eventos
router.get('/', obtenerEventos);

// Actualizar eventos
router.put('/:id', [ 
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de fin es obligatoria').custom( isDate ),
    validarCampos
    ], actualizarEventos);

// Borrar evento
router.delete('/:id', borrarEvento);

module.exports = router;