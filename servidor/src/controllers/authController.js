const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const helpers = require('../config/helpers')

const usuarioModel = require('../models/usuario')

dotenv.config()

const secretKey = process.env.JWT_SECRET_KEY

const authController = {
  login: async (req, res) => {
    const { user, pass } = req.body
    try {
      const [usuario] = await usuarioModel.verificarUsuario(user)
      if (!usuario) {
        res.status(500).json({ message: 'Usuario no encontrado' })
      }

      const isMatch = await helpers.decrypt(pass, usuario.pass)
      if (!isMatch) {
        res.status(500).json({ message: 'Contraseña incorrecta' })
      }

      const payload = { id: usuario.id, user: usuario.user, rol: usuario.rol }
      const token = jwt.sign(payload, secretKey, {
        expiresIn: '1h',
      })
      const usuarioAutenticado = { user: usuario.user, token, rol: usuario.rol }

      res.status(200).json(usuarioAutenticado)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = authController
