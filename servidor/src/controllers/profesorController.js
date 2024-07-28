const profesorModel = require('../models/usuario')
const cursosModel = require('../models/curso')

const profesorController = {
  obtenerEstudiantes: async (req, res) => {
    try {
      const { id } = req.params
      const estudiantes = await profesorModel.obtenerEstudiantes(
        'Estudiante',
        id
      )
      res.json(estudiantes)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  obtenerEstudiante: async (req, res) => {
    try {
      const { id } = req.params
      const estudiante = await profesorModel.obtenerEstudiante(id)
      res.json(estudiante)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  obtenerCursos: async (req, res) => {
    try {
      const { id } = req.params
      const cursos = await cursosModel.obtenerCursosProfesor(id)
      res.json(cursos)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = profesorController
