<template>
  <div>
    <div class="accordion" id="accordionExample">
      <Materia
        v-for="(dato, index) in materias"
        :key="index"
        :id_materia="dato.id"
      />
    </div>
  </div>
</template>
<script>
import Materia from './Materia.vue'
export default {
  name: 'ListaMaterias',
  data() {
    return {
      materias: [],
    }
  },
  components: { Materia },
  methods: {
    async obtenerMaterias() {
      await this.$axios
        .get(`/profesor/materias/lista/${this.id_profesor}`)
        .then((res) => (this.materias = res.data))
        .catch((err) => console.log(err))
    },
  },
  computed: {
    id_profesor() {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      return usuario.id
    },
  },
  async beforeMount() {
    await this.obtenerMaterias()
  },
}
</script>
