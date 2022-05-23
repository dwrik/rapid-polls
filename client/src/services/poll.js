import axios from 'axios'

const baseUrl = 'http://localhost:3004'

const get = async (id) => {
  const response = axios.get(`${baseUrl}/polls/${id}`)
  return response.then((response) => response.data)
}

const create = async (poll) => {
  const response = axios.post(`${baseUrl}/polls`, poll)
  return response.then((response) => response.data)
}

const update = async (modified) => {
  const response = axios.put(`${baseUrl}/polls/${modified.id}`, modified)
  return response.then((response) => response.data)
}

const pollService = { get, create, update }
export default pollService
