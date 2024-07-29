<template>
  <div>
    <button
      class="btn btn-outline-success"
      type="button"
      data-bs-toggle="modal"
      :data-bs-target="'#' + nameModal"
    >
      Agregar indicador
    </button>
    <div class="modal fade" :id="nameModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Crear indicador de nota</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <div class="row">
                  <div class="col-7">
                    <label
                      :for="'indicador' + id_materia"
                      class="col-form-label"
                    >
                      Indicador
                    </label>
                    <textarea
                      v-model="nota.indicador"
                      class="form-control"
                      :id="'indicador' + id_materia"
                    >
                    </textarea>
                  </div>
                  <div class="col-5">
                    <label :for="'campo' + id_materia" class="col-form-label">
                      Campo
                    </label>
                    <select
                      v-model="nota.campo"
                      class="form-control"
                      id="'campo'+id_materia"
                    >
                      <option value="" disabled selected>
                        Selecciona un campo
                      </option>
                      <option
                        v-for="(campo, index) in campos"
                        :key="index"
                        :value="campo"
                      >
                        {{ campo }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="crearNota"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CrearIndicador',
  props: {
    id_materia: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      nota: {
        id_materia: this.id_materia,
        campo: '',
        indicador: '',
      },
      campos: ['Ser', 'Saber', 'Hacer', 'Decidir', 'Autoevaluacion'],
      nameModal: `modal${this.id_materia}${this.campo}`,
    }
  },
  methods: {
    async crearNota() {
      await this.$axios
        .post(`/profesor/notas`, this.nota)
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    },
  },
  beforeMount() {},
}
</script>
