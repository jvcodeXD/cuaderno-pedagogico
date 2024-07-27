<template>
  <div>
    <button
      type="button"
      class="btn btn-success"
      data-bs-toggle="modal"
      data-bs-target="#crearProfesor"
    >
      Agregar profesor
    </button>
    <div class="modal fade" id="crearProfesor" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Crear profesor</h1>
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
                  v-model="profesor.nombre"
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
                      v-model="profesor.ci"
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
                      v-model="profesor.telefono"
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
                  v-model="profesor.direccion"
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
                      v-model="profesor.fecha_nacimiento"
                      class="form-control"
                      id="fecha_nacimiento"
                    />
                  </div>
                  <div class="col-6">
                    <label for="rol" class="col-form-label"> Rol </label>
                    <select
                      v-model="profesor.rol"
                      class="form-control"
                      id="rol"
                    >
                      <option value="" disabled selected>
                        Selecciona un rol
                      </option>
                      <option v-for="role in roles" :key="role" :value="role">
                        {{ role }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <label for="user" class="col-form-label"> Profesor </label>
                    <input
                      type="text"
                      v-model="profesor.user"
                      class="form-control"
                      id="user"
                      placeholder="Ingrese profesor"
                    />
                  </div>
                  <div class="col-6">
                    <label for="pass" class="col-form-label">
                      Contraseña
                    </label>
                    <div class="input-group">
                      <input
                        :type="mostrarContrasena ? 'text' : 'password'"
                        v-model="profesor.pass"
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
              v-on:click="crearProfesor"
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
  name: 'CrearProfesor',
  data() {
    return {
      profesor: {
        nombre: null,
        ci: null,
        telefono: null,
        direccion: null,
        fecha_nacimiento: null,
        rol: '',
        user: null,
        pass: null,
      },
      roles: ['Profesor'],
      mostrarContrasena: false,
    }
  },
  methods: {
    async crearProfesor() {
      await this.$axios
        .post('director/profesores', this.profesor)
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    },
    togglePassword() {
      this.mostrarContrasena = !this.mostrarContrasena
    },
  },
}
</script>
