<template>
  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item">
      <router-link to="/director/profesores" class="nav-link">
        Profesores
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/director/curso" class="nav-link"> Cursos </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Navigation',
}
</script>
