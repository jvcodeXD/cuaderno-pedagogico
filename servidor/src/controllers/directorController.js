const directorModel = require('../models/usuario')

const directorController = {
  obtenerProfesores: async (req, res) => {
    try {
      const profesores = await directorModel.obtenerRoles(['Profesor'])
      res.json(profesores)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = directorController
