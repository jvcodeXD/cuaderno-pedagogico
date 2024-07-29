<template>
  <div class="col">
    <div class="card mb-3" style="max-width: 25rem">
      <div class="card-header">
        <strong>{{ campo }}</strong>
        {{ descripcion }}
      </div>
      <div class="card-body text-dark">
        <ul class="list-group">
          <li
            v-for="(nota, index) in notas"
            :key="index"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            {{ nota.indicador }}
            <button
              v-on:click="eliminarIndicador(nota.id)"
              class="badge text-bg-danger rounded-pill"
            >
              <i class="fa-solid fa-minus"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Indicadores',
  props: {
    id_materia: {
      type: Number,
      required: true,
    },
    campo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      notas: [],
    }
  },
  methods: {
    async obtenerIndicadores() {
      await this.$axios
        .get(`/profesor/notas/lista/${this.id_materia}`)
        .then((res) => {
          this.notas = res.data.filter(
            (calificacion) =>
              calificacion.campo === this.campo &&
              calificacion.id_materia === this.id_materia
          )
        })
        .catch((err) => console.log(err))
    },
    async eliminarIndicador(id) {
      await this.$axios
        .delete(`/profesor/notas/${id}`)
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    },
  },
  async beforeMount() {
    await this.obtenerIndicadores()
  },
}
</script>
