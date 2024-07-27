<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-3 p-3 d-flex align-items-center justify-content-center">
        <div class="card border-success mb-3">
          <CrearCurso />
        </div>
      </div>
      <div class="col-3 p-3" v-for="(dato, index) in cursos" :key="index">
        <div class="card mb-3" style="max-width: 18rem">
          <div class="card-header">
            <div class="row justify-content-between align-items-center">
              <div class="col-auto">
                {{ `${dato.grado} ${dato.paralelo}` }}
              </div>
              <div class="col-auto">
                <div class="row">
                  <EditarCurso :id="dato.id" />
                  <button
                    class="col-5 btn btn-outline-danger"
                    v-on:click="eliminarCurso(dato.id)"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body text-success">
            <p class="card-text">Profesor: {{ dato.nombre }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CrearCurso from './CrearCurso.vue'
import EditarCurso from './EditarCurso.vue'
export default {
  name: 'ListaCursos',
  data() {
    return {
      cursos: [],
    }
  },
  components: {
    CrearCurso,
    EditarCurso,
  },
  methods: {
    async obtenerCursos() {
      await this.$axios
        .get('/cursos')
        .then((res) => (this.cursos = res.data))
        .catch((err) => console.log(err))
    },
    async eliminarCurso(id) {
      await this.$axios
        .delete(`cursos/${id}`)
        .then(() => {
          this.obtenerCursos()
        })
        .catch((err) => console.log(err))
    },
  },
  async mounted() {
    await this.obtenerCursos()
  },
}
</script>
