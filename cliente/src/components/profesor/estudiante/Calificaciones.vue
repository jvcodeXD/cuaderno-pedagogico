<template>
  <div>
    <p class="d-inline-flex gap-1">
      <button
        class="btn btn-primary"
        data-bs-toggle="collapse"
        href="#serCollapse"
        role="button"
        aria-expanded="false"
        aria-controls="serCollapse"
      >
        Ser
      </button>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#saberCollapse"
        aria-expanded="false"
        aria-controls="saberCollapse"
      >
        Saber
      </button>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#hacerCollapse"
        aria-expanded="false"
        aria-controls="hacerCollapse"
      >
        Hacer
      </button>

      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#decidirCollapse"
        aria-expanded="false"
        aria-controls="decidirCollapse"
      >
        Decidir
      </button>

      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#autoCollapse"
        aria-expanded="false"
        aria-controls="autoCollapse"
      >
        Autoevaluacion
      </button>
    </p>
    <div class="row">
      <div class="collapse multi-collapse" id="serCollapse">
        <div class="card card-body">Ser</div>
      </div>
      <div class="collapse multi-collapse" id="saberCollapse">
        <div class="card card-body">Saber</div>
      </div>
      <div class="collapse multi-collapse" id="hacerCollapse">
        <div class="card card-body">Hacer</div>
      </div>
      <div class="collapse multi-collapse" id="decidirCollapse">
        <div class="card card-body">Decidir</div>
      </div>
      <div class="collapse multi-collapse" id="autoCollapse">
        <div class="card card-body">Autoevaluacion</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Calificaciones',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  mounted() {},
}
</script>
