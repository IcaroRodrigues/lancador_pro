import axios from 'axios'

const token = localStorage.getItem('token')

const api = axios.create({
  baseURL: 'https://lancador-back.herokuapp.com/',
  headers: {
    Authorization: `Bearer: ${token}`
  }
})

export default api;