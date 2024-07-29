const pool = require('../config/database')

const calificacion = {
  obtenerCalificaciones: async (id_nota, id_estudiante) => {
    return await pool.query(
      'select c.nota, c.id, c.id_nota, c.id_estudiante, n.indicador from calificacion c, nota n where c.id_nota = n.id and n.id = ? and c.id_estudiante = ?',
      [id_nota, id_estudiante]
    )
  },
  obtenerCalificacionesNota: async (id_estudiante, id_materia) => {
    return await pool.query(
      'select c.nota, c.id, n.indicador, n.campo from calificacion c, nota n, materia m where c.id_nota = n.id and c.id_estudiante = ? and n.id_materia = m.id and m.id = ?',
      [id_estudiante, id_materia]
    )
  },
  obtenerCalificacion: async (id) => {
    return await pool.query('select * from calificacion where id = ?', [id])
  },
  crearCalificacion: async (calificacion) => {
    return await pool.query('insert into calificacion set ?', [calificacion])
  },
  actualizarCalificacion: async (calificacion, id) => {
    return await pool.query('update calificacion set ? where id = ?', [
      calificacion,
      id,
    ])
  },
  eliminarCalificacion: async (id) => {
    return await pool.query('delete from calificacion where id = ?', [id])
  },
}

module.exports = calificacion
