const estudianteModel = require('../models/usuario')

const estudianteController = {
  obtenerEstudiantes: async (req, res) => {
    try {
      const estudiantes = await estudianteModel.obtenerRoles(['Estudiante'])
      res.json(estudiantes)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = estudianteController
