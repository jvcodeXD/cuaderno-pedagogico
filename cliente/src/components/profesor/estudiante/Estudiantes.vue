<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex justify-content-between">Crear estudiante</div>
    </div>
    <div class="row">
      <ListaEstudiantes />
    </div>
  </div>
</template>
<script>
import ListaEstudiantes from './ListaEstudiantes.vue'
export default {
  name: 'Estudiantes',
  components: { ListaEstudiantes },
}
</script>
