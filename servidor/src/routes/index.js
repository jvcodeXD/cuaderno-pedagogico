const express = require('express')
const { jwtAuth, rolAuth } = require('../config/auth')

const authRouter = require('./auth')

const usuarioRouter = require('./usuario')

const router = express.Router()

router.get('/estado', (req, res) => {
  res.send('ok')
})

router.use('/auth', authRouter)

router.use('/usuarios', usuarioRouter) //jwtAuth, rolAuth(['Administrador']), usuarioRouter)

module.exports = router
