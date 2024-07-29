<template>
  <div>
    <div class="row">Calificaciones</div>
    <div class="row">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Materia</th>
            <th scope="col" class="narrow-column">Ser</th>
            <th scope="col" class="narrow-column">Saber</th>
            <th scope="col" class="narrow-column">Hacer</th>
            <th scope="col" class="narrow-column">Decidir</th>
            <th scope="col" class="narrow-column">Auto evaluacion</th>
            <th scope="col" class="narrow-column">Nota final</th>
          </tr>
        </thead>
        <tbody class="table-group-divide">
          <tr v-for="(x, index) in agruparMaterias()" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ x.nombre }}</td>
            <Nota campo="Ser" :id_materia="x.id_materia" :id_estudiante="id" />
            <Nota
              campo="Saber"
              :id_materia="x.id_materia"
              :id_estudiante="id"
            />
            <Nota
              campo="Hacer"
              :id_materia="x.id_materia"
              :id_estudiante="id"
            />
            <Nota
              campo="Decidir"
              :id_materia="x.id_materia"
              :id_estudiante="id"
            />
            <Nota
              campo="Autoevaluacion"
              :id_materia="x.id_materia"
              :id_estudiante="id"
            />
            <td>
              <NotaFinal :id_materia="x.id_materia" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>
.narrow-column {
  width: 70px;
}
</style>
<script>
import Nota from './Notas.vue'
import NotaFinal from './NotaFinal.vue'
export default {
  name: 'Calificaciones',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: { Nota, NotaFinal },
  data() {
    return {
      notas: [],
      notaSer: 0,
      notaSaber: 0,
      notaHacer: 0,
      notaDecidir: 0,
      notaAutoevaluacion: 0,
      notaFinal: 0,
    }
  },
  methods: {
    actualizarNota(tipo, valor) {
      if (tipo === 'Ser') {
        this.notaSer = valor
      }
      if (tipo === 'Saber') {
        this.notaSaber = valor
      }
      if (tipo === 'Hacer') {
        this.notaHacer = valor
      }
      if (tipo === 'Decidir') {
        this.notaDecidir = valor
      }
      if (tipo === 'Autoevaluacion') {
        this.notaAutoevaluacion = valor
      }
    },
    agruparMaterias() {
      const agrupados = this.notas.reduce((acc, item) => {
        if (
          !acc.some(
            (existingItem) =>
              existingItem.nombre === item.nombre &&
              existingItem.id_materia === item.id_materia
          )
        ) {
          acc.push({ nombre: item.nombre, id_materia: item.id_materia })
        }
        return acc
      }, [])
      return agrupados
    },
    async obtenerNotas() {
      await this.$axios
        .get(`/profesor/notas/estudiante/${this.id}`)
        .then((res) => {
          this.notas = res.data
          this.actualizarNota()
        })
        .catch((err) => console.log(err))
    },
  },
  async beforeMount() {
    await this.obtenerNotas()
  },
  mounted() {},
}
</script>
