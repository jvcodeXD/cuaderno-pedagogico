<template>
  <div>
    <div class="card">
      <div class="d-flex card-header justify-content-center">
        <p class="fs-2">{{ estudiante?.nombre }}</p>
      </div>
      <div class="card-body">
        <div class="row d-flex justify-content-between">
          <div class="col-auto">
            <p class="lead"><strong>CI: </strong>{{ estudiante?.ci }}</p>
          </div>
          <div class="col-auto">
            <p class="lead">
              <strong>Fecha de nacimiento: </strong>
              {{ formatoFecha(new Date(estudiante?.fecha_nacimiento)) }}
            </p>
          </div>
          <div class="col-auto">
            <p class="lead">
              <strong>Edad: </strong>
              {{ obtenerEdad(new Date(estudiante?.fecha_nacimiento)) }}
            </p>
          </div>
          <div class="col-auto">
            <p class="lead">
              <strong>Curso: </strong>
              {{ `${estudiante?.grado} ${estudiante?.paralelo}` }}
            </p>
          </div>
        </div>
        <div class="row d-flex justify-content-between">
          <div class="col-auto">
            <p class="lead">
              <strong>Direccion: </strong>
              {{ estudiante?.direccion }}
            </p>
          </div>
          <div class="col-auto">
            <p class="lead">
              <strong>Telefono: </strong>
              {{ estudiante?.telefono }}
            </p>
          </div>
        </div>
      </div>
      <div class="card-body">Apoderados</div>
      <div class="card-footer">
        <div class="row d-flex justify-content-end">
          <div class="col-auto">
            <EditarEstudiante :id="id" />
          </div>
          <div class="col-auto">
            <button
              v-on:click="eliminarEstudiante()"
              type="button"
              class="btn btn-outline-danger"
            >
              <i class="fa-solid fa-trash"></i> Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditarEstudiante from './EditarEstudiante.vue'
export default {
  name: 'PerfilEstudiante',
  data() {
    return {
      estudiante: null,
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: { EditarEstudiante },
  methods: {
    formatoFecha(fecha) {
      return fecha.toLocaleDateString()
    },
    async eliminarEstudiante() {
      await this.$axios
        .delete(`/usuarios/${this.id}`)
        .then(() => {
          this.$router.go(-1)
        })
        .catch((err) => console.log(err))
    },
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
  },
  async beforeMount() {
    await this.$axios
      .get(`/profesor/estudiante/${this.id}`)
      .then((res) => {
        this.estudiante = res.data[0]
      })
      .catch((err) => console.log(err))
  },
}
</script>
