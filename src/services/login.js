import api from './api'

export const LoginUser = (user) => api.post('sessions', user)