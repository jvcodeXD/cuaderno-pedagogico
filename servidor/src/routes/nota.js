const express = require('express')
const notaController = require('../controllers/notaController')

const router = express.Router()

router.get('/lista/:id', notaController.obtenerNotas)
router.get('/estudiante/:id', notaController.obtenerNotasEstudiante)
router.get('/materia/:id/:campo', notaController.obtenerNotasMateriaCampo)
router.get('/materia/:id', notaController.obtenerNotasMateria)
router.get('/:id', notaController.obtenerNota)
router.post('/', notaController.crearNota)
router.put('/:id', notaController.actualizarNota)
router.delete('/:id', notaController.eliminarNota)

module.exports = router
