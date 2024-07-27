const pool = require('../config/database')

const curso = {
  obtenerCursos: async () => {
    return await pool.query(
      'select c.id, c.grado, c.paralelo, p.nombre from curso c, usuario p where c.id_profesor = p.id order by c.grado, c.paralelo'
    )
  },
  obtenerCurso: async (id) => {
    return await pool.query('select * from curso where id = ?', [id])
  },
  crearCurso: async (curso) => {
    return await pool.query('insert into curso set ?', [curso])
  },
  actualizarCurso: async (curso, id) => {
    return await pool.query('update curso set ? where id = ?', [curso, id])
  },
  eliminarCurso: async (id) => {
    return await pool.query('delete from curso where id = ?', [id])
  },
}

module.exports = curso
