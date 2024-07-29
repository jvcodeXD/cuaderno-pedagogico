const express = require('express')
const materiaController = require('../controllers/materiaController')

const router = express.Router()

router.get('/lista/:id', materiaController.obtenerMaterias)
router.get('/:id', materiaController.obtenerMateria)
router.post('/', materiaController.crearMateria)
router.put('/:id', materiaController.actualizarMateria)
router.delete('/:id', materiaController.eliminarMateria)

module.exports = router
