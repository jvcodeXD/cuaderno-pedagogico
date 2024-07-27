<template>
  <div>
    <button
      type="button"
      class="btn btn-warning"
      data-bs-toggle="modal"
      :data-bs-target="'#' + nameModal"
    >
      <i class="fa-solid fa-pen"></i> Editar
    </button>
    <div class="modal fade" :id="nameModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Editar usuario</h1>
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
                <label :for="'nombre' + id" class="col-form-label">
                  Nombre completo
                </label>
                <input
                  type="text"
                  v-model="usuario.nombre"
                  class="form-control"
                  :id="'nombre' + id"
                  placeholder="Ingrese nombre completo"
                />
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <label for="ci" class="col-form-label"> CI </label>
                    <input
                      type="text"
                      v-model="usuario.ci"
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
                      v-model="usuario.telefono"
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
                  v-model="usuario.direccion"
                  class="form-control"
                  id="direccion"
                  placeholder="Ingrese direccion"
                />
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <label
                      :for="'fecha_nacimiento' + id"
                      class="col-form-label"
                    >
                      Fecha de nacimiento
                    </label>
                    <input
                      type="date"
                      v-model="usuario.fecha_nacimiento"
                      class="form-control"
                      :id="'fecha_nacimiento' + id"
                    />
                  </div>
                  <div class="col-6">
                    <label :for="'rol' + id" class="col-form-label">
                      Rol
                    </label>
                    <select
                      v-model="usuario.rol"
                      class="form-control"
                      :id="'rol' + id"
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
                    <label :for="'user' + id" class="col-form-label">
                      Usuario
                    </label>
                    <input
                      type="text"
                      v-model="usuario.user"
                      class="form-control"
                      :id="'user' + id"
                      placeholder="Ingrese usuario"
                    />
                  </div>
                  <div class="col-6">
                    <label :for="'pass' + id" class="col-form-label">
                      Contraseña
                    </label>
                    <div class="input-group">
                      <input
                        :type="mostrarContrasena ? 'text' : 'password'"
                        v-model="usuario.pass"
                        class="form-control"
                        :id="'pass' + id"
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
              v-on:click="crearUsuario"
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
  name: 'EditarUsuario',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      usuario: {
        nombre: null,
        ci: null,
        telefono: null,
        direccion: null,
        fecha_nacimiento: null,
        rol: '',
        user: null,
        pass: null,
      },
      nameModal: `editarUsuario${this.id}`,
      roles: ['Administrador', 'Director', 'Profesor', 'Estudiante'],
      mostrarContrasena: false,
    }
  },
  methods: {
    async crearUsuario() {
      await this.$axios
        .put(`usuarios/${this.id}`, this.usuario)
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    },
    togglePassword() {
      this.mostrarContrasena = !this.mostrarContrasena
    },
  },
  async beforeMount() {
    await this.$axios
      .get(`usuarios/${this.id}`)
      .then((res) => {
        const dato = res.data[0]
        const { nombre, ci, telefono, direccion, fecha_nacimiento, rol, user } =
          dato
        this.usuario = {
          nombre,
          ci,
          telefono,
          direccion,
          fecha_nacimiento: new Date(fecha_nacimiento)
            .toISOString()
            .split('T')[0],
          rol,
          user,
          pass: null,
        }
      })
      .catch((err) => console.log(err))
  },
}
</script>
