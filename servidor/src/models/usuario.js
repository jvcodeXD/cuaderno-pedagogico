const pool = require('../config/database')

const usuario = {
  obtenerUsuarios: async () => {
    return await pool.query('select * from usuario')
  },
  obtenerUsuario: async (id) => {
    return await pool.query('select * from usuario where id = ?', [id])
  },
  crearUsuario: async (usuario) => {
    return await pool.query('insert into usuario set ?', [usuario])
  },
  actualizarUsuario: async (usuario, id) => {
    return await pool.query('update usuario set ? where id = ?', [usuario, id])
  },
  eliminarUsuario: async (id) => {
    return await pool.query('delete from usuario where id = ?', [id])
  },
  verificarUsuario: async (user) => {
    return await pool.query('select * from usuario where user = ?', [user])
  },
  obtenerRoles: async (roles) => {
    return await pool.query('select * from usuario where rol in (?)', [roles])
  },
  obtenerEstudiantes: async (rol) => {
    return await pool.query(
      'select distinct u.id, nombre, ci, direccion, fecha_nacimiento, telefono, id_curso, c.id, grado, paralelo  from usuario u, curso c where rol = ?',
      [rol]
    )
  },
}

module.exports = usuario
