const notaModel = require('../models/nota')
const calificacionModel = require('../models/calificacion')
const usuarioModel = require('../models/usuario')

const notaController = {
  obtenerNotas: async (req, res) => {
    try {
      const notas = await notaModel.obtenerNotas()
      res.json(notas)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  obtenerNotasEstudiante: async (req, res) => {
    try {
      const { id } = req.params
      const notas = await notaModel.obtenerNotasEstudiante(id)
      res.json(notas)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  obtenerNotasMateriaCampo: async (req, res) => {
    try {
      const { id, campo } = req.params
      const notas = await notaModel.obtenerNotasMateriaCampo(id, campo)
      res.json(notas)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  obtenerNotasMateria: async (req, res) => {
    try {
      const { id } = req.params
      const notas = await notaModel.obtenerNotasMateria(id)
      res.json(notas)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  obtenerNota: async (req, res) => {
    try {
      const { id } = req.params
      const nota = await notaModel.obtenerNota(id)
      if (!nota) res.status(400).json({ message: 'Nota no encontrado' })
      res.status(200).json(nota)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  crearNota: async (req, res) => {
    try {
      const nuevoNota = req.body
      const nota = await notaModel.crearNota(nuevoNota)
      const id_nota = nota.insertId

      const estudiantes = await usuarioModel.obtenerEstudiantesMateria(
        nuevoNota.id_materia
      )

      const promesas = estudiantes.map(async (estudiante) => {
        const nuevaCalificacion = {
          id_estudiante: estudiante.id_estudiante,
          id_nota,
          nota: 0,
        }
        await calificacionModel.crearCalificacion(nuevaCalificacion)
      })

      await Promise.all(promesas)

      res.status(201).json(nota)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  actualizarNota: async (req, res) => {
    try {
      const { id } = req.params
      const nuevoNota = req.body
      const nota = await notaModel.actualizarNota(nuevoNota, id)
      if (!nota) res.status(404).json({ message: 'Nota no encontrado' })
      res.json({ message: 'Nota actualizado', nota })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  eliminarNota: async (req, res) => {
    try {
      const { id } = req.params
      const nota = await notaModel.eliminarNota(id)
      if (!nota) res.status(404).json({ message: 'Nota no encontrado' })
      res.json({ message: 'Nota eliminado' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}

module.exports = notaController
