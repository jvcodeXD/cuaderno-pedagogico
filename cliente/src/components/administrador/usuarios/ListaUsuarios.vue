<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Completo</th>
          <th scope="col">CI</th>
          <th scope="col">Telefono</th>
          <th scope="col">Direccion</th>
          <th scope="col">Fecha de nacimiento</th>
          <th scope="col">Rol</th>
          <th scope="col">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in usuarios" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ data.nombre }}</td>
          <td>{{ data.ci }}</td>
          <td>{{ data.telefono }}</td>
          <td>{{ data.direccion }}</td>
          <td>{{ formatoFecha(new Date(data.fecha_nacimiento)) }}</td>
          <td>{{ data.rol }}</td>
          <td>
            <div class="d-flex justify-content-evenly">
              <EditarUsuario :id="data.id" />
              <button
                class="btn btn-danger rounded"
                v-on:click="eliminarUsuario(data.id)"
              >
                <i class="fa-solid fa-trash"></i> Eliminar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import EditarUsuario from './EditarUsuario.vue'
export default {
  name: 'ListaUsuarios',
  data() {
    return {
      usuarios: [],
      baseServer: import.meta.env.VITE_BASE_SERVER,
    }
  },
  components: {
    EditarUsuario,
  },
  methods: {
    formatoFecha(fecha) {
      return fecha.toLocaleDateString()
    },
    async obtenerUsuarios() {
      await this.$axios
        .get('/usuarios')
        .then((res) => {
          this.usuarios = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async eliminarUsuario(id) {
      await this.$axios
        .delete(`usuarios/${id}`)
        .then(() => {
          this.obtenerUsuarios()
        })
        .catch((err) => console.log(err))
    },
  },
  async mounted() {
    await this.obtenerUsuarios()
  },
}
</script>
