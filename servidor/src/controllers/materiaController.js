const materiaModel = require('../models/materia')

const materiaController = {
  obtenerMaterias: async (req, res) => {
    try {
      const { id } = req.params
      const materias = await materiaModel.obtenerMaterias(id)
      res.json(materias)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  obtenerMateria: async (req, res) => {
    try {
      const { id } = req.params
      const materia = await materiaModel.obtenerMateria(id)
      if (!materia) res.status(400).json({ message: 'Materia no encontrado' })
      res.status(200).json(materia)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  crearMateria: async (req, res) => {
    try {
      const nuevoMateria = req.body
      const materia = await materiaModel.crearMateria(nuevoMateria)
      res.status(201).json(materia)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  actualizarMateria: async (req, res) => {
    try {
      const { id } = req.params
      const nuevoMateria = req.body
      const materia = await materiaModel.actualizarMateria(nuevoMateria, id)
      if (!materia) res.status(404).json({ message: 'Materia no encontrado' })
      res.json({ message: 'Materia actualizado', materia })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  eliminarMateria: async (req, res) => {
    try {
      const { id } = req.params
      const materia = await materiaModel.eliminarMateria(id)
      if (!materia) res.status(404).json({ message: 'Materia no encontrado' })
      res.json({ message: 'Materia eliminado' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}

module.exports = materiaController
