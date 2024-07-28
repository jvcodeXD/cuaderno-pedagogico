<template>
  <div>
    <button
      type="button"
      class="btn btn-outline-success"
      data-bs-toggle="modal"
      data-bs-target="#crearMateria"
    >
      Agregar Materia
    </button>
    <div class="modal fade" id="crearMateria" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Crear materia</h1>
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
                  <div class="col-7">
                    <label for="nombre" class="col-form-label">
                      Nombre de materia
                    </label>
                    <input
                      type="text"
                      v-model="materia.nombre"
                      class="form-control"
                      id="nombre"
                      placeholder="Ingrese nombre de materia"
                    />
                  </div>
                  <div class="col-5">
                    <label for="id_curso" class="col-form-label"> Curso </label>
                    <select
                      v-model="materia.id_curso"
                      class="form-control"
                      id="id_curso"
                    >
                      <option value="" disabled selected>
                        Selecciona un curso
                      </option>
                      <option
                        v-for="(curso, index) in cursos"
                        :key="index"
                        :value="curso.id"
                      >
                        {{ cursoNombre(curso) }}
                      </option>
                    </select>
                  </div>
                </div>
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
              v-on:click="crearMateria"
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
  name: 'CrearMateria',
  data() {
    return {
      materia: {
        id_curso: '',
        nombre: null,
      },
      cursos: [],
    }
  },
  methods: {
    cursoNombre(dato) {
      return `${dato.grado} ${dato.paralelo}`
    },
    async obtenerCursos() {
      await this.$axios
        .get(`/profesor/cursos/${this.id_profesor}`)
        .then((res) => (this.cursos = res.data))
        .catch((err) => console.log(err))
    },
    async crearMateria() {
      await this.$axios
        .post('/profesor/materias', this.materia)
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    },
  },
  computed: {
    id_profesor() {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      return usuario.id
    },
  },
  async beforeMount() {
    await this.obtenerCursos()
  },
}
</script>
