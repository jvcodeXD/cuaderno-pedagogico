<template>
  <div>
    <button
      type="button"
      class="btn"
      data-bs-toggle="modal"
      data-bs-target="#crearUsuario"
    >
      Agregar curso
    </button>
    <div class="modal fade" id="crearUsuario" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Crear curso</h1>
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
              v-on:click="crearCurso"
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
  name: 'CrearCurso',
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
    }
  },
  methods: {
    async crearCurso() {
      await this.$axios
        .post('cursos', this.curso)
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    },
  },
  async mounted() {
    await this.$axios
      .get('/director/profesores')
      .then((res) => (this.profesores = res.data))
      .catch((err) => console.log(err))
  },
}
</script>
