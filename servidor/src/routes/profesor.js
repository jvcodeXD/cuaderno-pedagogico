const express = require('express')
const profesorController = require('../controllers/profesorController')
const usuarioController = require('../controllers/usuarioController')
const materiaController = require('../controllers/materiaController')

const router = express.Router()

router.get('/estudiantes/lista/:id', profesorController.obtenerEstudiantes)
router.get('/estudiante/:id', profesorController.obtenerEstudiante)
router.post('/estudiantes', usuarioController.crearUsuario)
router.put('/estudiantes/:id', usuarioController.actualizarUsuario)
router.delete('/estudiantes/:id', usuarioController.eliminarUsuario)
router.get('/cursos/:id', profesorController.obtenerCursos)
router.get('/materias/lista/:id', materiaController.obtenerMaterias)
router.get('/materias/:id', materiaController.obtenerMateria)
router.post('/materias', materiaController.crearMateria)
router.put('/materias/:id', materiaController.actualizarMateria)
router.delete('/materias/:id', materiaController.eliminarMateria)

module.exports = router
