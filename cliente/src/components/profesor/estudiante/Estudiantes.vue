<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex justify-content-between">
        <CrearEstudiante />
      </div>
    </div>
    <div class="row">
      <ListaEstudiantes />
    </div>
  </div>
</template>
<script>
import ListaEstudiantes from './ListaEstudiantes.vue'
import CrearEstudiante from './CrearEstudiante.vue'
export default {
  name: 'Estudiantes',
  components: { ListaEstudiantes, CrearEstudiante },
}
</script>
