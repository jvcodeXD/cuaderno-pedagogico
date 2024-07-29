<template>
  <td>
    <div class="input-with-button">
      <input type="text" class="form-control" :value="nota" readonly />
      <button
        v-if="campo !== 'Autoevaluacion'"
        class="btn btn-outline-secondary btn-sm"
        data-bs-toggle="modal"
        :data-bs-target="'#' + modalName"
        type="button"
      >
        ?
      </button>
    </div>
    <div
      class="modal fade"
      :id="modalName"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Notas para dimension '{{ campo }}'
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="list-group">
              <li
                v-for="(nota, index) in notas"
                :key="index"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <Nota
                  :id="nota.id"
                  :id_estudiante="id_estudiante"
                  @nota-actualizada="obtenerCalificaciones()"
                />
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  </td>
</template>
<style>
.narrow-column {
  width: 70px;
}
.input-with-button {
  position: relative;
}
.input-with-button input {
  padding-right: 0.5rem;
}
.input-with-button .btn {
  position: absolute;
  right: 0.1rem;
  top: 10%;
  transform: translateY(-65%);
  padding: 0.2rem 0.4rem;
  font-size: 0.4rem;
}
</style>
<script>
import Nota from './Nota.vue'
export default {
  name: 'Notas',
  props: {
    id_materia: {
      type: Number,
      required: true,
    },
    id_estudiante: {
      type: Number,
      required: true,
    },
    campo: {
      type: String,
      required: true,
    },
  },
  components: { Nota },
  data() {
    return {
      notas: [],
      calificaciones: [],
      nota: 0,
      modalName: `modal${this.id_materia}${this.campo}`,
    }
  },
  methods: {
    calcularPromedio() {
      if (this.calificaciones.length === 0) this.nota = 0
      else {
        const suma = this.calificaciones.reduce(
          (acc, item) => acc + item.nota,
          0
        )
        this.nota = suma / this.calificaciones.length
      }
    },
    calcularNota() {
      if (this.notas.length > 0) {
        const totalNotas = this.notas.reduce((acc, item) => acc + item.nota, 0)
        const promedioNotas = totalNotas / this.notas.length
        this.nota = promedioNotas
      } else {
        this.nota = 0
      }
      // this.$emit('nota-actualizada', this.nota)
    },
    async obtenerCalificaciones() {
      await this.$axios
        .get(
          `/profesor/calificacion/notas/${this.id_materia}/${this.id_estudiante}`
        )
        .then((res) => (this.calificaciones = res.data))
        .catch((err) => console.log(err))
      // this.calcularPromedio()
    },
    async obtenerNota() {
      await this.$axios
        .get(`/profesor/notas/materia/${this.id_materia}/${this.campo}`)
        .then((res) => {
          this.notas = res.data
        })
        .catch((err) => console.log(err))
    },
  },
  async beforeMount() {
    await this.obtenerNota()
    await this.obtenerCalificaciones()
  },
}
</script>
