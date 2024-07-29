const pool = require('../config/database')

const calificacion = {
  obtenerCalificaciones: async (id_nota) => {
    return await pool.query(
      'select c.nota, c.id, c.id_nota, c.id_estudiante from calificacion c, nota n where c.id_nota = n.id and n.id = ?',
      [id_nota]
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
