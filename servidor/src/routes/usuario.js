const express = require('express')
const usuarioController = require('../controllers/usuarioController')

const router = express.Router()

router.get('/', usuarioController.obtenerUsuarios)
router.get('/:id', usuarioController.obtenerUsuario)
router.post('/', usuarioController.crearUsuario)
router.put('/:id', usuarioController.actualizarUsuario)
router.delete('/:id', usuarioController.eliminarUsuario)

module.exports = router
