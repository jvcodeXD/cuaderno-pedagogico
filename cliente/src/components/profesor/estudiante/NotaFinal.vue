<template>
  <input type="text" class="form-control" :value="notaFinal" readonly />
</template>
<script>
export default {
  name: 'NotaFinal',
  props: {
    id_materia: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      notas: [],
      notaFinal: 0,
      dimensiones: [],
      porcentajes: {
        Ser: 0.05,
        Decidir: 0.05,
        Autoevaluacion: 0.05,
        Saber: 0.45,
        Hacer: 0.4,
      },
    }
  },
  methods: {
    async obtenerNota() {
      await this.$axios
        .get(`/profesor/notas/materia/${this.id_materia}`)
        .then((res) => {
          this.notas = res.data
        })
        .catch((err) => console.log(err))
    },
    agruparMaterias(arr) {
      return arr.reduce((acc, item) => {
        if (!acc[item.campo]) {
          acc[item.campo] = {
            campo: item.campo,
            totalNota: 0,
            items: [],
          }
        }
        acc[item.campo].items.push(item)
        acc[item.campo].totalNota += item.nota * this.porcentajes[item.campo]
        return acc
      }, {})
    },
  },
  async beforeMount() {
    await this.obtenerNota()
    this.dimensiones = this.agruparMaterias(this.notas)

    this.notaFinal = Object.values(this.dimensiones).reduce(
      (total, dimension) => total + dimension.totalNota,
      0
    )
  },
}
</script>
