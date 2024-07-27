// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axiosInstance from './services/axios'

const app = createApp(App)

app.config.globalProperties.$axios = axiosInstance

app.use(router)

app.mount('#app')
