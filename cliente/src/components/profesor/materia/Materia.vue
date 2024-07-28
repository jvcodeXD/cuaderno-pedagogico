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
          <div class="row row-cols-1 row-cols-md-3 g-1">
            <div class="col">
              <div class="card border-primary mb-3" style="max-width: 18rem">
                <div class="card-header">Ser</div>
                <div class="card-body text-dark">
                  <h5 class="card-title">Primary card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card border-secondary mb-3" style="max-width: 18rem">
                <div class="card-header">Saber</div>
                <div class="card-body text-dark">
                  <h5 class="card-title">Secondary card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card border-info mb-3" style="max-width: 18rem">
                <div class="card-header">Hacer</div>
                <div class="card-body text-dark">
                  <h5 class="card-title">Info card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card border-dark mb-3" style="max-width: 18rem">
                <div class="card-header">Decidir</div>
                <div class="card-body text-dark">
                  <h5 class="card-title">Dark card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card border-warning mb-3" style="max-width: 18rem">
                <div class="card-header">Autoevaluacion</div>
                <div class="card-body text-dark">
                  <h5 class="card-title">Warning card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Materia',
  props: {
    id_materia: {
      type: Number,
      required: true,
    },
  },
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
    console.log(this.materia)
  },
}
</script>
