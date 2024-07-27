const express = require('express')
const estudianteController = require('../controllers/estudianteController')
const usuarioController = require('../controllers/usuarioController')

const router = express.Router()

router.get('/', estudianteController.obtenerEstudiantes)
router.get('/estudiantes/:id', usuarioController.obtenerUsuario)
router.post('/estudiantes', usuarioController.crearUsuario)
router.put('/estudiantes/:id', usuarioController.actualizarUsuario)
router.delete('/estudiantes/:id', usuarioController.eliminarUsuario)

module.exports = router
