<template>
  <router-view :key="$route.path"></router-view>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      usuario: null,
    }
  },
  mounted() {
    const usuarioData = localStorage.getItem('usuario')
    if (usuarioData) this.usuario = JSON.parse(usuarioData)
  },
}
</script>
