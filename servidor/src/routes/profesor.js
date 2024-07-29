const express = require('express')
const profesorController = require('../controllers/profesorController')
const usuarioController = require('../controllers/usuarioController')

const materiasRutas = require('./materia')
const notasRutas = require('./nota')

const router = express.Router()

router.get('/estudiantes/lista/:id', profesorController.obtenerEstudiantes)
router.get('/estudiante/:id', profesorController.obtenerEstudiante)
router.post('/estudiantes', usuarioController.crearUsuario)
router.put('/estudiantes/:id', usuarioController.actualizarUsuario)
router.delete('/estudiantes/:id', usuarioController.eliminarUsuario)
router.get('/cursos/:id', profesorController.obtenerCursos)

router.use('/materias', materiasRutas)
router.use('/notas', notasRutas)

module.exports = router
