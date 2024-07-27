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
        <tr v-for="(data, index) in profesores" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ data.nombre }}</td>
          <td>{{ data.ci }}</td>
          <td>{{ data.telefono }}</td>
          <td>{{ data.direccion }}</td>
          <td>{{ formatoFecha(new Date(data.fecha_nacimiento)) }}</td>
          <td>{{ data.rol }}</td>
          <td>
            <div class="d-flex justify-content-evenly">
              <EditarProfesor :id="data.id" />
              <button
                class="btn btn-danger rounded"
                v-on:click="eliminarProfesor(data.id)"
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
import EditarProfesor from './EditarProfesor.vue'
export default {
  name: 'ListaProfesores',
  data() {
    return {
      profesores: [],
      baseServer: import.meta.env.VITE_BASE_SERVER,
    }
  },
  components: {
    EditarProfesor,
  },
  methods: {
    formatoFecha(fecha) {
      return fecha.toLocaleDateString()
    },
    async obtenerProfesores() {
      await this.$axios
        .get('/director/profesores')
        .then((res) => {
          this.profesores = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async eliminarProfesor(id) {
      await this.$axios
        .delete(`/director/profesores/${id}`)
        .then(() => {
          this.obtenerProfesores()
        })
        .catch((err) => console.log(err))
    },
  },
  async mounted() {
    await this.obtenerProfesores()
  },
}
</script>
