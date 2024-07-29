<template>
  <div>
    {{ calificacion.indicador }}
    <span class="badge rounded-pill">
      <input
        v-model="calificacion.nota"
        type="text"
        class="form-control narrow-column"
        placeholder="0"
        @input="debouncedActualizarNota"
      />
    </span>
  </div>
</template>
<script>
import { debounce } from 'lodash'
export default {
  name: 'Nota',
  props: {
    id: {
      type: Number,
      required: true,
    },
    id_estudiante: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      calificacion: {
        id_estudiante: this.id_estudiante,
        id_nota: this.id,
        nota: 0,
      },
    }
  },
  methods: {
    async obtenerCalificacion() {
      await this.$axios
        .get(`/profesor/calificacion/nota/${this.id}/${this.id_estudiante}`)
        .then((res) => (this.calificacion = res.data[0]))
        .catch((err) => console.log(err))
    },
    async actualizarNota() {
      const { id_nota, id_estudiante, nota } = this.calificacion
      const nuevaCalificacion = { id_nota, id_estudiante, nota }
      await this.$axios
        .put(
          `/profesor/calificacion/${this.calificacion.id}`,
          nuevaCalificacion
        )
        .then(() => {
          this.$emit('nota-actualizada')
        })
        .catch((err) => console.log(err))
    },
  },
  created() {
    this.debouncedActualizarNota = debounce(this.actualizarNota, 500)
  },
  async beforeMount() {
    await this.obtenerCalificacion()
  },
}
</script>
