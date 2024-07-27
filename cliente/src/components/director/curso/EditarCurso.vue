<template>
  <div class="col-6">
    <button
      type="button"
      class="btn btn-outline-warning"
      data-bs-toggle="modal"
      :data-bs-target="'#' + nameModal"
    >
      <i class="fa-solid fa-edit"></i>
    </button>
    <div class="modal fade" :id="nameModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Editar Curso</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <label for="grado" class="col-form-label"> Rol </label>
                    <select
                      v-model="curso.grado"
                      class="form-control"
                      id="grado"
                    >
                      <option value="" disabled selected>
                        Selecciona un grado
                      </option>
                      <option
                        v-for="(grado, index) in grados"
                        :key="index"
                        :value="grado"
                      >
                        {{ grado }}
                      </option>
                    </select>
                  </div>
                  <div class="col-6">
                    <label for="paralelo" class="col-form-label">
                      Paralelo
                    </label>
                    <select
                      v-model="curso.paralelo"
                      class="form-control"
                      id="paralelo"
                    >
                      <option value="" disabled selected>
                        Selecciona un paralelo
                      </option>
                      <option
                        v-for="(paralelo, index) in paralelos"
                        :key="index"
                        :value="paralelo"
                      >
                        {{ paralelo }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="id_profesor" class="col-form-label">
                  Asesor de curso
                </label>
                <select
                  v-model="curso.id_profesor"
                  class="form-control"
                  id="id_profesor"
                >
                  <option value="" disabled selected>
                    Selecciona un profesor
                  </option>
                  <option
                    v-for="(profesor, index) in profesores"
                    :key="index"
                    :value="profesor.id"
                  >
                    {{ profesor.nombre }}
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="guardarCurso"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditarCurso',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      profesores: [],
      curso: {
        grado: '',
        paralelo: '',
        id_profesor: '',
      },
      grados: ['PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO', 'QUINTO', 'SEXTO'],
      paralelos: ['A', 'B', 'C'],
      nameModal: `editarCurso${this.id}`,
    }
  },
  methods: {
    async guardarCurso() {
      await this.$axios
        .put(`/cursos/${this.id}`, this.curso)
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    },
    async obtenerProfesores() {
      await this.$axios
        .get('/director/profesores')
        .then((res) => (this.profesores = res.data))
        .catch((err) => console.log(err))
    },
  },
  async mounted() {
    await this.obtenerProfesores()
  },
  async beforeMount() {
    await this.$axios
      .get(`/cursos/${this.id}`)
      .then((res) => {
        const dato = res.data[0]
        const { grado, paralelo, id_profesor } = dato
        this.curso = {
          grado,
          paralelo,
          id_profesor,
        }
      })
      .catch((err) => console.log(err))
  },
}
</script>
