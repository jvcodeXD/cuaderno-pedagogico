const usuarioModel = require('../models/usuario')
const helpers = require('../config/helpers')

const usuarioController = {
  obtenerUsuarios: async (req, res) => {
    try {
      let usuarios = await usuarioModel.obtenerUsuarios()
      res.json(usuarios)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  obtenerUsuario: async (req, res) => {
    try {
      const { id } = req.params
      const usuario = await usuarioModel.obtenerUsuario(id)
      if (!usuario) res.status(400).json({ message: 'Usuario no encontrado' })
      res.status(200).json(usuario)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  crearUsuario: async (req, res) => {
    try {
      const nuevoUsuario = req.body

      nuevoUsuario.pass = await helpers.encrypt(nuevoUsuario.pass)
      const usuario = await usuarioModel.crearUsuario(nuevoUsuario)
      res.status(201).json(usuario)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  actualizarUsuario: async (req, res) => {
    try {
      const { id } = req.params
      const nuevoUsuario = req.body
      nuevoUsuario.pass = await helpers.encrypt(nuevoUsuario.pass)
      const usuario = await usuarioModel.actualizarUsuario(nuevoUsuario, id)
      if (!usuario) res.status(404).json({ message: 'Usuario no encontrado' })
      res.json({ message: 'Usuario actualizado', usuario })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  eliminarUsuario: async (req, res) => {
    try {
      const { id } = req.params
      const usuario = await usuarioModel.eliminarUsuario(id)
      if (!usuario) res.status(404).json({ message: 'Usuario no encontrado' })
      res.json({ message: 'Usuario eliminado' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}

module.exports = usuarioController
