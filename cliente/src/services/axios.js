import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
})

const token = JSON.parse(localStorage.getItem('usuario'))?.token
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export default axiosInstance
