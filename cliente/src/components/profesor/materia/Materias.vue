<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex justify-content-between">
        <CrearMateria />
      </div>
    </div>
    <div class="row">
      <ListaMaterias />
    </div>
  </div>
</template>
<script>
import ListaMaterias from './ListaMaterias.vue'
import CrearMateria from './CrearMateria.vue'
export default {
  name: 'Materias',
  components: { ListaMaterias, CrearMateria },
}
</script>
