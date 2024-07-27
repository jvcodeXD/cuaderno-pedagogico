const express = require('express')
const directorController = require('../controllers/directorController')
const usuarioController = require('../controllers/usuarioController')

const router = express.Router()

router.get('/profesores', directorController.obtenerProfesores)
router.get('/profesores/:id', usuarioController.obtenerUsuario)
router.post('/profesores', usuarioController.crearUsuario)
router.put('/profesores/:id', usuarioController.actualizarUsuario)
router.delete('/profesores/:id', usuarioController.eliminarUsuario)

module.exports = router
