const cursoModel = require('../models/curso')

const cursoController = {
  obtenerCursos: async (req, res) => {
    try {
      const cursos = await cursoModel.obtenerCursos()
      res.json(cursos)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  obtenerCurso: async (req, res) => {
    try {
      const { id } = req.params
      const curso = await cursoModel.obtenerCurso(id)
      if (!curso) res.status(400).json({ message: 'Curso no encontrado' })
      res.status(200).json(curso)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  crearCurso: async (req, res) => {
    try {
      const nuevoCurso = req.body
      const curso = await cursoModel.crearCurso(nuevoCurso)
      res.status(201).json(curso)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  actualizarCurso: async (req, res) => {
    try {
      const { id } = req.params
      const nuevoCurso = req.body
      const curso = await cursoModel.actualizarCurso(nuevoCurso, id)
      if (!curso) res.status(404).json({ message: 'Curso no encontrado' })
      res.json({ message: 'Curso actualizado', curso })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  eliminarCurso: async (req, res) => {
    try {
      const { id } = req.params
      const curso = await cursoModel.eliminarCurso(id)
      if (!curso) res.status(404).json({ message: 'Curso no encontrado' })
      res.json({ message: 'Curso eliminado' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}

module.exports = cursoController
