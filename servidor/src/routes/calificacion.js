const express = require('express')
const calificacionController = require('../controllers/calificacionController')

const router = express.Router()

router.get(
  '/nota/:id/:id_estudiante',
  calificacionController.obtenerCalificaciones
)
router.get(
  '/notas/:id_materia/:id_estudiante',
  calificacionController.obtenerCalificacionNotas
)
router.get('/:id', calificacionController.obtenerCalificacion)
router.post('/', calificacionController.crearCalificacion)
router.put('/:id', calificacionController.actualizarCalificacion)
router.delete('/:id', calificacionController.eliminarCalificacion)

module.exports = router
