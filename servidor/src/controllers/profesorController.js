const profesorModel = require('../models/usuario')

const profesorController = {
  obtenerEstudiantes: async (req, res) => {
    try {
      const estudiantes = await profesorModel.obtenerRoles(['Estudiante'])
      res.json(estudiantes)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = profesorController
