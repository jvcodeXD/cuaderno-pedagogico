<template>
  <div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#' + collapseMateria"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <div class="row d-flex justify-content-between">
            <div class="col col-md-10">
              {{ materiaName() }}
            </div>
            <div class="col col-md-2">
              <button
                v-on:click="eliminarMateria"
                class="btn btn-outline-danger"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </button>
      </h2>
      <div
        :id="collapseMateria"
        class="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <CrearIndicador :id_materia="id_materia" />
          <div class="row row-cols-1 row-cols-md-3 g-1">
            <indicadores
              :id_materia="id_materia"
              campo="Ser"
              descripcion="Evaluación del comportamiento y actitudes del estudiante."
            />
            <indicadores
              :id_materia="id_materia"
              campo="Saber"
              descripcion="Evaluación del conocimiento teórico adquirido."
            />
            <indicadores
              :id_materia="id_materia"
              campo="Hacer"
              descripcion="Evaluación de las habilidades prácticas y aplicación del conocimiento."
            />
            <indicadores
              :id_materia="id_materia"
              campo="Decidir"
              descripcion="Evaluación de la capacidad de tomar decisiones y resolver problemas."
            />
            <indicadores
              :id_materia="id_materia"
              campo="Autoevaluacion"
              descripcion="Evaluación de la capacidad del estudiante para reflexionar sobre su propio aprendizaje."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Indicadores from './indicador/Indicadores.vue'
import CrearIndicador from './indicador/CrearIndicador.vue'
export default {
  name: 'Materia',
  props: {
    id_materia: {
      type: Number,
      required: true,
    },
  },
  components: { Indicadores, CrearIndicador },
  data() {
    return {
      materia: null,
    }
  },
  methods: {
    materiaName() {
      return `${this.materia?.grado} ${this.materia?.paralelo} - ${this.materia?.nombre}`
    },
    async eliminarMateria() {
      await this.$axios
        .delete(`/profesor/materias/${this.id_materia}`)
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    },
    async obtenerMateria() {
      await this.$axios
        .get(`/profesor/materias/${this.id_materia}`)
        .then((res) => (this.materia = res.data[0]))
        .catch((err) => console.log(err))
    },
  },
  computed: {
    collapseMateria() {
      return `collapse${this.id_materia}`
    },
  },
  async beforeMount() {
    await this.obtenerMateria()
  },
}
</script>
