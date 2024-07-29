const calificacionModel = require('../models/calificacion')

const calificacionController = {
  obtenerCalificaciones: async (req, res) => {
    try {
      const { id } = req.params
      const calificacions = await calificacionModel.obtenerCalificaciones(id)
      res.json(calificacions)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  obtenerCalificacion: async (req, res) => {
    try {
      const { id } = req.params
      const calificacion = await calificacionModel.obtenerCalificacion(id)
      if (!calificacion)
        res.status(400).json({ message: 'Calificacion no encontrado' })
      res.status(200).json(calificacion)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  crearCalificacion: async (req, res) => {
    try {
      const nuevoCalificacion = req.body
      const calificacion = await calificacionModel.crearCalificacion(
        nuevoCalificacion
      )
      res.status(201).json(calificacion)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  actualizarCalificacion: async (req, res) => {
    try {
      const { id } = req.params
      const nuevoCalificacion = req.body
      const calificacion = await calificacionModel.actualizarCalificacion(
        nuevoCalificacion,
        id
      )
      if (!calificacion)
        res.status(404).json({ message: 'Calificacion no encontrado' })
      res.json({ message: 'Calificacion actualizado', calificacion })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  eliminarCalificacion: async (req, res) => {
    try {
      const { id } = req.params
      const calificacion = await calificacionModel.eliminarCalificacion(id)
      if (!calificacion)
        res.status(404).json({ message: 'Calificacion no encontrado' })
      res.json({ message: 'Calificacion eliminado' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}

module.exports = calificacionController
