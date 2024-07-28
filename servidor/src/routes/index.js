const express = require('express')
const { jwtAuth, rolAuth } = require('../config/auth')

const authRouter = require('./auth')

const usuarioRouter = require('./usuario')
const directorRouter = require('./director')
const profesorRouter = require('./profesor')
// const estudianteRouter = require('./estudiante')
const cursoRouter = require('./curso')
const materiaRouter = require('./materia')

const router = express.Router()

router.get('/estado', (req, res) => {
  res.send('ok')
})

router.use('/auth', authRouter)

router.use('/usuarios', usuarioRouter) //jwtAuth, rolAuth(['Administrador']), usuarioRouter)
router.use('/director', directorRouter)
router.use('/profesor', profesorRouter)
// router.use('/estudiante', estudianteRouter)
router.use('/cursos', cursoRouter)
router.use('/materias', materiaRouter)

module.exports = router
