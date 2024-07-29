const pool = require('../config/database')

const nota = {
  obtenerNotas: async () => {
    return await pool.query('select * from nota')
  },
  obtenerNotasEstudiante: async (id) => {
    return await pool.query(
      'select n.id, n.indicador, n.campo, m.nombre, c.grado, c.paralelo, n.id_materia from nota n, materia m, curso c, usuario u where n.id_materia = m.id and m.id_curso = c.id and u.id_curso = c.id and u.id = ?',
      [id]
    )
  },
  obtenerNotasMateriaCampo: async (id, campo) => {
    return await pool.query(
      'select n.id, n.indicador, n.campo from nota n, materia m where n.id_materia = m.id and m.id = ? and n.campo = ?',
      [id, campo]
    )
  },
  obtenerNotasMateria: async (id) => {
    return await pool.query(
      'select n.id, n.indicador, n.campo from nota n, materia m where n.id_materia = m.id and m.id = ?',
      [id]
    )
  },
  obtenerNota: async (id) => {
    return await pool.query('select * from nota where id = ?', [id])
  },
  crearNota: async (nota) => {
    return await pool.query('insert into nota set ?', [nota])
  },
  actualizarNota: async (nota, id) => {
    return await pool.query('update nota set ? where id = ?', [nota, id])
  },
  eliminarNota: async (id) => {
    return await pool.query('delete from nota where id = ?', [id])
  },
}

module.exports = nota
