const profesorModel = require('../models/usuario')
const cursosModel = require('../models/curso')

const profesorController = {
  obtenerEstudiantes: async (req, res) => {
    try {
      const estudiantes = await profesorModel.obtenerEstudiantes('Estudiante')
      res.json(estudiantes)
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
