<template>
  <div class="container">
    <div class="row">
      <ListaCursos />
    </div>
  </div>
</template>
<script>
import ListaCursos from './ListaCursos.vue'
export default {
  name: 'Curso',
  components: { ListaCursos },
}
</script>
