<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <AdminNavigation v-if="usuario?.rol === 'Administrador'" />
        <div v-if="usuario" class="d-flex align-items-center">
          <span class="mx-2">
            <i class="fa-solid fa-user"></i> {{ usuario.rol }}
          </span>
          <button class="btn btn-outline-secondary ms-3" @click="logout">
            Salir
          </button>
        </div>
        <div v-else class="d-flex">
          <button class="btn btn-outline-primary">
            <router-link to="/login" class="nav-link">Ingresar</router-link>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import AdminNavigation from '../components/administrador/Navigation.vue'
export default {
  data() {
    return {
      usuario: null,
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('usuario')
      this.usuario = null
      this.$router.push('/')
    },
  },
  components: {
    AdminNavigation,
  },
  mounted() {
    const usuarioData = localStorage.getItem('usuario')
    if (usuarioData) {
      this.usuario = JSON.parse(usuarioData)
    }
  },
}
</script>
