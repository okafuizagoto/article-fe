import axios from 'axios'

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080'
const api = axios.create({ baseURL })

export const fetchArticle = (id) => api.get(`/article/${id}`)
export const createArticle = (payload) => api.post('/article', payload)
export const updateArticle = (id, payload) => api.put(`/article/${id}`, payload)
export const patchArticle = (id) => api.delete(`/article/${id}`)

export const fetchPublished = async (page = 1, length = 5) => {
  const res = await api.get(`/article/${page}/${length}`)
  console.log("res", res)
  return res.data
}

export default api
