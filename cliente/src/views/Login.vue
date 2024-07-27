<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-around">
      <div class="row bg-light m-3 rounded">
        <div class="col">
          <form class="form-floating" role="form">
            <div class="m-3 d-flex justify-content-center">
              <p class="fs-2">Iniciar sesion</p>
            </div>
            <div class="mb-3 form-floating">
              <input
                v-model="usuario.user"
                type="text"
                class="form-control"
                id="user"
                placeholder="name@example.com"
                :class="{ 'is-invalid': userError }"
              />
              <label for="user">Usuario</label>
            </div>
            <div class="mb-3 form-floating">
              <input
                v-model="usuario.pass"
                type="password"
                class="form-control"
                id="pass"
                placeholder="contraseña"
                :class="{ 'is-invalid': passError }"
              />
              <label for="pass">Contraseña</label>
            </div>
          </form>
          <div class="mb-3 d-flex justify-content-between">
            <button type="submit" class="btn btn-secondary" v-on:click="goBack">
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary" v-on:click="login">
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      usuario: {
        user: '',
        pass: '',
      },
      userError: null,
      passError: null,
    }
  },
  methods: {
    async login() {
      if (!this.userError && !this.passError) {
        await this.$axios
          .post('/auth/login', this.usuario)
          .then((res) => {
            localStorage.setItem('usuario', JSON.stringify(res.data))
            const link = `/${res.data.rol.toLowerCase()}/`
            this.$router.push(link)
            window.location.reload()
          })
          .catch((err) => console.log(err))
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  },
  watch: {
    'usuario.user': function (data) {
      this.userError = data.user === '' ? 'Usuario vacio' : null
      this.userError =
        data.length < 3 ? 'El usuario debe tener al menos 3 letras' : null
    },
    'usuario.pass': function (data) {
      this.passError = data.pass === '' ? 'Contraseña vacia' : null
      this.passError =
        data.length < 3 ? 'La contraseña debe contener al menos 3 letras' : null
    },
  },
  mounted() {},
}
</script>
<style scoped></style>
