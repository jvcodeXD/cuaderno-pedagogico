import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import HomeAdministrador from '../components/administrador/Home.vue'
import HomeDirector from '../components/director/Home.vue'
import HomeEstudiante from '../components/estudiante/Home.vue'
import HomeProfesor from '../components/profesor/Home.vue'
import Usuarios from '@/components/administrador/usuarios/Usuarios.vue'
import Profesores from '@/components/director/profesor/Profesores.vue'
import Curso from '@/components/director/curso/Curso.vue'
import Estudiantes from '@/components/profesor/estudiante/Estudiantes.vue'
import DatosEstudiante from '@/components/profesor/estudiante/DatosEstudiante.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      if (usuario) {
        next(`/${usuario.rol.toLowerCase()}`)
      } else {
        next()
      }
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      if (usuario) {
        next(`/${usuario.rol.toLowerCase()}`)
      } else {
        next()
      }
    },
  },
  {
    path: '/administrador',
    name: 'administrador',
    component: HomeAdministrador,
    meta: { roles: ['Administrador'] },
    children: [
      {
        path: 'usuarios',
        component: Usuarios,
        meta: { roles: ['Administrador'] },
      },
    ],
  },
  {
    path: '/director',
    name: 'director',
    component: HomeDirector,
    meta: { roles: ['Director'] },
    children: [
      {
        path: 'profesores',
        component: Profesores,
        meta: { roles: ['Director'] },
      },
      {
        path: 'curso',
        component: Curso,
        meta: { roles: ['Director'] },
      },
    ],
  },
  {
    path: '/profesor',
    name: 'profesor',
    component: HomeProfesor,
    meta: { roles: ['Profesor'] },
    children: [
      {
        path: 'estudiantes',
        component: Estudiantes,
        meta: { roles: ['Profesor'] },
      },
      {
        path: 'perfil-estudiante/:id',
        component: DatosEstudiante,
        meta: { roles: ['Profesor'] },
      },
    ],
  },
  {
    path: '/estudiante',
    name: 'estudiante',
    component: HomeEstudiante,
    meta: { roles: ['Estudiante'] },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  if (to.matched.some((record) => record.meta.roles)) {
    if (!usuario) {
      next('/login')
    } else {
      const allowedRoles = to.meta.roles
      if (allowedRoles.includes(usuario.rol)) {
        next()
      } else {
        next('/')
      }
    }
  } else {
    next()
  }
})

export default router
