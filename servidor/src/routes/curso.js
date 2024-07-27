const express = require('express')
const cursoController = require('../controllers/cursoController')

const router = express.Router()

router.get('/', cursoController.obtenerCursos)
router.get('/:id', cursoController.obtenerCurso)
router.post('/', cursoController.crearCurso)
router.put('/:id', cursoController.actualizarCurso)
router.delete('/:id', cursoController.eliminarCurso)

module.exports = router
