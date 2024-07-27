<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex justify-content-between">
        <CrearProfesor />
      </div>
    </div>
    <div class="row">
      <ListaProfesores />
    </div>
  </div>
</template>
<script>
import ListaProfesores from './ListaProfesores.vue'
import CrearProfesor from './CrearProfesor.vue'
export default {
  name: 'Profesores',
  components: {
    ListaProfesores,
    CrearProfesor,
  },
}
</script>
