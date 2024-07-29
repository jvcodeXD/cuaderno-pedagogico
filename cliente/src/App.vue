<script setup>
import Navigation from './views/Navigation.vue'
</script>

<template>
  <div>
    <Navigation />
    <div id="contenedor">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>
