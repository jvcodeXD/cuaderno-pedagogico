<template>
  <div>
    <button
      type="button"
      class="btn btn-success"
      data-bs-toggle="modal"
      data-bs-target="#crearEstudiante"
    >
      Agregar estudiante
    </button>
    <div
      class="modal fade"
      id="crearEstudiante"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Crear estudiante</h1>
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
                <label for="nombre" class="col-form-label">
                  Nombre completo
                </label>
                <input
                  type="text"
                  v-model="estudiante.nombre"
                  class="form-control"
                  id="nombre"
                  placeholder="Ingrese nombre completo"
                />
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <label for="ci" class="col-form-label"> CI </label>
                    <input
                      type="text"
                      v-model="estudiante.ci"
                      class="form-control"
                      id="ci"
                      placeholder="Ingrese CI"
                    />
                  </div>
                  <div class="col-6">
                    <label for="telefono" class="col-form-label">
                      Telefono
                    </label>
                    <input
                      type="text"
                      v-model="estudiante.telefono"
                      class="form-control"
                      id="telefono"
                      placeholder="Ingrese telefono"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="direccion" class="col-form-label">
                  Direccion
                </label>
                <input
                  type="text"
                  v-model="estudiante.direccion"
                  class="form-control"
                  id="direccion"
                  placeholder="Ingrese direccion"
                />
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <label for="fecha_nacimiento" class="col-form-label">
                      Fecha de nacimiento
                    </label>
                    <input
                      type="date"
                      v-model="estudiante.fecha_nacimiento"
                      class="form-control"
                      id="fecha_nacimiento"
                    />
                  </div>
                  <div class="col-6">
                    <label for="id_curso" class="col-form-label">
                      Cursos
                    </label>
                    <select
                      v-model="estudiante.id_curso"
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
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <label for="user" class="col-form-label">
                      Estudiante
                    </label>
                    <input
                      type="text"
                      v-model="estudiante.user"
                      class="form-control"
                      id="user"
                      placeholder="Ingrese estudiante"
                    />
                  </div>
                  <div class="col-6">
                    <label for="pass" class="col-form-label">
                      Contraseña
                    </label>
                    <div class="input-group">
                      <input
                        :type="mostrarContrasena ? 'text' : 'password'"
                        v-model="estudiante.pass"
                        class="form-control"
                        id="pass"
                        placeholder="Ingrese contraseña"
                      />
                      <span class="input-group-text" @click="togglePassword">
                        <i
                          :class="
                            mostrarContrasena
                              ? 'fa-solid fa-eye'
                              : 'fa-solid fa-eye-slash'
                          "
                        >
                        </i>
                      </span>
                    </div>
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
              v-on:click="crearEstudiante"
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
  name: 'CrearEstudiante',
  data() {
    return {
      estudiante: {
        nombre: null,
        ci: null,
        telefono: null,
        direccion: null,
        fecha_nacimiento: null,
        rol: 'Estudiante',
        user: null,
        pass: null,
        id_curso: '',
      },
      cursos: [],
      mostrarContrasena: false,
    }
  },
  methods: {
    cursoNombre(curso) {
      return `${curso.grado} ${curso.paralelo}`
    },
    async crearEstudiante() {
      await this.$axios
        .post('usuarios', this.estudiante)
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    },
    async obtenerCursos() {
      await this.$axios
        .get(`/profesor/cursos/${this.id_profesor}`)
        .then((res) => {
          this.cursos = res.data
        })
        .catch((err) => console.log(err))
    },
    togglePassword() {
      this.mostrarContrasena = !this.mostrarContrasena
    },
  },
  computed: {
    id_profesor() {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      return Number(usuario.id)
    },
  },
  async beforeMount() {
    await this.obtenerCursos()
  },
}
</script>
