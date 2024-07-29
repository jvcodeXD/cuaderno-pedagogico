<template>
  <div>
    {{ nota.indicador }}
    <span class="badge rounded-pill">
      <input
        v-model="valor"
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
    nota: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      valor: null,
    }
  },
  methods: {
    async actualizarNota() {
      this.nota.nota = this.valor !== '' ? Number(this.valor) : 0
      await this.$axios
        .put(`/profesor/notas/${this.id}`, this.nota)
        .then(() => {
          this.$emit('nota-actualizada')
        })
        .catch((err) => console.log(err))
    },
  },
  created() {
    this.debouncedActualizarNota = debounce(this.actualizarNota, 500)
  },
  beforeMount() {
    this.valor = this.nota.nota
  },
}
</script>
