import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import HomeAdministrador from '../components/administrador/Home.vue'
import HomeUsuario from '../components/usuario/Home.vue'
import Usuarios from '@/components/administrador/usuarios/Usuarios.vue'

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
    path: '/usuario',
    name: 'usuario',
    component: HomeUsuario,
    meta: { roles: ['Usuario'] },
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
