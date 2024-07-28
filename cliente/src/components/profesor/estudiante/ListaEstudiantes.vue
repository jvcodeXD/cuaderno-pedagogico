<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Completo</th>
          <th scope="col">CI</th>
          <th scope="col">Edad</th>
          <th scope="col">Curso</th>
          <th scope="col">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in estudiantes" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ data.nombre }}</td>
          <td>{{ data.ci }}</td>
          <td>{{ obtenerEdad(new Date(data.fecha_nacimiento)) }}</td>
          <td>{{ cursoNombre(data) }}</td>
          <td>
            <router-link
              :to="{ path: `/profesor/perfil-estudiante/${data.id}` }"
              class="btn btn-primary rounded"
            >
              <i class="fa-solid fa-user"></i> Ver perfil
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import PerfilEstudiante from './DatosEstudiante.vue'
export default {
  name: 'ListaEstudiantes',
  data() {
    return {
      estudiantes: [],
    }
  },
  components: { PerfilEstudiante },
  methods: {
    obtenerEdad(fecha) {
      const fechaNac = new Date(fecha)
      const fechaActual = new Date()

      let edad = fechaActual.getFullYear() - fechaNac.getFullYear()
      const mes = fechaActual.getMonth() - fechaNac.getMonth()
      if (
        mes < 0 ||
        (mes === 0 && fechaActual.getDate() < fechaNac.getDate())
      ) {
        edad--
      }

      return edad
    },
    cursoNombre(dato) {
      return `${dato.grado} ${dato.paralelo}`
    },
    async obtenerEstudiantes() {
      await this.$axios
        .get(`/profesor/estudiantes/lista/${this.id_profesor}`)
        .then((res) => (this.estudiantes = res.data))
        .catch((err) => {
          console.log(err)
        })
    },
  },
  computed: {
    id_profesor() {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      return Number(usuario.id)
    },
  },
  async mounted() {
    await this.obtenerEstudiantes()
  },
}
</script>
