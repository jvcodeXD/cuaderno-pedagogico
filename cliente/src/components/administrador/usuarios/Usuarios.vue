<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex justify-content-between">
        <CrearUsuario />
      </div>
    </div>
    <div class="row">
      <ListaUsuarios />
    </div>
  </div>
</template>
<script>
import ListaUsuarios from './ListaUsuarios.vue'
import CrearUsuario from './CrearUsuario.vue'
export default {
  name: 'Usuarios',
  components: {
    ListaUsuarios,
    CrearUsuario,
  },
}
</script>
