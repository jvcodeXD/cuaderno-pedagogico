const pool = require('../config/database')

const materia = {
  obtenerMaterias: async (id) => {
    return await pool.query(
      'select m.id_curso, m.nombre, m.id, c.grado, c.paralelo from materia m, curso c, usuario u where m.id_curso = c.id and c.id_profesor = u.id and u.id = ?',
      [id]
    )
  },
  obtenerMateria: async (id) => {
    return await pool.query(
      'select m.id_curso, m.nombre, m.id, c.grado, c.paralelo from materia m, curso c where m.id = ? and m.id_curso = c.id',
      [id]
    )
  },
  crearMateria: async (materia) => {
    return await pool.query('insert into materia set ?', [materia])
  },
  actualizarMateria: async (materia, id) => {
    return await pool.query('update materia set ? where id = ?', [materia, id])
  },
  eliminarMateria: async (id) => {
    return await pool.query('delete from materia where id = ?', [id])
  },
}

module.exports = materia
